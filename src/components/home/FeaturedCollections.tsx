
import { Link } from "react-router-dom";
import { Collection } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface FeaturedCollectionsProps {
  collections: Collection[];
}

const FeaturedCollections = ({ collections }: FeaturedCollectionsProps) => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Discover Our Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections designed for those who appreciate refined craftsmanship and timeless style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.slice(0, 2).map((collection) => (
            <div key={collection.id} className="group relative overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-[3/2] overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity group-hover:bg-opacity-20"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-2">{collection.name}</h3>
                  <p className="mb-4 max-w-md opacity-90">{collection.description}</p>
                  <Link to={`/collections/${collection.gender}`}>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black btn-hover-effect">
                      Explore Collection <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/collections">
            <Button variant="outline" className="bg-transparent border-luxury-purple text-luxury-purple hover:bg-luxury-purple hover:text-white btn-hover-effect">
              View All Collections <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;
