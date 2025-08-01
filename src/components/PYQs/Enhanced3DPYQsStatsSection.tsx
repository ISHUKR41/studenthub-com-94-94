import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Text3D, Center } from '@react-three/drei';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, Users, Trophy, Target,
  TrendingUp, Award, Clock, Star,
  Download, Eye, Share2, Heart,
  Zap, Rocket, Crown, Gift
} from 'lucide-react';

// 3D Scene for PYQs Stats
const PYQsStatsScene = () => {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} color="#3b82f6" intensity={0.6} />
      
      {/* Floating 3D elements */}
      {Array.from({ length: 12 }, (_, i) => (
        <Float
          key={`element-${i}`}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.4 + Math.random() * 0.4}
          floatIntensity={0.3 + Math.random() * 0.5}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            {i % 4 === 0 ? (
              <boxGeometry args={[0.8, 0.8, 0.8]} />
            ) : i % 4 === 1 ? (
              <sphereGeometry args={[0.6, 12, 12]} />
            ) : i % 4 === 2 ? (
              <cylinderGeometry args={[0.4, 0.4, 1.2, 6]} />
            ) : (
              <octahedronGeometry args={[0.7]} />
            )}
            <meshStandardMaterial
              color={`hsl(${(i * 30) % 360}, 70%, 60%)`}
              transparent
              opacity={0.6}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Central 3D Text */}
      <Center>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={2}
            height={0.5}
            position={[0, 0, 0]}
          >
            PYQs
            <meshStandardMaterial color="#3b82f6" />
          </Text3D>
        </Float>
      </Center>
    </>
  );
};

const pyqsStats = [
  {
    icon: BookOpen,
    label: "Question Papers",
    value: "25,000+",
    description: "Previous year question papers",
    color: "from-blue-500 to-cyan-500",
    growth: "+40%",
    detail: "Covering all major exams"
  },
  {
    icon: Users,
    label: "Active Students",
    value: "1.2M+",
    description: "Students practicing daily",
    color: "from-green-500 to-emerald-500",
    growth: "+65%",
    detail: "Growing community"
  },
  {
    icon: Trophy,
    label: "Success Rate",
    value: "89%",
    description: "Students clearing target exams",
    color: "from-yellow-500 to-orange-500",
    growth: "+15%",
    detail: "Proven results"
  },
  {
    icon: Target,
    label: "Exams Covered",
    value: "150+",
    description: "Different competitive exams",
    color: "from-purple-500 to-pink-500",
    growth: "+25%",
    detail: "Comprehensive coverage"
  },
  {
    icon: Download,
    label: "Downloads",
    value: "5M+",
    description: "Question papers downloaded",
    color: "from-red-500 to-pink-500",
    growth: "+120%",
    detail: "Monthly downloads"
  },
  {
    icon: Award,
    label: "Top Scorers",
    value: "50K+",
    description: "Students with 90%+ scores",
    color: "from-indigo-500 to-purple-500",
    growth: "+35%",
    detail: "Excellence achieved"
  }
];

const examCategories = [
  { name: "JEE Main/Advanced", papers: 3500, students: 450000, success: 92 },
  { name: "NEET", papers: 2800, students: 380000, success: 88 },
  { name: "UPSC", papers: 4200, students: 290000, success: 78 },
  { name: "CAT", papers: 1900, students: 180000, success: 85 },
  { name: "GATE", papers: 3100, students: 320000, success: 90 },
  { name: "SSC", papers: 5600, students: 520000, success: 83 }
];

const achievements = [
  { title: "Best PYQ Platform 2024", organization: "Education Excellence Awards", icon: Crown },
  { title: "Top Student Choice", organization: "Student Review Awards", icon: Star },
  { title: "Innovation in Learning", organization: "EdTech Summit 2024", icon: Rocket },
  { title: "Quality Assurance", organization: "National Education Board", icon: Award }
];

export const Enhanced3DPYQsStatsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <PYQsStatsScene />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

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
            <span className="text-primary font-semibold">Performance Metrics</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Success by Numbers
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Data-driven insights from India's largest PYQ practice platform
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
          {pyqsStats.map((stat, index) => {
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
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="glassmorphism border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 h-full relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Icon className="w-7 h-7 text-white" />
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
                      className="text-4xl font-bold text-foreground mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {stat.value}
                    </motion.h3>
                    
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {stat.label}
                    </h4>
                    
                    <p className="text-foreground-secondary text-sm mb-2">
                      {stat.description}
                    </p>
                    
                    <Badge variant="outline" className="text-xs">
                      {stat.detail}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Exam Categories Performance */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="glassmorphism border-2 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                Exam-wise Performance
              </h3>
              
              <div className="space-y-6">
                {examCategories.map((exam, index) => (
                  <motion.div
                    key={exam.name}
                    className="space-y-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{exam.name}</span>
                      <Badge className="bg-primary/10 text-primary">{exam.success}% Success</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-foreground-secondary">
                      <div>Papers: {exam.papers.toLocaleString()}</div>
                      <div>Students: {exam.students.toLocaleString()}</div>
                    </div>
                    
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${exam.success}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements & Recognition */}
          <Card className="glassmorphism border-2 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-primary" />
                Awards & Recognition
              </h3>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-background-secondary/30 rounded-lg hover:bg-background-secondary/50 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                      
                      <div>
                        <div className="font-semibold text-foreground">{achievement.title}</div>
                        <div className="text-sm text-foreground-secondary">{achievement.organization}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Overall Rating */}
              <motion.div
                className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    >
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-2xl font-bold text-foreground">4.9/5.0</div>
                <div className="text-sm text-foreground-secondary">Based on 50,000+ reviews</div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
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
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </section>
  );
};