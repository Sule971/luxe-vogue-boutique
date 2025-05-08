
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [api, setApi] = useState<UseEmblaCarouselType[1] | null>(null);

  const slides = [
    {
      id: 1,
      title: "Elevate Your Style",
      subtitle: "Discover our new luxury collection",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      cta: "Shop Women",
      link: "/collections/women",
    },
    {
      id: 2,
      title: "Refined Elegance",
      subtitle: "Tailored perfection for the modern gentleman",
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      cta: "Shop Men",
      link: "/collections/men",
    },
    {
      id: 3,
      title: "Exclusive Accessories",
      subtitle: "Complete your look with statement pieces",
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      cta: "Shop Accessories",
      link: "/collections",
    },
  ];

  useEffect(() => {
    // Set loaded state after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Update current index when the carousel slides change
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };
    
    api.on('select', onSelect);
    
    // Call once to set initial index
    onSelect();
    
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className="relative">
      <Carousel 
        className="w-full" 
        opts={{ loop: true }} 
        setApi={setApi}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="relative">
              <div className="relative h-[70vh] w-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    isLoaded ? "scale-100" : "scale-110"
                  }`}
                  onError={(e) => {
                    // Fallback for image loading errors
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"; 
                    console.log("Image failed to load, using fallback:", target.src);
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <div className={`transition-all duration-700 ${
                    currentIndex === index && isLoaded 
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-10 opacity-0"
                  }`}>
                    <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-8 max-w-xl mx-auto">
                      {slide.subtitle}
                    </p>
                    <Link to={slide.link}>
                      <Button 
                        size="lg" 
                        className="bg-luxury-purple hover:bg-luxury-purple-light btn-hover-effect transform transition-transform duration-300 hover:scale-105"
                      >
                        {slide.cta} <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-4 z-10 flex space-x-2">
          <CarouselPrevious className="relative border-white text-white hover:bg-white hover:text-black border opacity-80 hover:opacity-100 transition-opacity" />
          <CarouselNext className="relative border-white text-white hover:bg-white hover:text-black border opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      </Carousel>

      {/* Luxury indicators with staggered animation */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          {
            icon: "check",
            title: "Authentic Luxury",
            delay: "100ms"
          },
          {
            icon: "globe",
            title: "Global Shipping",
            delay: "200ms"
          },
          {
            icon: "shopping-bag",
            title: "Exclusive Collection",
            delay: "300ms"
          },
          {
            icon: "clock",
            title: "24/7 Support",
            delay: "400ms"
          }
        ].map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center transform transition-all duration-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`} 
            style={{ transitionDelay: item.delay }}
          >
            <div className="w-16 h-16 rounded-full bg-luxury-purple bg-opacity-10 flex items-center justify-center mb-4 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
              <svg className="w-8 h-8 text-luxury-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {item.icon === "check" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>}
                {item.icon === "globe" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>}
                {item.icon === "shopping-bag" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>}
                {item.icon === "clock" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>}
              </svg>
            </div>
            <h3 className="font-playfair font-medium">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
