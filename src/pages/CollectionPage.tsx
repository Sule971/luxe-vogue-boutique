
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { products, collections } from "@/data/products";

const CollectionPage = () => {
  const { gender } = useParams<{ gender?: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gender]);
  
  // Filter products by gender if provided, otherwise show all
  const filteredProducts = gender 
    ? products.filter((p) => p.gender === gender || p.gender === 'unisex') 
    : products;
  
  // Get the collection info if gender is provided
  const collection = gender 
    ? collections.find((c) => c.gender === gender)
    : null;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100 py-16">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{ 
            visible: { 
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="container mx-auto px-4"
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              {gender 
                ? `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s Collection` 
                : "All Collections"}
            </h1>
            {collection && (
              <p className="text-gray-600 max-w-2xl mx-auto">
                {collection.description}
              </p>
            )}
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <ProductGrid products={filteredProducts} showFilters={true} />
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CollectionPage;
