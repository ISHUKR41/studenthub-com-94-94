import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Text3D, Points, PointMaterial, Sparkles } from '@react-three/drei';
import { Safe3DCanvas } from './Safe3DCanvas';
import { 
  Newspaper, TrendingUp, Globe, Star, Clock, Calendar, Search, Filter,
  Eye, Heart, Share2, MessageCircle, Bookmark, Play, Trophy, Award,
  Zap, Shield, GraduationCap, Briefcase, Users, ArrowRight, Bell,
  Download, Send, ThumbsUp, ChevronDown, Sparkles as SparklesIcon, 
  Crown, Target, Brain, Lightbulb, Database, FileText, Laptop, 
  Building, Book, Atom, Cpu, Network, Mic, Video, Image as ImageIcon,
  TrendingDown, BarChart3, PieChart, LineChart, Activity, Wifi,
  Bluetooth, Radio, Satellite, Rss, Mail, Phone, MapPin, Home,
  Settings, User, UserPlus, UserCheck, Users2, Group
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import { useNews } from '@/contexts/NewsContext';
import * as THREE from 'three';

// Enhanced 3D Scene
const UltraMega3DNewsScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[15, 15, 8]} intensity={1} />
      <pointLight position={[-15, -15, -8]} color="#3b82f6" intensity={0.7} />
      
      {/* Particle Field */}
      <Points positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* 3D Floating News Elements */}
      <group ref={groupRef}>
        {Array.from({ length: 20 }, (_, i) => (
          <Float
            key={`news-${i}`}
            speed={1.5 + Math.random() * 2}
            rotationIntensity={0.3 + Math.random() * 0.7}
            floatIntensity={0.4 + Math.random() * 0.8}
          >
            <mesh
              position={[
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25
              ]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            >
              {i % 5 === 0 ? (
                <boxGeometry args={[1.2, 0.7, 0.1]} />
              ) : i % 5 === 1 ? (
                <cylinderGeometry args={[0.5, 0.5, 1, 8]} />
              ) : i % 5 === 2 ? (
                <octahedronGeometry args={[0.6]} />
              ) : i % 5 === 3 ? (
                <torusGeometry args={[0.5, 0.2, 8, 16]} />
              ) : (
                <icosahedronGeometry args={[0.7]} />
              )}
              <meshStandardMaterial
                color={
                  i % 5 === 0 ? '#3b82f6' :
                  i % 5 === 1 ? '#10b981' :
                  i % 5 === 2 ? '#f59e0b' :
                  i % 5 === 3 ? '#ef4444' : '#8b5cf6'
                }
                transparent
                opacity={0.3 + Math.random() * 0.4}
                wireframe={i % 3 === 0}
              />
            </mesh>
          </Float>
        ))}
      </group>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
};

// Enhanced categories with more options
const ENHANCED_CATEGORIES = [
  { name: 'All', icon: Globe, color: 'from-blue-500 to-cyan-500', count: '2.5k+' },
  { name: 'Breaking News', icon: Zap, color: 'from-red-500 to-pink-500', count: '150+' },
  { name: 'Exam Results', icon: Trophy, color: 'from-yellow-500 to-orange-500', count: '850+' },
  { name: 'Admissions', icon: GraduationCap, color: 'from-green-500 to-emerald-500', count: '420+' },
  { name: 'Policy Updates', icon: Shield, color: 'from-purple-500 to-indigo-500', count: '290+' },
  { name: 'Technology', icon: Cpu, color: 'from-blue-600 to-blue-400', count: '380+' },
  { name: 'Research', icon: Brain, color: 'from-teal-500 to-cyan-500', count: '260+' },
  { name: 'Scholarships', icon: Award, color: 'from-yellow-600 to-yellow-400', count: '180+' },
  { name: 'Campus Life', icon: Users, color: 'from-pink-500 to-rose-500', count: '320+' },
  { name: 'Career', icon: Briefcase, color: 'from-gray-600 to-gray-400', count: '410+' },
  { name: 'Sports', icon: Activity, color: 'from-orange-500 to-red-500', count: '240+' },
  { name: 'International', icon: Satellite, color: 'from-indigo-500 to-purple-500', count: '190+' }
];

// Enhanced news data with more variety
const ENHANCED_NEWS_DATA = [
  {
    id: 1,
    title: "Revolutionary AI Integration in Education System Transforms Learning Experience",
    summary: "Advanced artificial intelligence systems are being integrated into educational platforms worldwide, creating personalized learning experiences for millions of students.",
    category: "Technology",
    author: "Dr. Sarah Chen",
    authorImage: "/api/placeholder/40/40",
    readTime: "8 min read",
    publishedAt: "2024-01-15T10:30:00Z",
    image: "/api/placeholder/600/400",
    tags: ["AI", "Education", "Innovation", "Technology"],
    views: 24567,
    likes: 1834,
    comments: 289,
    shares: 456,
    priority: "high",
    verified: true,
    trending: true
  },
  {
    id: 2,
    title: "Global Universities Announce Massive Open Online Course Initiative",
    summary: "Top-tier universities collaborate to provide free high-quality education through comprehensive online platforms, reaching underserved communities worldwide.",
    category: "Admissions",
    author: "Prof. Michael Johnson",
    authorImage: "/api/placeholder/40/40",
    readTime: "12 min read",
    publishedAt: "2024-01-14T15:45:00Z",
    image: "/api/placeholder/600/400",
    tags: ["MOOC", "Universities", "Global Education", "Access"],
    views: 18923,
    likes: 1456,
    comments: 234,
    shares: 378,
    priority: "medium",
    verified: true,
    trending: false
  },
  {
    id: 3,
    title: "Breakthrough Research in Quantum Computing Published by Student Team",
    summary: "Undergraduate students at leading technology institute publish groundbreaking research that could revolutionize quantum computing applications.",
    category: "Research",
    author: "Emily Rodriguez",
    authorImage: "/api/placeholder/40/40",
    readTime: "6 min read",
    publishedAt: "2024-01-13T09:20:00Z",
    image: "/api/placeholder/600/400",
    tags: ["Quantum Computing", "Research", "Students", "Innovation"],
    views: 31245,
    likes: 2187,
    comments: 412,
    shares: 623,
    priority: "high",
    verified: true,
    trending: true
  },
  {
    id: 4,
    title: "International Scholarship Program Opens Applications for 2024",
    summary: "Prestigious international education foundation announces scholarship opportunities worth $50 million for students from developing countries.",
    category: "Scholarships",
    author: "Amanda Foster",
    authorImage: "/api/placeholder/40/40",
    readTime: "5 min read",
    publishedAt: "2024-01-12T14:30:00Z",
    image: "/api/placeholder/600/400",
    tags: ["Scholarships", "International", "Funding", "Opportunities"],
    views: 15678,
    likes: 987,
    comments: 156,
    shares: 289,
    priority: "medium",
    verified: true,
    trending: false
  },
  {
    id: 5,
    title: "Virtual Reality Classrooms Show 300% Improvement in Learning Outcomes",
    summary: "Comprehensive study reveals that students using VR-enhanced learning environments demonstrate significantly better retention and engagement rates.",
    category: "Technology",
    author: "Dr. Kevin Park",
    authorImage: "/api/placeholder/40/40",
    readTime: "10 min read",
    publishedAt: "2024-01-11T11:15:00Z",
    image: "/api/placeholder/600/400",
    tags: ["VR", "Learning", "Education Technology", "Research"],
    views: 22134,
    likes: 1645,
    comments: 298,
    shares: 445,
    priority: "high",
    verified: true,
    trending: true
  },
  {
    id: 6,
    title: "Climate Change Research Initiative Receives Record Funding",
    summary: "Major universities receive unprecedented funding to accelerate climate change research and develop sustainable solutions for the future.",
    category: "Research",
    author: "Dr. Lisa Thompson",
    authorImage: "/api/placeholder/40/40",
    readTime: "7 min read",
    publishedAt: "2024-01-10T16:00:00Z",
    image: "/api/placeholder/600/400",
    tags: ["Climate Change", "Research", "Funding", "Sustainability"],
    views: 19567,
    likes: 1234,
    comments: 189,
    shares: 356,
    priority: "medium",
    verified: true,
    trending: false
  }
];

// Enhanced stats data
const NEWS_STATS = {
  totalNews: "2.5k+",
  dailyReaders: "45k+",
  categories: "12",
  contributors: "150+",
  countries: "25+",
  languages: "8"
};

export const UltraMega3DNewsHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'magazine'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');
  const [filteredNews, setFilteredNews] = useState(ENHANCED_NEWS_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Filter and search logic
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = ENHANCED_NEWS_DATA;
      
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(news => news.category === selectedCategory);
      }
      
      if (searchQuery) {
        filtered = filtered.filter(news => 
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      // Sort logic
      if (sortBy === 'popular') {
        filtered = [...filtered].sort((a, b) => b.views - a.views);
      } else if (sortBy === 'trending') {
        filtered = [...filtered].sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.views - a.views;
        });
      } else {
        filtered = [...filtered].sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      }
      
      setFilteredNews(filtered);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <ParallaxContainer className="relative">
      {/* Enhanced 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Safe3DCanvas className="w-full h-full">
          <UltraMega3DNewsScene />
        </Safe3DCanvas>
      </div>

      {/* Hero Section with 3D Elements */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: y1, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-secondary/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-8"
          >
            <motion.div
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-primary backdrop-blur-sm"
            >
              <Newspaper className="w-6 h-6 text-white" />
              <span className="text-white font-semibold">Live News Center</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-red-500 rounded-full"
              />
            </motion.div>
            
            <motion.h1 
              className="text-6xl lg:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent font-space tracking-tight leading-tight"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              News Universe
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed font-inter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Discover breaking news, research breakthroughs, and educational insights from around the globe. 
              Stay informed with real-time updates and expert analysis.
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground-secondary w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search breaking news, research, admissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-background/50 backdrop-blur-sm border-2 border-primary/20 rounded-2xl focus:border-primary/50 transition-all duration-300"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  whileHover={{ scale: 1.02 }}
                />
              </div>
            </motion.div>

            {/* Live Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {Object.entries(NEWS_STATS).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-primary group-hover:text-secondary transition-colors">
                    {value}
                  </div>
                  <div className="text-sm text-foreground-secondary capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating News Elements */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-primary/20 rounded-full"
            style={{
              left: `${10 + (i * 10)}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.section>

      {/* Enhanced Category Navigation */}
      <motion.section 
        className="relative py-16 bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Explore Categories
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              Dive deep into specialized news categories tailored for your interests
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ENHANCED_CATEGORIES.map((category, index) => (
              <motion.button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden ${
                  selectedCategory === category.name
                    ? 'border-primary bg-primary/10 shadow-glow'
                    : 'border-muted hover:border-primary/50 bg-background/50 backdrop-blur-sm'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{category.name}</div>
                    <div className="text-xs text-foreground-secondary">{category.count}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced News Grid/List */}
      <motion.section 
        className="relative py-16"
        style={{ y: y2 }}
      >
        <div className="container mx-auto px-4">
          {/* Filter Controls */}
          <motion.div 
            className="flex flex-wrap items-center justify-between mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold">Latest News</h3>
              <Badge variant="secondary" className="px-3 py-1">
                {filteredNews.length} articles
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Selector */}
              <div className="flex items-center bg-background/50 backdrop-blur-sm rounded-xl p-1">
                {['grid', 'list', 'magazine'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`px-4 py-2 rounded-lg transition-all capitalize ${
                      viewMode === mode
                        ? 'bg-primary text-white shadow-md'
                        : 'text-foreground-secondary hover:text-foreground'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-background/50 backdrop-blur-sm border border-muted rounded-xl focus:border-primary"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 animate-pulse">
                  <div className="w-full h-48 bg-muted rounded-xl mb-4" />
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          )}

          {/* News Grid */}
          {!isLoading && (
            <motion.div 
              className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                viewMode === 'list' ? 'grid-cols-1' :
                'grid-cols-1 lg:grid-cols-2'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <Card className="overflow-hidden bg-background/50 backdrop-blur-sm border-2 border-muted hover:border-primary/50 transition-all duration-300 h-full">
                    <div className="relative">
                      {news.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={news.image} 
                            alt={news.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          
                          {/* Priority Badge */}
                          {news.priority === 'high' && (
                            <Badge className="absolute top-3 left-3 bg-red-500">
                              Breaking
                            </Badge>
                          )}
                          
                          {/* Trending Badge */}
                          {news.trending && (
                            <Badge className="absolute top-3 right-3 bg-yellow-500">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                        <Badge variant="outline" className="text-xs">
                          {news.category}
                        </Badge>
                        <span>•</span>
                        <span>{news.readTime}</span>
                        {news.verified && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Shield className="w-3 h-3 text-green-500" />
                              <span className="text-green-500">Verified</span>
                            </div>
                          </>
                        )}
                      </div>

                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {news.title}
                      </h3>

                      <p className="text-foreground-secondary line-clamp-3">
                        {news.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {news.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Author and Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-muted">
                        <div className="flex items-center gap-3">
                          <img 
                            src={news.authorImage} 
                            alt={news.author}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="text-sm font-medium">{news.author}</div>
                            <div className="text-xs text-foreground-secondary">
                              {new Date(news.publishedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-foreground-secondary">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{(news.views / 1000).toFixed(1)}k</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{news.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{news.comments}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Results */}
          {!isLoading && filteredNews.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Newspaper className="w-16 h-16 mx-auto text-foreground-secondary mb-4" />
              <h3 className="text-2xl font-bold mb-2">No news found</h3>
              <p className="text-foreground-secondary">
                Try adjusting your search or selecting a different category
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Enhanced Newsletter Signup */}
      <motion.section 
        className="relative py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-xl text-foreground-secondary">
              Get the latest news and updates delivered directly to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 py-3 px-4 rounded-xl border-2 border-primary/20 focus:border-primary/50"
              />
              <Button className="px-8 py-3 rounded-xl bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Subscribe
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <p className="text-sm text-foreground-secondary">
              Join 45,000+ readers. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </motion.section>

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
          <ArrowRight className="w-6 h-6 text-white transform -rotate-90" />
        </motion.button>
      </motion.div>
    </ParallaxContainer>
  );
};