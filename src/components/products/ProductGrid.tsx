
import { useState } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface ProductGridProps {
  products: Product[];
  title?: string;
  showFilters?: boolean;
}

const ProductGrid = ({ products, title, showFilters = false }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState("featured");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = products
    .filter(product => categoryFilter === "all" || product.category === categoryFilter)
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    // Default to featured
    return a.featured ? -1 : b.featured ? 1 : 0;
  });

  const maxPriceInRange = Math.max(...products.map(p => p.price));
  
  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <h2 className="text-3xl font-playfair font-bold text-center mb-6">{title}</h2>
      )}
      
      {showFilters && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                defaultValue={[0, maxPriceInRange]}
                max={maxPriceInRange}
                step={100}
                onValueChange={setPriceRange}
                className="py-4"
              />
            </div>
            
            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
