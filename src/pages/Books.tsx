import React, { Suspense } from 'react';
import { BooksHub } from '@/components/Books/BooksHub';
import { Header } from '@/components/StudentHub/Header';
import { FooterSection } from '@/components/StudentHub/FooterSection';
import EnhancedStarsBackground from '@/components/StudentHub/EnhancedStarsBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Library, BookOpen, Star } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { ParallaxContainer } from '@/components/ui/parallax-scroll';

// Advanced loading screen for Books page
const BooksLoadingScreen = () => (
  <motion.div 
    className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background-secondary to-background flex items-center justify-center"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2, ease: "easeInOut" }}
  >
    <div className="text-center space-y-8 relative">
      {/* Enhanced multi-layer loading animation */}
      <div className="relative w-32 h-32 mx-auto">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border-4 border-accent/40 border-t-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-6 rounded-full border-4 border-secondary/60 border-r-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-9 rounded-full border-2 border-primary/80 border-b-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-12 flex items-center justify-center"
          animate={{ 
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Library className="w-10 h-10 text-primary" />
        </motion.div>
        
        {/* Floating books animation */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6"
            style={{
              left: `${50 + 30 * Math.cos((i * 60 * Math.PI) / 180)}%`,
              top: `${50 + 30 * Math.sin((i * 60 * Math.PI) / 180)}%`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <BookOpen className="w-6 h-6 text-secondary" />
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <motion.h2 
          className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent font-space tracking-wider"
          animate={{ 
            backgroundPosition: ["0%", "100%", "0%"],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          DIGITAL LIBRARY
        </motion.h2>
        <motion.p 
          className="text-foreground-secondary mt-6 text-xl font-inter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Curating your academic universe...
        </motion.p>
        
        {/* Enhanced progress indicators */}
        <motion.div 
          className="w-80 h-2 bg-muted rounded-full mx-auto mt-8 overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Loading stats */}
        <motion.div
          className="flex justify-center gap-8 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { label: "Books", count: "10,000+" },
            { label: "Categories", count: "50+" },
            { label: "Downloads", count: "1M+" }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <div className="text-2xl font-bold text-primary">{stat.count}</div>
              <div className="text-sm text-foreground-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

const Books = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Initialize smooth scroll
  useSmoothScroll();

  React.useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Simulate loading time for smooth experience
    const timer = setTimeout(() => setIsLoading(false), 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <BooksLoadingScreen />}
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
          {/* Advanced gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-secondary/8" />
          <div className="absolute inset-0 bg-gradient-to-tl from-accent/5 via-transparent to-primary/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/3 to-transparent" />
          
          {/* Enhanced grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px), 
                linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px"
            }}
          />
          
          {/* Floating elements */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            />
          ))}
        </div>

        <ParallaxContainer className="relative z-10">
          {/* Enhanced content with smooth animations */}
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-12 w-12 text-primary" />
              </motion.div>
            </div>
          }>
            <BooksHub />
          </Suspense>
        </ParallaxContainer>
      </motion.div>
    </>
  );
};

export default Books;