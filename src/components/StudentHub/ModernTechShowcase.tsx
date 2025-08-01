import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, Cpu, Zap, Shield, Cloud, Database, 
  Bot, Sparkles, Rocket, Globe, TrendingUp, Star
} from 'lucide-react';

const ModernTechShowcase: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const techFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Advanced machine learning algorithms analyze your study patterns and recommend personalized question sets for optimal learning outcomes.",
      color: "from-purple-500 to-pink-500",
      stats: "99.2% Accuracy"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "Real-time performance tracking with detailed insights into your strengths, weaknesses, and progress across all subjects.",
      color: "from-blue-500 to-cyan-500",
      stats: "Real-time Data"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Verified",
      description: "All question papers are verified by subject experts and protected with enterprise-grade security for authentic content.",
      color: "from-green-500 to-emerald-500",
      stats: "100% Authentic"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Sync",
      description: "Access your study materials across all devices with automatic synchronization and offline availability.",
      color: "from-orange-500 to-red-500",
      stats: "Multi-device"
    }
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Animated grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Next-Gen Technology</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-space">
            Powered by{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Innovation
            </span>
          </h2>
          
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto font-jakarta">
            Experience the future of education with our cutting-edge platform that combines 
            artificial intelligence, cloud computing, and advanced analytics to revolutionize 
            your learning journey.
          </p>
        </motion.div>

        {/* Tech Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {techFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            >
              {/* Card */}
              <div className="relative p-8 rounded-3xl glassmorphism hover:shadow-glow transition-all duration-500 overflow-hidden">
                {/* Gradient border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <div className="w-full h-full rounded-3xl bg-background"></div>
                </div>

                <div className="relative z-10">
                  {/* Icon & Stats */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">{feature.stats}</div>
                      <div className="text-xs text-foreground-secondary">Performance</div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-4 font-outfit">
                    {feature.title}
                  </h3>
                  
                  <p className="text-foreground-secondary leading-relaxed font-manrope">
                    {feature.description}
                  </p>

                  {/* Animated elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-24 h-24 opacity-5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {feature.icon}
                  </motion.div>
                </div>

                {/* Hover particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                      style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + i * 12}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="inline-flex items-center gap-6 p-6 rounded-2xl glassmorphism">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 1.4 + i * 0.1, type: "spring", stiffness: 200 }}
                >
                  <Star className="w-5 h-5" />
                </motion.div>
              ))}
            </div>
            
            <div className="text-left">
              <div className="text-lg font-semibold text-foreground font-outfit">
                Join the Innovation
              </div>
              <div className="text-foreground-secondary font-manrope">
                Experience the future of learning today
              </div>
            </div>

            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernTechShowcase;