import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Text3D, Points, PointMaterial, Sparkles } from '@react-three/drei';
import { Safe3DCanvas } from '../News/Safe3DCanvas';
import { Enhanced3DPYQsHero } from './Enhanced3DPYQsHero';
import { Enhanced3DPYQsStatsSection } from './Enhanced3DPYQsStatsSection';
import { 
  BookOpen, Search, Filter, Calendar, TrendingUp, Award, Trophy,
  GraduationCap, Brain, Target, Star, Clock, Download, Share2,
  Eye, Heart, MessageCircle, Users, FileText, Zap, Shield,
  Database, Cpu, Network, Atom, Globe, Building, Laptop,
  User, UserCheck, Settings, Bell, Mail, Phone, Home,
  ChevronDown, ArrowRight, Play, Pause, RotateCw, RefreshCw,
  BarChart3, PieChart, LineChart, Activity, TrendingDown,
  Bookmark, Send, ThumbsUp, CheckCircle, XCircle, AlertCircle,
  Lightbulb, Crown, Briefcase, School, Library, Calculator,
  Microscope, Beaker, FlaskConical, Atom as AtomIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import { Progress } from '@/components/ui/progress';
import * as THREE from 'three';

// Enhanced 3D Scene for PYQs
const UltraMega3DPYQsScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const bookRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    
    bookRefs.current.forEach((book, i) => {
      if (book) {
        book.rotation.x = Math.sin(state.clock.elapsedTime + i) * 0.1;
        book.rotation.z = Math.cos(state.clock.elapsedTime + i) * 0.1;
      }
    });
  });

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(4000 * 3);
    for (let i = 0; i < 4000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return positions;
  }, []);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[20, 20, 10]} intensity={1.2} />
      <pointLight position={[-20, -20, -10]} color="#10b981" intensity={0.8} />
      <spotLight position={[0, 30, 0]} angle={0.3} penumbra={0.5} intensity={0.5} />
      
      {/* Enhanced Particle Field */}
      <Points positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#10b981"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* 3D Floating Question Papers */}
      <group ref={groupRef}>
        {Array.from({ length: 25 }, (_, i) => (
          <Float
            key={`pyq-${i}`}
            speed={1 + Math.random() * 2}
            rotationIntensity={0.2 + Math.random() * 0.5}
            floatIntensity={0.3 + Math.random() * 0.7}
          >
            <mesh
              ref={(el) => { if (el) bookRefs.current[i] = el; }}
              position={[
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
              ]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            >
              {i % 6 === 0 ? (
                <boxGeometry args={[1.5, 2, 0.2]} />
              ) : i % 6 === 1 ? (
                <cylinderGeometry args={[0.3, 0.5, 1.5, 6]} />
              ) : i % 6 === 2 ? (
                <octahedronGeometry args={[0.8]} />
              ) : i % 6 === 3 ? (
                <dodecahedronGeometry args={[0.7]} />
              ) : i % 6 === 4 ? (
                <torusGeometry args={[0.6, 0.2, 8, 16]} />
              ) : (
                <icosahedronGeometry args={[0.9]} />
              )}
              <meshStandardMaterial
                color={
                  i % 6 === 0 ? '#10b981' :
                  i % 6 === 1 ? '#3b82f6' :
                  i % 6 === 2 ? '#f59e0b' :
                  i % 6 === 3 ? '#ef4444' :
                  i % 6 === 4 ? '#8b5cf6' : '#06b6d4'
                }
                transparent
                opacity={0.4 + Math.random() * 0.3}
                wireframe={i % 4 === 0}
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>
          </Float>
        ))}
      </group>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </>
  );
};

// Enhanced Exam Categories
const EXAM_CATEGORIES = [
  { 
    name: 'JEE Main/Advanced', 
    icon: Calculator, 
    color: 'from-blue-500 to-blue-600', 
    count: '2000+',
    papers: 45,
    years: '2010-2024',
    difficulty: 'Hard'
  },
  { 
    name: 'NEET', 
    icon: Microscope, 
    color: 'from-green-500 to-green-600', 
    count: '1800+',
    papers: 38,
    years: '2010-2024',
    difficulty: 'Hard'
  },
  { 
    name: 'GATE', 
    icon: Cpu, 
    color: 'from-purple-500 to-purple-600', 
    count: '1500+',
    papers: 42,
    years: '2008-2024',
    difficulty: 'Expert'
  },
  { 
    name: 'CAT/MBA', 
    icon: Briefcase, 
    color: 'from-yellow-500 to-yellow-600', 
    count: '1200+',
    papers: 32,
    years: '2012-2024',
    difficulty: 'Hard'
  },
  { 
    name: 'UPSC', 
    icon: Building, 
    color: 'from-red-500 to-red-600', 
    count: '2500+',
    papers: 55,
    years: '2005-2024',
    difficulty: 'Expert'
  },
  { 
    name: 'SSC/Banking', 
    icon: Trophy, 
    color: 'from-indigo-500 to-indigo-600', 
    count: '3000+',
    papers: 68,
    years: '2008-2024',
    difficulty: 'Medium'
  },
  { 
    name: 'State Board', 
    icon: School, 
    color: 'from-teal-500 to-teal-600', 
    count: '5000+',
    papers: 120,
    years: '2010-2024',
    difficulty: 'Medium'
  },
  { 
    name: 'CBSE/ICSE', 
    icon: BookOpen, 
    color: 'from-pink-500 to-pink-600', 
    count: '4500+',
    papers: 95,
    years: '2005-2024',
    difficulty: 'Easy'
  }
];

// Enhanced PYQ Data
const FEATURED_PYQS = [
  {
    id: 1,
    title: "JEE Main 2024 Physics Paper Analysis & Solutions",
    exam: "JEE Main",
    subject: "Physics",
    year: "2024",
    difficulty: "Hard",
    questions: 30,
    solved: 28,
    accuracy: 93,
    downloads: 15432,
    likes: 892,
    views: 45632,
    tags: ["Mechanics", "Waves", "Modern Physics", "Electromagnetism"],
    featured: true,
    trending: true,
    premium: false
  },
  {
    id: 2,
    title: "NEET 2024 Biology Complete Question Bank",
    exam: "NEET",
    subject: "Biology",
    year: "2024",
    difficulty: "Hard",
    questions: 45,
    solved: 43,
    accuracy: 96,
    downloads: 12876,
    likes: 654,
    views: 38291,
    tags: ["Botany", "Zoology", "Human Physiology", "Ecology"],
    featured: true,
    trending: true,
    premium: true
  },
  {
    id: 3,
    title: "GATE Computer Science 2024 Comprehensive Set",
    exam: "GATE",
    subject: "Computer Science",
    year: "2024",
    difficulty: "Expert",
    questions: 65,
    solved: 58,
    accuracy: 89,
    downloads: 9876,
    likes: 543,
    views: 29187,
    tags: ["Algorithms", "Data Structures", "DBMS", "Computer Networks"],
    featured: true,
    trending: false,
    premium: true
  },
  {
    id: 4,
    title: "CAT 2023 Quantitative Aptitude Master Set",
    exam: "CAT",
    subject: "Quantitative Aptitude",
    year: "2023",
    difficulty: "Hard",
    questions: 22,
    solved: 20,
    accuracy: 91,
    downloads: 8765,
    likes: 432,
    views: 25643,
    tags: ["Arithmetic", "Algebra", "Geometry", "Data Interpretation"],
    featured: false,
    trending: true,
    premium: false
  },
  {
    id: 5,
    title: "UPSC Prelims 2024 General Studies Paper I",
    exam: "UPSC",
    subject: "General Studies",
    year: "2024",
    difficulty: "Expert",
    questions: 100,
    solved: 95,
    accuracy: 95,
    downloads: 11234,
    likes: 765,
    views: 34567,
    tags: ["History", "Geography", "Polity", "Economics"],
    featured: true,
    trending: true,
    premium: false
  },
  {
    id: 6,
    title: "SSC CGL 2024 Reasoning & General Intelligence",
    exam: "SSC CGL",
    subject: "Reasoning",
    year: "2024",
    difficulty: "Medium",
    questions: 25,
    solved: 23,
    accuracy: 92,
    downloads: 7654,
    likes: 321,
    views: 19876,
    tags: ["Logical Reasoning", "Verbal Reasoning", "Non-Verbal", "Coding"],
    featured: false,
    trending: false,
    premium: false
  }
];

// PYQ Stats
const PYQ_STATS = {
  totalPapers: "25k+",
  totalQuestions: "500k+", 
  examsCovered: "50+",
  students: "2M+",
  successRate: "95%",
  avgScore: "85%"
};

export const UltraMega3DPYQsHub: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending' | 'difficulty'>('latest');
  const [filteredPYQs, setFilteredPYQs] = useState(FEATURED_PYQS);
  const [isLoading, setIsLoading] = useState(false);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -250]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.7]);

  // Enhanced filter logic
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = FEATURED_PYQS;
      
      if (selectedExam !== 'All') {
        filtered = filtered.filter(pyq => pyq.exam.includes(selectedExam));
      }
      
      if (selectedSubject !== 'All') {
        filtered = filtered.filter(pyq => pyq.subject === selectedSubject);
      }
      
      if (selectedYear !== 'All') {
        filtered = filtered.filter(pyq => pyq.year === selectedYear);
      }
      
      if (difficultyFilter !== 'All') {
        filtered = filtered.filter(pyq => pyq.difficulty === difficultyFilter);
      }
      
      if (showPremiumOnly) {
        filtered = filtered.filter(pyq => pyq.premium);
      }
      
      if (searchQuery) {
        filtered = filtered.filter(pyq => 
          pyq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pyq.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pyq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pyq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      // Enhanced sort logic
      if (sortBy === 'popular') {
        filtered = [...filtered].sort((a, b) => b.downloads - a.downloads);
      } else if (sortBy === 'trending') {
        filtered = [...filtered].sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.views - a.views;
        });
      } else if (sortBy === 'difficulty') {
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3, 'Expert': 4 };
        filtered = [...filtered].sort((a, b) => 
          difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - 
          difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
        );
      } else {
        filtered = [...filtered].sort((a, b) => parseInt(b.year) - parseInt(a.year));
      }
      
      setFilteredPYQs(filtered);
      setIsLoading(false);
    }, 400);
    
    return () => clearTimeout(timer);
  }, [selectedExam, selectedSubject, selectedYear, searchQuery, difficultyFilter, sortBy, showPremiumOnly]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500 bg-green-500/10';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'Hard': return 'text-orange-500 bg-orange-500/10';
      case 'Expert': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <ParallaxContainer className="relative">
      {/* Enhanced 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Safe3DCanvas className="w-full h-full">
          <UltraMega3DPYQsScene />
        </Safe3DCanvas>
      </div>

      {/* Ultra Enhanced Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: y1, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-background/60 to-blue-500/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center space-y-10"
          >
            <motion.div
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-500/30"
            >
              <BookOpen className="w-7 h-7 text-green-500" />
              <span className="text-white font-semibold text-lg">PYQ Universe</span>
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
            </motion.div>
            
            <motion.h1 
              className="text-7xl lg:text-9xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-space tracking-tight leading-tight"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              Master PYQs
            </motion.h1>
            
            <motion.p 
              className="text-2xl lg:text-3xl text-foreground-secondary max-w-5xl mx-auto leading-relaxed font-inter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Unlock your potential with comprehensive Previous Year Questions from top competitive exams. 
              Practice, analyze, and excel with our AI-powered learning platform.
            </motion.p>

            {/* Enhanced Search Interface */}
            <motion.div 
              className="max-w-4xl mx-auto space-y-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-foreground-secondary w-6 h-6" />
                <Input
                  type="text"
                  placeholder="Search PYQs by exam, subject, topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-16 pr-6 py-5 text-xl bg-background/60 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl focus:border-green-500/60 transition-all duration-300"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.02 }}
                />
              </div>

              {/* Quick Filter Chips */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {['All', 'JEE', 'NEET', 'GATE', 'CAT', 'UPSC'].map((exam) => (
                  <motion.button
                    key={exam}
                    onClick={() => setSelectedExam(exam)}
                    className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                      selectedExam === exam
                        ? 'border-green-500 bg-green-500/20 text-green-300'
                        : 'border-muted hover:border-green-500/50 bg-background/30 backdrop-blur-sm'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {exam}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Live Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-6 gap-8 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1 }}
            >
              {Object.entries(PYQ_STATS).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-green-500 group-hover:text-blue-500 transition-colors mb-2">
                    {value}
                  </div>
                  <div className="text-sm text-foreground-secondary capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Floating Elements */}
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-green-500/30 rounded-full"
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.8, 1.4, 0.8],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.section>

      {/* Enhanced Exam Categories Section */}
      <motion.section 
        className="relative py-20 bg-background/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Exam Categories
            </h2>
            <p className="text-2xl text-foreground-secondary max-w-3xl mx-auto">
              Comprehensive question banks for all major competitive examinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {EXAM_CATEGORIES.map((exam, index) => (
              <motion.div
                key={exam.name}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="overflow-hidden bg-background/60 backdrop-blur-sm border-2 border-muted hover:border-green-500/50 transition-all duration-500 h-full">
                  <CardHeader className="relative p-8">
                    <div className={`absolute inset-0 bg-gradient-to-br ${exam.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10 text-center space-y-4">
                      <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${exam.color} flex items-center justify-center`}>
                        <exam.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-2">{exam.name}</h3>
                        <Badge className={`bg-gradient-to-r ${exam.color} text-white border-0`}>
                          {exam.count} Questions
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-foreground">{exam.papers}</div>
                        <div className="text-foreground-secondary">Papers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-foreground">{exam.years}</div>
                        <div className="text-foreground-secondary">Years</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(exam.difficulty)}
                      >
                        {exam.difficulty}
                      </Badge>
                    </div>
                    
                    <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                      Explore Papers
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Featured PYQs Section */}
      <motion.section 
        className="relative py-20"
        style={{ y: y2 }}
      >
        <div className="container mx-auto px-4">
          {/* Advanced Filter Controls */}
          <motion.div 
            className="bg-background/50 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-muted"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-3 bg-background/60 backdrop-blur-sm border border-muted rounded-xl focus:border-green-500"
              >
                <option value="All">All Subjects</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-3 bg-background/60 backdrop-blur-sm border border-muted rounded-xl focus:border-green-500"
              >
                <option value="All">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>

              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-4 py-3 bg-background/60 backdrop-blur-sm border border-muted rounded-xl focus:border-green-500"
              >
                <option value="All">All Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Expert">Expert</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 bg-background/60 backdrop-blur-sm border border-muted rounded-xl focus:border-green-500"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
                <option value="difficulty">By Difficulty</option>
              </select>

              <div className="flex items-center justify-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPremiumOnly}
                    onChange={(e) => setShowPremiumOnly(e.target.checked)}
                    className="rounded border-muted text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm">Premium Only</span>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground-secondary">
                  {filteredPYQs.length} Results
                </span>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 animate-pulse">
                  <div className="w-full h-40 bg-muted rounded-xl mb-6" />
                  <div className="h-6 bg-muted rounded mb-4" />
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          )}

          {/* Enhanced PYQ Cards */}
          {!isLoading && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {filteredPYQs.map((pyq, index) => (
                <motion.div
                  key={pyq.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <Card className="overflow-hidden bg-background/60 backdrop-blur-sm border-2 border-muted hover:border-green-500/50 transition-all duration-500 h-full">
                    <CardHeader className="p-8 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs font-medium">
                            {pyq.exam}
                          </Badge>
                          {pyq.trending && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          {pyq.premium && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                              <Crown className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={getDifficultyColor(pyq.difficulty)}
                        >
                          {pyq.difficulty}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold leading-tight group-hover:text-green-500 transition-colors">
                        {pyq.title}
                      </h3>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-foreground-secondary">Subject: </span>
                          <span className="font-medium">{pyq.subject}</span>
                        </div>
                        <div>
                          <span className="text-foreground-secondary">Year: </span>
                          <span className="font-medium">{pyq.year}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 pt-0 space-y-6">
                      {/* Progress Section */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{pyq.solved}/{pyq.questions} solved</span>
                        </div>
                        <Progress 
                          value={(pyq.solved / pyq.questions) * 100} 
                          className="h-2 bg-muted"
                        />
                        <div className="flex items-center justify-between text-xs text-foreground-secondary">
                          <span>Accuracy: {pyq.accuracy}%</span>
                          <span>{pyq.questions} questions</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {pyq.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {pyq.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{pyq.tags.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-foreground-secondary border-t border-muted pt-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            <span>{(pyq.downloads / 1000).toFixed(1)}k</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{pyq.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{(pyq.views / 1000).toFixed(1)}k</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:border-green-500/50 hover:text-green-500"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Results */}
          {!isLoading && filteredPYQs.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BookOpen className="w-20 h-20 mx-auto text-foreground-secondary mb-6" />
              <h3 className="text-3xl font-bold mb-4">No PYQs found</h3>
              <p className="text-foreground-secondary text-lg">
                Try adjusting your filters or search terms
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Enhanced Call-to-Action Section */}
      <motion.section 
        className="relative py-24 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Ready to Excel?
            </h2>
            <p className="text-2xl text-foreground-secondary">
              Join millions of successful students who have mastered competitive exams with our comprehensive PYQ platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg"
                className="px-10 py-4 text-lg bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                Start Practicing Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-10 py-4 text-lg border-2 hover:border-green-500/50 hover:text-green-500"
              >
                View All Exams
                <BookOpen className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8">
              {[
                { icon: Users, label: "2M+ Students", value: "2,000,000+" },
                { icon: Trophy, label: "95% Success Rate", value: "95%" },
                { icon: Star, label: "4.9/5 Rating", value: "4.9★" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <stat.icon className="w-8 h-8 mx-auto text-green-500 mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-foreground-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.button 
          className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-2xl"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowRight className="w-6 h-6 text-white transform -rotate-90" />
        </motion.button>
      </motion.div>
    </ParallaxContainer>
  );
};