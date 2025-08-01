import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import { Enhanced3DAboutScene } from './Enhanced3DAboutScene';
import { InteractiveTimelineSection } from './InteractiveTimelineSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Link } from 'react-router-dom';
import {
  GraduationCap, Users, BookOpen, Trophy, Target, Heart, Star, Award, Globe, Zap, Shield, Clock, Download,
  MessageSquare, CheckCircle, Lightbulb, Rocket, Brain, Network, ChevronRight, School, BarChart3, Smartphone,
  Database, Wrench, Microscope, Calculator, PenTool, Cpu, Code, FileText, Image, Coffee, Book, MapPin,
  Calendar, Mail, Phone, Linkedin, Github, Twitter, Instagram, Youtube, Facebook, Monitor, Tablet,
  Wifi, CloudDownload, TrendingUp, PieChart, Activity, Settings, Command, Search, Filter, Share2,
  Layers, Palette, Camera, Headphones, Gamepad2, Video, Music, Edit3, Bookmark, Flag, Fingerprint,
  Eye, Smile, ThumbsUp, MessageCircle, Send, ArrowUp, Play, Pause, Volume2, Mic, UserCheck, Crown,
  Diamond, Sparkles, Flame, Anchor, Compass, Map, Navigation, Radar, Satellite, Timer,
  BellRing, Megaphone, Radio, Signal, Battery, Power, RotateCcw, RefreshCw, Repeat, Shuffle,
  SkipBack, SkipForward, FastForward, Rewind, Square, Circle, Triangle, Hexagon, Octagon,
  Building, Home, Car, Plane, Train, Bike, Bus, Ship, Rocket as RocketIcon, Zap as Lightning
} from 'lucide-react';

// Enhanced counter with better animations
const AnimatedCounter = ({ value, suffix = "", prefix = "", duration = 2.5 }: {
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
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(startValue + (endValue - startValue) * easeOutCubic));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-black text-4xl md:text-6xl lg:text-7xl gradient-text">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

const UltraModernAboutPage: React.FC = () => {
  // Initialize smooth scrolling
  useSmoothScroll();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.8, 0.6]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <motion.div style={{ y, opacity }} className="fixed inset-0 z-0">
        <Enhanced3DAboutScene isPlaying={true} />
        <FloatingParticles />
      </motion.div>

      {/* Hero Section with Modern Design */}
      <section className="relative py-40 px-4 z-10 min-h-screen flex items-center">
        <div className="max-w-8xl mx-auto w-full">
          <motion.div
            className="text-center space-y-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, staggerChildren: 0.3 }}
          >
            {/* Brand Identity */}
            <motion.div 
              className="flex items-center justify-center gap-8 mb-16"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
            >
              <motion.div
                className="relative p-8 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl shadow-2xl"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 0 20px rgba(59, 130, 246, 0.1)",
                    "0 0 0 0 rgba(59, 130, 246, 0)"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <GraduationCap className="h-20 w-20 text-white relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-3xl blur-xl"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              <div className="text-left space-y-4">
                <Badge className="text-2xl px-8 py-4 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 font-bold tracking-wider">
                  🇮🇳 India's #1 Educational Platform
                </Badge>
                <motion.div
                  className="text-lg text-foreground-secondary"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Trusted by 2.5M+ Students Nationwide
                </motion.div>
              </div>
            </motion.div>
            
            {/* Main Title */}
            <motion.div 
              className="space-y-12"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2 }}
            >
              <h1 className="text-8xl md:text-10xl lg:text-[14rem] font-black leading-none tracking-tighter">
                <span className="block gradient-text">About</span>
                <motion.span 
                  className="block text-primary"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(59,130,246,0.5)",
                      "0 0 60px rgba(59,130,246,0.8)",
                      "0 0 20px rgba(59,130,246,0.5)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  STUDENTHUB
                </motion.span>
              </h1>
              
              <motion.div 
                className="space-y-8 max-w-7xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <p className="text-3xl md:text-5xl lg:text-6xl text-foreground font-bold leading-tight">
                  🚀 Revolutionizing Education for{' '}
                  <motion.span 
                    className="text-transparent bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text"
                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    Every Indian Student
                  </motion.span>
                </p>
                <p className="text-2xl md:text-3xl lg:text-4xl text-foreground-secondary leading-relaxed">
                  🎯 India's Most Comprehensive Digital Learning Ecosystem with{' '}
                  <span className="text-accent font-bold">25,000+ Authentic Question Papers</span>, 
                  AI-Powered Tools, and Expert-Curated Resources for Academic Excellence
                </p>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              {[
                { icon: Download, text: "Download Resources", href: "/", color: "from-primary to-secondary" },
                { icon: Wrench, text: "Explore AI Tools", href: "/tools", color: "from-accent to-primary" },
                { icon: MessageSquare, text: "Join Community", href: "/contact", color: "from-secondary to-accent" }
              ].map((button, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button asChild className={`px-12 py-8 text-xl font-bold bg-gradient-to-r ${button.color} shadow-2xl group border-0 text-white`}>
                    <Link to={button.href}>
                      <button.icon className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                      {button.text}
                      <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mega Statistics Section */}
      <ParallaxScroll speed={0.3} direction="down">
        <section className="py-40 px-4 bg-gradient-to-br from-background-secondary/30 to-background-tertiary/30 backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
          <div className="max-w-8xl mx-auto relative z-10">
            
            {/* Section Header */}
            <motion.div
              className="text-center mb-24"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <Badge className="text-3xl px-12 py-6 bg-gradient-to-r from-accent/20 to-secondary/20 text-accent border-accent/30 mb-12 tracking-wider font-bold">
                ⚡ Platform Excellence Metrics
              </Badge>
              <h2 className="text-7xl md:text-9xl font-black gradient-text mb-12 leading-tight">
                Incredible <span className="text-primary">Achievements</span>
              </h2>
              <p className="text-2xl md:text-4xl text-foreground-secondary max-w-6xl mx-auto leading-relaxed">
                Our platform's transformative impact across India's educational landscape speaks through these extraordinary milestones
              </p>
            </motion.div>

            {/* Main Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
              {[
                {
                  icon: <Users className="w-12 h-12" />,
                  value: 2500000,
                  suffix: "+",
                  label: "Active Students",
                  desc: "Learning daily across all 36 states",
                  color: "from-blue-500 to-cyan-500",
                  delay: 0,
                  extra: "200% Growth YoY",
                  gradient: "from-blue-500/20 to-cyan-500/20",
                  bgColor: "bg-blue-500/10"
                },
                {
                  icon: <BookOpen className="w-12 h-12" />,
                  value: 25000,
                  suffix: "+",
                  label: "Question Papers",
                  desc: "Authentic verified collection",
                  color: "from-green-500 to-emerald-500",
                  delay: 0.2,
                  extra: "All major boards covered",
                  gradient: "from-green-500/20 to-emerald-500/20",
                  bgColor: "bg-green-500/10"
                },
                {
                  icon: <Trophy className="w-12 h-12" />,
                  value: 97,
                  suffix: "%",
                  label: "Success Rate",
                  desc: "In competitive examinations",
                  color: "from-yellow-500 to-orange-500",
                  delay: 0.4,
                  extra: "Top performers nationally",
                  gradient: "from-yellow-500/20 to-orange-500/20",
                  bgColor: "bg-yellow-500/10"
                },
                {
                  icon: <Star className="w-12 h-12" />,
                  value: 4.9,
                  suffix: "/5",
                  label: "User Rating",
                  desc: "Based on 500K+ reviews",
                  color: "from-purple-500 to-pink-500",
                  delay: 0.6,
                  extra: "Highest rated platform",
                  gradient: "from-purple-500/20 to-pink-500/20",
                  bgColor: "bg-purple-500/10"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 100, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: stat.delay, duration: 1, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -30, scale: 1.05 }}
                >
                  <Card className="h-full glassmorphism hover:shadow-2xl transition-all duration-700 border-border/30 relative overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <CardContent className="p-12 text-center space-y-10">
                      <motion.div 
                        className={`inline-flex p-8 rounded-3xl bg-gradient-to-r ${stat.color} text-white shadow-xl group-hover:scale-125 transition-transform duration-500 relative`}
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.6 }}
                      >
                        {stat.icon}
                        <motion.div
                          className="absolute inset-0 rounded-3xl bg-white/20"
                          animate={{ opacity: [0, 0.7, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.8 }}
                        />
                      </motion.div>
                      <div className="space-y-6">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                        <div className="text-3xl font-bold text-foreground">{stat.label}</div>
                        <div className="text-xl text-foreground-secondary leading-relaxed">{stat.desc}</div>
                        <div className="text-base text-accent font-bold bg-accent/10 px-6 py-3 rounded-full border border-accent/20">
                          ✨ {stat.extra}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Metrics */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Clock, label: "24/7 Support", value: "Always Available", color: "text-blue-500" },
                { icon: Globe, label: "States Covered", value: "All 36", color: "text-green-500" },
                { icon: School, label: "Partner Universities", value: "750+", color: "text-purple-500" },
                { icon: Award, label: "Awards Won", value: "25+", color: "text-yellow-500" },
                { icon: Smartphone, label: "Mobile Users", value: "80%", color: "text-pink-500" },
                { icon: Database, label: "Data Processed", value: "50TB+", color: "text-cyan-500" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  className="text-center p-8 glassmorphism rounded-2xl hover:scale-105 transition-all duration-300 group"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`${metric.color} mb-6 flex justify-center group-hover:scale-110 transition-transform`}>
                    <metric.icon className="w-10 h-10" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-2">{metric.value}</div>
                  <div className="text-sm text-foreground-secondary">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Interactive Timeline Section */}
      <InteractiveTimelineSection />

      {/* Founder Section - Ishu Kumar */}
      <ParallaxScroll speed={0.4} direction="up">
        <section className="py-40 px-4 bg-gradient-to-br from-background to-background-secondary relative">
          <div className="max-w-8xl mx-auto">
            
            {/* Section Header */}
            <motion.div
              className="text-center mb-24"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <Badge className="text-3xl px-12 py-6 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 mb-12 tracking-wider font-bold">
                👨‍💻 Meet the Visionary
              </Badge>
              <h2 className="text-7xl md:text-9xl font-black gradient-text mb-12">
                Our <span className="text-primary">Founder</span>
              </h2>
              <p className="text-2xl md:text-3xl text-foreground-secondary max-w-5xl mx-auto">
                The brilliant mind behind India's educational revolution
              </p>
            </motion.div>

            {/* Founder Card */}
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <Card className="glassmorphism border-primary/20 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-16 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Founder Image/Avatar */}
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative inline-block">
                        <motion.div
                          className="w-80 h-80 bg-gradient-to-r from-primary via-accent to-secondary rounded-full flex items-center justify-center text-white shadow-2xl"
                          animate={{ 
                            rotate: [0, 360],
                            boxShadow: [
                              "0 0 0 0 rgba(59, 130, 246, 0.1)",
                              "0 0 0 40px rgba(59, 130, 246, 0.1)",
                              "0 0 0 0 rgba(59, 130, 246, 0.1)"
                            ]
                          }}
                          transition={{ 
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            boxShadow: { duration: 3, repeat: Infinity }
                          }}
                        >
                          <div className="text-8xl font-bold">IK</div>
                        </motion.div>
                        
                        {/* Floating badges */}
                        <motion.div
                          className="absolute -top-4 -right-4 p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl text-white shadow-xl"
                          animate={{ y: [-10, 10, -10] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Crown className="w-8 h-8" />
                        </motion.div>
                        
                        <motion.div
                          className="absolute -bottom-4 -left-4 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white shadow-xl"
                          animate={{ y: [10, -10, 10] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                        >
                          <Brain className="w-8 h-8" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Founder Details */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-5xl md:text-6xl font-black gradient-text mb-4">
                          Ishu Kumar
                        </h3>
                        <div className="flex items-center gap-4 mb-6">
                          <Badge className="text-xl px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
                            🎓 IIT Patna Alumni
                          </Badge>
                          <Badge className="text-xl px-6 py-3 bg-gradient-to-r from-accent/20 to-secondary/20 text-accent border-accent/30">
                            💼 Founder & CEO
                          </Badge>
                        </div>
                        <p className="text-2xl md:text-3xl text-foreground-secondary leading-relaxed mb-8">
                          A passionate educator and technologist from the prestigious Indian Institute of Technology, Patna
                        </p>
                      </div>

                      {/* Story */}
                      <div className="space-y-6">
                        <h4 className="text-3xl font-bold text-foreground">The Vision Behind StudentHub</h4>
                        <p className="text-xl text-foreground-secondary leading-relaxed">
                          🚀 Ishu Kumar, an alumnus of IIT Patna, recognized the critical gap in accessible, quality educational resources 
                          across India. With a deep understanding of both technology and education, he envisioned a platform that could 
                          democratize learning and make premium educational content available to every student, regardless of their 
                          geographical or economic background.
                        </p>
                        <p className="text-xl text-foreground-secondary leading-relaxed">
                          🎯 His mission: To create India's most comprehensive educational ecosystem that combines authentic study materials, 
                          cutting-edge AI tools, and innovative learning methodologies to ensure every Indian student has access to 
                          world-class education.
                        </p>
                      </div>

                      {/* Achievements */}
                      <div className="grid grid-cols-2 gap-6">
                        {[
                          { icon: Users, label: "Students Impacted", value: "2.5M+" },
                          { icon: Trophy, label: "Years Experience", value: "8+" },
                          { icon: Award, label: "Recognition", value: "15+" },
                          { icon: Rocket, label: "Platform Growth", value: "200%" }
                        ].map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            className="text-center p-6 bg-background/50 rounded-2xl border border-border/30"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <achievement.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                            <div className="text-2xl font-bold gradient-text">{achievement.value}</div>
                            <div className="text-sm text-foreground-secondary">{achievement.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Contact/Social */}
                      <div className="flex flex-wrap gap-4 pt-6">
                        {[
                          { icon: Mail, label: "Email", color: "from-blue-500 to-cyan-500" },
                          { icon: Linkedin, label: "LinkedIn", color: "from-blue-600 to-blue-700" },
                          { icon: Github, label: "GitHub", color: "from-gray-600 to-gray-800" },
                          { icon: Twitter, label: "Twitter", color: "from-blue-400 to-blue-500" }
                        ].map((social, idx) => (
                          <motion.button
                            key={idx}
                            className={`p-4 bg-gradient-to-r ${social.color} rounded-xl text-white shadow-lg`}
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <social.icon className="w-6 h-6" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Mission & Vision Section */}
      <ParallaxScroll speed={0.3} direction="down">
        <section className="py-40 px-4 bg-gradient-to-br from-background-secondary/30 to-background-tertiary/30 backdrop-blur-sm">
          <div className="max-w-8xl mx-auto">
            
            {/* Section Header */}
            <motion.div
              className="text-center mb-24"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <Badge className="text-3xl px-12 py-6 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 mb-12 tracking-wider font-bold">
                🎯 Purpose & Vision
              </Badge>
              <h2 className="text-7xl md:text-9xl font-black gradient-text mb-12">
                Mission & <span className="text-primary">Vision</span>
              </h2>
              <p className="text-2xl md:text-3xl text-foreground-secondary max-w-6xl mx-auto">
                Transforming India's educational landscape through innovation, accessibility, and excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              
              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="perspective-1000"
              >
                <motion.div
                  className="preserve-3d group"
                  whileHover={{ rotateY: 5, rotateX: 5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-12 glassmorphism hover:shadow-2xl transition-all duration-700 border-border/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-10 space-y-10 relative z-10">
                      <div className="flex items-center gap-8">
                        <motion.div 
                          className="p-8 bg-gradient-to-r from-primary to-secondary rounded-3xl group-hover:scale-110 transition-transform duration-500"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <Target className="h-16 w-16 text-white" />
                        </motion.div>
                        <h3 className="text-5xl md:text-6xl font-black gradient-text">Our Mission</h3>
                      </div>
                      <div className="space-y-6">
                        <p className="text-2xl md:text-3xl text-foreground-secondary leading-relaxed">
                          🎯 To democratize quality education across India by providing comprehensive, accessible, and 
                          innovative learning resources that empower every student to achieve academic excellence.
                        </p>
                        <div className="space-y-4">
                          {[
                            "🚀 Bridge the educational divide between urban and rural areas",
                            "📚 Provide authentic, verified study materials for all major examinations",
                            "🤖 Integrate AI-powered tools to personalize learning experiences",
                            "🌟 Foster a collaborative learning community across India",
                            "💡 Make quality education affordable and accessible to all"
                          ].map((point, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-start gap-4 text-xl text-foreground-secondary"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1, duration: 0.5 }}
                              viewport={{ once: true }}
                            >
                              <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                              <span>{point}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="perspective-1000"
              >
                <motion.div
                  className="preserve-3d group"
                  whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-12 glassmorphism hover:shadow-2xl transition-all duration-700 border-border/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-10 space-y-10 relative z-10">
                      <div className="flex items-center gap-8">
                        <motion.div 
                          className="p-8 bg-gradient-to-r from-accent to-primary rounded-3xl group-hover:scale-110 transition-transform duration-500"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <Eye className="h-16 w-16 text-white" />
                        </motion.div>
                        <h3 className="text-5xl md:text-6xl font-black gradient-text">Our Vision</h3>
                      </div>
                      <div className="space-y-6">
                        <p className="text-2xl md:text-3xl text-foreground-secondary leading-relaxed">
                          🌟 To become the world's leading educational technology platform, recognized for transforming 
                          how students learn, prepare, and succeed in their academic journeys.
                        </p>
                        <div className="space-y-4">
                          {[
                            "🌍 Expand globally while maintaining our Indian roots and values",
                            "🔬 Pioneer next-generation educational technologies",
                            "🏆 Achieve 100% success rate in student satisfaction",
                            "🤝 Build the largest educational community in Asia",
                            "⚡ Set new standards for digital learning excellence"
                          ].map((point, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-start gap-4 text-xl text-foreground-secondary"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1, duration: 0.5 }}
                              viewport={{ once: true }}
                            >
                              <Star className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                              <span>{point}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxScroll>

      {/* Platform Features Deep Dive */}
      <ParallaxScroll speed={0.4} direction="up">
        <section className="py-40 px-4 bg-background relative">
          <div className="max-w-8xl mx-auto">
            
            {/* Section Header */}
            <motion.div
              className="text-center mb-24"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <Badge className="text-3xl px-12 py-6 bg-gradient-to-r from-secondary/20 to-primary/20 text-secondary border-secondary/30 mb-12 tracking-wider font-bold">
                🛠️ Platform Capabilities
              </Badge>
              <h2 className="text-7xl md:text-9xl font-black gradient-text mb-12">
                What We <span className="text-primary">Offer</span>
              </h2>
              <p className="text-2xl md:text-3xl text-foreground-secondary max-w-6xl mx-auto">
                Comprehensive suite of educational tools and resources designed for modern learners
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  icon: <BookOpen className="w-12 h-12" />,
                  title: "25K+ Question Papers",
                  description: "Authentic previous year questions from all major boards and competitive exams",
                  features: ["CBSE, ICSE, State Boards", "JEE, NEET, UPSC", "University Papers", "Mock Tests"],
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "bg-blue-500/10"
                },
                {
                  icon: <Wrench className="w-12 h-12" />,
                  title: "AI-Powered Tools",
                  description: "Revolutionary suite of intelligent tools for document processing and conversion",
                  features: ["PDF Tools Suite", "Image Processing", "Text Conversion", "Smart Analytics"],
                  color: "from-green-500 to-emerald-500",
                  bgColor: "bg-green-500/10"
                },
                {
                  icon: <Users className="w-12 h-12" />,
                  title: "Learning Community",
                  description: "Vibrant ecosystem of 2.5M+ students sharing knowledge and experiences",
                  features: ["Study Groups", "Peer Learning", "Expert Mentorship", "Discussion Forums"],
                  color: "from-purple-500 to-pink-500",
                  bgColor: "bg-purple-500/10"
                },
                {
                  icon: <Smartphone className="w-12 h-12" />,
                  title: "Mobile-First Design",
                  description: "Optimized for mobile learning with offline capabilities and seamless sync",
                  features: ["Offline Access", "Cloud Sync", "Progressive Web App", "Cross-Platform"],
                  color: "from-yellow-500 to-orange-500",
                  bgColor: "bg-yellow-500/10"
                },
                {
                  icon: <Brain className="w-12 h-12" />,
                  title: "Personalized Learning",
                  description: "AI-driven recommendations and adaptive learning paths for every student",
                  features: ["Smart Recommendations", "Progress Tracking", "Adaptive Content", "Performance Analytics"],
                  color: "from-red-500 to-pink-500",
                  bgColor: "bg-red-500/10"
                },
                {
                  icon: <Shield className="w-12 h-12" />,
                  title: "Quality Assurance",
                  description: "Expert-verified content with rigorous quality control and regular updates",
                  features: ["Expert Verification", "Regular Updates", "Quality Control", "Accuracy Guarantee"],
                  color: "from-indigo-500 to-purple-500",
                  bgColor: "bg-indigo-500/10"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -20, scale: 1.03 }}
                >
                  <Card className="h-full glassmorphism hover:shadow-2xl transition-all duration-700 border-border/30 relative overflow-hidden">
                    <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <CardContent className="p-10 space-y-8 relative z-10">
                      <div className="space-y-6">
                        <motion.div 
                          className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${feature.color} text-white shadow-xl group-hover:scale-110 transition-transform duration-500`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-3xl font-bold text-foreground">{feature.title}</h3>
                        <p className="text-xl text-foreground-secondary leading-relaxed">{feature.description}</p>
                      </div>
                      <div className="space-y-3">
                        {feature.features.map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-3 text-foreground-secondary"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + (idx * 0.05), duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>{item}</span>
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

      {/* Call to Action Section */}
      <section className="py-40 px-4 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <Badge className="text-3xl px-12 py-6 bg-gradient-to-r from-accent/20 to-primary/20 text-accent border-accent/30 mb-12 tracking-wider font-bold">
              🚀 Join the Revolution
            </Badge>
            <h2 className="text-6xl md:text-8xl font-black gradient-text mb-12">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-2xl md:text-3xl text-foreground-secondary mb-16 leading-relaxed">
              Join 2.5 million+ students who are already experiencing the future of education with StudentHub
            </p>
            
            <div className="flex flex-wrap justify-center gap-8">
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="px-16 py-8 text-2xl font-bold bg-gradient-to-r from-primary to-secondary shadow-2xl group border-0 text-white">
                  <Link to="/">
                    <RocketIcon className="w-8 h-8 mr-4 group-hover:scale-110 transition-transform" />
                    Start Learning Now
                    <Lightning className="w-8 h-8 ml-4 group-hover:scale-110 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" className="px-16 py-8 text-2xl font-bold border-primary/40 hover:border-primary group bg-background/20 backdrop-blur-sm">
                  <Link to="/contact">
                    <MessageSquare className="w-8 h-8 mr-4 group-hover:scale-110 transition-transform" />
                    Get in Touch
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default UltraModernAboutPage;