import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search,
  Filter,
  Calendar,
  BookOpen,
  Clock,
  Star,
  TrendingUp,
  Download,
  Eye,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Target,
  Award,
  Users,
  Zap,
  X,
  Check
} from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count: number;
  popular?: boolean;
}

interface ActiveFilter {
  category: string;
  value: string;
  label: string;
}

export const PYQsAdvancedFilters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const examTypes: FilterOption[] = [
    { id: 'jee', label: 'JEE Main/Advanced', count: 2500, popular: true },
    { id: 'neet', label: 'NEET', count: 1800, popular: true },
    { id: 'gate', label: 'GATE', count: 3500, popular: true },
    { id: 'upsc', label: 'UPSC CSE', count: 1200, popular: true },
    { id: 'ssc', label: 'SSC CGL/CHSL', count: 2000 },
    { id: 'cbse', label: 'CBSE Boards', count: 8000 },
    { id: 'icse', label: 'ICSE Boards', count: 3000 },
    { id: 'cat', label: 'CAT', count: 800 },
    { id: 'bank', label: 'Banking Exams', count: 1500 },
    { id: 'railway', label: 'Railway Exams', count: 1200 }
  ];

  const years: FilterOption[] = [
    { id: '2024', label: '2024', count: 5000, popular: true },
    { id: '2023', label: '2023', count: 4800, popular: true },
    { id: '2022', label: '2022', count: 4500 },
    { id: '2021', label: '2021', count: 4200 },
    { id: '2020', label: '2020', count: 4000 },
    { id: '2019', label: '2019', count: 3800 },
    { id: '2018', label: '2018', count: 3500 },
    { id: '2017', label: '2017', count: 3200 }
  ];

  const difficulties: FilterOption[] = [
    { id: 'easy', label: 'Easy', count: 8000 },
    { id: 'medium', label: 'Medium', count: 25000, popular: true },
    { id: 'hard', label: 'Hard', count: 15000, popular: true },
    { id: 'expert', label: 'Expert', count: 2000 }
  ];

  const subjects: FilterOption[] = [
    { id: 'physics', label: 'Physics', count: 12000, popular: true },
    { id: 'chemistry', label: 'Chemistry', count: 11000, popular: true },
    { id: 'mathematics', label: 'Mathematics', count: 15000, popular: true },
    { id: 'biology', label: 'Biology', count: 9000, popular: true },
    { id: 'english', label: 'English', count: 8000 },
    { id: 'general-studies', label: 'General Studies', count: 6000 },
    { id: 'aptitude', label: 'Aptitude', count: 7000 },
    { id: 'reasoning', label: 'Reasoning', count: 5000 }
  ];

  const sortOptions = [
    { id: 'relevance', label: 'Most Relevant' },
    { id: 'newest', label: 'Newest First' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'downloaded', label: 'Most Downloaded' },
    { id: 'difficulty', label: 'By Difficulty' },
    { id: 'rating', label: 'Highest Rated' }
  ];

  const addFilter = (category: string, value: string, label: string) => {
    const newFilter = { category, value, label };
    if (!activeFilters.some(f => f.category === category && f.value === value)) {
      setActiveFilters([...activeFilters, newFilter]);
    }
  };

  const removeFilter = (category: string, value: string) => {
    setActiveFilters(activeFilters.filter(f => !(f.category === category && f.value === value)));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedYear('all');
    setSelectedDifficulty('all');
    setSelectedSubject('all');
    setSearchTerm('');
  };

  const totalResults = 50000 - (activeFilters.length * 2000); // Simulate filtered results

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-secondary/3"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
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
              className="p-3 bg-gradient-primary rounded-xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <SlidersHorizontal className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="bg-gradient-secondary text-white text-lg px-4 py-2">
              SMART SEARCH
            </Badge>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Find Your Perfect Questions
          </h2>
          
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            Use our advanced AI-powered search and filtering system to find exactly what you need. 
            Filter by exam, year, difficulty, subject, and more.
          </p>
        </motion.div>

        {/* Main Search Bar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="glass-intense p-2">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-foreground-secondary" />
                <input
                  type="text"
                  placeholder="Search for question papers, exams, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-transparent border-none outline-none text-lg placeholder-foreground-secondary"
                />
              </div>
              
              <Button 
                variant="outline"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="flex items-center gap-2 px-6 py-4"
              >
                <Filter className="h-5 w-5" />
                Advanced Filters
                {isAdvancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              
              <Button className="btn-hero px-8 py-4">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Active Filters */}
        <AnimatePresence>
          {activeFilters.length > 0 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">Active Filters:</span>
                    <Badge variant="secondary">{activeFilters.length}</Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="text-destructive hover:text-destructive"
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter, index) => (
                    <motion.div
                      key={`${filter.category}-${filter.value}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge 
                        className="bg-primary text-primary-foreground flex items-center gap-2 px-3 py-1"
                      >
                        {filter.label}
                        <button 
                          onClick={() => removeFilter(filter.category, filter.value)}
                          className="hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {isAdvancedOpen && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-intense">
                <CardHeader>
                  <h3 className="text-2xl font-bold gradient-text">Advanced Filters</h3>
                  <p className="text-foreground-secondary">Narrow down your search with precise filters</p>
                </CardHeader>
                
                <CardContent className="space-y-8">
                  {/* Exam Types */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Exam Types
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {examTypes.map((exam) => (
                        <motion.button
                          key={exam.id}
                          onClick={() => addFilter('exam', exam.id, exam.label)}
                          className="p-3 border border-border rounded-lg hover:border-primary/50 transition-all text-left group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {exam.label}
                            </span>
                            {exam.popular && (
                              <Badge className="bg-gradient-secondary text-white text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-foreground-secondary">
                            {exam.count.toLocaleString()} papers
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Filters Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Year Filter */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Year
                      </h4>
                      <div className="space-y-2">
                        {years.slice(0, 6).map((year) => (
                          <motion.button
                            key={year.id}
                            onClick={() => {
                              setSelectedYear(year.id);
                              addFilter('year', year.id, year.label);
                            }}
                            className={`
                              w-full p-2 rounded-lg border transition-all text-left flex items-center justify-between
                              ${selectedYear === year.id 
                                ? 'bg-primary text-primary-foreground border-primary' 
                                : 'border-border hover:border-primary/50'
                              }
                            `}
                            whileHover={{ scale: 1.02 }}
                          >
                            <span className="font-medium">{year.label}</span>
                            <div className="flex items-center gap-2">
                              {year.popular && (
                                <Badge className="bg-gradient-accent text-accent-foreground text-xs">
                                  Hot
                                </Badge>
                              )}
                              <span className="text-sm opacity-70">
                                {year.count.toLocaleString()}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Difficulty
                      </h4>
                      <div className="space-y-2">
                        {difficulties.map((difficulty) => (
                          <motion.button
                            key={difficulty.id}
                            onClick={() => {
                              setSelectedDifficulty(difficulty.id);
                              addFilter('difficulty', difficulty.id, difficulty.label);
                            }}
                            className={`
                              w-full p-2 rounded-lg border transition-all text-left flex items-center justify-between
                              ${selectedDifficulty === difficulty.id 
                                ? 'bg-primary text-primary-foreground border-primary' 
                                : 'border-border hover:border-primary/50'
                              }
                            `}
                            whileHover={{ scale: 1.02 }}
                          >
                            <span className="font-medium">{difficulty.label}</span>
                            <div className="flex items-center gap-2">
                              {difficulty.popular && (
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              )}
                              <span className="text-sm opacity-70">
                                {difficulty.count.toLocaleString()}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Subjects Filter */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Subjects
                      </h4>
                      <div className="space-y-2">
                        {subjects.slice(0, 6).map((subject) => (
                          <motion.button
                            key={subject.id}
                            onClick={() => {
                              setSelectedSubject(subject.id);
                              addFilter('subject', subject.id, subject.label);
                            }}
                            className={`
                              w-full p-2 rounded-lg border transition-all text-left flex items-center justify-between
                              ${selectedSubject === subject.id 
                                ? 'bg-primary text-primary-foreground border-primary' 
                                : 'border-border hover:border-primary/50'
                              }
                            `}
                            whileHover={{ scale: 1.02 }}
                          >
                            <span className="font-medium">{subject.label}</span>
                            <div className="flex items-center gap-2">
                              {subject.popular && (
                                <TrendingUp className="h-3 w-3 text-secondary" />
                              )}
                              <span className="text-sm opacity-70">
                                {subject.count.toLocaleString()}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Summary & Sort */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-lg font-semibold text-foreground"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="gradient-text">{totalResults.toLocaleString()}</span> results found
            </motion.div>
            
            {activeFilters.length > 0 && (
              <Badge className="bg-gradient-primary text-white">
                {activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''} applied
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-foreground-secondary font-medium">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-card border border-border rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div className="text-left">
              <div className="font-semibold">Trending Now</div>
              <div className="text-sm text-foreground-secondary">Most searched</div>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
            <Download className="h-5 w-5 text-secondary" />
            <div className="text-left">
              <div className="font-semibold">Most Downloaded</div>
              <div className="text-sm text-foreground-secondary">Popular picks</div>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
            <Clock className="h-5 w-5 text-accent" />
            <div className="text-left">
              <div className="font-semibold">Latest Papers</div>
              <div className="text-sm text-foreground-secondary">Fresh content</div>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
            <Star className="h-5 w-5 text-warning" />
            <div className="text-left">
              <div className="font-semibold">Highest Rated</div>
              <div className="text-sm text-foreground-secondary">Best quality</div>
            </div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};