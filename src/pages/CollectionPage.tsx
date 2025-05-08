
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <Layout>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
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
          </div>
          
          <ProductGrid products={filteredProducts} showFilters={true} />
        </div>
      </div>
    </Layout>
  );
};

export default CollectionPage;
