
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className={`group product-card block bg-white rounded-lg overflow-hidden ${
        featured ? "shadow-md" : "border border-gray-200"
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // Add wishlist functionality here
            }}
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-luxury-purple hover:bg-luxury-purple-light btn-hover-effect"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-playfair text-lg font-medium text-gray-900 group-hover:text-luxury-purple transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toLocaleString()}</p>
        <div className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
