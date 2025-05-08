
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, PackageCheck } from "lucide-react";

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-16"
      >
        <motion.div 
          variants={itemVariants} 
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-playfair font-bold mb-4"
          >
            Thank You for Your Order!
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="text-xl text-gray-600 mb-6"
          >
            Your order has been placed successfully.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="bg-gray-50 rounded-lg p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
              <div>
                <div className="text-sm text-gray-500">Order Number</div>
                <div className="font-bold text-lg">{orderId}</div>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="text-sm text-gray-500">Estimated Delivery</div>
                <div className="font-bold text-lg">
                  {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 mb-8"
          >
            We have sent you an email with your order confirmation and M-Pesa payment instructions. 
            Once your payment is completed, we'll begin processing your order.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/orders">
              <Button variant="outline" className="border-luxury-purple text-luxury-purple hover:bg-luxury-purple hover:text-white">
                <PackageCheck className="mr-2 h-5 w-5" />
                Track Your Order
              </Button>
            </Link>
            <Link to="/">
              <Button className="bg-luxury-purple hover:bg-luxury-purple-light btn-hover-effect">
                Continue Shopping <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default OrderConfirmationPage;
