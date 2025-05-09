
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import OrderSummary from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  CreditCard, 
  ShoppingCart, 
  MapPin, 
  Truck, 
  ChevronRight, 
  Phone 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { processMpesaPayment } from "@/utils/api";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    county: "",
    postalCode: "",
    phoneNumber: "",
    mpesaNumber: "",
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const makeMpesaPayment = async () => {
    try {
      setIsProcessing(true);
      
      // Calculate total (including shipping cost of $15)
      const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      const shippingCost = 15;
      const total = subtotal + shippingCost;
      
      // Format the amount as string with no decimal places for M-Pesa
      const amountStr = Math.round(total).toString();
      
      // Get phone number from form
      let phoneNumber = formData.mpesaNumber.trim();
      
      // Call the API to initiate M-Pesa payment
      const response = await processMpesaPayment({
        phone: phoneNumber,
        amount: amountStr
      });
      
      toast.success("M-Pesa STK push sent! Check your phone to complete payment");
      
      // For demo purposes, proceed with order creation
      // In production, you might want to wait for the callback confirmation
      setTimeout(() => {
        const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
        // Clear the cart
        clearCart();
        // Navigate to order confirmation
        navigate(`/order-confirmation/${orderId}`);
      }, 3000);
      
    } catch (error: any) {
      console.error("M-Pesa payment error:", error);
      toast.error(error.response?.data?.error || "Payment failed. Please check your phone number and try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.fullName || !formData.streetAddress || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Validate M-Pesa number
    if (!formData.mpesaNumber || formData.mpesaNumber.length < 10) {
      toast.error("Please enter a valid M-Pesa phone number");
      return;
    }
    
    // Process the payment
    await makeMpesaPayment();
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-luxury-purple bg-opacity-10 p-2 mr-3">
                  <MapPin className="h-5 w-5 text-luxury-purple" />
                </div>
                <h2 className="text-lg font-playfair font-bold">Shipping Address</h2>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+254..." 
                      required 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input 
                      id="streetAddress" 
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleChange}
                      placeholder="Enter your street address" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="county">County</Label>
                    <Input 
                      id="county" 
                      name="county"
                      value={formData.county}
                      onChange={handleChange}
                      placeholder="Enter your county" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input 
                      id="postalCode" 
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Enter your postal code" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex items-center mb-6">
                    <div className="rounded-full bg-luxury-purple bg-opacity-10 p-2 mr-3">
                      <CreditCard className="h-5 w-5 text-luxury-purple" />
                    </div>
                    <h2 className="text-lg font-playfair font-bold">Payment Method</h2>
                  </div>
                  
                  <Tabs defaultValue="mpesa">
                    <TabsList className="grid w-full grid-cols-1 mb-6">
                      <TabsTrigger value="mpesa" className="flex items-center justify-center">
                        <Phone className="mr-2 h-5 w-5" /> M-Pesa
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="mpesa">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="mpesaNumber">M-Pesa Phone Number</Label>
                          <Input 
                            id="mpesaNumber" 
                            name="mpesaNumber"
                            value={formData.mpesaNumber}
                            onChange={handleChange}
                            placeholder="2547XXXXXXXX or 07XXXXXXXX" 
                            required 
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Enter your M-Pesa registered phone number. Include country code (254) or start with 07.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex items-center mb-6">
                    <div className="rounded-full bg-luxury-purple bg-opacity-10 p-2 mr-3">
                      <Truck className="h-5 w-5 text-luxury-purple" />
                    </div>
                    <h2 className="text-lg font-playfair font-bold">Shipping Method</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 flex items-start">
                      <input 
                        type="radio" 
                        id="standard" 
                        name="shipping" 
                        className="mt-1"
                        checked 
                        readOnly
                      />
                      <label htmlFor="standard" className="ml-3 flex-grow">
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-gray-500">Delivery in 3-5 business days</div>
                        <div className="font-medium">$15.00</div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    type="submit"
                    className="w-full bg-luxury-purple hover:bg-luxury-purple-light btn-hover-effect"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing Payment..." : "Place Order"} 
                    {!isProcessing && <ChevronRight className="ml-1 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <OrderSummary showCheckoutButton={false} />
            
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <ShoppingCart className="h-5 w-5 text-luxury-purple mr-2" />
                <h3 className="font-medium">Order Items ({items.length})</h3>
              </div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.product.id} className="flex items-center py-2 border-b">
                    <div className="flex-shrink-0 w-12 h-12 relative">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover rounded-md"
                      />
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-luxury-purple text-white text-xs flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-sm text-gray-500">${item.product.price.toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
