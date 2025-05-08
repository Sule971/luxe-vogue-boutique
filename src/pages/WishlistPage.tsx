
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion } from "framer-motion";

const WishlistPage = () => {
  const { wishlistItems } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-12"
      >
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">My Wishlist</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Save your favorite items to revisit later or share with friends and family.
          </p>
        </motion.div>

        {wishlistItems.length > 0 ? (
          <motion.div variants={itemVariants}>
            <ProductGrid products={wishlistItems} />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="font-playfair">Your Wishlist is Empty</CardTitle>
                <CardDescription>
                  Discover and save your favorite pieces for later.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                >
                  <Heart className="h-16 w-16 text-gray-300" />
                </motion.div>
                <p className="text-gray-500 text-center">
                  Items you add to your wishlist will appear here.
                </p>
                <Link to="/collections-showcase">
                  <Button className="bg-luxury-purple hover:bg-luxury-purple-light btn-hover-effect">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Browse Collections
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default WishlistPage;
