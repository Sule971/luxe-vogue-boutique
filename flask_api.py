from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import pymysql
import datetime
import base64
import requests
import os
import json
from werkzeug.security import generate_password_hash, check_password_hash
from requests.auth import HTTPBasicAuth

app = Flask(__name__)
CORS(app)

# Database connection function
def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='your_db_username',
        password='your_db_password',
        db='elegance_store',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

# Helper to execute SQL queries
def execute_query(query, params=None, fetch=True):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(query, params)
            if fetch:
                result = cursor.fetchall()
                return result
            connection.commit()
            return cursor.lastrowid
    finally:
        connection.close()

# User Authentication APIs
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user exists
    existing_user = execute_query("SELECT * FROM users WHERE email = %s", (data['email'],))
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400
    
    # Hash password
    hashed_password = generate_password_hash(data['password'])
    
    # Insert user
    user_id = execute_query(
        "INSERT INTO users (name, email, password, phone, created_at) VALUES (%s, %s, %s, %s, %s)",
        (data['name'], data['email'], hashed_password, data.get('phone', ''), datetime.datetime.now()),
        fetch=False
    )
    
    return jsonify({
        "message": "User registered successfully",
        "user_id": user_id
    }), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Get user
    users = execute_query("SELECT * FROM users WHERE email = %s", (data['email'],))
    if not users or len(users) == 0:
        return jsonify({"error": "Invalid credentials"}), 401
    
    user = users[0]
    
    # Check password
    if not check_password_hash(user['password'], data['password']):
        return jsonify({"error": "Invalid credentials"}), 401
    
    # Return user data (excluding password)
    user.pop('password', None)
    
    return jsonify({
        "message": "Login successful",
        "user": user
    }), 200

# Product APIs
@app.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    gender = request.args.get('gender')
    search = request.args.get('search')
    
    query = "SELECT * FROM products WHERE 1=1"
    params = []
    
    if category:
        query += " AND category = %s"
        params.append(category)
    
    if gender:
        query += " AND (gender = %s OR gender = 'unisex')"
        params.append(gender)
    
    if search:
        query += " AND (name LIKE %s OR description LIKE %s)"
        search_term = f"%{search}%"
        params.extend([search_term, search_term])
    
    products = execute_query(query, tuple(params) if params else None)
    return jsonify({"products": products})

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    products = execute_query("SELECT * FROM products WHERE id = %s", (product_id,))
    
    if not products or len(products) == 0:
        return jsonify({"error": "Product not found"}), 404
    
    return jsonify({"product": products[0]})

# Order APIs
@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    items = data.get('items')
    shipping_address = data.get('shipping_address')
    
    if not user_id or not items or len(items) == 0:
        return jsonify({"error": "Missing required fields"}), 400
    
    # Calculate total
    total = sum(item['price'] * item['quantity'] for item in items)
    
    # Create order
    order_id = execute_query(
        "INSERT INTO orders (user_id, total, status, shipping_address, created_at) VALUES (%s, %s, %s, %s, %s)",
        (user_id, total, "pending", json.dumps(shipping_address), datetime.datetime.now()),
        fetch=False
    )
    
    # Add order items
    for item in items:
        execute_query(
            "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (%s, %s, %s, %s)",
            (order_id, item['id'], item['quantity'], item['price']),
            fetch=False
        )
    
    return jsonify({
        "message": "Order created successfully",
        "order_id": order_id,
        "total": total
    }), 201

@app.route('/api/orders/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = execute_query("SELECT * FROM orders WHERE user_id = %s ORDER BY created_at DESC", (user_id,))
    
    # Get order items for each order
    for order in orders:
        items = execute_query(
            """
            SELECT oi.*, p.name, p.image 
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id 
            WHERE oi.order_id = %s
            """, 
            (order['id'],)
        )
        order['items'] = items
    
    return jsonify({"orders": orders})

# M-Pesa Payment API - Updated to properly handle JSON request
@app.route('/api/mpesa_payment', methods=['POST'])
def mpesa_payment():
    if request.method == 'POST':
        # Get JSON data from request
        data = request.get_json()
        
        # Extract values sent
        amount = data.get('amount', '1')  # Default to 1 for testing
        phone = data.get('phone', '')
        
        # Clean phone number format
        if phone.startswith('+'):
            phone = phone[1:]  # Remove + if present
        
        if not phone:
            return jsonify({"error": "Phone number is required"}), 400
        
        # Provide consumer_key and consumer_secret provided by safaricom
        consumer_key = "GTWADFxIpUfDoNikNGqq1C3023evM6UH"
        consumer_secret = "amFbAoUByPV2rM5A"

        # Authenticate to Safaricom Services
        api_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        response = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret))
        data_response = response.json()
        access_token = "Bearer" + ' ' + data_response['access_token']

        # Get the password
        timestamp = datetime.datetime.today().strftime('%Y%m%d%H%M%S')
        passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
        business_short_code = "174379"
        data_to_encode = business_short_code + passkey + timestamp
        encoded = base64.b64encode(data_to_encode.encode())
        password = encoded.decode()

        # Prepare payload
        payload = {
            "BusinessShortCode": "174379",
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone,
            "PartyB": "174379",
            "PhoneNumber": phone,
            "CallBackURL": "https://sule15971.pythonanywhere.com/api/mpesa_callback",
            "AccountReference": "Elegance Store",
            "TransactionDesc": "Payment for products"
        }

        # Set headers
        headers = {
            "Authorization": access_token,
            "Content-Type": "application/json"
        }

        # Send STK Push request
        url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        response = requests.post(url, json=payload, headers=headers)
        
        # Log response for debugging
        print("M-Pesa API Response:", response.text)
        
        # Store payment request in database
        try:
            request_id = execute_query(
                """
                INSERT INTO payment_requests 
                (phone, amount, reference, status, request_data, response_data, created_at) 
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                (phone, amount, "Elegance Store", "pending", json.dumps(payload), response.text, datetime.datetime.now()),
                fetch=False
            )
        except Exception as e:
            print("Error storing payment request:", str(e))
        
        # Return response to client
        return jsonify({
            "message": "An M-PESA prompt has been sent to your phone. Please check and complete payment",
            "response": json.loads(response.text)
        })

@app.route('/api/mpesa_callback', methods=['POST'])
def mpesa_callback():
    # This endpoint will receive callbacks from Safaricom
    data = request.get_json()
    print("M-Pesa Callback Data:", data)
    
    try:
        # Store the callback data
        execute_query(
            "INSERT INTO payment_callbacks (callback_data, created_at) VALUES (%s, %s)",
            (json.dumps(data), datetime.datetime.now()),
            fetch=False
        )
        
        # Extract relevant information from callback
        if 'Body' in data and 'stkCallback' in data['Body']:
            callback = data['Body']['stkCallback']
            result_code = callback.get('ResultCode')
            
            if result_code == 0:
                # Payment successful
                # Update order status or create a successful payment record
                # This depends on your application flow
                pass
    except Exception as e:
        print("Error processing callback:", str(e))
    
    # Always return a success response to Safaricom
    return jsonify({"ResultCode": 0, "ResultDesc": "Callback received successfully"})

# Wishlist APIs
@app.route('/api/wishlist/<int:user_id>', methods=['GET', 'POST', 'DELETE'])
def manage_wishlist(user_id):
    if request.method == 'GET':
        # Get user's wishlist items
        wishlist_items = execute_query(
            """
            SELECT w.*, p.name, p.price, p.image, p.description 
            FROM wishlist w 
            JOIN products p ON w.product_id = p.id 
            WHERE w.user_id = %s
            """, 
            (user_id,)
        )
        return jsonify({"wishlist": wishlist_items})
    
    elif request.method == 'POST':
        # Add product to wishlist
        data = request.get_json()
        product_id = data.get('product_id')
        
        # Check if already in wishlist
        existing = execute_query(
            "SELECT * FROM wishlist WHERE user_id = %s AND product_id = %s",
            (user_id, product_id)
        )
        
        if existing:
            return jsonify({"message": "Product already in wishlist"}), 200
        
        execute_query(
            "INSERT INTO wishlist (user_id, product_id, created_at) VALUES (%s, %s, %s)",
            (user_id, product_id, datetime.datetime.now()),
            fetch=False
        )
        
        return jsonify({"message": "Product added to wishlist"}), 201
    
    elif request.method == 'DELETE':
        # Remove product from wishlist
        data = request.get_json()
        product_id = data.get('product_id')
        
        execute_query(
            "DELETE FROM wishlist WHERE user_id = %s AND product_id = %s",
            (user_id, product_id),
            fetch=False
        )
        
        return jsonify({"message": "Product removed from wishlist"}), 200

if __name__ == '__main__':
    app.run(debug=True)
