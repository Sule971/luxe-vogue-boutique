
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Minus, Plus, ChevronRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(products.find((p) => p.id === id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set product based on ID
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct);
  }, [id]);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  // Find related products in the same collection or category
  const relatedProducts = products
    .filter((p) => (p.collection === product.collection || p.category === product.category) && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex space-x-2 text-sm text-gray-500">
                <li><Link to="/" className="hover:text-luxury-purple hover:underline">Home</Link></li>
                <li><span className="mx-1">/</span></li>
                <li><Link to={`/collections/${product.gender}`} className="hover:text-luxury-purple hover:underline">{product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}</Link></li>
                <li><span className="mx-1">/</span></li>
                <li><Link to={`/category/${product.category}`} className="hover:text-luxury-purple hover:underline">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link></li>
              </ol>
            </nav>
            
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-bold mb-6">${product.price.toLocaleString()}</p>
            
            <div className="prose prose-lg mb-8 text-gray-700">
              <p>{product.description}</p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <label htmlFor="quantity" className="font-medium">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)} 
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input 
                    type="number" 
                    id="quantity"
                    min="1" 
                    value={quantity} 
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-12 text-center border-0 focus:ring-0 p-0" 
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)} 
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-grow md:flex-grow-0 bg-luxury-purple hover:bg-luxury-purple-light btn-hover-effect"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="flex-grow md:flex-grow-0">
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
            
            <div className="border-t pt-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Authenticity</h3>
                <p className="text-sm text-gray-500">All items are 100% authentic and come with a certificate of authenticity.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-500">Free standard shipping on all orders over $500.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Returns</h3>
                <p className="text-sm text-gray-500">Easy returns within 14 days of delivery.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
