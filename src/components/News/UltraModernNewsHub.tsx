import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../StudentHub/Header';
import { NewsCard } from './NewsCard';
import { NewsViewer } from './NewsViewer';
import { NewsFilter } from './NewsFilter';
import { NewsBackground } from './NewsBackground';
import { Particles } from './Particles';
import { Sparkles, Clock, Filter, Search, TrendingUp } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

// Sample news data - replace with your actual data structure
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
    isBreaking: true
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
    date: '2025-01-30',
    category: 'Admissions',
    imageUrl: '/placeholder.svg',
    isBreaking: false
  },
  {
    id: '3',
    title: 'New Education Policy Updates',
    shortDescription: 'Government announces major updates to the National Education Policy 2025.',
    fullContent: `The Government of India has announced significant updates to the National Education Policy (NEP) 2025, marking a revolutionary change in the Indian education system.

    Key Updates:
    • Introduction of coding from Class 6
    • Mandatory environmental studies
    • Enhanced focus on practical learning
    • Digital infrastructure development
    • Teacher training programs

    Implementation Timeline:
    • Phase 1: June 2025 - Primary schools
    • Phase 2: September 2025 - Secondary schools
    • Phase 3: January 2026 - Higher education

    The policy aims to prepare students for the challenges of the 21st century by incorporating modern teaching methodologies and technological advancements.`,
    date: '2025-01-29',
    category: 'Policy',
    imageUrl: '/placeholder.svg',
    isBreaking: false
  }
];

export const UltraModernNewsHub: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [filteredNews, setFilteredNews] = useState(sampleNews);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useSmoothScroll();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter news based on search and category
  const filteredAndSearchedNews = useMemo(() => {
    let filtered = filteredNews;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(news => news.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(news => 
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filteredNews, selectedCategory, searchTerm]);

  const categories = ['All', ...Array.from(new Set(sampleNews.map(news => news.category)))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading News Hub...
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <NewsBackground />
      <Particles />

      {/* Header */}
      <Header />

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <motion.section
          className="py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto max-w-6xl text-center">
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Latest Updates</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              News Hub
            </motion.h1>

            <motion.p
              className="text-xl text-foreground-secondary max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Stay updated with the latest educational news, exam results, and important announcements
            </motion.p>

            {/* Search and Filter */}
            <motion.div
              className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background-secondary/50 backdrop-blur-sm border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-background-secondary/50 backdrop-blur-sm border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </motion.div>
          </div>
        </motion.section>

        {/* News Grid */}
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="flex items-center gap-2 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Latest News ({filteredAndSearchedNews.length})
              </h2>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${searchTerm}`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {filteredAndSearchedNews.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <NewsCard
                      news={news}
                      onClick={() => setSelectedNews(news)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredAndSearchedNews.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-secondary/20 flex items-center justify-center mx-auto mb-4"
                  animate={{ scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Search className="w-12 h-12 text-foreground-secondary" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No news found</h3>
                <p className="text-foreground-secondary">Try adjusting your search criteria</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* News Viewer Modal */}
      <AnimatePresence>
        {selectedNews && (
          <NewsViewer
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