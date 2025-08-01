import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, Calendar, Share2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';

interface NewsViewerProps {
  news: {
    id: string;
    title: string;
    fullContent: string;
    date: string;
    category: string;
    shortDescription: string;
  };
  allNews: any[];
  onClose: () => void;
  onNavigate: (news: any) => void;
}

export const NewsViewer: React.FC<NewsViewerProps> = ({ 
  news, 
  allNews, 
  onClose, 
  onNavigate 
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [isDownloading, setIsDownloading] = useState(false);

  const currentIndex = allNews.findIndex(n => n.id === news.id);
  const hasNext = currentIndex < allNews.length - 1;
  const hasPrev = currentIndex > 0;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(allNews[currentIndex - 1]);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(allNews[currentIndex + 1]);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, hasNext, hasPrev, onClose, onNavigate, allNews]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
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
      
      // Split title if too long
      const titleLines = pdf.splitTextToSize(news.title, maxWidth);
      let currentY = 30;
      
      titleLines.forEach((line: string) => {
        pdf.text(line, margin, currentY);
        currentY += 10;
      });
      
      // Date and category
      currentY += 10;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Date: ${formatDate(news.date)}`, margin, currentY);
      currentY += 8;
      pdf.text(`Category: ${news.category}`, margin, currentY);
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
      
      // Clean filename
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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${news.title}\n\n${news.shortDescription}\n\n${window.location.href}`);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-gradient-card backdrop-blur-lg rounded-2xl border border-border/50 overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background-secondary/95 backdrop-blur-lg border-b border-border/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <BookOpen className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground">News Reader</h3>
                <p className="text-sm text-foreground-secondary">
                  {currentIndex + 1} of {allNews.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Font Controls */}
              <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className="h-8 w-8 p-0"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs px-2 text-foreground-secondary">
                  {fontSize}px
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="h-8 w-8 p-0"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              {/* Actions */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="h-8 w-8 p-0"
              >
                <Share2 className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                disabled={isDownloading}
                className="h-8 w-8 p-0"
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
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Article Meta */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/30">
              <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                <Calendar className="w-4 h-4" />
                <time dateTime={news.date}>{formatDate(news.date)}</time>
              </div>
              <div className="bg-primary/10 px-3 py-1 rounded-full text-sm font-medium text-primary">
                {news.category}
              </div>
            </div>

            {/* Title */}
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {news.title}
            </motion.h1>

            {/* Content */}
            <motion.div
              className="prose prose-lg max-w-none text-foreground-secondary leading-relaxed"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {news.fullContent.split('\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </motion.article>
        </div>

        {/* Navigation Footer */}
        <div className="sticky bottom-0 bg-background-secondary/95 backdrop-blur-lg border-t border-border/50 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => hasPrev && onNavigate(allNews[currentIndex - 1])}
              disabled={!hasPrev}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="text-sm text-foreground-secondary">
              {hasPrev && (
                <span className="block text-xs">Previous: {allNews[currentIndex - 1]?.title.slice(0, 30)}...</span>
              )}
              {hasNext && (
                <span className="block text-xs">Next: {allNews[currentIndex + 1]?.title.slice(0, 30)}...</span>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => hasNext && onNavigate(allNews[currentIndex + 1])}
              disabled={!hasNext}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
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