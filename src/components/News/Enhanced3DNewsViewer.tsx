import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  Calendar, 
  Share2, 
  BookOpen,
  User,
  Clock,
  Eye,
  Heart,
  Bookmark,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, isToday, isYesterday } from 'date-fns';
import { jsPDF } from 'jspdf';

interface Enhanced3DNewsViewerProps {
  news: {
    id: string;
    title: string;
    fullContent: string;
    date: string;
    category: string;
    shortDescription: string;
    author?: string;
    readTime?: string;
  };
  allNews: any[];
  onClose: () => void;
  onNavigate: (news: any) => void;
}

export const Enhanced3DNewsViewer: React.FC<Enhanced3DNewsViewerProps> = ({ 
  news, 
  allNews, 
  onClose, 
  onNavigate 
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentIndex = allNews.findIndex(n => n.id === news.id);
  const hasNext = currentIndex < allNews.length - 1;
  const hasPrev = currentIndex > 0;

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setScrollProgress(progress);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(allNews[currentIndex - 1]);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(allNews[currentIndex + 1]);
      if (e.key === '+' || e.key === '=') setFontSize(prev => Math.min(24, prev + 2));
      if (e.key === '-') setFontSize(prev => Math.max(12, prev - 2));
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, hasNext, hasPrev, onClose, onNavigate, allNews]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isToday(date)) return 'Today';
      if (isYesterday(date)) return 'Yesterday';
      return format(date, 'MMMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      
      // Title
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      
      const titleLines = pdf.splitTextToSize(news.title, maxWidth);
      let currentY = 30;
      
      titleLines.forEach((line: string) => {
        pdf.text(line, margin, currentY);
        currentY += 10;
      });
      
      // Meta information
      currentY += 10;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Date: ${formatDate(news.date)}`, margin, currentY);
      currentY += 8;
      pdf.text(`Category: ${news.category}`, margin, currentY);
      if (news.author) {
        currentY += 8;
        pdf.text(`Author: ${news.author}`, margin, currentY);
      }
      currentY += 15;
      
      // Content
      pdf.setFontSize(11);
      const contentLines = pdf.splitTextToSize(news.fullContent, maxWidth);
      
      contentLines.forEach((line: string) => {
        if (currentY > pageHeight - 30) {
          pdf.addPage();
          currentY = 30;
        }
        pdf.text(line, margin, currentY);
        currentY += 6;
      });
      
      const cleanTitle = news.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${cleanTitle}.pdf`;
      
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.shortDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`${news.title}\n\n${news.shortDescription}\n\n${window.location.href}`);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-primary z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Main Content */}
      <motion.div
        className="relative w-full max-w-5xl max-h-[95vh] mx-4 bg-gradient-card backdrop-blur-2xl rounded-3xl border border-border/30 overflow-hidden shadow-2xl"
        initial={{ scale: 0.8, opacity: 0, rotateX: -20, y: 100 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateX: 20, y: -100 }}
        transition={{ 
          duration: 0.6, 
          type: "spring", 
          bounce: 0.2,
          staggerChildren: 0.1
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Enhanced Header */}
        <motion.div 
          className="sticky top-0 z-20 bg-background-secondary/95 backdrop-blur-2xl border-b border-border/30 p-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(59, 130, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-foreground text-lg">News Reader</h3>
                <p className="text-sm text-foreground-secondary">
                  Article {currentIndex + 1} of {allNews.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Font Controls */}
              <motion.div 
                className="flex items-center gap-1 bg-background/50 rounded-xl p-1"
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className="h-9 w-9 p-0 hover:bg-primary/10"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs px-3 text-foreground-secondary font-medium">
                  {fontSize}px
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="h-9 w-9 p-0 hover:bg-primary/10"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </motion.div>

              {/* Action Buttons */}
              <motion.div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`h-9 w-9 p-0 ${isBookmarked ? 'text-yellow-500' : ''}`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`h-9 w-9 p-0 ${isLiked ? 'text-red-500' : ''}`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="h-9 w-9 p-0"
                >
                  <Share2 className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="h-9 w-9 p-0"
                >
                  {isDownloading ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-9 w-9 p-0 hover:bg-red-500/10 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Content with enhanced scrolling */}
        <div 
          ref={contentRef}
          className="overflow-y-auto max-h-[calc(95vh-180px)] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
          style={{
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain'
          }}
        >
          <motion.article
            className="p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Article Meta */}
            <motion.div 
              className="flex items-center flex-wrap gap-4 mb-8 pb-6 border-b border-border/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                <Calendar className="w-4 h-4" />
                <time dateTime={news.date}>{formatDate(news.date)}</time>
              </div>
              
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full text-sm font-medium text-primary border border-primary/20">
                {news.category}
              </div>

              {news.readTime && (
                <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                  <Clock className="w-4 h-4" />
                  <span>{news.readTime}</span>
                </div>
              )}

              {news.author && (
                <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                  <User className="w-4 h-4" />
                  <span>By {news.author}</span>
                </div>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight bg-gradient-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {news.title}
            </motion.h1>

            {/* Content */}
            <motion.div
              className="prose prose-lg max-w-none text-foreground-secondary leading-relaxed"
              style={{ 
                fontSize: `${fontSize}px`, 
                lineHeight: 1.8,
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {news.fullContent.split('\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="mb-6 text-justify"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Tags */}
            <motion.div
              className="mt-12 pt-6 border-t border-border/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="text-sm text-foreground-secondary mb-3">Related Topics:</p>
              <div className="flex flex-wrap gap-2">
                {[news.category, 'Education', 'News', 'Updates'].map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-3 py-1 bg-background-secondary/50 rounded-full text-xs text-foreground-secondary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  >
                    #{tag.toLowerCase().replace(/\s+/g, '')}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.article>
        </div>

        {/* Enhanced Navigation Footer */}
        <motion.div 
          className="sticky bottom-0 bg-background-secondary/95 backdrop-blur-2xl border-t border-border/30 p-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => hasPrev && onNavigate(allNews[currentIndex - 1])}
              disabled={!hasPrev}
              className="flex items-center gap-2 px-6 py-3 rounded-xl"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Previous</span>
            </Button>

            <div className="text-center">
              <div className="text-sm text-foreground-secondary mb-1">
                {Math.round(scrollProgress)}% completed
              </div>
              <div className="w-32 h-2 bg-background-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-primary rounded-full"
                  style={{ width: `${scrollProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={() => hasNext && onNavigate(allNews[currentIndex + 1])}
              disabled={!hasNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl"
            >
              <span className="font-medium">Next</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Preview thumbnails */}
          <div className="flex justify-center gap-4 mt-4">
            {hasPrev && (
              <motion.div 
                className="text-xs text-center p-2 bg-background/50 rounded-lg max-w-32 cursor-pointer"
                onClick={() => onNavigate(allNews[currentIndex - 1])}
                whileHover={{ scale: 1.05 }}
              >
                <p className="truncate font-medium">{allNews[currentIndex - 1]?.title}</p>
                <p className="text-foreground-secondary">Previous</p>
              </motion.div>
            )}
            {hasNext && (
              <motion.div 
                className="text-xs text-center p-2 bg-background/50 rounded-lg max-w-32 cursor-pointer"
                onClick={() => onNavigate(allNews[currentIndex + 1])}
                whileHover={{ scale: 1.05 }}
              >
                <p className="truncate font-medium">{allNews[currentIndex + 1]?.title}</p>
                <p className="text-foreground-secondary">Next</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Click outside to close */}
      <motion.div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
    </motion.div>
  );
};