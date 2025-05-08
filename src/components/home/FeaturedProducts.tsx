
import { Product } from "@/types";
import ProductGrid from "../products/ProductGrid";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  // Get featured products or fallback to first 4 if none are marked as featured
  const featuredProducts = products.filter(p => p.featured) || products.slice(0, 4);

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most coveted pieces, handpicked for their exceptional design and craftsmanship.
          </p>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </div>
    </div>
  );
};

export default FeaturedProducts;
