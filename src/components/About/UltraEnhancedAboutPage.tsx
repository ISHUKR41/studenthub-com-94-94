import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import { Enhanced3DAboutScene } from './Enhanced3DAboutScene';
import { InteractiveTimelineSection } from './InteractiveTimelineSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {
  GraduationCap,
  Users,
  BookOpen,
  Trophy,
  Target,
  Heart,
  Star,
  Award,
  Globe,
  Zap,
  Shield,
  Clock,
  Download,
  MessageSquare,
  CheckCircle,
  Lightbulb,
  Rocket,
  Brain,
  Network,
  ChevronRight,
  School,
  BarChart3,
  Smartphone,
  Database,
  Wrench,
  Microscope,
  Calculator,
  PenTool,
  Cpu,
  LucideIcon
} from 'lucide-react';

// Enhanced counter animation component
const AnimatedCounter = ({ value, suffix = "", prefix = "", duration = 2 }: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const startValue = 0;
      const endValue = value;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(startValue + (endValue - startValue) * easeOutQuart));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-bold text-4xl md:text-5xl gradient-text font-space">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const UltraEnhancedAboutPage: React.FC = () => {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <ParallaxContainer className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced 3D Background Scene */}
      <Enhanced3DAboutScene isPlaying={true} />

      {/* Mega Enhanced Hero Section */}
      <section className="relative py-32 px-4 z-10">
        <div className="max-w-8xl mx-auto">
          <motion.div
            className="text-center space-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, staggerChildren: 0.2 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative p-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl shadow-2xl"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <GraduationCap className="h-16 w-16 text-white relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-3xl blur-lg"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              <Badge className="text-2xl px-12 py-6 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 font-space tracking-wider">
                🏆 भारत का #1 शैक्षिक मंच
              </Badge>
            </motion.div>
            
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold font-playfair gradient-text leading-tight tracking-tight">
                About{' '}
                <motion.span 
                  className="text-primary"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(59,130,246,0.5)",
                      "0 0 40px rgba(59,130,246,0.8)",
                      "0 0 20px rgba(59,130,246,0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  STUDENTHUB
                </motion.span>
              </h1>
              
              <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p className="text-2xl md:text-4xl lg:text-5xl text-foreground font-semibold max-w-7xl mx-auto leading-relaxed font-jakarta">
                  🚀 Revolutionizing Education for{' '}
                  <motion.span 
                    className="text-primary font-bold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    2.5 Million+ Students
                  </motion.span>
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl text-foreground-secondary max-w-6xl mx-auto leading-relaxed font-poppins">
                  🇮🇳 India's Most Comprehensive Digital Learning Ecosystem with{' '}
                  <span className="text-accent font-bold">25,000+ Authentic Question Papers</span>, 
                  Revolutionary AI Tools, and Expert-Curated Resources
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="btn-hero bg-gradient-to-r from-primary to-secondary px-12 py-6 text-xl font-bold group shadow-2xl">
                  <Link to="/">
                    <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                    Download Resources
                    <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" className="px-12 py-6 text-xl font-bold border-primary/40 hover:border-primary group bg-background/20 backdrop-blur-sm">
                  <Link to="/tools">
                    <Wrench className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    Explore Tools
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" className="px-12 py-6 text-xl font-bold border-accent/40 hover:border-accent group bg-background/20 backdrop-blur-sm">
                  <Link to="/contact">
                    <MessageSquare className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    Contact Us
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ultra Enhanced Statistics Section */}
      <ParallaxScroll speed={0.3} direction="down">
        <section className="py-32 px-4 bg-background-secondary/50 backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
          <div className="max-w-8xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Badge className="text-2xl px-10 py-4 bg-gradient-to-r from-accent/20 to-secondary/20 text-accent border-accent/30 mb-8 font-space">
                ⚡ Platform Excellence Metrics
              </Badge>
              <h2 className="text-6xl md:text-8xl font-bold gradient-text mb-8 font-playfair">Incredible Achievements</h2>
              <p className="text-2xl md:text-3xl text-foreground-secondary max-w-5xl mx-auto font-poppins leading-relaxed">
                Our platform's transformative impact across India's educational landscape speaks through these extraordinary milestones
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                {
                  icon: <Users className="w-10 h-10" />,
                  value: 2500000,
                  suffix: "+",
                  label: "Active Students",
                  desc: "Learning daily across India",
                  color: "from-blue-500 to-cyan-500",
                  delay: 0,
                  extra: "Growing 200% yearly",
                  gradient: "from-blue-500/20 to-cyan-500/20"
                },
                {
                  icon: <BookOpen className="w-10 h-10" />,
                  value: 25000,
                  suffix: "+",
                  label: "Question Papers",
                  desc: "Authentic verified collection",
                  color: "from-green-500 to-emerald-500",
                  delay: 0.1,
                  extra: "All major boards & exams",
                  gradient: "from-green-500/20 to-emerald-500/20"
                },
                {
                  icon: <Trophy className="w-10 h-10" />,
                  value: 95,
                  suffix: "%",
                  label: "Success Rate",
                  desc: "In competitive examinations",
                  color: "from-yellow-500 to-orange-500",
                  delay: 0.2,
                  extra: "Top performers nationally",
                  gradient: "from-yellow-500/20 to-orange-500/20"
                },
                {
                  icon: <Star className="w-10 h-10" />,
                  value: 4.9,
                  suffix: "/5",
                  label: "User Rating",
                  desc: "Based on 100K+ reviews",
                  color: "from-purple-500 to-pink-500",
                  delay: 0.3,
                  extra: "Highest rated platform",
                  gradient: "from-purple-500/20 to-pink-500/20"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: stat.delay, duration: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -20, scale: 1.03 }}
                >
                  <Card className="h-full glassmorphism hover:shadow-2xl transition-all duration-700 border-border/30 relative overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <CardContent className="p-10 text-center space-y-8">
                      <motion.div 
                        className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${stat.color} text-white shadow-xl group-hover:scale-125 transition-transform duration-500 relative`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        {stat.icon}
                        <motion.div
                          className="absolute inset-0 rounded-3xl bg-white/20"
                          animate={{ opacity: [0, 0.5, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.7 }}
                        />
                      </motion.div>
                      <div className="space-y-4">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={3} />
                        <div className="text-2xl font-bold text-foreground font-jakarta">{stat.label}</div>
                        <div className="text-lg text-foreground-secondary font-poppins">{stat.desc}</div>
                        <div className="text-sm text-accent font-semibold bg-accent/10 px-4 py-2 rounded-full">
                          {stat.extra}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional impressive metrics */}
            <motion.div
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Clock, label: "24/7 Support", value: "Always Available" },
                { icon: Globe, label: "States Covered", value: "All 36" },
                { icon: School, label: "Universities", value: "500+" },
                { icon: Award, label: "Awards Won", value: "15+" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  className="text-center p-6 glassmorphism rounded-2xl hover:scale-105 transition-transform duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-primary mb-4 flex justify-center">
                    <metric.icon className="w-8 h-8" />
                  </div>
                  <div className="text-xl font-bold text-foreground font-jakarta">{metric.value}</div>
                  <div className="text-sm text-foreground-secondary font-poppins">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Revolutionary Mission & Vision Section */}
      <ParallaxScroll speed={0.4} direction="up">
        <section className="py-32 px-4">
          <div className="max-w-8xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Badge className="text-2xl px-10 py-4 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 mb-8 font-space">
                🎯 Our Purpose & Vision
              </Badge>
              <h2 className="text-6xl md:text-8xl font-bold gradient-text mb-8 font-playfair">Mission & Vision</h2>
              <p className="text-xl md:text-2xl text-foreground-secondary max-w-5xl mx-auto font-poppins">
                Transforming India's educational landscape through innovation, accessibility, and excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              
              {/* Enhanced Mission Card */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="perspective-1000"
              >
                <motion.div
                  className="preserve-3d"
                  whileHover={{ rotateY: 5, rotateX: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-10 glassmorphism hover:shadow-2xl transition-all duration-700 group border-border/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-8 space-y-8 relative z-10">
                      <div className="flex items-center gap-6">
                        <motion.div 
                          className="p-6 bg-gradient-to-r from-primary to-secondary rounded-3xl group-hover:scale-110 transition-transform duration-500"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <Target className="h-12 w-12 text-white" />
                        </motion.div>
                        <h3 className="text-4xl md:text-5xl font-bold gradient-text font-playfair">Our Mission</h3>
                      </div>
                      <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed font-poppins">
                        To democratize quality education across India by providing{' '}
                        <span className="text-primary font-bold">free access</span> to comprehensive study materials, 
                        authentic question papers, and revolutionary{' '}
                        <span className="text-secondary font-bold">AI-powered learning tools</span> that empower every student to achieve their dreams and build a{' '}
                        <span className="text-accent font-bold">brighter future</span>.
                      </p>
                      <div className="grid grid-cols-2 gap-6 mt-8">
                        {[
                          { icon: <CheckCircle className="w-6 h-6" />, text: "100% Free Resources", color: "text-secondary" },
                          { icon: <Brain className="w-6 h-6" />, text: "AI-Powered Tools", color: "text-primary" },
                          { icon: <Users className="w-6 h-6" />, text: "Expert Guidance", color: "text-accent" },
                          { icon: <Clock className="w-6 h-6" />, text: "24/7 Support", color: "text-info" }
                        ].map((item, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-center gap-3 text-lg font-semibold"
                            whileHover={{ x: 10, scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={item.color}>{item.icon}</div>
                            <span className="font-jakarta">{item.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Enhanced Vision Card */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="perspective-1000"
              >
                <motion.div
                  className="preserve-3d"
                  whileHover={{ rotateY: -5, rotateX: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-10 glassmorphism hover:shadow-2xl transition-all duration-700 group border-border/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-8 space-y-8 relative z-10">
                      <div className="flex items-center gap-6">
                        <motion.div 
                          className="p-6 bg-gradient-to-r from-accent to-primary rounded-3xl group-hover:scale-110 transition-transform duration-500"
                          whileHover={{ rotate: -360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <Lightbulb className="h-12 w-12 text-white" />
                        </motion.div>
                        <h3 className="text-4xl md:text-5xl font-bold gradient-text font-playfair">Our Vision</h3>
                      </div>
                      <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed font-poppins">
                        To become{' '}
                        <span className="text-primary font-bold">India's leading educational technology platform</span> that transforms traditional learning 
                        into an engaging, personalized, and{' '}
                        <span className="text-accent font-bold">outcome-driven experience</span> for millions of students nationwide, creating a{' '}
                        <span className="text-secondary font-bold">digitally empowered generation</span>.
                      </p>
                      <div className="grid grid-cols-2 gap-6 mt-8">
                        {[
                          { icon: <Brain className="w-6 h-6" />, text: "Smart Learning", color: "text-primary" },
                          { icon: <Globe className="w-6 h-6" />, text: "Global Reach", color: "text-secondary" },
                          { icon: <Rocket className="w-6 h-6" />, text: "Innovation", color: "text-accent" },
                          { icon: <Network className="w-6 h-6" />, text: "Community", color: "text-info" }
                        ].map((item, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-center gap-3 text-lg font-semibold"
                            whileHover={{ x: 10, scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={item.color}>{item.icon}</div>
                            <span className="font-jakarta">{item.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Comprehensive Platform Features */}
      <ParallaxScroll speed={0.2} direction="down">
        <section className="py-32 px-4 bg-background-secondary/30">
          <div className="max-w-8xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Badge className="text-2xl px-10 py-4 bg-gradient-to-r from-secondary/20 to-primary/20 text-secondary border-secondary/30 mb-8 font-space">
                🚀 Platform Features
              </Badge>
              <h2 className="text-6xl md:text-8xl font-bold gradient-text mb-8 font-playfair">What We Offer</h2>
              <p className="text-xl md:text-2xl text-foreground-secondary max-w-5xl mx-auto font-poppins">
                Comprehensive educational solutions designed for every student's success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  icon: <BookOpen className="w-12 h-12" />,
                  title: "Previous Year Questions",
                  description: "25,000+ authentic question papers from all major boards and competitive exams",
                  features: ["CBSE, ICSE, State Boards", "JEE, NEET, UPSC", "Banking, SSC, Railways", "Professional Courses"],
                  color: "from-blue-500 to-blue-600",
                  gradient: "from-blue-500/10 to-blue-600/10"
                },
                {
                  icon: <Wrench className="w-12 h-12" />,
                  title: "Educational Tools",
                  description: "Advanced AI-powered tools for enhanced learning and productivity",
                  features: ["PDF Tools", "Image Processing", "Text Conversion", "Study Planners"],
                  color: "from-green-500 to-green-600",
                  gradient: "from-green-500/10 to-green-600/10"
                },
                {
                  icon: <Brain className="w-12 h-12" />,
                  title: "AI-Powered Learning",
                  description: "Personalized learning experiences powered by cutting-edge AI technology",
                  features: ["Smart Recommendations", "Adaptive Testing", "Performance Analytics", "Learning Paths"],
                  color: "from-purple-500 to-purple-600",
                  gradient: "from-purple-500/10 to-purple-600/10"
                },
                {
                  icon: <Users className="w-12 h-12" />,
                  title: "Community Support",
                  description: "Connect with millions of students and expert mentors across India",
                  features: ["Student Forums", "Expert Guidance", "Peer Learning", "Study Groups"],
                  color: "from-orange-500 to-orange-600",
                  gradient: "from-orange-500/10 to-orange-600/10"
                },
                {
                  icon: <Smartphone className="w-12 h-12" />,
                  title: "Mobile Learning",
                  description: "Learn anytime, anywhere with our optimized mobile experience",
                  features: ["Offline Access", "Sync Across Devices", "Push Notifications", "Mobile Tools"],
                  color: "from-pink-500 to-pink-600",
                  gradient: "from-pink-500/10 to-pink-600/10"
                },
                {
                  icon: <BarChart3 className="w-12 h-12" />,
                  title: "Progress Tracking",
                  description: "Detailed analytics and insights to track your learning journey",
                  features: ["Performance Reports", "Skill Assessment", "Goal Setting", "Achievement Badges"],
                  color: "from-cyan-500 to-cyan-600",
                  gradient: "from-cyan-500/10 to-cyan-600/10"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full glassmorphism hover:shadow-2xl transition-all duration-700 border-border/30 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <CardContent className="p-8 space-y-6 relative z-10">
                      <motion.div 
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-foreground font-jakarta">{feature.title}</h3>
                      <p className="text-lg text-foreground-secondary font-poppins leading-relaxed">{feature.description}</p>
                      <ul className="space-y-3">
                        {feature.features.map((item, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex items-center gap-3 text-sm font-medium"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CheckCircle className="w-4 h-4 text-secondary" />
                            <span className="font-poppins">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Enhanced Subject Coverage Section */}
      <ParallaxScroll speed={0.3} direction="up">
        <section className="py-32 px-4">
          <div className="max-w-8xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Badge className="text-2xl px-10 py-4 bg-gradient-to-r from-accent/20 to-primary/20 text-accent border-accent/30 mb-8 font-space">
                📚 Subject Coverage
              </Badge>
              <h2 className="text-6xl md:text-8xl font-bold gradient-text mb-8 font-playfair">All Subjects Covered</h2>
              <p className="text-xl md:text-2xl text-foreground-secondary max-w-5xl mx-auto font-poppins">
                From Class 9 to PhD level - comprehensive coverage across all educational streams
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Microscope className="w-10 h-10" />,
                  title: "Science Stream",
                  subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "Environmental Science"],
                  color: "bg-gradient-to-r from-science to-science/80",
                  textColor: "text-white",
                  borderColor: "border-science/30"
                },
                {
                  icon: <Calculator className="w-10 h-10" />,
                  title: "Commerce Stream", 
                  subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics", "Statistics", "Entrepreneurship"],
                  color: "bg-gradient-to-r from-commerce to-commerce/80",
                  textColor: "text-white",
                  borderColor: "border-commerce/30"
                },
                {
                  icon: <PenTool className="w-10 h-10" />,
                  title: "Arts Stream",
                  subjects: ["History", "Geography", "Political Science", "Psychology", "Philosophy", "Sociology"],
                  color: "bg-gradient-to-r from-arts to-arts/80",
                  textColor: "text-white",
                  borderColor: "border-arts/30"
                },
                {
                  icon: <Cpu className="w-10 h-10" />,
                  title: "Engineering",
                  subjects: ["Mechanical", "Civil", "Electrical", "Computer Science", "Electronics", "Chemical"],
                  color: "bg-gradient-to-r from-engineering to-engineering/80",
                  textColor: "text-white",
                  borderColor: "border-engineering/30"
                },
                {
                  icon: <Heart className="w-10 h-10" />,
                  title: "Medical",
                  subjects: ["MBBS", "BDS", "AYUSH", "Nursing", "Pharmacy", "Physiotherapy"],
                  color: "bg-gradient-to-r from-medical to-medical/80",
                  textColor: "text-white",
                  borderColor: "border-medical/30"
                },
                {
                  icon: <Trophy className="w-10 h-10" />,
                  title: "Competitive Exams",
                  subjects: ["UPSC", "SSC", "Banking", "Railways", "Defence", "Insurance"],
                  color: "bg-gradient-to-r from-competitive to-competitive/80",
                  textColor: "text-white",
                  borderColor: "border-competitive/30"
                }
              ].map((stream, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group"
                >
                  <Card className={`h-full ${stream.color} ${stream.borderColor} border-2 hover:shadow-2xl transition-all duration-700 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-8 space-y-6 relative z-10">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-500"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          {React.cloneElement(stream.icon as React.ReactElement, { className: `w-10 h-10 ${stream.textColor}` })}
                        </motion.div>
                        <h3 className={`text-2xl font-bold ${stream.textColor} font-jakarta`}>{stream.title}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {stream.subjects.map((subject, idx) => (
                          <motion.div 
                            key={idx}
                            className={`p-3 bg-white/10 rounded-lg ${stream.textColor} text-sm font-medium text-center font-poppins`}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                            transition={{ duration: 0.2 }}
                          >
                            {subject}
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Enhanced Technology Stack Section */}
      <ParallaxScroll speed={0.2} direction="down">
        <section className="py-32 px-4 bg-background-secondary/30">
          <div className="max-w-8xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Badge className="text-2xl px-10 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 mb-8 font-space">
                💻 Technology Stack
              </Badge>
              <h2 className="text-6xl md:text-8xl font-bold gradient-text mb-8 font-playfair">Cutting-Edge Technology</h2>
              <p className="text-xl md:text-2xl text-foreground-secondary max-w-5xl mx-auto font-poppins">
                Built with the latest technologies to ensure the best learning experience
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
                { icon: Brain, name: "AI/ML", desc: "Artificial Intelligence" },
                { icon: Database, name: "Cloud", desc: "Scalable Infrastructure" },
                { icon: Smartphone, name: "Mobile", desc: "Cross-Platform Apps" },
                { icon: BarChart3, name: "Big Data", desc: "Analytics & Insights" },
                { icon: Shield, name: "Security", desc: "Enterprise Grade" },
                { icon: Zap, name: "Performance", desc: "Lightning Fast" }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="text-center group"
                >
                  <div className="glassmorphism p-8 rounded-2xl hover:shadow-xl transition-all duration-500">
                    <motion.div 
                      className="text-primary mb-4 flex justify-center"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.8 }}
                    >
                      <tech.icon className="w-12 h-12" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground mb-2 font-jakarta">{tech.name}</h3>
                    <p className="text-sm text-foreground-secondary font-poppins">{tech.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Enhanced Interactive Timeline */}
      <InteractiveTimelineSection />

      {/* Call to Action Section */}
      <ParallaxScroll speed={0.1} direction="up">
        <section className="py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="text-6xl md:text-8xl font-bold gradient-text font-playfair">Join the Revolution</h2>
              <p className="text-2xl md:text-3xl text-foreground-secondary max-w-4xl mx-auto font-poppins leading-relaxed">
                Become part of India's largest educational community and transform your learning journey today
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild className="btn-hero bg-gradient-to-r from-primary to-secondary px-16 py-8 text-2xl font-bold shadow-2xl">
                    <Link to="/">
                      <Rocket className="w-8 h-8 mr-4" />
                      Start Learning Now
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" className="px-16 py-8 text-2xl font-bold border-primary/40 hover:border-primary bg-background/20 backdrop-blur-sm">
                    <Link to="/contact">
                      <MessageSquare className="w-8 h-8 mr-4" />
                      Get in Touch
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </ParallaxScroll>
    </ParallaxContainer>
  );
};

export default UltraEnhancedAboutPage;