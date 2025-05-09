
# Setup Instructions for Elegance Store API

This document provides instructions for setting up the Flask API for the Elegance Store website on PythonAnywhere and connecting it to a MySQL database.

## Local Development Setup

### 1. Set Up the Database with XAMPP

1. Install XAMPP if you haven't already: https://www.apachefriends.org/index.html
2. Start XAMPP and ensure MySQL service is running
3. Open phpMyAdmin (usually at http://localhost/phpmyadmin/)
4. Import the `elegance_store_setup.sql` file to create the database and tables:
   - Click on "Import" in the top navigation
   - Browse to the `elegance_store_setup.sql` file
   - Click "Go" to execute the SQL script

### 2. Test the Flask API Locally

1. Install required Python packages:
   ```
   pip install flask flask-cors pymysql requests werkzeug
   ```

2. Update the database connection details in `flask_api.py`:
   ```python
   def get_db_connection():
       return pymysql.connect(
           host='localhost',
           user='root',  # Default XAMPP username
           password='',   # Default XAMPP password is empty
           db='elegance_store',
           charset='utf8mb4',
           cursorclass=pymysql.cursors.DictCursor
       )
   ```

3. Run the Flask app:
   ```
   python flask_api.py
   ```

4. Test the API using Insomnia or Postman at `http://localhost:5000/api/products`

## PythonAnywhere Setup

### 1. Create a PythonAnywhere Account

1. Sign up for a free account at https://www.pythonanywhere.com/
2. Log in to your PythonAnywhere dashboard

### 2. Set Up the Flask API

1. Go to the "Files" tab in your PythonAnywhere dashboard
2. Create a new file called `flask_api.py` and copy the contents of your local `flask_api.py`
3. Install required packages:
   - Go to the "Consoles" tab and open a Bash console
   - Run: `pip install --user flask flask-cors pymysql requests werkzeug`

### 3. Create a Web App

1. Go to the "Web" tab in your PythonAnywhere dashboard
2. Click "Add a new web app"
3. Choose "Manual configuration" (not "Flask")
4. Choose the Python version (3.8 or newer recommended)

### 4. Configure the Web App

1. In the "Code" section of your web app configuration:
   - Set the "Source code" and "Working directory" to the directory where your `flask_api.py` file is located
   - Set the "WSGI configuration file" path and click on it to edit

2. Replace the content of the WSGI file with:
   ```python
   import sys
   path = '/home/YOUR_PYTHONANYWHERE_USERNAME'  # Replace with your actual username
   if path not in sys.path:
       sys.path.append(path)
       
   from flask_api import app as application
   ```

3. Save the WSGI file

### 5. Connect to a MySQL Database

PythonAnywhere provides MySQL databases with paid accounts. For free accounts, you can:

#### Option 1: Use PythonAnywhere's MySQL (Recommended)

1. Go to the "Databases" tab in your PythonAnywhere dashboard
2. Create a MySQL database and note the username, password, and hostname
3. Update the database connection in your `flask_api.py`:
   ```python
   def get_db_connection():
       return pymysql.connect(
           host='YOUR_PYTHONANYWHERE_USERNAME.mysql.pythonanywhere-services.com',
           user='YOUR_PYTHONANYWHERE_USERNAME',
           password='YOUR_DATABASE_PASSWORD',
           db='YOUR_PYTHONANYWHERE_USERNAME$elegance_store',
           charset='utf8mb4',
           cursorclass=pymysql.cursors.DictCursor
       )
   ```

4. Initialize your database by importing `elegance_store_setup.sql` through phpMyAdmin (accessible via the "Databases" tab)

#### Option 2: Connect to Your XAMPP Database (For Testing Only)

This approach is not recommended for production but can be used for testing:

1. Ensure your XAMPP's MySQL server is accessible from the internet (requires proper network configuration)
2. Update the database connection in your `flask_api.py` to point to your public IP:
   ```python
   def get_db_connection():
       return pymysql.connect(
           host='YOUR_PUBLIC_IP_ADDRESS',
           user='remote_user',  # Create a user with remote access privileges
           password='secure_password',
           db='elegance_store',
           charset='utf8mb4',
           cursorclass=pymysql.cursors.DictCursor
       )
   ```

3. Configure MySQL to allow remote connections:
   - Edit MySQL configuration file (my.ini or my.cnf in XAMPP)
   - Comment out or change `bind-address = 127.0.0.1` to `bind-address = 0.0.0.0`
   - Create a MySQL user with remote access privileges

### 6. Set Up M-Pesa Integration

1. Update the callback URL in the `mpesa_payment` function to match your PythonAnywhere domain:
   ```python
   "CallBackURL": "https://YOUR_PYTHONANYWHERE_USERNAME.pythonanywhere.com/api/mpesa_callback",
   ```

2. For production, replace the test M-Pesa API credentials with your actual credentials

### 7. Restart Your Web App

1. Go back to the "Web" tab
2. Click the "Reload" button for your web app

### 8. Testing the API

1. Your API should now be accessible at:
   `https://YOUR_PYTHONANYWHERE_USERNAME.pythonanywhere.com/api/products`

2. Use Insomnia or Postman to test your endpoints:
   - GET products: `https://YOUR_PYTHONANYWHERE_USERNAME.pythonanywhere.com/api/products`
   - POST register: `https://YOUR_PYTHONANYWHERE_USERNAME.pythonanywhere.com/api/register`
   - POST login: `https://YOUR_PYTHONANYWHERE_USERNAME.pythonanywhere.com/api/login`
   - POST M-Pesa payment: `https://YOUR_PYTHONANYWHERE_USERNAME.pythonanywhere.com/api/mpesa_payment`

## Frontend Integration

Update your React frontend to use the PythonAnywhere API endpoints:

```javascript
// Update API base URL
const API_BASE_URL = "https://YOUR_PYTHONANYWHERE_USERNAME.pythonanywhere.com/api";

// Example API calls
const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const getProducts = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, { params: filters });
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const makeMpesaPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mpesa_payment`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error processing M-Pesa payment:", error);
    throw error;
  }
};
```

## Security Considerations

1. **HTTPS**: Ensure your PythonAnywhere site uses HTTPS (included with PythonAnywhere)
2. **CORS**: The API includes CORS support to allow requests from your frontend
3. **Password Hashing**: User passwords are hashed using Werkzeug's security functions
4. **Database Protection**: Use strong database passwords and limit database user privileges

## Troubleshooting

1. **API Not Accessible**:
   - Check if your web app is running (green circle in the "Web" tab)
   - Check the error logs in the "Web" tab
   - Ensure the WSGI file is correctly configured

2. **Database Connection Issues**:
   - Verify database credentials
   - Check if your database server is running
   - For remote connections, verify firewall settings

3. **M-Pesa API Errors**:
   - Check the console logs for detailed error messages
   - Verify that the phone number format is correct (e.g., 254XXXXXXXXX)
   - Ensure the API credentials are valid
