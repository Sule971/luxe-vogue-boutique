
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Shirt, ShoppingBag, Tag } from "lucide-react";
import { products } from "@/data/products";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const SearchDialog = ({ open, onClose }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(products);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults(products.slice(0, 5)); // Show first 5 products when no query
      return;
    }

    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleProductSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/collections?category=${category}`);
    onClose();
  };

  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Search Products</DialogTitle>
        </DialogHeader>
        
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search products..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-12"
          />
          
          {searchResults.length === 0 && (
            <CommandEmpty className="py-6 text-center">
              No products found.
            </CommandEmpty>
          )}

          {searchResults.length > 0 && (
            <CommandGroup heading="Products">
              {searchResults.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => handleProductSelect(product.id)}
                  className="flex items-center py-3 cursor-pointer hover:bg-gray-100"
                >
                  <div className="h-12 w-12 rounded overflow-hidden bg-gray-100 mr-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{product.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">${product.price.toLocaleString()}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {uniqueCategories.length > 0 && (
            <CommandGroup heading="Categories">
              {uniqueCategories.map((category) => (
                <CommandItem
                  key={category}
                  onSelect={() => handleCategorySelect(category)}
                  className="flex items-center cursor-pointer hover:bg-gray-100"
                >
                  <Tag className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="capitalize">{category}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
