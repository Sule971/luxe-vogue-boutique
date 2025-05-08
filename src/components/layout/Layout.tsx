
import { ReactNode, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { pathname } = useLocation();

  // Reset scroll and animation state on route change
  useEffect(() => {
    // Smooth scroll to top when route changes
    window.scrollTo({
      top: 0, 
      behavior: "smooth"
    });

    // Reset loaded state to trigger fade-in animation
    setIsLoaded(false);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Initial page load animation
  useEffect(() => {
    // Set loaded state after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
