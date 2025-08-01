import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Text, Sparkles as ThreeSparkles } from '@react-three/drei';
import { BooksHub } from './BooksHub';
import { 
  Library, BookOpen, Download, Star, Heart, Users, TrendingUp, Award,
  Search, Filter, Grid, List, Clock, Eye, Bookmark, Share2, 
  GraduationCap, Zap, Globe, Shield, Trophy, MessageCircle,
  Sparkles, ArrowRight, Play, FileText, Database, Brain,
  Lightbulb, Target, Rocket, Crown, Diamond
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';

// Enhanced 3D Scene for Books
const Enhanced3DBookScene = () => {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} color="#3b82f6" intensity={0.5} />
      
      {/* 3D Floating Books */}
      {Array.from({ length: 12 }, (_, i) => (
        <Float
          key={`book-${i}`}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.4 + Math.random() * 0.6}
          floatIntensity={0.3 + Math.random() * 0.7}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 50,
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 25
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <boxGeometry args={[0.8, 1.2, 0.15]} />
            <meshStandardMaterial
              color={`hsl(${(i * 30) % 360}, 80%, 65%)`}
              transparent
              opacity={0.6}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Floating Text Elements */}
      {['KNOWLEDGE', 'WISDOM', 'LEARNING', 'GROWTH'].map((text, i) => (
        <Float
          key={text}
          speed={0.5}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <Text
            position={[
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20
            ]}
            fontSize={2}
            color="#3b82f6"
            anchorX="center"
            anchorY="middle"
          >
            {text}
          </Text>
        </Float>
      ))}
      
      {/* Sparkles Effect */}
      <ThreeSparkles
        count={80}
        scale={15}
        size={3}
        speed={0.6}
        opacity={0.8}
        color="#3b82f6"
      />
    </>
  );
};

// Book Categories Data
const BOOK_CATEGORIES = [
  { name: 'Academic Textbooks', icon: GraduationCap, color: 'from-blue-500 to-cyan-500', count: '2,500+' },
  { name: 'Entrance Exam Prep', icon: Trophy, color: 'from-yellow-500 to-orange-500', count: '1,800+' },
  { name: 'Research Papers', icon: FileText, color: 'from-green-500 to-emerald-500', count: '5,000+' },
  { name: 'Reference Materials', icon: Database, color: 'from-purple-500 to-indigo-500', count: '3,200+' },
  { name: 'Study Guides', icon: Brain, color: 'from-pink-500 to-rose-500', count: '1,200+' },
  { name: 'Practice Sets', icon: Target, color: 'from-indigo-500 to-blue-500', count: '800+' },
  { name: 'Digital Resources', icon: Zap, color: 'from-cyan-500 to-teal-500', count: '2,000+' },
  { name: 'Career Guidance', icon: Lightbulb, color: 'from-emerald-500 to-green-500', count: '600+' }
];

// Featured Books Data
const FEATURED_BOOKS = [
  {
    id: 1,
    title: "Advanced Mathematics for Engineers",
    author: "Dr. Rajesh Kumar",
    rating: 4.8,
    downloads: 15420,
    category: "Engineering",
    cover: "📘",
    price: "Free",
    description: "Comprehensive guide covering calculus, linear algebra, and differential equations."
  },
  {
    id: 2,
    title: "Medical Entrance Mastery",
    author: "Dr. Priya Sharma",
    rating: 4.9,
    downloads: 12350,
    category: "Medical",
    cover: "📗",
    price: "₹299",
    description: "Complete preparation guide for NEET and other medical entrance exams."
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    author: "Prof. Amit Singh",
    rating: 4.7,
    downloads: 18750,
    category: "Computer Science",
    cover: "📙",
    price: "Free",
    description: "Master DSA concepts with practical examples and coding challenges."
  }
];

// Section wrapper component
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

export const Enhanced3DBookLibraryHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <ParallaxContainer className="relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Canvas camera={{ position: [0, 0, 20], fov: 75 }} className="opacity-40">
          <Enhanced3DBookScene />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
        
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/85 to-secondary/10" />
        <div className="absolute inset-0 bg-gradient-to-tl from-accent/5 via-transparent to-primary/5" />
      </motion.div>

      {/* Hero Section */}
      <SectionWrapper delay={0.1} className="relative z-10">
        <motion.div 
          className="container mx-auto px-4 py-32 text-center"
          style={{ scale: headerScale }}
        >
          {/* Premium badge */}
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-full px-8 py-4 mb-8"
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              boxShadow: [
                '0 0 20px rgba(59, 130, 246, 0.3)',
                '0 0 40px rgba(59, 130, 246, 0.5)',
                '0 0 20px rgba(59, 130, 246, 0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Crown className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold text-lg">Premium Digital Library</span>
            <Diamond className="w-6 h-6 text-secondary" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-7xl md:text-9xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8 font-space"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            BOOK UNIVERSE
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-foreground-secondary max-w-4xl mx-auto mb-16 leading-relaxed font-inter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Explore millions of academic resources, research papers, and digital textbooks in our comprehensive educational library
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="btn-hero text-xl px-12 py-4">
                <BookOpen className="w-6 h-6 mr-3" />
                Explore Library
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="text-xl px-12 py-4 glass">
                <Play className="w-6 h-6 mr-3" />
                Virtual Tour
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {[
              { icon: Library, label: "Total Books", value: "50,000+", color: "text-blue-500" },
              { icon: Download, label: "Downloads", value: "2.5M+", color: "text-green-500" },
              { icon: Star, label: "Avg Rating", value: "4.8", color: "text-yellow-500" },
              { icon: Users, label: "Active Users", value: "100K+", color: "text-purple-500" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass p-8 rounded-2xl hover:bg-primary/5 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-4`} />
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-foreground-secondary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* Advanced Search Section */}
      <SectionWrapper delay={0.2} className="relative z-10">
        <ParallaxScroll speed={0.2} direction="up">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Search header */}
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-foreground mb-6 flex items-center justify-center gap-4">
                  <Search className="w-12 h-12 text-primary" />
                  Smart Search
                </h2>
                <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
                  Find exactly what you need with our AI-powered search and advanced filtering system
                </p>
              </div>

              <div className="glass p-8 rounded-3xl space-y-8">
                {/* Main search bar */}
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-foreground-secondary" />
                  <motion.input
                    type="text"
                    placeholder="Search by title, author, subject, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-6 bg-background/50 border-2 border-border/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-lg"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <Button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    size="lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    AI Search
                  </Button>
                </div>

                {/* Quick filters */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {['Free Books', 'Premium Content', 'Latest Uploads', 'Trending', 'Bestsellers'].map((filter) => (
                    <motion.button
                      key={filter}
                      className="px-6 py-3 bg-background-secondary/50 hover:bg-primary/10 border border-border/30 rounded-xl transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {filter}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </ParallaxScroll>
      </SectionWrapper>

      {/* Categories Grid */}
      <SectionWrapper delay={0.1} className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-foreground mb-6 flex items-center justify-center gap-4">
              <Grid className="w-12 h-12 text-primary" />
              Browse Categories
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Discover books organized by subjects and academic disciplines
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {BOOK_CATEGORIES.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={category.name}
                  className="group relative overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Card className="glass border-2 border-border/30 hover:border-primary/50 transition-all duration-500 h-full">
                    <CardContent className="p-8 text-center space-y-4">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto`}
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-foreground-secondary">
                        {category.count} resources
                      </p>
                      
                      <Button variant="ghost" className="w-full">
                        Explore
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Featured Books Section */}
      <SectionWrapper delay={0.2} className="relative z-10">
        <ParallaxScroll speed={0.3} direction="down">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-foreground mb-6 flex items-center justify-center gap-4">
                <Award className="w-12 h-12 text-primary" />
                Featured Books
              </h2>
              <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
                Handpicked collection of the most popular and highly-rated educational resources
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
            >
              {FEATURED_BOOKS.map((book, index) => (
                <motion.div
                  key={book.id}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.03, y: -10 }}
                >
                  <Card className="glass border-2 border-border/30 hover:border-primary/50 transition-all duration-500 overflow-hidden">
                    <CardContent className="p-8 space-y-6">
                      {/* Book cover and rating */}
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="text-6xl"
                          animate={{ rotateY: [0, 15, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {book.cover}
                        </motion.div>
                        <div className="flex-1">
                          <Badge className="mb-2">{book.category}</Badge>
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{book.rating}</span>
                            <span className="text-foreground-secondary">({book.downloads} downloads)</span>
                          </div>
                        </div>
                      </div>

                      {/* Book details */}
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-foreground-secondary mb-1">by {book.author}</p>
                        <p className="text-sm text-foreground-secondary leading-relaxed">
                          {book.description}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/30">
                        <span className="text-lg font-bold text-primary">{book.price}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Get Book
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ParallaxScroll>
      </SectionWrapper>

      {/* Main BooksHub Content */}
      <SectionWrapper delay={0.1} className="relative z-10">
        <BooksHub />
      </SectionWrapper>

      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button 
          className="w-16 h-16 rounded-full bg-gradient-primary backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-glow"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white text-2xl font-bold"
          >
            ↑
          </motion.div>
        </motion.button>
      </motion.div>
    </ParallaxContainer>
  );
};