import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Download, 
  Star, 
  TrendingUp, 
  Users, 
  Award,
  Search,
  Target,
  Zap,
  Globe,
  Brain,
  Rocket
} from 'lucide-react';

export const Enhanced3DPYQsHero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const heroStats = [
    { icon: BookOpen, value: '50,000+', label: 'Question Papers', trend: '+2,500 monthly' },
    { icon: Users, value: '10M+', label: 'Students Helped', trend: '+500K monthly' },
    { icon: Download, value: '25M+', label: 'Downloads', trend: '+1M monthly' },
    { icon: Award, value: '500+', label: 'Exam Types', trend: '+50 recently' },
    { icon: Star, value: '4.9/5', label: 'Success Rate', trend: '99% satisfaction' },
    { icon: Globe, value: '28+', label: 'Languages', trend: 'Expanding' }
  ];

  const examCategories = [
    { name: 'JEE Main/Advanced', count: '5,000+', color: 'engineering', popular: true },
    { name: 'NEET', count: '3,500+', color: 'medical', popular: true },
    { name: 'CBSE Boards', count: '15,000+', color: 'science', popular: true },
    { name: 'UPSC Civil Services', count: '2,500+', color: 'competitive', popular: false },
    { name: 'SSC CGL/CHSL', count: '4,000+', color: 'competitive', popular: false },
    { name: 'GATE', count: '3,000+', color: 'engineering', popular: false }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
      {/* Simple Background Effects */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
          x: [0, -80, 0],
          y: [0, 80, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, delay: 3 }}
      />

      <div ref={ref} className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-20">
          {/* Left Column - Hero Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Hero Badge */}
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div 
                className="p-3 bg-gradient-primary rounded-xl"
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Brain className="h-8 w-8 text-white" />
              </motion.div>
              <Badge className="bg-gradient-accent text-accent-foreground text-lg px-6 py-3 font-bold">
                INDIA'S #1 PYQ PLATFORM
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="gradient-text block mb-2">
                Master Every Exam
              </span>
              <span className="text-foreground block mb-2">
                with 50,000+
              </span>
              <span className="gradient-text-secondary">
                Previous Year Questions
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-foreground-secondary leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              From JEE to NEET, UPSC to GATE - Access authentic question papers from every major exam. 
              <span className="text-primary font-semibold"> AI-powered insights</span> and 
              <span className="text-secondary font-semibold"> personalized study plans</span> included.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button size="lg" className="btn-hero text-lg px-8 py-4 group">
                <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                Start Free Practice
                <motion.div 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Search className="mr-3 h-6 w-6" />
                Browse Question Bank
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 pt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background flex items-center justify-center">
                      <Star className="h-4 w-4 text-white fill-current" />
                    </div>
                  ))}
                </div>
                <span className="text-foreground-secondary font-medium">
                  Trusted by 10M+ students
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-success">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">98% Success Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Stats & Categories */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Hero Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="glass-intense hover:scale-105 transition-all duration-300 text-center p-4">
                    <CardContent className="p-0">
                      <motion.div 
                        className="flex items-center justify-center mb-2"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <div className="p-2 bg-gradient-primary rounded-lg">
                          <stat.icon className="h-5 w-5 text-white" />
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-2xl font-bold gradient-text mb-1"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {stat.value}
                      </motion.div>
                      
                      <div className="text-sm font-medium text-foreground mb-1">
                        {stat.label}
                      </div>
                      
                      <div className="text-xs text-primary/80">
                        {stat.trend}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Popular Exam Categories */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-2xl font-bold gradient-text mb-6 text-center">
                Popular Exam Categories
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <Card className="glass hover:border-primary/30 transition-all duration-300 p-4 group cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {category.name}
                            </h4>
                            {category.popular && (
                              <Badge className="bg-gradient-secondary text-secondary-foreground text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground-secondary">
                            {category.count} papers available
                          </p>
                        </div>
                        
                        <motion.div
                          className={`w-3 h-3 rounded-full bg-${category.color}`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div 
          className="flex flex-col items-center gap-2 text-foreground-secondary"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-foreground-secondary rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};