
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { products } from "@/data/products";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API or localStorage
    // For demo purposes, we'll just use some random products
    setTimeout(() => {
      const randomProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setWishlistItems(randomProducts);
      setIsLoading(false);
    }, 500);

    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">My Wishlist</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Save your favorite items to revisit later or share with friends and family.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-200"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : wishlistItems.length > 0 ? (
          <>
            <ProductGrid products={wishlistItems} />
          </>
        ) : (
          <Card className="max-w-md mx-auto animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="font-playfair">Your Wishlist is Empty</CardTitle>
              <CardDescription>
                Discover and save your favorite pieces for later.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Heart className="h-16 w-16 text-gray-300" />
              <p className="text-gray-500 text-center">
                Items you add to your wishlist will appear here.
              </p>
              <Link to="/collections">
                <Button className="bg-luxury-purple hover:bg-luxury-purple-light btn-hover-effect">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Collections
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
