import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Zap, 
  Brain, 
  Rocket, 
  Shield, 
  Users, 
  BookOpen, 
  Award, 
  Globe, 
  Heart,
  ArrowRight,
  Play,
  Download,
  Search,
  Star,
  Target,
  TrendingUp,
  Lightbulb,
  Clock,
  CheckCircle
} from 'lucide-react';

const UltimateExperienceShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const experiences = [
    {
      category: "AI-Powered Learning",
      title: "Personalized Study Experience",
      description: "Advanced AI algorithms analyze your learning patterns and provide customized recommendations.",
      features: ["Smart Content Curation", "Adaptive Learning Paths", "Performance Analytics", "Progress Tracking"],
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-blue-500 to-purple-600",
      image: "🤖"
    },
    {
      category: "Instant Access",
      title: "Lightning-Fast Downloads",
      description: "Get your study materials instantly with our optimized content delivery network.",
      features: ["Global CDN", "Offline Access", "Multiple Formats", "Cloud Sync"],
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-yellow-500 to-orange-600",
      image: "⚡"
    },
    {
      category: "Community Driven",
      title: "Collaborative Learning Hub",
      description: "Connect with millions of students and educators across India and beyond.",
      features: ["Study Groups", "Peer Reviews", "Expert Mentoring", "Discussion Forums"],
      icon: <Users className="w-8 h-8" />,
      gradient: "from-green-500 to-blue-600",
      image: "🌐"
    },
    {
      category: "Quality Assured",
      title: "Premium Content Library",
      description: "Access curated, verified content from top educational institutions and experts.",
      features: ["Expert Verified", "Regular Updates", "Multiple Languages", "Quality Control"],
      icon: <Award className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-600",
      image: "🏆"
    }
  ];

  const achievements = [
    { icon: <BookOpen className="w-6 h-6" />, number: "25,000+", label: "Question Papers", color: "text-blue-500" },
    { icon: <Users className="w-6 h-6" />, number: "170M+", label: "Active Users", color: "text-green-500" },
    { icon: <Download className="w-6 h-6" />, number: "50M+", label: "Downloads", color: "text-purple-500" },
    { icon: <Star className="w-6 h-6" />, number: "4.9★", label: "Rating", color: "text-yellow-500" },
    { icon: <Globe className="w-6 h-6" />, number: "22+", label: "Languages", color: "text-indigo-500" },
    { icon: <Shield className="w-6 h-6" />, number: "100%", label: "Secure", color: "text-emerald-500" }
  ];

  const testimonials = [
    {
      text: "StudentHub transformed my preparation strategy completely!",
      author: "Arjun Sharma",
      role: "JEE Topper 2024",
      avatar: "👨‍🎓"
    },
    {
      text: "The AI recommendations are incredibly accurate and helpful.",
      author: "Priya Patel",
      role: "NEET Aspirant",
      avatar: "👩‍🎓"
    },
    {
      text: "Best platform for UPSC preparation materials.",
      author: "Rahul Singh",
      role: "IAS Officer",
      avatar: "👨‍💼"
    }
  ];

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">Ultimate Learning Experience</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-space">
            <span className="gradient-text">Revolutionizing</span>{" "}
            <span className="text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
              Education
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto font-manrope">
            Experience the future of learning with our cutting-edge platform designed for{" "}
            <span className="gradient-text-accent font-semibold">academic excellence</span> and{" "}
            <span className="text-primary font-semibold">personal growth</span>.
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-2xl glassmorphism group hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 ${achievement.color} mb-3 group-hover:scale-110 transition-transform`}>
                {achievement.icon}
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">{achievement.number}</div>
              <div className="text-sm text-foreground-secondary">{achievement.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Card className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden h-full">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r ${experience.gradient} text-white group-hover:scale-110 transition-transform`}>
                        {experience.icon}
                      </div>
                      <div>
                        <Badge className="mb-2 bg-primary/20 text-primary border-primary/30">
                          {experience.category}
                        </Badge>
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                          {experience.title}
                        </h3>
                      </div>
                    </div>
                    <div className="text-4xl">{experience.image}</div>
                  </div>
                  
                  <p className="text-foreground-secondary mb-6 text-lg leading-relaxed">
                    {experience.description}
                  </p>
                  
                  <div className="space-y-3">
                    {experience.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1 + index * 0.2 + featureIndex * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-foreground-secondary">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    className="mt-6 pt-6 border-t border-border"
                    whileHover={{ x: 5 }}
                  >
                    <Button variant="ghost" className="text-primary hover:text-primary group/btn">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-4xl font-bold mb-12 gradient-text">What Our Students Say</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl glassmorphism hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 + index * 0.2 }}
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-foreground-secondary mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-primary">{testimonial.author}</div>
                  <div className="text-sm text-foreground-secondary">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="inline-flex gap-6">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button className="btn-hero bg-gradient-to-r from-primary to-accent px-10 py-5 text-xl font-space">
                Start Your Journey
                <Rocket className="w-6 h-6 ml-3" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="px-10 py-5 text-xl border-2 border-primary/40 hover:border-primary font-space">
                <Play className="w-6 h-6 mr-3" />
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UltimateExperienceShowcase;