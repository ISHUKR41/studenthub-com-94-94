import React, { Suspense } from 'react';
import { UltraModern3DNewsHub } from '@/components/News/UltraModern3DNewsHub';
import { NewsProvider } from '@/contexts/NewsContext';
import { Header } from '@/components/StudentHub/Header';
import { FooterSection } from '@/components/StudentHub/FooterSection';
import EnhancedStarsBackground from '@/components/StudentHub/EnhancedStarsBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Newspaper } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { ParallaxContainer } from '@/components/ui/parallax-scroll';

// Loading screen for News page
const NewsLoadingScreen = () => (
  <motion.div 
    className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background-secondary to-background flex items-center justify-center"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2, ease: "easeInOut" }}
  >
    <div className="text-center space-y-8 relative">
      <div className="relative w-24 h-24 mx-auto">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-accent/40 border-t-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-secondary/60 border-r-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-6 flex items-center justify-center"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Newspaper className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent font-space tracking-wider"
          animate={{ 
            backgroundPosition: ["0%", "100%", "0%"],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          NEWS CENTER
        </motion.h2>
        <motion.p 
          className="text-foreground-secondary mt-4 text-lg font-inter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Loading latest news and updates...
        </motion.p>
        
        <motion.div 
          className="w-64 h-1 bg-muted rounded-full mx-auto mt-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

const News = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Initialize smooth scroll
  useSmoothScroll();

  React.useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Simulate loading time for smooth experience
    const timer = setTimeout(() => setIsLoading(false), 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <NewsProvider>
      <AnimatePresence>
        {isLoading && <NewsLoadingScreen />}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen bg-background relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Enhanced background */}
        <EnhancedStarsBackground />
        
        <div className="fixed inset-0 z-0">
          {/* Gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-secondary/6" />
          <div className="absolute inset-0 bg-gradient-to-tl from-accent/3 via-transparent to-primary/3" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), 
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px"
            }}
          />
        </div>

        <ParallaxContainer className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Header />
          </motion.div>
          
          {/* Dynamic spacing */}
          <motion.div 
            className="h-20 sm:h-24 lg:h-32"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {/* News Content */}
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }>
            <UltraModern3DNewsHub />
          </Suspense>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FooterSection />
          </motion.div>
        </ParallaxContainer>
      </motion.div>
    </NewsProvider>
  );
};

export default News;