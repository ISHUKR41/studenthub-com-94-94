import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  BookOpen, Users, Download, Star, Trophy, Clock,
  TrendingUp, Globe, Award, Target, Zap, Shield
} from 'lucide-react';

const ImmersiveStatsSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [counts, setCounts] = useState({
    papers: 0,
    students: 0,
    downloads: 0,
    rating: 0,
    success: 0,
    coverage: 0
  });

  const finalCounts = {
    papers: 25000,
    students: 1000000,
    downloads: 5000000,
    rating: 4.9,
    success: 95,
    coverage: 100
  };

  useEffect(() => {
    if (inView) {
      const duration = 2500;
      const steps = 60;
      const stepTime = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        setCounts({
          papers: Math.floor(finalCounts.papers * easeProgress),
          students: Math.floor(finalCounts.students * easeProgress),
          downloads: Math.floor(finalCounts.downloads * easeProgress),
          rating: parseFloat((finalCounts.rating * easeProgress).toFixed(1)),
          success: Math.floor(finalCounts.success * easeProgress),
          coverage: Math.floor(finalCounts.coverage * easeProgress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounts(finalCounts);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [inView]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  const stats = [
    {
      icon: <BookOpen className="w-10 h-10" />,
      value: `${formatNumber(counts.papers)}+`,
      label: "Question Papers",
      description: "Verified & Authentic",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <Users className="w-10 h-10" />,
      value: `${formatNumber(counts.students)}+`,
      label: "Active Students",
      description: "Learning Community",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: <Download className="w-10 h-10" />,
      value: `${formatNumber(counts.downloads)}+`,
      label: "Downloads",
      description: "This Month",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: <Star className="w-10 h-10" />,
      value: `${counts.rating}/5`,
      label: "Student Rating",
      description: "Satisfaction Score",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      value: `${counts.success}%`,
      label: "Success Rate",
      description: "Exam Excellence",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      value: `${counts.coverage}%`,
      label: "Board Coverage",
      description: "All Major Boards",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10"
    }
  ];

  const achievements = [
    { icon: <Award className="w-5 h-5" />, text: "Education Excellence Award 2024", color: "text-yellow-400" },
    { icon: <Shield className="w-5 h-5" />, text: "ISO 27001 Certified Security", color: "text-green-400" },
    { icon: <Target className="w-5 h-5" />, text: "AI-Powered Personalization", color: "text-blue-400" },
    { icon: <Zap className="w-5 h-5" />, text: "Lightning Fast Performance", color: "text-purple-400" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 Technical Support", color: "text-cyan-400" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Fastest Growing Platform", color: "text-red-400" }
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background" />
        
        {/* Animated background elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-space">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Millions
            </span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto font-jakarta">
            Join the largest community of successful students and educators who trust 
            our platform for their academic excellence.
          </p>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full glassmorphism hover:bg-primary/10 transition-all duration-300"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className={achievement.color}>{achievement.icon}</span>
              <span className="text-sm font-medium text-foreground font-manrope">{achievement.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.6 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              {/* Main Card */}
              <div className="relative p-8 rounded-3xl glassmorphism group-hover:shadow-glow transition-all duration-500 text-center overflow-hidden">
                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <div className="w-full h-full rounded-3xl bg-background"></div>
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-6`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    {stat.icon}
                  </motion.div>

                  {/* Value */}
                  <motion.div
                    className="text-4xl lg:text-5xl font-bold mb-2 font-space"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ 
                      delay: 0.8 + index * 0.1, 
                      type: "spring", 
                      stiffness: 200 
                    }}
                  >
                    <span className="gradient-text">{stat.value}</span>
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 font-outfit">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground-secondary text-sm font-manrope">
                    {stat.description}
                  </p>

                  {/* Background icon */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-20 h-20 opacity-5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {stat.icon}
                  </motion.div>
                </div>

                {/* Animated particles on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                      style={{
                        left: `${10 + i * 10}%`,
                        top: `${15 + (i % 3) * 25}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180, 360],
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

                {/* Pulse effect */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl ${stat.bgColor} opacity-0 group-hover:opacity-100`}
                  animate={inView ? {
                    scale: [1, 1.05, 1],
                    opacity: [0, 0.3, 0]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl glassmorphism">
            <div className="text-4xl">🎓</div>
            <div className="text-left">
              <div className="text-lg font-semibold text-foreground font-outfit">
                Be Part of This Success Story
              </div>
              <div className="text-foreground-secondary font-manrope">
                Join thousands of students achieving their dreams every day
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImmersiveStatsSection;