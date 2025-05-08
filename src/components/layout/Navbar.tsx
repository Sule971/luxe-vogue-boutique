
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X,
  Heart 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import SearchDialog from "../SearchDialog";

const Navbar = () => {
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-playfair font-bold bg-clip-text text-transparent bg-luxury-gradient">
                LUXE VOGUE
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-luxury-purple transition-colors hover-underline">
              Home
            </Link>
            <Link to="/collections-showcase" className="font-medium text-gray-700 hover:text-luxury-purple transition-colors hover-underline">
              Collections
            </Link>
            <Link to="/about" className="font-medium text-gray-700 hover:text-luxury-purple transition-colors hover-underline">
              About
            </Link>
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(true)} 
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>
            
            <Link to="/wishlist" className="p-2 rounded-full hover:bg-gray-100 relative">
              <Heart className="h-5 w-5 text-gray-700" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 relative">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-2 rounded-full hover:bg-gray-100" aria-label="User menu">
                    <User className="h-5 w-5 text-gray-700" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="w-full cursor-pointer">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-luxury-purple"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-slide-in-right">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-luxury-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link to="/collections-showcase" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-luxury-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-luxury-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-3">
                  {user ? (
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                  ) : (
                    <Link to="/login" 
                      className="text-base font-medium text-gray-800 hover:text-luxury-purple"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <button onClick={() => {
                    setIsMenuOpen(false);
                    setIsSearchOpen(true);
                  }} className="flex text-gray-400 hover:text-gray-600 focus:outline-none">
                    <Search className="h-6 w-6" />
                  </button>
                  <Link to="/wishlist" className="flex text-gray-400 hover:text-gray-600 focus:outline-none relative" onClick={() => setIsMenuOpen(false)}>
                    <Heart className="h-6 w-6" />
                    {wishlistItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-luxury-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistItems}
                      </span>
                    )}
                  </Link>
                  <Link to="/cart" className="relative flex text-gray-400 hover:text-gray-600 focus:outline-none" onClick={() => setIsMenuOpen(false)}>
                    <ShoppingCart className="h-6 w-6" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-luxury-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
              {user && (
                <div className="mt-3 px-2 space-y-1">
                  <Link to="/profile" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-luxury-purple hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link to="/orders" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-luxury-purple hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-luxury-purple hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Navbar;
