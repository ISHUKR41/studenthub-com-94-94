import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Download, 
  BookOpen, 
  Star, 
  Globe, 
  TrendingUp,
  Activity,
  Target,
  Award,
  Zap,
  Brain,
  Heart,
  Clock,
  Trophy,
  Rocket,
  Shield
} from 'lucide-react';

interface LiveStat {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  change: number;
  color: string;
  gradient: string;
  description: string;
}

export const EnhancedLiveStatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live stats data with real-time simulation
  const [liveStats, setLiveStats] = useState<LiveStat[]>([
    {
      id: 'students',
      icon: <Users className="w-8 h-8" />,
      label: 'Active Students',
      value: 172340000,
      unit: '',
      change: 12450,
      color: 'text-blue-500',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Students online right now'
    },
    {
      id: 'downloads',
      icon: <Download className="w-8 h-8" />,
      label: 'Downloads Today',
      value: 2847580,
      unit: '',
      change: 1850,
      color: 'text-green-500',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Papers downloaded in last 24h'
    },
    {
      id: 'papers',
      icon: <BookOpen className="w-8 h-8" />,
      label: 'Question Papers',
      value: 25847,
      unit: '',
      change: 45,
      color: 'text-purple-500',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Total papers in database'
    },
    {
      id: 'rating',
      icon: <Star className="w-8 h-8" />,
      label: 'Platform Rating',
      value: 4.92,
      unit: '/5',
      change: 0.02,
      color: 'text-yellow-500',
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Based on 2.5M+ reviews'
    },
    {
      id: 'countries',
      icon: <Globe className="w-8 h-8" />,
      label: 'Countries Served',
      value: 47,
      unit: '',
      change: 2,
      color: 'text-indigo-500',
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Global educational reach'
    },
    {
      id: 'success',
      icon: <Trophy className="w-8 h-8" />,
      label: 'Success Rate',
      value: 89.7,
      unit: '%',
      change: 2.3,
      color: 'text-emerald-500',
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Student exam success rate'
    }
  ]);

  // Real-time achievements ticker
  const achievements = [
    { icon: <Award className="w-5 h-5" />, text: "Rahul K. scored 98% in JEE Main", time: "2 min ago" },
    { icon: <Target className="w-5 h-5" />, text: "Priya S. cleared NEET with AIR 150", time: "5 min ago" },
    { icon: <Rocket className="w-5 h-5" />, text: "10,000+ papers downloaded today", time: "8 min ago" },
    { icon: <Brain className="w-5 h-5" />, text: "New AI feature: Smart Study Plans", time: "12 min ago" },
    { icon: <Shield className="w-5 h-5" />, text: "Enhanced security protocols active", time: "15 min ago" }
  ];

  // Update stats periodically to simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.value + Math.floor(Math.random() * (stat.change / 10))
      })));
      setCurrentTime(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number, unit: string) => {
    if (unit === '/5') return num.toFixed(2);
    if (unit === '%') return num.toFixed(1);
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-background via-background-secondary to-background overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />

        {/* Floating Elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Activity className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold text-lg">Live Statistics</span>
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-space">
            <span className="gradient-text">Real-Time</span>{" "}
            <span className="text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
              Impact
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Watch our platform's live impact on{" "}
            <span className="gradient-text-accent font-semibold">millions of students</span>{" "}
            across India in real-time
          </p>

          {/* Live Time Display */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <Badge className="bg-background/50 text-foreground border border-primary/30 px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Updated: {currentTime.toLocaleTimeString()}
            </Badge>
          </motion.div>
        </motion.div>

        {/* Live Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {liveStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden relative">
                <CardContent className="p-6">
                  {/* Stat Icon and Value */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <motion.div
                      className="text-right"
                      key={stat.value} // Key change triggers animation
                      initial={{ scale: 1.1, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-3xl font-bold gradient-text">
                        {formatNumber(stat.value, stat.unit)}{stat.unit}
                      </div>
                      <div className="text-sm text-green-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +{formatNumber(stat.change, '')} today
                      </div>
                    </motion.div>
                  </div>

                  {/* Stat Label and Description */}
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {stat.label}
                    </h3>
                    <p className="text-foreground-secondary text-sm">
                      {stat.description}
                    </p>
                  </div>

                  {/* Live indicator */}
                  <motion.div
                    className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div
          className="glassmorphism rounded-3xl p-8 border-primary/20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Live Student Achievements</h3>
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full ml-auto"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-background/30 rounded-xl border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{achievement.text}</p>
                    <p className="text-foreground-secondary text-sm">{achievement.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Live
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};