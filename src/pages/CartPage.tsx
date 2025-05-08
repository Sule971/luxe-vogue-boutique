
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import OrderSummary from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus, ArrowLeft, ChevronRight } from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity } = useCart();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-8">Your Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Discover our collections and add some items to your cart.</p>
            <Link to="/">
              <Button className="bg-luxury-purple hover:bg-luxury-purple-light btn-hover-effect">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {items.map((item) => {
                        const { product, quantity } = item;
                        return (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-16 w-16 relative">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="h-full w-full object-cover rounded-md" 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    <Link to={`/product/${product.id}`} className="hover:text-luxury-purple">
                                      {product.name}
                                    </Link>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${product.price.toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center border rounded-md w-28">
                                <button 
                                  onClick={() => updateQuantity(product.id, quantity - 1)} 
                                  className="px-3 py-1 hover:bg-gray-100"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <input 
                                  type="number" 
                                  min="1" 
                                  value={quantity} 
                                  onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                                  className="w-12 text-center border-0 focus:ring-0 p-0" 
                                />
                                <button 
                                  onClick={() => updateQuantity(product.id, quantity + 1)} 
                                  className="px-3 py-1 hover:bg-gray-100"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${(product.price * quantity).toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => removeFromCart(product.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/" className="inline-flex items-center text-luxury-purple hover:text-luxury-purple-light">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <OrderSummary onCheckout={handleCheckout} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
