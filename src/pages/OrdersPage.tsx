
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { sampleOrders } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PackageCheck, ArrowLeft } from "lucide-react";

const OrdersPage = () => {
  const [orders] = useState(sampleOrders);
  
  // Function to format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Function to generate order status steps
  const getOrderSteps = (status: string) => {
    const steps = [
      { name: 'Order Placed', completed: true },
      { name: 'Processing', completed: ['processing', 'shipped', 'delivered'].includes(status) },
      { name: 'Shipped', completed: ['shipped', 'delivered'].includes(status) },
      { name: 'Delivered', completed: ['delivered'].includes(status) }
    ];
    
    return steps;
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">My Orders</h1>
          <Link to="/">
            <Button variant="outline" className="hidden sm:flex">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <PackageCheck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to place your first order.
            </p>
            <Link to="/">
              <Button className="bg-luxury-purple hover:bg-luxury-purple-light btn-hover-effect">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">Placed on {formatDate(order.orderDate)}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {order.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Expected delivery: {formatDate(order.estimatedDeliveryDate)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Order progress */}
                  <div className="mt-6">
                    <div className="relative flex items-center justify-between">
                      {getOrderSteps(order.status).map((step, idx, arr) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                            step.completed 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                            {step.completed ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            ) : (
                              <span>{idx + 1}</span>
                            )}
                          </div>
                          <div className="text-xs mt-2 text-center">{step.name}</div>
                          {idx < arr.length - 1 && (
                            <div className={`absolute left-0 w-full top-4 h-0.5 ${
                              step.completed ? 'bg-green-600' : 'bg-gray-200'
                            }`} style={{ left: `${(idx * 100) / (arr.length - 1)}%`, width: `${100 / (arr.length - 1)}%` }}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Accordion type="single" collapsible>
                  <AccordionItem value="items">
                    <AccordionTrigger className="px-6 py-3 text-sm font-medium hover:bg-gray-50">
                      Order Details
                    </AccordionTrigger>
                    <AccordionContent className="px-6">
                      <div className="py-4">
                        <h4 className="font-medium mb-4">Items</h4>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center">
                              <div className="flex-shrink-0 w-16 h-16 relative">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name} 
                                  className="w-full h-full object-cover rounded-md"
                                />
                              </div>
                              <div className="ml-4 flex-grow">
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                <p className="text-sm font-medium">${(item.product.price * item.quantity).toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t mt-6 pt-6">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Subtotal</span>
                            <span className="text-sm font-medium">${order.totalAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Shipping</span>
                            <span className="text-sm font-medium">$15.00</span>
                          </div>
                          <div className="flex justify-between font-medium pt-4 border-t mt-2">
                            <span>Total</span>
                            <span>${(order.totalAmount + 15).toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="border-t mt-6 pt-6">
                          <h4 className="font-medium mb-4">Shipping Address</h4>
                          <address className="text-sm not-italic">
                            <p>{order.shippingAddress.fullName}</p>
                            <p>{order.shippingAddress.streetAddress}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.county} {order.shippingAddress.postalCode}</p>
                            <p>{order.shippingAddress.phoneNumber}</p>
                          </address>
                        </div>
                        
                        {order.trackingNumber && (
                          <div className="border-t mt-6 pt-6">
                            <h4 className="font-medium mb-2">Tracking Information</h4>
                            <p className="text-sm">Tracking Number: {order.trackingNumber}</p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
