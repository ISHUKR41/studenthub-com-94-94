import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../StudentHub/Header';
import { Enhanced3DNewsCard } from './Enhanced3DNewsCard';
import { Enhanced3DNewsViewer } from './Enhanced3DNewsViewer';
import { Advanced3DBackground } from './Advanced3DBackground';
import { 
  Sparkles, 
  Clock, 
  Filter, 
  Search, 
  TrendingUp, 
  Calendar,
  Globe,
  BookOpen,
  Trophy,
  GraduationCap,
  Briefcase,
  Newspaper,
  Users,
  Shield,
  Star,
  Zap
} from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { format, isToday, isYesterday, startOfDay, differenceInDays } from 'date-fns';

// Expanded categories with icons
const CATEGORIES = [
  { name: 'All', icon: Globe, color: 'text-blue-500' },
  { name: 'Exam Results', icon: Trophy, color: 'text-yellow-500' },
  { name: 'Admissions', icon: GraduationCap, color: 'text-green-500' },
  { name: 'Policy', icon: Shield, color: 'text-purple-500' },
  { name: 'Scholarships', icon: Star, color: 'text-pink-500' },
  { name: 'Career', icon: Briefcase, color: 'text-indigo-500' },
  { name: 'Technology', icon: Zap, color: 'text-cyan-500' },
  { name: 'Research', icon: BookOpen, color: 'text-emerald-500' },
  { name: 'Campus News', icon: Users, color: 'text-orange-500' },
  { name: 'Breaking News', icon: Newspaper, color: 'text-red-500' },
  { name: 'Sports', icon: Trophy, color: 'text-amber-500' }
];

// Enhanced sample news data with more variety
const sampleNews = [
  {
    id: '1',
    title: 'BPSC Result 2024 - Important Updates',
    shortDescription: 'Bihar Public Service Commission announces latest result updates for all aspirants.',
    fullContent: `Bihar Public Service Commission (BPSC) has released the much-awaited results for the 2024 recruitment examination. The results have been published on the official website and candidates can check their status using their registration number and date of birth.

Key Highlights:
• Total candidates appeared: 2,50,000
• Total qualified candidates: 15,000
• Cut-off marks for General category: 85 marks
• Cut-off marks for SC/ST category: 75 marks
• Cut-off marks for OBC category: 80 marks

How to Check Results:
1. Visit the official BPSC website
2. Click on the 'Results' section
3. Enter your registration number
4. Enter your date of birth
5. Click 'Submit' to view your result

Important Instructions:
• Download and save your result for future reference
• Qualified candidates should prepare for the next round
• Document verification will be conducted soon
• Keep all original documents ready

The commission has also announced that the next phase of recruitment will begin soon. All qualified candidates are advised to stay updated with the official website for further notifications.`,
    date: '2025-01-31',
    category: 'Exam Results',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    readTime: '5 min read',
    author: 'BPSC Official'
  },
  {
    id: '2',
    title: 'IIT JEE Main 2025 Registration Extended',
    shortDescription: 'National Testing Agency extends the last date for JEE Main 2025 application.',
    fullContent: `The National Testing Agency (NTA) has extended the registration deadline for JEE Main 2025 examination. The new deadline has been set to provide more time for students to complete their applications.

Updated Timeline:
• Last date for registration: February 15, 2025
• Last date for fee payment: February 16, 2025
• Correction window: February 18-20, 2025
• Admit card release: March 1, 2025
• Examination dates: April 2025 (to be announced)

Important Changes:
• Application fee remains unchanged
• New exam centers added in remote areas
• Enhanced security measures implemented
• Mobile app for result checking

This extension comes as a relief to thousands of students who were facing difficulties in completing their applications due to various technical issues and document verification problems.`,
    date: '2025-01-31',
    category: 'Admissions',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    readTime: '4 min read',
    author: 'NTA News Desk'
  },
  {
    id: '3',
    title: 'New AI-Powered Learning Platform Launched',
    shortDescription: 'Revolutionary AI technology transforms online education with personalized learning paths.',
    fullContent: `A groundbreaking AI-powered learning platform has been launched, promising to revolutionize the way students learn and interact with educational content. The platform uses advanced machine learning algorithms to create personalized learning experiences.

Key Features:
• Adaptive learning algorithms
• Real-time progress tracking
• Interactive 3D simulations
• Virtual reality integration
• Personalized study plans
• AI tutoring assistance

Impact on Education:
The platform has already shown promising results in pilot programs, with students showing 40% improvement in learning outcomes and 60% increase in engagement rates.

Future Plans:
The company plans to expand to more subjects and integrate with existing educational institutions to provide a comprehensive learning ecosystem.`,
    date: '2025-01-30',
    category: 'Technology',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    readTime: '6 min read',
    author: 'Tech Education Team'
  },
  {
    id: '4',
    title: 'National Scholarship Program 2025 Opens',
    shortDescription: 'Government announces largest scholarship program with over ₹1000 crores allocated.',
    fullContent: `The Government of India has announced the launch of the National Scholarship Program 2025, the largest scholarship initiative in the country's history with an allocation of over ₹1000 crores.

Program Details:
• Total scholarships: 1,00,000
• Maximum amount: ₹50,000 per year
• Duration: Up to 4 years
• Eligibility: Merit and need-based
• Application deadline: March 15, 2025

Categories:
• Academic Excellence: 40,000 scholarships
• Need-based: 30,000 scholarships
• Special categories: 20,000 scholarships
• Research scholarships: 10,000 scholarships

This initiative aims to ensure that no deserving student is deprived of quality education due to financial constraints.`,
    date: '2025-01-29',
    category: 'Scholarships',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    readTime: '7 min read',
    author: 'Education Ministry'
  },
  {
    id: '5',
    title: 'Campus Innovation Challenge 2025',
    shortDescription: 'Universities nationwide participate in the biggest innovation competition.',
    fullContent: `The Campus Innovation Challenge 2025 has kicked off with participation from over 500 universities across the country. Students are competing to solve real-world problems through innovative solutions.

Competition Highlights:
• 500+ participating universities
• 10,000+ student teams
• ₹10 crores in prizes
• Industry mentorship programs
• Startup funding opportunities

Focus Areas:
• Sustainable technology
• Healthcare innovations
• Educational solutions
• Smart city projects
• Climate change solutions

The winner will receive ₹50 lakhs in funding and mentorship from leading industry experts.`,
    date: '2025-01-28',
    category: 'Campus News',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    readTime: '5 min read',
    author: 'Campus Reporter'
  },
  {
    id: '6',
    title: 'Career Fair 2025: Major Companies Participate',
    shortDescription: 'Over 200 companies to recruit fresh graduates in the biggest career fair.',
    fullContent: `The Career Fair 2025 is set to be the largest recruitment event of the year with over 200 leading companies participating to hire fresh graduates across various domains.

Participating Companies:
• Tech giants: Google, Microsoft, Amazon
• Financial services: Goldman Sachs, JP Morgan
• Consulting: McKinsey, BCG, Deloitte
• Indian corporations: TCS, Infosys, Wipro
• Startups: Over 50 emerging companies

Job Opportunities:
• Software development: 5,000 positions
• Data science: 2,000 positions
• Consulting: 1,500 positions
• Finance: 1,000 positions
• Marketing: 800 positions

The event will be held both online and offline to ensure maximum participation.`,
    date: '2025-01-27',
    category: 'Career',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    readTime: '6 min read',
    author: 'Career Services'
  }
];

export const Enhanced3DNewsHub: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('timeline');

  useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Group news by date
  const groupNewsByDate = (news: any[]) => {
    const groups: { [key: string]: any[] } = {};
    
    news.forEach(item => {
      const date = new Date(item.date);
      let groupKey = '';
      
      if (isToday(date)) {
        groupKey = 'Today';
      } else if (isYesterday(date)) {
        groupKey = 'Yesterday';
      } else {
        const daysAgo = differenceInDays(new Date(), date);
        if (daysAgo <= 7) {
          groupKey = `${daysAgo} days ago`;
        } else {
          groupKey = format(date, 'MMMM dd, yyyy');
        }
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
    });
    
    return groups;
  };

  // Filter and search news
  const filteredAndSearchedNews = useMemo(() => {
    let filtered = sampleNews;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(news => news.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(news => 
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory, searchTerm]);

  const groupedNews = groupNewsByDate(filteredAndSearchedNews);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <Advanced3DBackground />
        <motion.div
          className="text-center space-y-6 z-10 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative w-24 h-24 mx-auto"
            animate={{ rotateY: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 blur-xl" />
            <div className="relative w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full" />
          </motion.div>
          
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Initializing News Hub
            </h2>
            <motion.p
              className="text-foreground-secondary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading latest updates...
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Advanced3DBackground />
      <Header />

      <main className="relative z-10 pt-24">
        {/* Enhanced Hero Section */}
        <motion.section
          className="py-20 px-4 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto max-w-7xl text-center">
            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-20 right-20 w-16 h-16 bg-secondary/20 rounded-full blur-xl"
              animate={{
                y: [0, 20, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />

            <motion.div
              className="inline-flex items-center gap-3 bg-gradient-card backdrop-blur-xl rounded-full px-8 py-3 mb-8 border border-border/30"
              animate={{ 
                scale: [0.98, 1.02, 0.98],
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.2)',
                  '0 0 40px rgba(59, 130, 246, 0.4)',
                  '0 0 20px rgba(59, 130, 246, 0.2)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="text-primary font-semibold text-lg">Live News Updates</span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                News
              </span>{' '}
              <motion.span
                className="inline-block bg-gradient-secondary bg-clip-text text-transparent"
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                Hub
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-foreground-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Stay connected with the pulse of education. Get real-time updates, breaking news, and insights that matter to your academic journey.
            </motion.p>

            {/* Enhanced Search and Filter */}
            <motion.div
              className="max-w-4xl mx-auto space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                  <motion.input
                    type="text"
                    placeholder="Search news, topics, categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-gradient-card backdrop-blur-xl border border-border/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-lg"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                
                <motion.select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-6 py-4 bg-gradient-card backdrop-blur-xl border border-border/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-lg min-w-[200px]"
                  whileFocus={{ scale: 1.02 }}
                >
                  {CATEGORIES.map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </motion.select>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-3 justify-center">
                {CATEGORIES.slice(0, 6).map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        selectedCategory === category.name
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-background-secondary/50 text-foreground-secondary hover:bg-primary/10'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* News Timeline Section */}
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="flex items-center justify-between mb-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <TrendingUp className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">
                    Latest Updates
                  </h2>
                  <p className="text-foreground-secondary">
                    {filteredAndSearchedNews.length} articles found
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Date-wise News Groups */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${searchTerm}`}
                className="space-y-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {Object.entries(groupedNews).map(([dateGroup, newsItems], groupIndex) => (
                  <motion.div
                    key={dateGroup}
                    className="space-y-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                  >
                    {/* Date Header */}
                    <motion.div
                      className="flex items-center gap-4 mb-8"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Calendar className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground">{dateGroup}</h3>
                        <div className="h-1 bg-gradient-primary rounded-full w-20" />
                      </div>
                      <div className="text-sm text-foreground-secondary bg-background-secondary/50 px-3 py-1 rounded-full">
                        {newsItems.length} {newsItems.length === 1 ? 'article' : 'articles'}
                      </div>
                    </motion.div>

                    {/* News Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {newsItems.map((news, index) => (
                        <motion.div
                          key={news.id}
                          initial={{ opacity: 0, y: 50, rotateX: -10 }}
                          animate={{ opacity: 1, y: 0, rotateX: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: index * 0.1,
                            type: "spring",
                            bounce: 0.3
                          }}
                          whileHover={{ y: -10 }}
                        >
                          <Enhanced3DNewsCard
                            news={news}
                            onClick={() => setSelectedNews(news)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {Object.keys(groupedNews).length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-card backdrop-blur-xl flex items-center justify-center mx-auto mb-6 border border-border/30"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [0.9, 1.1, 0.9] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Search className="w-16 h-16 text-foreground-secondary" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-3">No news found</h3>
                <p className="text-foreground-secondary text-lg">
                  Try adjusting your search criteria or browse different categories
                </p>
                <motion.button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-6 px-6 py-3 bg-gradient-primary text-white rounded-xl font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show All News
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Enhanced News Viewer */}
      <AnimatePresence>
        {selectedNews && (
          <Enhanced3DNewsViewer
            news={selectedNews}
            allNews={filteredAndSearchedNews}
            onClose={() => setSelectedNews(null)}
            onNavigate={setSelectedNews}
          />
        )}
      </AnimatePresence>
    </div>
  );
};