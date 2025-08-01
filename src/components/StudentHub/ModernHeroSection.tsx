import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  GraduationCap, BookOpen, Users, Trophy, TrendingUp, 
  Zap, Star, Rocket, ArrowRight, Download, Eye,
  Shield, Clock, Award, Globe, Sparkles, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ModernHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);

  useEffect(() => {
    if (inView) {
      x.set(0);
    }
  }, [inView, x]);

  const stats = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      value: "25,000+",
      label: "Question Papers",
      description: "Authentic & Verified",
      color: "from-blue-500 to-cyan-500",
      delay: 0
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "1M+",
      label: "Students",
      description: "Active Community", 
      color: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      value: "95%",
      label: "Success Rate",
      description: "Exam Excellence",
      color: "from-green-500 to-emerald-500", 
      delay: 0.2
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "4.9/5",
      label: "Rating",
      description: "Student Satisfaction",
      color: "from-yellow-500 to-orange-500",
      delay: 0.3
    }
  ];

  const features = [
    { icon: <Shield className="w-5 h-5" />, text: "100% Authentic Papers", color: "text-green-400" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 Access", color: "text-blue-400" },
    { icon: <Award className="w-5 h-5" />, text: "Expert Verified", color: "text-yellow-400" },
    { icon: <Globe className="w-5 h-5" />, text: "All Boards & Exams", color: "text-purple-400" },
    { icon: <Download className="w-5 h-5" />, text: "Free Downloads", color: "text-cyan-400" },
    { icon: <Target className="w-5 h-5" />, text: "Targeted Practice", color: "text-red-400" }
  ];

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Hero Content */}
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">India's Largest Question Paper Hub</span>
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          className="space-y-6 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight font-space">
            <span className="block text-foreground">Master Every</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-textGlow">
              Examination
            </span>
            <span className="block text-foreground-secondary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-4 font-jakarta">
              With Confidence
            </span>
          </h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed font-manrope"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Access <span className="gradient-text font-semibold">25,000+ authentic question papers</span> from 
            Class 9 to PhD level. Covering all boards, competitive exams, and professional courses.
            <span className="block mt-2 text-primary/80">Join 1 Million+ students in their success journey.</span>
          </motion.p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full glassmorphism hover:bg-primary/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <span className={feature.color}>{feature.icon}</span>
              <span className="text-sm font-medium text-foreground">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <Button 
            size="lg" 
            className="group relative px-8 py-6 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold text-lg shadow-glow hover:shadow-intense overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Start Learning Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </Button>

          <Button 
            variant="outline" 
            size="lg"
            className="group px-8 py-6 border-2 border-primary/30 text-primary rounded-xl font-semibold text-lg hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Browse Papers
            </span>
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-2xl glassmorphism group hover:shadow-glow transition-all duration-500"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 1.8 + stat.delay, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className="w-full h-full rounded-2xl bg-background"></div>
              </div>
              
              <div className="relative z-10 text-center space-y-3">
                <motion.div 
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.icon}
                </motion.div>
                
                <motion.div 
                  className="text-3xl lg:text-4xl font-bold gradient-text"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 2 + stat.delay, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                  <div className="text-xs text-foreground-secondary">{stat.description}</div>
                </div>
              </div>

              {/* Hover Effect Particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-foreground-secondary"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">24/7 Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium">Trusted by 1M+ Students</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Expert Verified Content</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ModernHeroSection;