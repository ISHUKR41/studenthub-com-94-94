import React, { useEffect, useRef, Suspense } from 'react';
import { Header } from './Header';
import { Enhanced3DHeroSection } from '@/components/Enhanced3DHeroSection';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import EnhancedStarsBackground from './EnhancedStarsBackground';
import ModernHeroSection from './ModernHeroSection';
import ModernTechShowcase from './ModernTechShowcase';
import ImmersiveStatsSection from './ImmersiveStatsSection';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, Zap, Rocket, Star, Cpu, BookOpen, Users, Trophy, TrendingUp, Globe, Smartphone } from 'lucide-react';
import { LiveExamNotifications } from './LiveExamNotifications';
import { QuestionBankShowcase } from './QuestionBankShowcase';
import { StatsCounter } from './StatsCounter';
import { Interactive3DLearning } from './Interactive3DLearning';
import { AIPersonalizationShowcase } from './AIPersonalizationShowcase';
import { InteractiveStatsSection } from './InteractiveStatsSection';
import { FeaturesGrid } from './FeaturesGrid';
import { StudyToolsShowcase } from './StudyToolsShowcase';

import { CategoryCarousel } from './CategoryCarousel';
import { UniversityPartnerships } from './UniversityPartnerships';
import { GlobalCommunitySection } from './GlobalCommunitySection';
import { FutureTechSection } from './FutureTechSection';
import { HowItWorks } from './HowItWorks';
import { MobileAppSection } from './MobileAppSection';
import { TrendingDownloads } from './TrendingDownloads';
import { AchievementsSection } from './AchievementsSection';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { PricingSection } from './PricingSection';
import { FAQSection } from './FAQSection';
import { FooterSection } from './FooterSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

import UltimateExperienceShowcase from './UltimateExperienceShowcase';
import AdvancedTechnologyShowcase from './AdvancedTechnologyShowcase';
import { EnhancedLiveStatsSection } from './EnhancedLiveStatsSection';
import { ModernTestimonialsShowcase } from './ModernTestimonialsShowcase';
import { ModernLearningDashboard } from './ModernLearningDashboard';

// Optimized animated background stars component
const AnimatedStars = React.memo(() => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Reduced small twinkling stars for better performance */}
      {[...Array(75)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Reduced medium size stars */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`medium-star-${i}`}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Reduced large accent stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`large-star-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: 'transform, opacity',
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
          >
            <Star className="w-3 h-3 text-accent/40" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
});

// Ultra modern loading screen with enhanced animations
const ModernLoadingScreen = () => (
  <motion.div 
    className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background-secondary to-background flex items-center justify-center"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2, ease: "easeInOut" }}
  >
    <div className="text-center space-y-8 relative">
      {/* Loading animation with multiple layers */}
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
          <BookOpen className="w-8 h-8 text-primary" />
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
          STUDENTHUB
        </motion.h2>
        <motion.p 
          className="text-foreground-secondary mt-4 text-lg font-inter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Crafting your digital learning universe...
        </motion.p>
        
        {/* Progress bar */}
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
      
      {/* Loading particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/40 rounded-full"
          style={{
            left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 100}px`,
            top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 100}px`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  </motion.div>
);

// Optimized section wrapper with performance improvements
const SectionWrapper = React.memo(({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
});

export const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize smooth scroll
  useSmoothScroll();

  // Removed heavy scroll transforms for better performance

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Simulate loading time for smooth experience
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <ModernLoadingScreen />}
      </AnimatePresence>

      <motion.div 
        ref={containerRef}
        className="min-h-screen bg-background relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Ultra enhanced background with multiple layers */}
        <EnhancedStarsBackground />
        
        <div className="fixed inset-0 z-0">
          {/* Simplified static gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-secondary/6" />
          <div className="absolute inset-0 bg-gradient-to-tl from-accent/3 via-transparent to-primary/3" />
          
          {/* Static grid pattern for better performance */}
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
          
          {/* Reduced floating elements for better performance */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`geo-${i}`}
              className="absolute"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            >
              {i % 2 === 0 && <div className="w-2 h-2 bg-primary/15 rounded-full" />}
              {i % 2 === 1 && <div className="w-1 h-1 bg-accent/20 rounded-full" />}
            </motion.div>
          ))}
        </div>

        <ParallaxContainer className="relative z-10">
          {/* Header with enhanced animation */}
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
          
          {/* Modern Hero Section */}
          <SectionWrapper delay={0.1}>
            <ModernHeroSection />
          </SectionWrapper>
          
          {/* Enhanced 3D Hero Section */}
          <SectionWrapper delay={0.2}>
            <Enhanced3DHeroSection />
          </SectionWrapper>
          
          {/* Modern section divider */}
          <motion.div 
            className="relative h-32 flex items-center justify-center my-20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-8 h-8 text-primary" />
            </motion.div>
          </motion.div>
          
          {/* Enhanced sections with modern animations */}
          <SectionWrapper delay={0.1}>
            <ParallaxScroll speed={0.2} direction="down">
              <LiveExamNotifications />
            </ParallaxScroll>
          </SectionWrapper>
          
          <SectionWrapper delay={0.2}>
            <ParallaxScroll speed={0.3} direction="up">
              <QuestionBankShowcase />
            </ParallaxScroll>
          </SectionWrapper>
          
          <SectionWrapper delay={0.1}>
            <EnhancedLiveStatsSection />
          </SectionWrapper>
          
          <SectionWrapper delay={0.2}>
            <UltimateExperienceShowcase />
          </SectionWrapper>
          
          <SectionWrapper delay={0.1}>
            <AdvancedTechnologyShowcase />
          </SectionWrapper>
          
          {/* Interactive sections with enhanced effects */}
          <SectionWrapper delay={0.2}>
            <Interactive3DLearning />
          </SectionWrapper>
          
          <SectionWrapper delay={0.1}>
            <ParallaxScroll speed={0.2} direction="down">
              <AIPersonalizationShowcase />
            </ParallaxScroll>
          </SectionWrapper>

          <SectionWrapper delay={0.2}>
            <InteractiveStatsSection />
          </SectionWrapper>

          <SectionWrapper delay={0.1}>
            <FeaturesGrid />
          </SectionWrapper>

          <SectionWrapper delay={0.2}>
            <ModernLearningDashboard />
          </SectionWrapper>
          
          <SectionWrapper delay={0.1}>
            <StudyToolsShowcase />
          </SectionWrapper>
          
          
          <SectionWrapper delay={0.2}>
            <CategoryCarousel />
          </SectionWrapper>

          <SectionWrapper delay={0.1}>
            <ParallaxScroll speed={0.2} direction="down">
              <UniversityPartnerships />
            </ParallaxScroll>
          </SectionWrapper>
          
          <SectionWrapper delay={0.2}>
            <GlobalCommunitySection />
          </SectionWrapper>
          
          <SectionWrapper delay={0.1}>
            <FutureTechSection />
          </SectionWrapper>
          
          <SectionWrapper delay={0.2}>
            <HowItWorks />
          </SectionWrapper>

          <SectionWrapper delay={0.1}>
            <MobileAppSection />
          </SectionWrapper>
          
          <SectionWrapper delay={0.2}>
            <TrendingDownloads />
          </SectionWrapper>

          <SectionWrapper delay={0.1}>
            <AchievementsSection />
          </SectionWrapper>
          
          <SectionWrapper delay={0.2}>
            <ModernTestimonialsShowcase />
          </SectionWrapper>
          
          <SectionWrapper delay={0.1}>
            <PricingSection />
          </SectionWrapper>
          
          <SectionWrapper delay={0.2}>
            <FAQSection />
          </SectionWrapper>
          
          <SectionWrapper delay={0.1}>
            <FooterSection />
          </SectionWrapper>

          {/* Modern scroll indicator */}
          <motion.div 
            className="fixed bottom-8 right-8 z-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="w-6 h-6 text-primary" />
              </motion.div>
            </motion.div>
          </motion.div>
        </ParallaxContainer>
      </motion.div>
    </>
  );
};