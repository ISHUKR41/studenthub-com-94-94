import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, Flame, Star, ArrowRight,
  Clock, Eye, MessageCircle, Share2,
  Bookmark, ThumbsUp, Users, Zap
} from 'lucide-react';

const trendingNews = [
  {
    id: 1,
    title: "AI Revolution in Education: 300% Improvement in Learning Outcomes",
    category: "Technology",
    readTime: "4 min",
    views: 45670,
    comments: 234,
    shares: 892,
    trending: "#1",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
    excerpt: "Latest research shows unprecedented improvements in student performance with AI-powered personalized learning systems...",
    tags: ["AI", "Education", "Innovation"]
  },
  {
    id: 2,
    title: "NEET 2024 Results: Record Breaking Performance by Students",
    category: "Exams",
    readTime: "6 min",
    views: 78920,
    comments: 567,
    shares: 1234,
    trending: "#2",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop",
    excerpt: "This year's NEET results show remarkable improvement in success rates across all states with 15% increase...",
    tags: ["NEET", "Results", "Medical"]
  },
  {
    id: 3,
    title: "Government Announces New Scholarship Program for Rural Students",
    category: "Policy",
    readTime: "5 min",
    views: 56340,
    comments: 189,
    shares: 678,
    trending: "#3",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=300&fit=crop",
    excerpt: "Initiative aims to provide quality education access to underserved communities with ₹5000 crore investment...",
    tags: ["Scholarship", "Government", "Education"]
  }
];

const trendingTopics = [
  { name: "NEET 2024", mentions: 12450, growth: "+45%" },
  { name: "JEE Advanced", mentions: 8970, growth: "+32%" },
  { name: "UPSC Results", mentions: 6780, growth: "+28%" },
  { name: "Board Exams", mentions: 5430, growth: "+18%" },
  { name: "Scholarship", mentions: 4320, growth: "+25%" },
  { name: "Online Learning", mentions: 3890, growth: "+67%" }
];

const liveUpdates = [
  "🔥 Breaking: IIT announces new campus in Goa",
  "📚 JEE Main 2024 application deadline extended",
  "🎓 New medical colleges approved in 5 states",
  "💡 AI-powered career guidance platform launched",
  "🏆 India wins International Science Olympiad"
];

export const EnhancedNewsTrendingSection: React.FC = () => {
  const [currentUpdate, setCurrentUpdate] = useState(0);
  const [selectedNews, setSelectedNews] = useState(trendingNews[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % liveUpdates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6"
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              boxShadow: [
                '0 0 20px rgba(234, 88, 12, 0.3)',
                '0 0 40px rgba(234, 88, 12, 0.5)',
                '0 0 20px rgba(234, 88, 12, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-orange-500 font-semibold">What's Hot</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Trending Now
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Stay ahead with the most discussed topics and breaking news
          </p>
        </motion.div>

        {/* Live Updates Ticker */}
        <motion.div
          className="mb-12 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glassmorphism border-2 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-4 h-4" />
                  <span className="font-semibold">LIVE</span>
                </motion.div>
                
                <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentUpdate}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-foreground font-medium"
                    >
                      {liveUpdates[currentUpdate]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Trending News */}
          <div className="lg:col-span-2">
            <motion.div
              className="grid grid-cols-1 gap-6"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {trendingNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedNews(news)}
                >
                  <Card className="glassmorphism border-2 border-primary/20 hover:border-orange-500/40 transition-all duration-500 overflow-hidden">
                    <div className="relative">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Trending Badge */}
                      <motion.div
                        className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full font-bold text-sm"
                        animate={{ 
                          boxShadow: [
                            '0 0 10px rgba(234, 88, 12, 0.5)',
                            '0 0 20px rgba(234, 88, 12, 0.8)',
                            '0 0 10px rgba(234, 88, 12, 0.5)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {news.trending}
                      </motion.div>
                      
                      <Badge className="absolute top-4 right-4 bg-background/80 text-foreground">
                        {news.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {news.title}
                      </h3>
                      
                      <p className="text-foreground-secondary mb-4 line-clamp-2">
                        {news.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {news.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-foreground-secondary">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{news.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{news.views.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{news.comments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            <span>{news.shares}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glassmorphism border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <motion.div
                      key={topic.name}
                      className="flex items-center justify-between p-3 bg-background-secondary/30 rounded-lg hover:bg-background-secondary/50 transition-colors cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div>
                        <div className="font-medium text-foreground">{topic.name}</div>
                        <div className="text-sm text-foreground-secondary">
                          {topic.mentions.toLocaleString()} mentions
                        </div>
                      </div>
                      <div className="text-green-500 font-semibold text-sm">
                        {topic.growth}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glassmorphism border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Today's Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "New Articles", value: "47", icon: "📰" },
                    { label: "Breaking News", value: "8", icon: "🚨" },
                    { label: "Exam Updates", value: "23", icon: "📊" },
                    { label: "Government News", value: "16", icon: "🏛️" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{stat.icon}</span>
                        <span className="text-foreground">{stat.label}</span>
                      </div>
                      <motion.div
                        className="text-2xl font-bold text-primary"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {stat.value}
                      </motion.div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -window.innerHeight * 0.3, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
};