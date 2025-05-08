
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-luxury-purple text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Our Story</h1>
            <p className="text-lg md:text-xl opacity-90">
              Discover the passion and craftsmanship behind Luxe Vogue Boutique.
            </p>
          </div>
        </div>
      </div>

      {/* Brand Vision */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-6">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2018, Luxe Vogue Boutique was born from a passion for exceptional design and
                a desire to make luxury fashion more accessible while never compromising on quality.
              </p>
              <p className="text-gray-600 mb-4">
                Our vision is to create a space where discerning customers can discover pieces that
                transcend seasonal trends—timeless, beautifully crafted items that become the foundation
                of a sophisticated personal style.
              </p>
              <p className="text-gray-600">
                We believe that luxury is in the details: the perfect cut, exceptional materials, and
                impeccable craftsmanship. Every item in our collection is carefully selected to meet
                our exacting standards.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Fashion showcase"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-gold w-32 h-32 -z-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from sourcing our collections to providing exemplary service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-luxury-purple bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-luxury-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality. Each piece in our collection meets the highest standards
                of craftsmanship and materials.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-luxury-purple bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-luxury-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to reducing our environmental impact through responsible sourcing,
                ethical production, and transparent practices.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-luxury-purple bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-luxury-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We strive to create an exceptional shopping experience
                with personalized service and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind Luxe Vogue Boutique who curate our collections and provide exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 relative">
                <div className="aspect-square rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl font-playfair font-bold">Emma Thompson</h3>
              <p className="text-luxury-purple font-medium mb-2">Founder & Creative Director</p>
              <p className="text-gray-600">
                With over 15 years in luxury fashion, Emma's vision and impeccable taste drive our brand's aesthetic.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative">
                <div className="aspect-square rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl font-playfair font-bold">Marcus Chen</h3>
              <p className="text-luxury-purple font-medium mb-2">Head of Curation</p>
              <p className="text-gray-600">
                Marcus travels the world to discover emerging designers and source the finest materials for our collections.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative">
                <div className="aspect-square rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl font-playfair font-bold">Sophia Patel</h3>
              <p className="text-luxury-purple font-medium mb-2">Customer Experience Director</p>
              <p className="text-gray-600">
                Sophia ensures that every interaction with Luxe Vogue Boutique exceeds your expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6">Join Us on This Journey</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Experience the world of Luxe Vogue Boutique—where timeless elegance meets contemporary luxury.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/collections" className="bg-gold hover:bg-gold-light text-gray-900 font-medium px-6 py-3 rounded-md transition-colors duration-200">
              Explore Collections
            </a>
            <a href="/contact" className="border border-white hover:bg-white hover:text-gray-900 font-medium px-6 py-3 rounded-md transition-colors duration-200">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
