import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Users,
  Download,
  TrendingUp,
  Star,
  ChevronRight,
  Clock,
  Target,
  Award,
  Zap,
  Brain,
  Rocket,
  Globe,
  Search,
  Filter
} from 'lucide-react';

interface ExamCategory {
  id: string;
  name: string;
  fullName: string;
  description: string;
  paperCount: number;
  students: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  subjects: string[];
  trending: boolean;
  featured: boolean;
  category: 'Engineering' | 'Medical' | 'Civil Services' | 'Banking' | 'Teaching' | 'Board' | 'Management';
  icon: any;
  color: string;
  gradient: string;
  yearRange: string;
  successRate: number;
}

export const PYQsExamCategories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedExam, setSelectedExam] = useState<ExamCategory | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    { id: 'all', name: 'All Exams', count: 50000 },
    { id: 'engineering', name: 'Engineering', count: 15000 },
    { id: 'medical', name: 'Medical', count: 8000 },
    { id: 'civil-services', name: 'Civil Services', count: 5000 },
    { id: 'banking', name: 'Banking', count: 6000 },
    { id: 'teaching', name: 'Teaching', count: 4000 },
    { id: 'board', name: 'Board Exams', count: 20000 },
    { id: 'management', name: 'Management', count: 3000 }
  ];

  const examData: ExamCategory[] = [
    {
      id: 'jee-main',
      name: 'JEE Main',
      fullName: 'Joint Entrance Examination Main',
      description: 'Gateway to premier engineering institutes in India. Master Physics, Chemistry, and Mathematics with our comprehensive question bank.',
      paperCount: 2500,
      students: 1200000,
      difficulty: 'Advanced',
      duration: '3h 00m',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      trending: true,
      featured: true,
      category: 'Engineering',
      icon: Rocket,
      color: 'engineering',
      gradient: 'from-blue-500 to-purple-600',
      yearRange: '2010-2024',
      successRate: 85
    },
    {
      id: 'neet',
      name: 'NEET',
      fullName: 'National Eligibility cum Entrance Test',
      description: 'Your pathway to medical colleges across India. Comprehensive coverage of Biology, Physics, and Chemistry.',
      paperCount: 1800,
      students: 1800000,
      difficulty: 'Expert',
      duration: '3h 20m',
      subjects: ['Biology', 'Physics', 'Chemistry'],
      trending: true,
      featured: true,
      category: 'Medical',
      icon: Brain,
      color: 'medical',
      gradient: 'from-green-500 to-teal-600',
      yearRange: '2013-2024',
      successRate: 78
    },
    {
      id: 'upsc-cse',
      name: 'UPSC CSE',
      fullName: 'Civil Services Examination',
      description: 'Become an IAS, IPS, or IFS officer. Complete coverage of Prelims and Mains papers with detailed solutions.',
      paperCount: 1200,
      students: 500000,
      difficulty: 'Expert',
      duration: '2h 00m',
      subjects: ['GS Paper 1', 'GS Paper 2', 'Optional Subject'],
      trending: true,
      featured: true,
      category: 'Civil Services',
      icon: Award,
      color: 'competitive',
      gradient: 'from-orange-500 to-red-600',
      yearRange: '2000-2024',
      successRate: 92
    },
    {
      id: 'gate',
      name: 'GATE',
      fullName: 'Graduate Aptitude Test in Engineering',
      description: 'Gateway to M.Tech admissions and PSU jobs. Branch-wise question papers with detailed analysis.',
      paperCount: 3500,
      students: 800000,
      difficulty: 'Advanced',
      duration: '3h 00m',
      subjects: ['General Aptitude', 'Engineering Mathematics', 'Core Subject'],
      trending: false,
      featured: true,
      category: 'Engineering',
      icon: Zap,
      color: 'engineering',
      gradient: 'from-indigo-500 to-blue-600',
      yearRange: '2005-2024',
      successRate: 88
    },
    {
      id: 'cbse-12',
      name: 'CBSE Class 12',
      fullName: 'Central Board of Secondary Education',
      description: 'Complete board exam preparation with subject-wise papers and marking schemes.',
      paperCount: 8000,
      students: 2000000,
      difficulty: 'Intermediate',
      duration: '3h 15m',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
      trending: true,
      featured: false,
      category: 'Board',
      icon: BookOpen,
      color: 'science',
      gradient: 'from-purple-500 to-pink-600',
      yearRange: '2015-2024',
      successRate: 95
    },
    {
      id: 'ssc-cgl',
      name: 'SSC CGL',
      fullName: 'Staff Selection Commission Combined Graduate Level',
      description: 'Central government job preparation with tier-wise question papers and solutions.',
      paperCount: 2000,
      students: 3000000,
      difficulty: 'Intermediate',
      duration: '1h 00m',
      subjects: ['General Intelligence', 'General Awareness', 'Quantitative Aptitude', 'English'],
      trending: true,
      featured: false,
      category: 'Civil Services',
      icon: Target,
      color: 'competitive',
      gradient: 'from-yellow-500 to-orange-600',
      yearRange: '2010-2024',
      successRate: 82
    }
  ];

  const filteredExams = activeCategory === 'all' 
    ? examData 
    : examData.filter(exam => {
        const categoryMap: { [key: string]: string } = {
          'engineering': 'Engineering',
          'medical': 'Medical',
          'civil-services': 'Civil Services',
          'banking': 'Banking',
          'teaching': 'Teaching',
          'board': 'Board',
          'management': 'Management'
        };
        return exam.category === categoryMap[activeCategory];
      });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-background-secondary relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 30, repeat: Infinity }}
      />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="p-3 bg-gradient-secondary rounded-xl"
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Globe className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="bg-gradient-primary text-white text-lg px-4 py-2">
              ALL MAJOR EXAMS
            </Badge>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Choose Your Exam Category
          </h2>
          
          <p className="text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            From engineering to medical, civil services to banking - we cover every major competitive exam in India. 
            Find your exam and start practicing with authentic question papers.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap gap-3 justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 font-medium
                ${activeCategory === category.id 
                  ? 'bg-primary text-primary-foreground border-primary shadow-glow' 
                  : 'bg-card border-border hover:border-primary/50 text-foreground-secondary hover:text-primary'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
              <Badge variant="secondary" className="text-xs">
                {category.count > 1000 ? `${(category.count/1000).toFixed(0)}K` : category.count}
              </Badge>
            </motion.button>
          ))}
        </motion.div>

        {/* Exam Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatePresence>
            {filteredExams.map((exam, index) => (
              <motion.div
                key={exam.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => setSelectedExam(exam)}
              >
                <Card className="glass-intense hover:border-primary/30 transition-all duration-500 h-full flex flex-col overflow-hidden">
                  {/* Card Header */}
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className={`p-3 bg-gradient-to-r ${exam.gradient} rounded-xl`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <exam.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      
                      <div className="flex flex-col gap-2">
                        {exam.trending && (
                          <Badge className="bg-gradient-secondary text-white flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Trending
                          </Badge>
                        )}
                        {exam.featured && (
                          <Badge className="bg-gradient-accent text-accent-foreground flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                        {exam.name}
                      </h3>
                      <p className="text-sm text-foreground-secondary mb-3">
                        {exam.fullName}
                      </p>
                      <p className="text-foreground-secondary text-sm leading-relaxed">
                        {exam.description}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    {/* Exam Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-primary mb-1">
                          <BookOpen className="h-4 w-4" />
                          <span className="text-xs font-semibold">Papers</span>
                        </div>
                        <p className="text-lg font-bold text-foreground">
                          {exam.paperCount.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="text-center p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                          <Users className="h-4 w-4" />
                          <span className="text-xs font-semibold">Students</span>
                        </div>
                        <p className="text-lg font-bold text-foreground">
                          {(exam.students / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>

                    {/* Exam Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground-secondary">Difficulty:</span>
                        <Badge className={`
                          ${exam.difficulty === 'Beginner' ? 'bg-green-500' :
                            exam.difficulty === 'Intermediate' ? 'bg-yellow-500' :
                            exam.difficulty === 'Advanced' ? 'bg-orange-500' :
                            'bg-red-500'
                          } text-white
                        `}>
                          {exam.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground-secondary">Duration:</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{exam.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground-secondary">Success Rate:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{exam.successRate}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Subjects:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exam.subjects.map((subject) => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button 
                        className="w-full btn-hero group-hover:shadow-lg transition-all"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        Explore Papers
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Quick Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold gradient-text mb-4">
            Can't Find Your Exam?
          </h3>
          <p className="text-foreground-secondary mb-8 text-lg">
            We're constantly adding new exams and question papers. 
            Request your exam and we'll prioritize it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-hero">
              <Filter className="mr-2 h-5 w-5" />
              Request New Exam
            </Button>
            <Button size="lg" variant="outline">
              <Globe className="mr-2 h-5 w-5" />
              Browse All Categories
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};