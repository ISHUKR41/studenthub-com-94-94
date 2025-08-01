import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Cpu, 
  Zap, 
  Shield, 
  Cloud, 
  Search, 
  Brain, 
  Sparkles,
  Globe,
  Database,
  Lock,
  Wifi,
  Smartphone,
  Monitor,
  Tablet,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Activity,
  Target,
  Lightbulb,
  Rocket,
  Star
} from 'lucide-react';

const AdvancedTechnologyShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const techFeatures = [
    {
      id: 0,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms for personalized learning experiences",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-blue-500 to-purple-600",
      details: [
        "Natural Language Processing for smart search",
        "Personalized content recommendations",
        "Adaptive learning path optimization",
        "Performance prediction analytics",
        "Intelligent question generation",
        "Real-time learning assessment"
      ],
      stats: [
        { label: "Accuracy", value: "99.2%" },
        { label: "Speed", value: "0.3s" },
        { label: "Models", value: "15+" }
      ]
    },
    {
      id: 1,
      title: "Cloud Infrastructure",
      description: "Global content delivery network ensuring 99.9% uptime and lightning-fast access",
      icon: <Cloud className="w-8 h-8" />,
      gradient: "from-green-500 to-teal-600",
      details: [
        "Multi-region cloud deployment",
        "Auto-scaling infrastructure",
        "CDN optimization worldwide",
        "Real-time data synchronization",
        "Disaster recovery systems",
        "Load balancing algorithms"
      ],
      stats: [
        { label: "Uptime", value: "99.9%" },
        { label: "Regions", value: "25+" },
        { label: "Speed", value: "<100ms" }
      ]
    },
    {
      id: 2,
      title: "Security & Privacy",
      description: "Military-grade encryption and privacy protection for all user data",
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-red-500 to-pink-600",
      details: [
        "End-to-end encryption",
        "GDPR compliance framework",
        "Biometric authentication",
        "Zero-knowledge architecture",
        "Regular security audits",
        "Data anonymization protocols"
      ],
      stats: [
        { label: "Encryption", value: "AES-256" },
        { label: "Compliance", value: "100%" },
        { label: "Audits", value: "Monthly" }
      ]
    },
    {
      id: 3,
      title: "Cross-Platform Sync",
      description: "Seamless experience across all devices with real-time synchronization",
      icon: <Smartphone className="w-8 h-8" />,
      gradient: "from-orange-500 to-yellow-600",
      details: [
        "Real-time data synchronization",
        "Offline mode support",
        "Cross-device continuity",
        "Progressive web app technology",
        "Native mobile applications",
        "Responsive design framework"
      ],
      stats: [
        { label: "Devices", value: "All" },
        { label: "Sync Time", value: "Instant" },
        { label: "Offline", value: "100%" }
      ]
    }
  ];

  const performanceMetrics = [
    { icon: <TrendingUp className="w-6 h-6" />, label: "Performance Boost", value: "340%", color: "text-green-500" },
    { icon: <Zap className="w-6 h-6" />, label: "Loading Speed", value: "3x Faster", color: "text-yellow-500" },
    { icon: <Database className="w-6 h-6" />, label: "Data Processing", value: "50TB/day", color: "text-blue-500" },
    { icon: <Globe className="w-6 h-6" />, label: "Global Reach", value: "195 Countries", color: "text-purple-500" }
  ];

  const technologyStack = [
    { name: "React 18", category: "Frontend", icon: "⚛️" },
    { name: "TypeScript", category: "Language", icon: "🔷" },
    { name: "Next.js", category: "Framework", icon: "▲" },
    { name: "TailwindCSS", category: "Styling", icon: "🎨" },
    { name: "Three.js", category: "3D Graphics", icon: "🎲" },
    { name: "Framer Motion", category: "Animation", icon: "🎬" },
    { name: "Node.js", category: "Backend", icon: "🟢" },
    { name: "MongoDB", category: "Database", icon: "🍃" },
    { name: "Redis", category: "Cache", icon: "🔴" },
    { name: "AWS", category: "Cloud", icon: "☁️" },
    { name: "TensorFlow", category: "AI/ML", icon: "🧠" },
    { name: "Docker", category: "Container", icon: "🐳" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % techFeatures.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-br from-background-secondary via-background to-background-tertiary">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Tech grid pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(245, 158, 11, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px, 40px 40px, 80px 80px, 80px 80px"
          }}
        />

        {/* Floating tech elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`tech-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {i % 4 === 0 && <Cpu className="w-6 h-6 text-primary/30" />}
            {i % 4 === 1 && <Database className="w-6 h-6 text-accent/30" />}
            {i % 4 === 2 && <Globe className="w-6 h-6 text-secondary/30" />}
            {i % 4 === 3 && <Zap className="w-6 h-6 text-primary/30" />}
          </motion.div>
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
            <Cpu className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">Advanced Technology</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-space">
            <span className="gradient-text">Cutting-Edge</span>{" "}
            <span className="text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
              Infrastructure
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto font-manrope">
            Powered by the latest technologies and{" "}
            <span className="gradient-text-accent font-semibold">AI innovations</span> to deliver{" "}
            <span className="text-primary font-semibold">unmatched performance</span> and reliability.
          </p>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-2xl glassmorphism group hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 ${metric.color} mb-3 group-hover:scale-110 transition-transform`}>
                {metric.icon}
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">{metric.value}</div>
              <div className="text-sm text-foreground-secondary">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Features - Interactive Tabs */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-8 gradient-text">Core Technologies</h3>
            <div className="space-y-4">
              {techFeatures.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeTab === index 
                      ? 'glassmorphism border-primary/40 shadow-lg' 
                      : 'border border-border/20 hover:border-primary/20'
                  }`}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white transition-transform ${
                      activeTab === index ? 'scale-110' : ''
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-1">{feature.title}</h4>
                      <p className="text-foreground-secondary text-sm">{feature.description}</p>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-primary transition-transform ${
                      activeTab === index ? 'translate-x-1' : ''
                    }`} />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Feature Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glassmorphism p-8 rounded-3xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${techFeatures[activeTab].gradient} text-white`}>
                    {techFeatures[activeTab].icon}
                  </div>
                  <h3 className="text-2xl font-bold">{techFeatures[activeTab].title}</h3>
                </div>

                <p className="text-foreground-secondary mb-6 text-lg">
                  {techFeatures[activeTab].description}
                </p>

                <div className="space-y-3 mb-8">
                  {techFeatures[activeTab].details.map((detail, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-foreground-secondary">{detail}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {techFeatures[activeTab].stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-xl font-bold gradient-text">{stat.value}</div>
                      <div className="text-sm text-foreground-secondary">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Technology Stack */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-4xl font-bold mb-12 gradient-text">Our Technology Stack</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologyStack.map((tech, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl glassmorphism hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <div className="font-semibold text-primary mb-1">{tech.name}</div>
                <div className="text-sm text-foreground-secondary">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="inline-flex gap-6">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button className="btn-hero bg-gradient-to-r from-primary to-accent px-10 py-5 text-xl font-space">
                Experience the Technology
                <Rocket className="w-6 h-6 ml-3" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedTechnologyShowcase;