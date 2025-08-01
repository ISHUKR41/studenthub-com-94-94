import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Sparkles as ThreeSparkles } from '@react-three/drei';
import { Safe3DCanvas } from './Safe3DCanvas';
import { Header } from '../StudentHub/Header';
import { Enhanced3DNewsCard } from './Enhanced3DNewsCard';
import { UltraModern3DNewsViewer } from './UltraModern3DNewsViewer';
import { UltraAdvancedNewsLibrary } from './UltraAdvancedNewsLibrary';
import { EnhancedNewsStatsSection } from './EnhancedNewsStatsSection';
import { EnhancedNewsTrendingSection } from './EnhancedNewsTrendingSection';
import { useNews } from '@/contexts/NewsContext';
import { useNewsAnimation } from '@/hooks/useNewsAnimation';
import { 
  Sparkles, 
  Search, 
  Filter,
  Calendar,
  TrendingUp,
  Zap,
  Globe,
  Trophy,
  GraduationCap,
  Shield,
  Star,
  Briefcase,
  BookOpen,
  Users,
  Newspaper,
  ChevronDown,
  ArrowRight,
  Eye,
  Clock,
  User,
  Heart,
  Share2,
  Bookmark,
  MessageCircle,
  Award,
  Laptop,
  Building
} from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

// Enhanced categories with 12 options
const CATEGORIES = [
  { name: 'All', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  { name: 'Exam Results', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
  { name: 'Admissions', icon: GraduationCap, color: 'from-green-500 to-emerald-500' },
  { name: 'Policy', icon: Shield, color: 'from-purple-500 to-indigo-500' },
  { name: 'Medical Entrance', icon: Star, color: 'from-pink-500 to-rose-500' },
  { name: 'MBA Entrance', icon: Briefcase, color: 'from-indigo-500 to-blue-500' },
  { name: 'Engineering Entrance', icon: Zap, color: 'from-cyan-500 to-teal-500' },
  { name: 'Civil Services', icon: BookOpen, color: 'from-emerald-500 to-green-500' },
  { name: 'Board Exams', icon: Users, color: 'from-orange-500 to-red-500' },
  { name: 'Law Entrance', icon: Newspaper, color: 'from-red-500 to-pink-500' },
  { name: 'Scholarships', icon: Award, color: 'from-amber-500 to-yellow-500' },
  { name: 'Technology', icon: Laptop, color: 'from-teal-500 to-cyan-500' },
  { name: 'Government Jobs', icon: Building, color: 'from-slate-500 to-gray-500' }
];

// Enhanced 3D Background Scene
const NewsBackgroundScene = () => {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} color="#3b82f6" intensity={0.6} />
      
      {/* Safe floating geometric shapes with proper error handling */}
      {Array.from({ length: 8 }, (_, i) => (
        <Float
          key={`shape-${i}`}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.6 + Math.random() * 0.4}
          floatIntensity={0.4 + Math.random() * 0.6}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            {i % 3 === 0 ? (
              <boxGeometry args={[1, 1, 1]} />
            ) : i % 3 === 1 ? (
              <sphereGeometry args={[0.8, 16, 16]} />
            ) : (
              <cylinderGeometry args={[0.5, 0.5, 1.5, 8]} />
            )}
            <meshStandardMaterial
              color={`hsl(${(i * 45) % 360}, 70%, 60%)`}
              transparent
              opacity={0.4}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Safe sparkles effect */}
      <ThreeSparkles
        count={100}
        scale={20}
        size={2}
        speed={0.4}
        opacity={0.6}
        color="#3b82f6"
      />
    </>
  );
};

export const UltraModern3DNewsHub: React.FC = () => {
  const { news, searchNews, getNewsByCategory } = useNews();
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const { useStaggerAnimation, tiltAnimation } = useNewsAnimation();
  
  // Enhanced spring animations
  const springConfig = { damping: 15, stiffness: 300 };
  const scaleSpring = useSpring(isLoading ? 0.8 : 1, springConfig);
  const opacitySpring = useSpring(isLoading ? 0 : 1, springConfig);
  
  // Enable smooth scrolling
  useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and search news
  const filteredAndSearchedNews = useMemo(() => {
    let filtered = getNewsByCategory(selectedCategory);

    if (searchTerm) {
      filtered = searchNews(searchTerm);
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(newsItem => newsItem.category === selectedCategory);
      }
    }

    return filtered;
  }, [news, selectedCategory, searchTerm, searchNews, getNewsByCategory]);

  // Group news by date (newest first)
  const groupedNewsByDate = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    
    filteredAndSearchedNews.forEach(newsItem => {
      const date = newsItem.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(newsItem);
    });
    
    // Sort dates in descending order (latest first)
    const sortedDates = Object.keys(groups).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    return sortedDates.map(date => ({
      date,
      news: groups[date].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }));
  }, [filteredAndSearchedNews]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        {/* 3D Loading Background */}
        <div className="absolute inset-0">
          <Safe3DCanvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <NewsBackgroundScene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          </Safe3DCanvas>
        </div>
        
        <motion.div
          className="relative z-10 text-center space-y-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="space-y-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Loading News Hub
            </h2>
            <p className="text-foreground-secondary">Preparing latest updates...</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden" ref={containerRef}>
      {/* Enhanced 3D Background with Safe Canvas */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <Safe3DCanvas camera={{ position: [0, 0, 15], fov: 75 }} className="opacity-60">
          <NewsBackgroundScene />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            enableDamping
            dampingFactor={0.05}
          />
        </Safe3DCanvas>
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/80 to-secondary/10" />
        
        {/* Animated floating particles */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, hsl(${(i * 18) % 360}, 70%, 60%), transparent)`,
            }}
            animate={{
              y: [0, -window.innerHeight],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Header */}
      <motion.div style={{ y: headerY }}>
        <Header />
      </motion.div>

      <main className="relative z-10 pt-24">
        {/* Ultra Advanced News Library */}
        <UltraAdvancedNewsLibrary />
        
        {/* Enhanced Hero Section */}
        <motion.section
          className="py-20 px-4 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Safe animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.8, 0],
                  y: [0, -100],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto max-w-7xl text-center relative">
            <motion.div
              className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-sm rounded-full px-8 py-3 mb-8"
              animate={{ 
                scale: [0.95, 1.05, 0.95],
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 40px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-primary font-semibold text-lg">Latest Educational Updates</span>
              <TrendingUp className="w-6 h-6 text-primary" />
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              News Hub
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-foreground-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Stay updated with the latest educational news, exam results, admission notifications, and important announcements
            </motion.p>

            {/* Enhanced Search and Filter Section */}
            <motion.div
              className="max-w-4xl mx-auto space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-foreground-secondary" />
                <motion.input
                  type="text"
                  placeholder="Search news by title, category, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-background-secondary/50 backdrop-blur-sm border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-lg"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {/* Category Filter Toggle */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-background-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-background-secondary/70 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-5 h-5 text-primary" />
                <span className="text-foreground">Categories</span>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-foreground-secondary" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Category Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.section
              className="py-6 px-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="container mx-auto max-w-6xl">
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3"
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
                  animate="visible"
                >
                  {CATEGORIES.map((category, index) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.name;
                    
                    return (
                      <motion.button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`relative group p-4 rounded-xl backdrop-blur-sm border transition-all duration-500 ${
                          isSelected 
                            ? 'bg-primary text-white border-primary shadow-lg scale-105' 
                            : 'bg-background-secondary/50 border-border/50 hover:bg-background-secondary/70 hover:border-primary/30'
                        }`}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ 
                          scale: isSelected ? 1.05 : 1.08,
                          rotateY: 5
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <motion.div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-white/20' : 'bg-primary/10'
                            }`}
                            animate={{ 
                              rotate: isSelected ? [0, 360] : 0 
                            }}
                            transition={{ 
                              duration: isSelected ? 2 : 0, 
                              repeat: isSelected ? Infinity : 0,
                              ease: "linear"
                            }}
                          >
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-primary'}`} />
                          </motion.div>
                          <span className={`text-xs font-medium text-center ${
                            isSelected ? 'text-white' : 'text-foreground'
                          }`}>
                            {category.name}
                          </span>
                        </div>
                        
                        {/* Animated border effect */}
                        {!isSelected && (
                          <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-transparent"
                            style={{
                              background: `linear-gradient(45deg, transparent, ${category.color.split(' ')[1]}, transparent)`,
                              backgroundSize: '400% 400%',
                            }}
                            animate={{
                              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        <motion.section
          className="py-8 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total News', value: news.length, icon: Newspaper },
                { label: 'Categories', value: CATEGORIES.length - 1, icon: Filter },
                { label: 'This Month', value: news.filter(n => new Date(n.date).getMonth() === new Date().getMonth()).length, icon: Calendar },
                { label: 'Breaking News', value: news.filter(n => n.isBreaking).length, icon: Zap }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center p-4 bg-background-secondary/30 backdrop-blur-sm rounded-xl border border-border/30"
                    whileHover={{ scale: 1.05, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-foreground-secondary">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Date-wise News Groups Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="flex items-center justify-between mb-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-3xl font-bold text-foreground">
                    Latest News
                  </h2>
                  <p className="text-foreground-secondary">
                    {filteredAndSearchedNews.length} articles found
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                    {searchTerm && ` matching "${searchTerm}"`}
                  </p>
                </div>
              </div>
            </motion.div>

            {groupedNewsByDate.length > 0 ? (
              <div className="space-y-16">
                {groupedNewsByDate.map((group, groupIndex) => (
                  <motion.div
                    key={group.date}
                    className="space-y-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: groupIndex * 0.2 }}
                  >
                    {/* Date Header with Enhanced Design */}
                    <div className="flex items-center gap-6 mb-10">
                      <motion.div 
                        className="flex items-center gap-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-lg border border-border/30 rounded-2xl px-8 py-4 shadow-lg"
                        whileHover={{ 
                          scale: 1.05, 
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                          y: -2
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <Calendar className="w-6 h-6 text-primary" />
                        </motion.div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-foreground">
                            {new Date(group.date).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit', 
                              year: 'numeric'
                            }).replace(/\//g, '-')}
                          </span>
                          <span className="text-sm text-foreground-secondary">
                            {group.news.length} {group.news.length === 1 ? 'News' : 'News Articles'}
                          </span>
                        </div>
                        <motion.div
                          className="ml-4 px-4 py-2 bg-primary/10 rounded-lg"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="text-primary font-semibold text-lg">
                            {group.news.length}
                          </span>
                        </motion.div>
                      </motion.div>
                      
                      {/* Animated gradient line */}
                      <motion.div 
                        className="flex-1 h-1 bg-gradient-to-r from-primary/50 via-secondary/30 to-transparent rounded-full"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: groupIndex * 0.3 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>

                    {/* News Grid for this date */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${group.date}-${selectedCategory}-${searchTerm}`}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {group.news.map((newsItem: any, index: number) => (
                          <motion.div
                            key={newsItem.id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ 
                              duration: 0.6, 
                              delay: index * 0.1,
                              type: "spring",
                              bounce: 0.3
                            }}
                            whileInView={{ 
                              opacity: 1, 
                              y: 0,
                              transition: { duration: 0.6, delay: index * 0.05 }
                            }}
                            viewport={{ once: true }}
                          >
                            <Enhanced3DNewsCard
                              news={newsItem}
                              onClick={() => setSelectedNews(newsItem)}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* No Results State */
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-secondary/20 flex items-center justify-center mx-auto mb-6"
                  animate={{ 
                    scale: [0.9, 1.1, 0.9],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Search className="w-16 h-16 text-foreground-secondary" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-4">No news found</h3>
                <p className="text-foreground-secondary text-lg mb-6">
                  Try adjusting your search criteria or category selection
                </p>
                <motion.button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Enhanced News Viewer Modal */}
      <AnimatePresence>
        {selectedNews && (
          <UltraModern3DNewsViewer
            news={selectedNews}
            allNews={filteredAndSearchedNews}
            onClose={() => setSelectedNews(null)}
            onNavigate={setSelectedNews}
          />
        )}
      </AnimatePresence>
    </div>
  );
};