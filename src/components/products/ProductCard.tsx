
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };

  // Fallback images if product image doesn't load
  const fallbackImages = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  ];

  return (
    <Link 
      to={`/product/${product.id}`} 
      className={`group product-card block bg-white rounded-lg overflow-hidden transition-all duration-300 ${
        featured ? "shadow-md" : "border border-gray-200"
      } ${isHovered ? "transform -translate-y-2 shadow-xl" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
            <div className="w-12 h-12 border-4 border-luxury-purple border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={imgError ? fallbackImages[Math.floor(Math.random() * fallbackImages.length)] : product.image}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          } ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            console.log("Image error for product:", product.id);
            setImgError(true);
            setImgLoaded(true);
          }}
        />
        <div className={`absolute top-2 right-2 transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}>
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110"
            onClick={handleWishlist}
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 p-4 transform transition-transform duration-300 ease-out ${
          isHovered ? "translate-y-0" : "translate-y-full"
        }`}>
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
        <h3 className={`font-playfair text-lg font-medium transition-colors duration-300 ${
          isHovered ? "text-luxury-purple" : "text-gray-900"
        }`}>
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toLocaleString()}</p>
        <div className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
