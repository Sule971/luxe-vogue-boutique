
import axios from 'axios';

// Replace with your actual PythonAnywhere username
const API_BASE_URL = "https://your-pythonanywhere-username.pythonanywhere.com/api";

// User authentication
export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Products
export const getProducts = async (filters: {
  category?: string;
  gender?: string;
  search?: string;
} = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, { params: filters });
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (productId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data.product;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};

// Orders
export const createOrder = async (orderData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getUserOrders = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${userId}`);
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

// Wishlist
export const getWishlist = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wishlist/${userId}`);
    return response.data.wishlist;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

export const addToWishlist = async (userId: number, productId: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/wishlist/${userId}`, { product_id: productId });
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

export const removeFromWishlist = async (userId: number, productId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/wishlist/${userId}`, { 
      data: { product_id: productId } 
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};

// M-Pesa Payment
export const processMpesaPayment = async (paymentData: { phone: string; amount: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mpesa_payment`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error processing M-Pesa payment:", error);
    throw error;
  }
};

export default {
  registerUser,
  loginUser,
  getProducts,
  getProductById,
  createOrder,
  getUserOrders,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  processMpesaPayment
};
