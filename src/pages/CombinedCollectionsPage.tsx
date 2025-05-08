
import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { products, collections, categories } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

const CombinedCollectionsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  
  // State for filtering and search
  const [activeGender, setActiveGender] = useState("all");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  
  // State for animations and effects
  const [selectedCollection, setSelectedCollection] = useState(collections[0]);
  const titleRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Filter products based on active filters
  const filteredProducts = products.filter(product => {
    // Filter by gender
    if (activeGender !== "all" && product.gender !== activeGender && product.gender !== "unisex") {
      return false;
    }
    
    // Filter by category
    if (activeCategory !== "all" && product.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    return true;
  });
  
  // Get available categories for the current gender filter
  const availableCategories = ["all", ...Array.from(new Set(
    products
      .filter(p => activeGender === "all" || p.gender === activeGender || p.gender === "unisex")
      .map(p => p.category)
  ))];
  
  // Reset scroll position when changing tab
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update collection info when gender changes
    if (activeGender !== "all") {
      const genderCollection = collections.find(c => c.gender === activeGender);
      if (genderCollection) {
        setSelectedCollection(genderCollection);
      }
    } else {
      setSelectedCollection(collections[0]); // Default to first collection
    }
  }, [activeGender]);
  
  // Apply initial category filter if present in URL
  useEffect(() => {
    if (initialCategory && initialCategory !== "all") {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);
  
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Animation variants
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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div 
          style={{ y: parallaxY }}
          className="absolute inset-0"
        >
          <img 
            src={selectedCollection.image}
            alt={selectedCollection.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </motion.div>
        
        <motion.div
          ref={titleRef}
          style={{ opacity: opacityTransform }}
          className="relative container mx-auto h-full flex flex-col items-center justify-center text-white px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-center"
          >
            {activeGender === "all" ? "Our Collections" : `${activeGender.charAt(0).toUpperCase() + activeGender.slice(1)}'s Collection`}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-2xl text-center"
          >
            {activeGender === "all" 
              ? "Discover our curated selection of timeless elegance and contemporary luxury" 
              : selectedCollection.description}
          </motion.p>
        </motion.div>
      </section>
      
      {/* Tabs and Filters Section */}
      <section className="bg-white py-8 sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Tabs 
              value={activeGender} 
              onValueChange={setActiveGender}
              className="w-full md:w-auto"
            >
              <TabsList className="grid w-full grid-cols-3 mb-4 md:mb-0">
                <TabsTrigger value="all" className="font-medium">All</TabsTrigger>
                <TabsTrigger value="women" className="font-medium">Women</TabsTrigger>
                <TabsTrigger value="men" className="font-medium">Men</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-60">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search collections..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-purple focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setIsFilterDialogOpen(true)}
                className="flex items-center"
              >
                <Filter className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Active Filters */}
      {(activeCategory !== "all" || priceRange[0] > 0 || priceRange[1] < maxPrice || searchQuery) && (
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              
              {activeCategory !== "all" && (
                <Badge variant="outline" className="bg-white">
                  Category: {activeCategory}
                  <button 
                    onClick={() => setActiveCategory("all")} 
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    &times;
                  </button>
                </Badge>
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="outline" className="bg-white">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <button 
                    onClick={() => setPriceRange([0, maxPrice])} 
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    &times;
                  </button>
                </Badge>
              )}
              
              {searchQuery && (
                <Badge variant="outline" className="bg-white">
                  Search: {searchQuery}
                  <button 
                    onClick={() => setSearchQuery("")} 
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    &times;
                  </button>
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setActiveCategory("all");
                  setPriceRange([0, maxPrice]);
                  setSearchQuery("");
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all filters
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Category Selection */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {availableCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={`mb-2 capitalize ${
                  activeCategory === category 
                    ? "bg-luxury-purple hover:bg-luxury-purple-light" 
                    : "text-gray-700 hover:text-luxury-purple"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-12 text-center">
                <p className="text-gray-500 mb-4">Showing {filteredProducts.length} products</p>
                <Button className="bg-luxury-purple hover:bg-luxury-purple-light">
                  Load More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setActiveCategory("all");
                    setPriceRange([0, maxPrice]);
                    setSearchQuery("");
                  }}
                >
                  Reset All Filters
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </section>
      
      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Products</DialogTitle>
            <DialogDescription>
              Refine your search with these filters
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-6">
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                {availableCategories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    className={`capitalize ${
                      activeCategory === category 
                        ? "bg-luxury-purple hover:bg-luxury-purple-light" 
                        : ""
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </h4>
              <Slider
                defaultValue={priceRange}
                max={maxPrice}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveCategory("all");
                setPriceRange([0, maxPrice]);
              }}
              className="mr-2"
            >
              Reset
            </Button>
            <DialogClose asChild>
              <Button className="bg-luxury-purple hover:bg-luxury-purple-light">
                Apply Filters
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Featured Collections */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Featured Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-80 rounded-lg overflow-hidden shadow-md"
              >
                <img 
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-playfair font-bold mb-2">{collection.name}</h3>
                  <p className="mb-4 opacity-90 line-clamp-2">{collection.description}</p>
                  <Button 
                    onClick={() => {
                      setActiveGender(collection.gender);
                      window.scrollTo(0, 0);
                    }}
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900 transition-colors w-full md:w-auto"
                  >
                    Explore Collection
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-luxury-purple text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
              Stay Updated with Our Latest Collections
            </h2>
            <p className="mb-6 text-white/80">
              Subscribe to our newsletter for exclusive previews, style inspiration, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <Button className="bg-gold hover:bg-gold-light text-gray-900">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CombinedCollectionsPage;
