import React, { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Environment, 
  PerspectiveCamera, 
  OrbitControls,
  Stars,
  Points,
  PointMaterial,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
  Text3D,
  Center
} from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Users, 
  Download, 
  Star, 
  Sparkles,
  ArrowRight,
  Play,
  TrendingUp,
  Award,
  Globe,
  Zap,
  Brain,
  Rocket,
  Shield,
  Heart,
  Target,
  GraduationCap,
  Trophy,
  ChevronDown
} from 'lucide-react';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Simplified 3D Floating Book Component
const FloatingBook = ({ position, color, rotation = [0, 0, 0] }: { position: [number, number, number], color: string, rotation?: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime + position[1]) * 0.15;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.3, 0.4, 0.05]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
};

// Simplified 3D Knowledge Orb Component
const KnowledgeOrb = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#3B82F6"
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// Simplified 3D Scene
const Enhanced3DHeroScene = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 10;
  }, [camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4F46E5" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#10B981" />
      
      <Environment preset="city" />
      <Stars radius={80} depth={30} count={2000} factor={2} saturation={0} fade />
      
      {/* Reduced Floating Elements for better performance */}
      <FloatingBook position={[-3, 1, -2]} color="#3B82F6" rotation={[0.2, 0.3, 0]} />
      <FloatingBook position={[3, -1, -2]} color="#10B981" rotation={[-0.1, -0.2, 0.1]} />
      <FloatingBook position={[0, -2, -3]} color="#F59E0B" rotation={[0.3, 0.1, -0.2]} />
      
      {/* Reduced Knowledge Orbs */}
      <KnowledgeOrb position={[-4, 0, -4]} />
      <KnowledgeOrb position={[4, 1, -5]} />
    </>
  );
};

export const Enhanced3DHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });
  const y = useTransform(smoothProgress, [0, 1], [0, -300]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.95, 0.9]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroStats = [
    { 
      icon: <BookOpen className="w-6 h-6" />, 
      value: "25,000+", 
      label: "Question Papers",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <Users className="w-6 h-6" />, 
      value: "170M+", 
      label: "Students Served",
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: <Download className="w-6 h-6" />, 
      value: "50M+", 
      label: "Downloads",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: <Star className="w-6 h-6" />, 
      value: "4.9★", 
      label: "User Rating",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const achievements = [
    { icon: <Award className="w-5 h-5" />, text: "#1 Student Platform" },
    { icon: <Globe className="w-5 h-5" />, text: "22+ Languages" },
    { icon: <Shield className="w-5 h-5" />, text: "100% Secure" },
    { icon: <Zap className="w-5 h-5" />, text: "Lightning Fast" }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Search",
      description: "Find exactly what you need with intelligent search algorithms"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Instant Downloads",
      description: "Get your study materials in seconds, not minutes"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community Driven",
      description: "Built by students, for students across India"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Exam Focused",
      description: "Curated content for NEET, JEE, UPSC, and more"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden pt-0">
      {/* Remove default padding/margin to eliminate gap */}
      {/* Enhanced 3D Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity, scale }}
      >
        <Canvas 
          className="w-full h-full"
          gl={{ antialias: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <Enhanced3DHeroScene />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Achievement Badges */}
              <motion.div 
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {achievements.map((achievement, index) => (
                  <Badge 
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 hover:scale-105 transition-transform"
                  >
                    {achievement.icon}
                    <span className="ml-2">{achievement.text}</span>
                  </Badge>
                ))}
              </motion.div>

              {/* Ultra Enhanced Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative"
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight font-space relative z-10">
                  <motion.span 
                    className="block gradient-text"
                    animate={{ 
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    Transform Your
                  </motion.span>
                  <motion.span 
                    className="block text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text relative"
                    animate={{ 
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    style={{
                      backgroundSize: "300% 300%",
                    }}
                  >
                    Academic Journey
                    {/* Enhanced text glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 blur-2xl -z-10"
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.span>
                </h1>
                
                {/* Floating particles around text */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`text-particle-${i}`}
                    className="absolute w-2 h-2 bg-primary/40 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      x: [0, Math.random() * 100 - 50, 0],
                      y: [0, Math.random() * 100 - 50, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>

              {/* Enhanced Subtitle with typewriter effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative"
              >
                <motion.p 
                  className="text-xl md:text-3xl lg:text-4xl text-foreground-secondary max-w-4xl font-manrope leading-relaxed"
                  style={{ fontWeight: 400 }}
                >
                  India's most <motion.span 
                    className="gradient-text-accent font-semibold"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    advanced student platform
                  </motion.span> with{" "}
                  <motion.span 
                    className="text-primary font-bold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    25,000+ question papers
                  </motion.span>, 
                  AI-powered tools, and a community of{" "}
                  <motion.span 
                    className="gradient-text-secondary font-bold"
                    animate={{ 
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    170 million students
                  </motion.span>.
                </motion.p>
                
                {/* Subtitle glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 blur-xl -z-10"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>

              {/* Ultra Enhanced CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <Button 
                    className="btn-hero bg-gradient-to-r from-primary via-accent to-secondary px-10 py-5 text-xl group relative overflow-hidden font-space"
                    size="lg"
                  >
                    {/* Button background effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10 flex items-center">
                      Start Learning Now
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6 ml-3" />
                      </motion.div>
                    </span>
                  </Button>
                  
                  {/* Button glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-40 blur-xl -z-10"
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <Button 
                    variant="outline" 
                    className="px-10 py-5 text-xl border-2 border-primary/40 hover:border-primary bg-background/50 backdrop-blur-sm group relative overflow-hidden font-space"
                    size="lg"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Play className="w-6 h-6 mr-3" />
                      </motion.div>
                      Watch Demo
                    </span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-2xl glassmorphism group hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-foreground-secondary">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Feature Cards */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <Card className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white group-hover:scale-110 transition-transform">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-foreground-secondary">
                            {feature.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-foreground-secondary"
        >
          <div className="text-sm">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};