
import { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Instagram, Facebook, Twitter } from "lucide-react";

const AboutPage = () => {
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
      {/* Hero Section with Parallax */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Luxury Fashion" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto h-full flex flex-col items-center justify-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-2xl text-center">
            Crafting timeless elegance through exceptional design and uncompromising quality
          </p>
          <div className="mt-8">
            <a href="#our-vision" className="inline-block">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </motion.div>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Vision Section with Timeline */}
      <section id="our-vision" className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-8">Our Vision & Journey</h2>
              
              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                {[
                  {
                    year: "2018",
                    title: "The Beginning",
                    description: "Luxe Vogue was founded with a vision to create exceptional designs accessible to discerning customers worldwide."
                  },
                  {
                    year: "2019",
                    title: "First Collection",
                    description: "Our debut collection launched to critical acclaim, establishing our reputation for quality craftsmanship."
                  },
                  {
                    year: "2021",
                    title: "Global Expansion",
                    description: "We expanded our reach to over 20 countries, bringing our vision of refined elegance to customers worldwide."
                  },
                  {
                    year: "2023",
                    title: "Sustainability Focus",
                    description: "We committed to sustainable practices across our supply chain, ensuring our luxury has minimal environmental impact."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.2 }}
                    className="relative pl-8 md:pl-0 md:flex md:items-center md:justify-between"
                  >
                    <div className="absolute left-0 top-1 md:static md:flex-1 md:text-right md:pr-8">
                      <div className="font-playfair text-xl text-luxury-purple font-bold">{item.year}</div>
                    </div>
                    <div className="absolute left-5 top-1 transform -translate-x-1/2 md:static md:flex-none">
                      <div className="h-3 w-3 bg-luxury-purple rounded-full transform md:translate-x-1/2"></div>
                    </div>
                    <div className="md:flex-1 md:pl-8">
                      <h3 className="text-xl font-playfair font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Fashion showcase"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-gold w-32 h-32 -z-10 rounded-lg"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section with Animation */}
      <section className="bg-gray-50 py-20 md:py-32 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto px-4"
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from sourcing our collections to providing exemplary service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "quality",
                title: "Uncompromising Quality",
                description: "We select only the finest materials and work with skilled artisans who share our commitment to exceptional craftsmanship. Every piece is inspected to meet our exacting standards."
              },
              {
                icon: "sustainability",
                title: "Ethical Sustainability",
                description: "Our commitment to the planet means responsible sourcing, ethical production practices, and a focus on reducing our environmental footprint across every aspect of our business."
              },
              {
                icon: "customer",
                title: "Personalized Experience",
                description: "We believe luxury is about more than products—it's about creating memorable experiences. Our dedicated team provides attentive, personalized service to every client."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-sm text-center h-full flex flex-col"
              >
                <div className="w-16 h-16 bg-luxury-purple bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-luxury-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {value.icon === "quality" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>}
                    {value.icon === "sustainability" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>}
                    {value.icon === "customer" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>}
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 flex-grow">{value.description}</p>
                
                <div className="mt-6">
                  <Link to="/collections-showcase" className="text-luxury-purple font-medium hover:underline flex items-center justify-center">
                    <span>See it in our collections</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20 md:py-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto px-4"
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The passionate individuals who curate our collections and ensure we deliver exceptional experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {[
              {
                name: "Emma Thompson",
                role: "Founder & Creative Director",
                bio: "With over 15 years in luxury fashion, Emma's vision and impeccable taste drive our brand's aesthetic.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Marcus Chen",
                role: "Head of Curation",
                bio: "Marcus travels the world to discover emerging designers and source the finest materials for our collections.",
                image: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Sophia Patel",
                role: "Customer Experience Director",
                bio: "Sophia ensures that every interaction with Luxe Vogue Boutique exceeds your expectations.",
                image: "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-6 relative"
                >
                  <div className="aspect-square rounded-full overflow-hidden">
                    <img 
                      src={member.image}
                      alt={`Team Member - ${member.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-gold opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
                <h3 className="text-xl font-playfair font-bold">{member.name}</h3>
                <p className="text-luxury-purple font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-luxury-purple transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-luxury-purple transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-luxury-purple transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Showroom Section */}
      <section className="py-20 md:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">Visit Our Showroom</h2>
              <p className="text-gray-300 mb-8">
                Experience the world of Luxe Vogue in person. Our flagship showroom offers a personalized shopping 
                experience where you can explore our collections in a luxurious setting and receive expert style advice.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-medium text-gold mb-2">New York</h4>
                  <p className="text-gray-300">
                    568 Fifth Avenue<br />
                    New York, NY 10019<br />
                    Tel: +1 (212) 555-1234
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gold mb-2">London</h4>
                  <p className="text-gray-300">
                    42 Bond Street<br />
                    London, W1S 1SR<br />
                    Tel: +44 20 7123 4567
                  </p>
                </div>
              </div>
              
              <Button size="lg" className="bg-gold hover:bg-gold-light text-gray-900 font-medium px-6 py-3 rounded-md transition-colors duration-200">
                Book an Appointment
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Luxe Vogue Showroom" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold w-32 h-32 -z-10 rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-luxury-purple bg-opacity-95 text-white py-16 md:py-24"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">Join Our Community</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for exclusive previews, style inspiration, and special offers.
          </p>
          
          <form className="flex flex-col sm:flex-row justify-center max-w-md mx-auto mb-8">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 w-full sm:w-auto sm:flex-grow rounded-l-md sm:rounded-r-none mb-4 sm:mb-0 focus:outline-none text-gray-800"
            />
            <Button type="submit" className="bg-gold hover:bg-gold-light text-gray-900 font-medium px-6 py-3 rounded-r-md sm:rounded-l-none transition-colors duration-200">
              Subscribe
            </Button>
          </form>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white hover:text-gold transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-gold transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-gold transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default AboutPage;
