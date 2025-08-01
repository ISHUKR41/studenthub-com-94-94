import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Text3D, Sparkles as ThreeSparkles } from '@react-three/drei';
import { 
  Newspaper, TrendingUp, Globe, Star, Clock, Calendar, Search, Filter,
  Eye, Heart, Share2, MessageCircle, Bookmark, Play, Trophy, Award,
  Zap, Shield, GraduationCap, Briefcase, Users, ArrowRight, Bell,
  Download, Send, ThumbsUp, ChevronDown, Sparkles, Crown, Target,
  Brain, Lightbulb, Database, FileText, Laptop, Building, Book
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import { useNews } from '@/contexts/NewsContext';

// Enhanced 3D Scene for News
const UltraAdvancedNewsScene = () => {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[15, 15, 8]} intensity={1} />
      <pointLight position={[-15, -15, -8]} color="#3b82f6" intensity={0.7} />
      
      {/* 3D Floating News Elements */}
      {Array.from({ length: 15 }, (_, i) => (
        <Float
          key={`news-${i}`}
          speed={1.5 + Math.random() * 2}
          rotationIntensity={0.3 + Math.random() * 0.7}
          floatIntensity={0.4 + Math.random() * 0.8}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 60,
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 30
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            {i % 4 === 0 ? (
              <boxGeometry args={[1.5, 0.8, 0.1]} />
            ) : i % 4 === 1 ? (
              <cylinderGeometry args={[0.6, 0.6, 1.2, 8]} />
            ) : i % 4 === 2 ? (
              <octahedronGeometry args={[0.8]} />
            ) : (
              <torusGeometry args={[0.7, 0.3, 8, 16]} />
            )}
            <meshStandardMaterial
              color={`hsl(${(i * 25) % 360}, 85%, 70%)`}
              transparent
              opacity={0.7}
              roughness={0.1}
              metalness={0.9}
              emissive={`hsl(${(i * 25) % 360}, 50%, 20%)`}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Floating Headlines */}
      {['BREAKING', 'LATEST', 'TRENDING', 'UPDATE'].map((text, i) => (
        <Float
          key={text}
          speed={0.8}
          rotationIntensity={0.3}
          floatIntensity={0.6}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 50,
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 25
            ]}
          >
            <planeGeometry args={[6, 1.5]} />
            <meshStandardMaterial
              color="#1e40af"
              transparent
              opacity={0.3}
              emissive="#3b82f6"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Enhanced Sparkles */}
      <ThreeSparkles
        count={120}
        scale={25}
        size={4}
        speed={0.8}
        opacity={0.9}
        color="#3b82f6"
      />
    </>
  );
};

// Enhanced News Categories
const NEWS_CATEGORIES = [
  { name: 'Breaking News', icon: Bell, color: 'from-red-500 to-rose-500', count: '15 today' },
  { name: 'Exam Results', icon: Trophy, color: 'from-yellow-500 to-orange-500', count: '25 updates' },
  { name: 'Admissions', icon: GraduationCap, color: 'from-green-500 to-emerald-500', count: '40 alerts' },
  { name: 'Policy Updates', icon: Shield, color: 'from-purple-500 to-indigo-500', count: '12 changes' },
  { name: 'Technology', icon: Laptop, color: 'from-cyan-500 to-blue-500', count: '30 stories' },
  { name: 'Career News', icon: Briefcase, color: 'from-indigo-500 to-purple-500', count: '20 posts' },
  { name: 'Research', icon: Brain, color: 'from-pink-500 to-red-500', count: '18 papers' },
  { name: 'Scholarships', icon: Award, color: 'from-emerald-500 to-teal-500', count: '35 offers' }
];

// Top Stories Data
const TOP_STORIES = [
  {
    id: 1,
    title: "Major Education Policy Reform Announced",
    summary: "New guidelines for digital learning and assessment methods",
    category: "Policy",
    readTime: "5 min",
    views: 15420,
    likes: 892,
    published: "2 hours ago",
    urgent: true,
    image: "🏛️"
  },
  {
    id: 2,
    title: "Record Breaking NEET Results 2024",
    summary: "Highest number of students qualify for medical entrance",
    category: "Results",
    readTime: "3 min",
    views: 28350,
    likes: 1247,
    published: "4 hours ago",
    trending: true,
    image: "🏥"
  },
  {
    id: 3,
    title: "IIT Opens New Campus in Bangalore",
    summary: "State-of-the-art facilities for engineering education",
    category: "Education",
    readTime: "6 min",
    views: 9840,
    likes: 654,
    published: "6 hours ago",
    featured: true,
    image: "🏫"
  }
];

// Trending Topics
const TRENDING_TOPICS = [
  { name: 'JEE Main 2024', count: '25.5K discussions' },
  { name: 'UPSC Notification', count: '18.2K mentions' },
  { name: 'Online Learning', count: '12.8K posts' },
  { name: 'EdTech Startups', count: '9.4K articles' },
  { name: 'Study Abroad', count: '7.6K queries' }
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

export const UltraAdvancedNewsLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const { news, searchNews, getNewsByCategory } = useNews();

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <ParallaxContainer className="relative overflow-hidden">
      {/* Ultra Advanced 3D Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Canvas camera={{ position: [0, 0, 25], fov: 75 }} className="opacity-50">
          <UltraAdvancedNewsScene />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.4}
            enableDamping
            dampingFactor={0.04}
          />
        </Canvas>
        
        {/* Multi-layer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-background/90 to-secondary/12" />
        <div className="absolute inset-0 bg-gradient-to-tl from-accent/8 via-transparent to-primary/8" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary/5 to-transparent" />
      </motion.div>

      {/* Hero Section */}
      <SectionWrapper delay={0.1} className="relative z-10">
        <motion.div 
          className="container mx-auto px-4 py-40 text-center"
          style={{ scale: headerScale }}
        >
          {/* Breaking News Badge */}
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-10 py-4 mb-10"
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              boxShadow: [
                '0 0 20px rgba(239, 68, 68, 0.4)',
                '0 0 50px rgba(239, 68, 68, 0.6)',
                '0 0 20px rgba(239, 68, 68, 0.4)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bell className="w-7 h-7 text-red-500" />
            </motion.div>
            <span className="text-red-500 font-bold text-xl">LIVE NEWS CENTER</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-7 h-7 text-orange-500" />
            </motion.div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-8xl md:text-10xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-10 font-space"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            NEWS UNIVERSE
          </motion.h1>

          <motion.p
            className="text-2xl md:text-4xl text-foreground-secondary max-w-5xl mx-auto mb-20 leading-relaxed font-inter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Stay ahead with real-time educational news, breaking updates, and in-depth analysis from the world of academics
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="btn-hero text-2xl px-16 py-6">
                <Newspaper className="w-7 h-7 mr-4" />
                Explore News
                <ArrowRight className="w-7 h-7 ml-4" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="text-2xl px-16 py-6 glass">
                <Play className="w-7 h-7 mr-4" />
                Watch Live
              </Button>
            </motion.div>
          </motion.div>

          {/* Live stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {[
              { icon: Globe, label: "Live Updates", value: "24/7", color: "text-blue-500" },
              { icon: TrendingUp, label: "Daily Reads", value: "50K+", color: "text-green-500" },
              { icon: Users, label: "Subscribers", value: "200K+", color: "text-purple-500" },
              { icon: Clock, label: "Response Time", value: "< 1min", color: "text-orange-500" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass p-10 rounded-3xl hover:bg-primary/10 transition-all duration-500"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.15 }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                </motion.div>
                <div className="text-4xl font-bold text-foreground mb-3">{stat.value}</div>
                <div className="text-foreground-secondary font-medium text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* Newsletter Subscription */}
      <SectionWrapper delay={0.2} className="relative z-10">
        <ParallaxScroll speed={0.2} direction="up">
          <div className="container mx-auto px-4 py-24">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass p-12 rounded-3xl space-y-8">
                <div className="space-y-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Crown className="w-16 h-16 text-primary mx-auto" />
                  </motion.div>
                  <h2 className="text-4xl font-bold text-foreground">Never Miss Important Updates</h2>
                  <p className="text-xl text-foreground-secondary">
                    Get instant notifications for breaking news, exam results, and admission alerts
                  </p>
                </div>

                {!isSubscribed ? (
                  <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                    <Input
                      type="email"
                      placeholder="Enter your email for instant alerts..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-14 text-lg glass"
                    />
                    <Button 
                      onClick={handleSubscribe}
                      className="h-14 px-8 text-lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Subscribe
                    </Button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✅
                    </motion.div>
                    <h3 className="text-2xl font-bold text-green-500">Successfully Subscribed!</h3>
                    <p className="text-foreground-secondary">You'll receive instant notifications for all important updates</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </ParallaxScroll>
      </SectionWrapper>

      {/* Advanced Search Section */}
      <SectionWrapper delay={0.1} className="relative z-10">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-foreground mb-8 flex items-center justify-center gap-6">
                <Search className="w-16 h-16 text-primary" />
                AI-Powered Search
              </h2>
              <p className="text-2xl text-foreground-secondary max-w-4xl mx-auto">
                Find any news instantly with our intelligent search and real-time filtering system
              </p>
            </div>

            <div className="glass p-12 rounded-3xl space-y-10">
              {/* Main search */}
              <div className="relative">
                <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 w-8 h-8 text-foreground-secondary" />
                <motion.input
                  type="text"
                  placeholder="Search news by keyword, category, date, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-20 pr-8 py-8 bg-background/60 border-2 border-border/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-xl"
                  whileFocus={{ scale: 1.02 }}
                />
                <Button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12"
                  size="lg"
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  AI Search
                </Button>
              </div>

              {/* Quick filters */}
              <div className="flex flex-wrap gap-4 justify-center">
                {['Breaking News', 'Today\'s Updates', 'This Week', 'Trending Now', 'Most Read'].map((filter) => (
                  <motion.button
                    key={filter}
                    className="px-8 py-4 bg-background-secondary/60 hover:bg-primary/15 border border-border/40 rounded-xl transition-all text-lg"
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
      </SectionWrapper>

      {/* News Categories Grid */}
      <SectionWrapper delay={0.2} className="relative z-10">
        <ParallaxScroll speed={0.3} direction="down">
          <div className="container mx-auto px-4 py-24">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl font-bold text-foreground mb-8 flex items-center justify-center gap-6">
                <Filter className="w-16 h-16 text-primary" />
                News Categories
              </h2>
              <p className="text-2xl text-foreground-secondary max-w-4xl mx-auto">
                Browse news by categories and stay updated with your areas of interest
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
              {NEWS_CATEGORIES.map((category, index) => {
                const Icon = category.icon;
                
                return (
                  <motion.div
                    key={category.name}
                    className="group relative overflow-hidden"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.05, rotateY: 8 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Card className="glass border-2 border-border/40 hover:border-primary/60 transition-all duration-500 h-full">
                      <CardContent className="p-10 text-center space-y-6">
                        <motion.div
                          className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto`}
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        >
                          <Icon className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        
                        <p className="text-foreground-secondary text-lg">
                          {category.count}
                        </p>
                        
                        <Button variant="ghost" className="w-full text-lg py-3">
                          View News
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </ParallaxScroll>
      </SectionWrapper>

      {/* Top Stories Section */}
      <SectionWrapper delay={0.1} className="relative z-10">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl font-bold text-foreground mb-8 flex items-center justify-center gap-6">
              <Trophy className="w-16 h-16 text-primary" />
              Top Stories
            </h2>
            <p className="text-2xl text-foreground-secondary max-w-4xl mx-auto">
              The most important and trending news stories from the education sector
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            {TOP_STORIES.map((story, index) => (
              <motion.div
                key={story.id}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.03, y: -15 }}
              >
                <Card className="glass border-2 border-border/40 hover:border-primary/60 transition-all duration-500 overflow-hidden h-full">
                  <CardContent className="p-10 space-y-6">
                    {/* Story header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        {story.urgent && (
                          <Badge className="bg-red-500 text-white">URGENT</Badge>
                        )}
                        {story.trending && (
                          <Badge className="bg-orange-500 text-white">TRENDING</Badge>
                        )}
                        {story.featured && (
                          <Badge className="bg-green-500 text-white">FEATURED</Badge>
                        )}
                        <Badge variant="outline">{story.category}</Badge>
                      </div>
                      <motion.div 
                        className="text-5xl"
                        animate={{ rotateY: [0, 20, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        {story.image}
                      </motion.div>
                    </div>

                    {/* Story content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {story.title}
                      </h3>
                      <p className="text-foreground-secondary text-lg leading-relaxed">
                        {story.summary}
                      </p>
                    </div>

                    {/* Story meta */}
                    <div className="flex items-center justify-between text-sm text-foreground-secondary pt-4 border-t border-border/30">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{story.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{story.views.toLocaleString()}</span>
                        </div>
                      </div>
                      <span>{story.published}</span>
                    </div>

                    {/* Story actions */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex gap-3">
                        <Button size="sm" variant="ghost">
                          <Heart className="w-4 h-4 mr-1" />
                          {story.likes}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button size="sm">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Trending Topics */}
      <SectionWrapper delay={0.2} className="relative z-10">
        <ParallaxScroll speed={0.2} direction="up">
          <div className="container mx-auto px-4 py-24">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-foreground mb-8 flex items-center justify-center gap-4">
                <TrendingUp className="w-12 h-12 text-primary" />
                Trending Topics
              </h2>
              
              <div className="glass p-8 rounded-2xl space-y-6">
                {TRENDING_TOPICS.map((topic, index) => (
                  <motion.div
                    key={topic.name}
                    className="flex items-center justify-between p-4 bg-background/30 rounded-xl hover:bg-primary/5 transition-all cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold">#{index + 1}</span>
                      </div>
                      <span className="text-foreground font-semibold text-lg">{topic.name}</span>
                    </div>
                    <span className="text-foreground-secondary">{topic.count}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </ParallaxScroll>
      </SectionWrapper>

      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button 
          className="w-18 h-18 rounded-full bg-gradient-primary backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-glow"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white text-3xl font-bold"
          >
            ↑
          </motion.div>
        </motion.button>
      </motion.div>
    </ParallaxContainer>
  );
};