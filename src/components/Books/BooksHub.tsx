import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Enhanced3DBooksScene } from './Enhanced3DBooksScene';
import { Enhanced3DBookLibraryHub } from './Enhanced3DBookLibraryHub';
import { Enhanced3DBookStatsSection } from './Enhanced3DBookStatsSection';
import { BookCard } from './BookCard';
import { SearchAndFilters } from './SearchAndFilters';
import { BooksHeader } from './BooksHeader';
import { BookModal } from './BookModal';
import { BookStats } from './BookStats';
import { sampleBooks } from './BookData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import { Header } from '@/components/StudentHub/Header';
import { FooterSection } from '@/components/StudentHub/FooterSection';
import EnhancedStarsBackground from '@/components/StudentHub/EnhancedStarsBackground';
import { toast } from 'sonner';
import { Grid, List, TrendingUp, Star, BookOpen, Download, Heart, Users, Filter, Search, Library, Award, Sparkles, Zap, Rocket, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Loading screen for Books page
const BooksLoadingScreen = () => (
  <motion.div 
    className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background-secondary to-background flex items-center justify-center"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2, ease: "easeInOut" }}
  >
    <div className="text-center space-y-8 relative">
      <div className="relative w-24 h-24 mx-auto">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-accent/40 border-t-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-secondary/60 border-r-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-6 flex items-center justify-center"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Library className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent font-space tracking-wider"
          animate={{ 
            backgroundPosition: ["0%", "100%", "0%"],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          BOOKS LIBRARY
        </motion.h2>
        <motion.p 
          className="text-foreground-secondary mt-4 text-lg font-inter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Loading your digital library universe...
        </motion.p>
        
        <motion.div 
          className="w-64 h-1 bg-muted rounded-full mx-auto mt-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

// Section wrapper with animations
const SectionWrapper = React.memo(({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
});

export const BooksHub: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [books] = useState(sampleBooks);
  const [filteredBooks, setFilteredBooks] = useState(sampleBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBook, setSelectedBook] = useState<typeof sampleBooks[0] | null>(null);
  const [favorites, setFavorites] = useLocalStorage<string[]>('bookFavorites', []);
  const [recentDownloads, setRecentDownloads] = useLocalStorage<string[]>('recentDownloads', []);
  
  // Initialize smooth scroll
  useSmoothScroll();

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Simulate loading time for smooth experience
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort books
  useEffect(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           book.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      const matchesSubject = selectedSubject === 'All' || book.subject === selectedSubject;
      const matchesLanguage = selectedLanguage === 'All' || book.language === selectedLanguage;
      
      return matchesSearch && matchesCategory && matchesSubject && matchesLanguage;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        case 'newest':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
  }, [books, searchQuery, selectedCategory, selectedSubject, selectedLanguage, sortBy]);

  const handleDownload = (book: typeof sampleBooks[0]) => {
    // Add to recent downloads
    const updatedRecent = [book.id, ...recentDownloads.filter(id => id !== book.id)].slice(0, 10);
    setRecentDownloads(updatedRecent);
    
    // Open Google Drive link
    window.open(book.downloadLink, '_blank');
    
    toast.success(`Downloading "${book.title}"`, {
      description: 'The download should start automatically',
    });
  };

  const handleFavorite = (bookId: string) => {
    const newFavorites = favorites.includes(bookId) 
      ? favorites.filter(id => id !== bookId)
      : [...favorites, bookId];
    setFavorites(newFavorites);
    
    const isFavorited = !favorites.includes(bookId);
    toast.success(isFavorited ? 'Added to favorites' : 'Removed from favorites');
  };

  const handleCopyLink = (link: string, title: string) => {
    navigator.clipboard.writeText(link);
    toast.success(`Link copied for "${title}"`);
  };

  const categories = ['All', ...Array.from(new Set(books.map(book => book.category)))];
  const subjects = ['All', ...Array.from(new Set(books.map(book => book.subject)))];
  const languages = ['All', ...Array.from(new Set(books.map(book => book.language)))];

  const recentBooks = useMemo(() => 
    books.filter(book => recentDownloads.includes(book.id)),
    [books, recentDownloads]
  );

  const favoriteBooks = useMemo(() =>
    books.filter(book => favorites.includes(book.id)),
    [books, favorites]
  );

  return (
    <>
      <AnimatePresence>
        {isLoading && <BooksLoadingScreen />}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen bg-background relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Enhanced background */}
        <EnhancedStarsBackground />
        
        <div className="fixed inset-0 z-0">
          {/* Gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-secondary/6" />
          <div className="absolute inset-0 bg-gradient-to-tl from-accent/3 via-transparent to-primary/3" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), 
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px"
            }}
          />
        </div>

        <ParallaxContainer className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Header />
          </motion.div>
          
          {/* Dynamic spacing */}
          <motion.div 
            className="h-20 sm:h-24 lg:h-32"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Use Enhanced3DBookLibraryHub instead of simple hero */}
          <SectionWrapper delay={0.1}>
            <Enhanced3DBookLibraryHub />
          </SectionWrapper>

          {/* Enhanced 3D Book Stats Section */}
          <SectionWrapper delay={0.2}>
            <Enhanced3DBookStatsSection />
          </SectionWrapper>

          {/* Search and Filters Section */}
          <SectionWrapper delay={0.2}>
            <ParallaxScroll speed={0.2} direction="up">
              <div className="container mx-auto px-4 py-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass p-8 rounded-2xl"
                >
                  <SearchAndFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    categories={categories}
                    subjects={subjects}
                    languages={languages}
                    selectedCategory={selectedCategory}
                    selectedSubject={selectedSubject}
                    selectedLanguage={selectedLanguage}
                    sortBy={sortBy}
                    onCategoryChange={setSelectedCategory}
                    onSubjectChange={setSelectedSubject}
                    onLanguageChange={setSelectedLanguage}
                    onSortChange={setSortBy}
                  />
                </motion.div>
              </div>
            </ParallaxScroll>
          </SectionWrapper>

          {/* Book Stats Section */}
          <SectionWrapper delay={0.1}>
            <BookStats books={books} />
          </SectionWrapper>

          {/* View Mode & Controls */}
          <SectionWrapper delay={0.2}>
            <div className="container mx-auto px-4 py-8">
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className="glass p-2 rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="px-3"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="px-3"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="text-sm text-foreground-secondary">
                    Showing {filteredBooks.length} of {books.length} books
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-foreground-secondary">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{books.reduce((sum, book) => sum + book.downloadCount, 0).toLocaleString()} total downloads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{(books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1)} avg rating</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </SectionWrapper>

          {/* Recent Downloads Section */}
          {recentBooks.length > 0 && (
            <SectionWrapper delay={0.1}>
              <ParallaxScroll speed={0.3} direction="down">
                <div className="container mx-auto px-4 py-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                        <TrendingUp className="w-8 h-8 text-primary" />
                        Recent Downloads
                      </h2>
                      <p className="text-foreground-secondary text-lg">Books you've recently accessed</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                      {recentBooks.slice(0, 6).map((book, index) => (
                        <motion.div
                          key={book.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <BookCard
                            book={book}
                            viewMode="grid"
                            isFavorite={favorites.includes(book.id)}
                            onDownload={() => handleDownload(book)}
                            onFavorite={() => handleFavorite(book.id)}
                            onView={() => setSelectedBook(book)}
                            onCopyLink={() => handleCopyLink(book.downloadLink, book.title)}
                            compact
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </ParallaxScroll>
            </SectionWrapper>
          )}

          {/* Main Books Collection */}
          <SectionWrapper delay={0.2}>
            <div className="container mx-auto px-4 py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-foreground mb-4">Complete Collection</h2>
                  <p className="text-foreground-secondary text-lg">Explore our entire digital library</p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={viewMode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                        : 'space-y-4'
                    }
                  >
                    {filteredBooks.map((book, index) => (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                      >
                        <BookCard
                          book={book}
                          viewMode={viewMode}
                          isFavorite={favorites.includes(book.id)}
                          onDownload={() => handleDownload(book)}
                          onFavorite={() => handleFavorite(book.id)}
                          onView={() => setSelectedBook(book)}
                          onCopyLink={() => handleCopyLink(book.downloadLink, book.title)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* No Results */}
                {filteredBooks.length === 0 && (
                  <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="glass p-12 rounded-2xl max-w-lg mx-auto">
                      <motion.div 
                        className="text-8xl mb-6"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        📚
                      </motion.div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">No Books Found</h3>
                      <p className="text-foreground-secondary text-lg mb-6">
                        Try adjusting your search criteria or explore different categories
                      </p>
                      <Button onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                        setSelectedSubject('All');
                        setSelectedLanguage('All');
                      }}>
                        Reset Filters
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </SectionWrapper>

          {/* Footer */}
          <SectionWrapper delay={0.1}>
            <FooterSection />
          </SectionWrapper>

          {/* Floating Action Button */}
          <motion.div 
            className="fixed bottom-8 right-8 z-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3 }}
          >
            <motion.button 
              className="w-16 h-16 rounded-full bg-gradient-primary backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-glow"
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-white text-2xl font-bold"
              >
                ↑
              </motion.div>
            </motion.button>
          </motion.div>
        </ParallaxContainer>
      </motion.div>

      {/* Book Modal */}
      <AnimatePresence>
        {selectedBook && (
          <BookModal
            book={selectedBook}
            isFavorite={favorites.includes(selectedBook.id)}
            onClose={() => setSelectedBook(null)}
            onDownload={() => handleDownload(selectedBook)}
            onFavorite={() => handleFavorite(selectedBook.id)}
            onCopyLink={() => handleCopyLink(selectedBook.downloadLink, selectedBook.title)}
          />
        )}
      </AnimatePresence>
    </>
  );
};