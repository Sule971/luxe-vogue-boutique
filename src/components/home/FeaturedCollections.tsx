
import { Link } from "react-router-dom";
import { Collection } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface FeaturedCollectionsProps {
  collections: Collection[];
}

const FeaturedCollections = ({ collections }: FeaturedCollectionsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 animate-fade-in">
            Discover Our Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            Explore our curated collections designed for those who appreciate refined craftsmanship and timeless style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.slice(0, 2).map((collection, index) => (
            <div 
              key={collection.id} 
              className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${200 + index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158";
                  }}
                />
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                  hoveredIndex === index ? 'bg-opacity-20' : 'bg-opacity-30'
                }`}></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className={`text-2xl md:text-3xl font-playfair font-bold mb-2 transition-transform duration-300 ${
                    hoveredIndex === index ? 'translate-y-0' : 'translate-y-1'
                  }`}>{collection.name}</h3>
                  <p className={`mb-4 max-w-md opacity-90 transition-all duration-300 ${
                    hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
                  }`}>{collection.description}</p>
                  <Link to={`/collections/${collection.gender}`}>
                    <Button 
                      variant="outline" 
                      className={`border-white text-white hover:bg-white hover:text-black btn-hover-effect transition-all duration-300 ${
                        hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'
                      }`}
                    >
                      Explore Collection <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Link to="/collections">
            <Button 
              variant="outline" 
              className="bg-transparent border-luxury-purple text-luxury-purple hover:bg-luxury-purple hover:text-white btn-hover-effect transition-transform duration-300 hover:scale-105"
            >
              View All Collections <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;
