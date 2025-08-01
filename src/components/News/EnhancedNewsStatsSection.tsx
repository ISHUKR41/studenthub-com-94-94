import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, Users, Globe, Calendar, 
  Eye, MessageCircle, Share2, Star,
  Award, Zap, Target, Clock
} from 'lucide-react';

const newsStats = [
  {
    icon: TrendingUp,
    label: "Daily Readers",
    value: "2.5M+",
    description: "Active daily news readers",
    color: "from-blue-500 to-cyan-500",
    growth: "+23%"
  },
  {
    icon: Globe,
    label: "News Sources",
    value: "500+",
    description: "Verified news sources",
    color: "from-green-500 to-emerald-500",
    growth: "+15%"
  },
  {
    icon: Calendar,
    label: "Updates Daily",
    value: "1,200+",
    description: "Fresh updates every day",
    color: "from-purple-500 to-indigo-500",
    growth: "+30%"
  },
  {
    icon: Users,
    label: "Community",
    value: "850K+",
    description: "Active community members",
    color: "from-orange-500 to-red-500",
    growth: "+18%"
  },
  {
    icon: Eye,
    label: "Monthly Views",
    value: "45M+",
    description: "Total monthly page views",
    color: "from-pink-500 to-rose-500",
    growth: "+42%"
  },
  {
    icon: Award,
    label: "Awards Won",
    value: "15+",
    description: "Journalism excellence awards",
    color: "from-yellow-500 to-amber-500",
    growth: "+5"
  }
];

const categoryStats = [
  { name: "Education", articles: 2340, percentage: 28 },
  { name: "Technology", articles: 1890, percentage: 22 },
  { name: "Government", articles: 1560, percentage: 18 },
  { name: "Exams", articles: 1200, percentage: 14 },
  { name: "Research", articles: 890, percentage: 11 },
  { name: "Others", articles: 620, percentage: 7 }
];

export const EnhancedNewsStatsSection: React.FC = () => {
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
            className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6"
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
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">Live Statistics</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            News by Numbers
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Real-time insights into our global news platform
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
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
          {newsStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="glassmorphism border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 h-full">
                  <CardContent className="p-6 relative overflow-hidden">
                    {/* Animated background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <motion.div
                          className="text-sm font-semibold text-green-500 bg-green-500/10 px-3 py-1 rounded-full"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {stat.growth}
                        </motion.div>
                      </div>
                      
                      <motion.h3
                        className="text-3xl font-bold text-foreground mb-2"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {stat.value}
                      </motion.h3>
                      
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {stat.label}
                      </h4>
                      
                      <p className="text-foreground-secondary text-sm">
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Category Stats */}
          <Card className="glassmorphism border-2 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                Content Distribution
              </h3>
              
              <div className="space-y-4">
                {categoryStats.map((category, index) => (
                  <motion.div
                    key={category.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{category.name}</span>
                      <span className="text-foreground-secondary">{category.articles} articles</span>
                    </div>
                    
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${category.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    
                    <div className="text-right text-sm text-foreground-secondary">
                      {category.percentage}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Updates */}
          <Card className="glassmorphism border-2 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" />
                Real-time Activity
              </h3>
              
              <div className="space-y-4">
                {[
                  { time: "Just now", activity: "New article published", count: "1,234 views" },
                  { time: "2 min ago", activity: "Breaking news alert", count: "5,678 readers" },
                  { time: "5 min ago", activity: "Exam results update", count: "12,345 shares" },
                  { time: "8 min ago", activity: "Policy announcement", count: "3,456 comments" },
                  { time: "12 min ago", activity: "Research findings", count: "2,890 bookmarks" }
                ].map((update, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 bg-background-secondary/30 rounded-lg"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  >
                    <div>
                      <div className="font-medium text-foreground">{update.activity}</div>
                      <div className="text-sm text-foreground-secondary">{update.time}</div>
                    </div>
                    <div className="text-sm font-semibold text-primary">
                      {update.count}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
};