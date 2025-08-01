import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Text3D, Center } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Library, Download, Users, Star,
  BookOpen, Award, TrendingUp, Globe,
  Clock, Eye, Heart, Share2,
  Zap, Target, Crown, Gift
} from 'lucide-react';

// 3D Scene for Book Library Stats
const BookStatsScene = () => {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} color="#8b5cf6" intensity={0.6} />
      
      {/* Floating 3D Books */}
      {Array.from({ length: 15 }, (_, i) => (
        <Float
          key={`book-${i}`}
          speed={1 + Math.random() * 1.5}
          rotationIntensity={0.3 + Math.random() * 0.3}
          floatIntensity={0.4 + Math.random() * 0.4}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 35,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <boxGeometry args={[0.3, 1, 0.8]} />
            <meshStandardMaterial
              color={`hsl(${(i * 25) % 360}, 75%, 65%)`}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Central 3D Library Icon */}
      <Center>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={1.8}
            height={0.4}
            position={[0, 0, 0]}
          >
            LIBRARY
            <meshStandardMaterial color="#8b5cf6" />
          </Text3D>
        </Float>
      </Center>
    </>
  );
};

const libraryStats = [
  {
    icon: Library,
    label: "Total Books",
    value: "50,000+",
    description: "Comprehensive digital collection",
    color: "from-purple-500 to-indigo-500",
    growth: "+25%",
    detail: "Across all subjects"
  },
  {
    icon: Download,
    label: "Downloads",
    value: "10M+",
    description: "Monthly book downloads",
    color: "from-blue-500 to-cyan-500",
    growth: "+85%",
    detail: "Growing rapidly"
  },
  {
    icon: Users,
    label: "Active Readers",
    value: "2.5M+",
    description: "Students using library daily",
    color: "from-green-500 to-emerald-500",
    growth: "+45%",
    detail: "Engaged community"
  },
  {
    icon: Star,
    label: "Average Rating",
    value: "4.8/5",
    description: "User satisfaction score",
    color: "from-yellow-500 to-orange-500",
    growth: "+0.3",
    detail: "Highly rated content"
  },
  {
    icon: TrendingUp,
    label: "Success Rate",
    value: "94%",
    description: "Students achieving goals",
    color: "from-red-500 to-pink-500",
    growth: "+12%",
    detail: "Proven effectiveness"
  },
  {
    icon: Globe,
    label: "Global Reach",
    value: "180+",
    description: "Countries served",
    color: "from-indigo-500 to-purple-500",
    growth: "+30",
    detail: "Worldwide access"
  }
];

const subjectDistribution = [
  { subject: "Engineering", books: 12500, percentage: 25, color: "from-blue-500 to-cyan-500" },
  { subject: "Medical", books: 8900, percentage: 18, color: "from-red-500 to-pink-500" },
  { subject: "Management", books: 7200, percentage: 14, color: "from-green-500 to-emerald-500" },
  { subject: "Arts & Literature", books: 6800, percentage: 14, color: "from-purple-500 to-indigo-500" },
  { subject: "Science", books: 5900, percentage: 12, color: "from-yellow-500 to-orange-500" },
  { subject: "Technology", books: 4700, percentage: 9, color: "from-cyan-500 to-blue-500" },
  { subject: "Others", books: 4000, percentage: 8, color: "from-gray-500 to-slate-500" }
];

const popularBooks = [
  { title: "Data Structures & Algorithms", downloads: 45000, rating: 4.9 },
  { title: "Organic Chemistry", downloads: 38000, rating: 4.8 },
  { title: "Digital Marketing", downloads: 32000, rating: 4.7 },
  { title: "Machine Learning", downloads: 29000, rating: 4.9 },
  { title: "Financial Markets", downloads: 25000, rating: 4.6 }
];

const achievements = [
  { title: "Best Digital Library 2024", icon: Crown, color: "from-yellow-500 to-orange-500" },
  { title: "Innovation in Education", icon: Zap, color: "from-blue-500 to-cyan-500" },
  { title: "Student Choice Award", icon: Star, color: "from-purple-500 to-pink-500" },
  { title: "Excellence in Content", icon: Award, color: "from-green-500 to-emerald-500" }
];

export const Enhanced3DBookStatsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
          <BookStatsScene />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
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
            className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6"
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              boxShadow: [
                '0 0 20px rgba(139, 92, 246, 0.3)',
                '0 0 40px rgba(139, 92, 246, 0.5)',
                '0 0 20px rgba(139, 92, 246, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Library className="w-5 h-5 text-purple-500" />
            <span className="text-purple-500 font-semibold">Library Analytics</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Knowledge by Numbers
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Insights from the world's largest educational book repository
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
          {libraryStats.map((stat, index) => {
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
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="glassmorphism border-2 border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 h-full relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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

        {/* Subject Distribution & Popular Books */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Subject Distribution */}
          <Card className="glassmorphism border-2 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="w-6 h-6 text-purple-500" />
                Subject Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjectDistribution.map((item, index) => (
                <motion.div
                  key={item.subject}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{item.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground-secondary">{item.books.toLocaleString()}</span>
                      <Badge className={`bg-gradient-to-r ${item.color} text-white border-0`}>
                        {item.percentage}%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${item.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Popular Books */}
          <Card className="glassmorphism border-2 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <TrendingUp className="w-6 h-6 text-purple-500" />
                Most Downloaded
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {popularBooks.map((book, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 bg-background-secondary/30 rounded-lg hover:bg-background-secondary/50 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-1">{book.title}</div>
                    <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{book.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{book.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                    #{index + 1}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-8">
            Recognition & Awards
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="glassmorphism border-2 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          delay: index * 0.5 
                        }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h4 className="font-semibold text-foreground text-sm">
                        {achievement.title}
                      </h4>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </section>
  );
};