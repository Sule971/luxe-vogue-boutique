
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface OrderSummaryProps {
  onCheckout?: () => void;
  showCheckoutButton?: boolean;
}

const OrderSummary = ({ onCheckout, showCheckoutButton = true }: OrderSummaryProps) => {
  const { items, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  
  const shippingCost = 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost - discount;
  
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "luxe10") {
      setPromoApplied(true);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-playfair font-bold mb-4 pb-4 border-b">Order Summary</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shippingCost.toLocaleString()}</span>
        </div>
        
        {promoApplied && (
          <div className="flex justify-between text-green-600">
            <span>Discount (10%)</span>
            <span>-${discount.toLocaleString()}</span>
          </div>
        )}
        
        <div className="flex justify-between font-bold text-lg pt-4 border-t">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>

        <div className="pt-4">
          <div className="flex space-x-2">
            <input 
              type="text" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code" 
              className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-purple"
            />
            <Button
              onClick={handleApplyPromo}
              variant="outline"
              className="border-luxury-purple text-luxury-purple hover:bg-luxury-purple hover:text-white"
            >
              Apply
            </Button>
          </div>
          {promoApplied && (
            <p className="text-green-600 text-sm mt-2">Promo code applied successfully!</p>
          )}
        </div>
        
        {showCheckoutButton && (
          <Button 
            onClick={onCheckout}
            className="w-full bg-luxury-purple hover:bg-luxury-purple-light btn-hover-effect"
            size="lg"
          >
            Proceed to Checkout <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
