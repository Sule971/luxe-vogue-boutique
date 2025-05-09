
-- Create the database
CREATE DATABASE IF NOT EXISTS elegance_store;
USE elegance_store;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at DATETIME NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    category VARCHAR(50) NOT NULL,
    gender ENUM('men', 'women', 'unisex') NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    stock INT DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') NOT NULL,
    shipping_address JSON NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    UNIQUE KEY user_product (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- M-Pesa payment requests table
CREATE TABLE IF NOT EXISTS payment_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    reference VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    request_data JSON NOT NULL,
    response_data TEXT,
    created_at DATETIME NOT NULL
);

-- M-Pesa callbacks table
CREATE TABLE IF NOT EXISTS payment_callbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    callback_data JSON NOT NULL,
    created_at DATETIME NOT NULL
);

-- Insert sample products
INSERT INTO products (name, description, price, image, category, gender, featured, stock, created_at) VALUES
('Luxury Gold Watch', 'Elegant gold-plated watch with genuine leather strap', 1299.99, 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e', 'accessories', 'unisex', 1, 15, NOW()),
('Diamond Pendant', 'Beautiful pendant with 0.5 carat diamond', 999.99, 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e', 'jewelry', 'women', 1, 8, NOW()),
('Italian Leather Shoes', 'Handcrafted Italian leather dress shoes', 359.99, 'https://images.unsplash.com/photo-1544441893-675973e31985', 'footwear', 'men', 1, 20, NOW()),
('Silk Evening Gown', 'Elegant silk evening gown in midnight blue', 1499.99, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1', 'dresses', 'women', 1, 5, NOW()),
('Designer Sunglasses', 'Premium designer sunglasses with UV protection', 299.99, 'https://images.unsplash.com/photo-1577803645773-f96470509666', 'accessories', 'unisex', 0, 30, NOW()),
('Cashmere Sweater', 'Soft and warm 100% cashmere sweater', 459.99, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27', 'clothing', 'men', 0, 12, NOW()),
('Pearl Necklace', 'Classic pearl necklace with sterling silver clasp', 799.99, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f', 'jewelry', 'women', 0, 7, NOW()),
('Leather Handbag', 'Premium leather handbag with gold accents', 899.99, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', 'accessories', 'women', 1, 10, NOW());
