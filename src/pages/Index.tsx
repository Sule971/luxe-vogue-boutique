
import { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import { products, collections } from "@/data/products";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Layout>
      <Hero />
      <FeaturedProducts products={products} />
      <FeaturedCollections collections={collections} />
      
      {/* Newsletter / CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 bg-luxury-purple text-white"
      >
        <motion.div variants={fadeIn} className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Join Our Exclusive Circle
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to receive early access to new arrivals, exclusive offers, and fashion insights.
          </p>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-3 border-0 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button className="bg-gold hover:bg-gold-light text-gray-900 font-medium px-6 py-3 rounded-r-md transition-colors duration-200 btn-hover-effect">
              Subscribe
            </button>
          </div>
        </motion.div>
      </motion.section>
      
      {/* Brand Story Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                The Luxe Vogue Experience
              </h2>
              <p className="text-gray-600 mb-6">
                At Luxe Vogue, we believe that luxury is more than just a label—it's an experience.
                Our curated collections bring together the world's most coveted designs and materials,
                creating pieces that transcend seasonal trends and become timeless staples in your wardrobe.
              </p>
              <p className="text-gray-600">
                Each item is selected for its exceptional craftsmanship, innovative design, and ability
                to make you feel extraordinary. We're dedicated to providing not just products, but a
                gateway to the lifestyle you aspire to.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeIn}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581497396202-5645e76a3a8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Luxury fashion display" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-2/3 h-2/3 rounded-lg overflow-hidden border-8 border-white shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1589156288859-f0d720d3f731?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80" 
                  alt="Fashion detail" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Index;
