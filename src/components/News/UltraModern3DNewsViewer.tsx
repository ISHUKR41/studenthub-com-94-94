import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, Sparkles as ThreeSparkles } from '@react-three/drei';
import { Safe3DCanvas } from './Safe3DCanvas';
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
  Eye,
  Heart,
  Clock,
  Tag,
  Bookmark,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { NewsItem } from '@/contexts/NewsContext';

interface UltraModern3DNewsViewerProps {
  news: NewsItem;
  allNews: NewsItem[];
  onClose: () => void;
  onNavigate: (news: NewsItem) => void;
}

// Enhanced 3D Background for Modal
const ViewerBackgroundScene = () => {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 5]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#10b981" />
      
      {/* Safe floating geometric elements */}
      {Array.from({ length: 4 }, (_, i) => (
        <Float
          key={`viewer-shape-${i}`}
          speed={0.5 + Math.random()}
          rotationIntensity={0.3}
          floatIntensity={0.2}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8
            ]}
          >
            {i % 2 === 0 ? (
              <sphereGeometry args={[0.4, 16, 16]} />
            ) : (
              <boxGeometry args={[0.6, 0.6, 0.6]} />
            )}
            <meshStandardMaterial
              color={`hsl(${(i * 90) % 360}, 70%, 60%)`}
              transparent
              opacity={0.3}
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
        </Float>
      ))}
      
      <ThreeSparkles
        count={40}
        scale={8}
        size={1}
        speed={0.2}
        opacity={0.4}
        color="#3b82f6"
      />
    </>
  );
};

export const UltraModern3DNewsViewer: React.FC<UltraModern3DNewsViewerProps> = ({ 
  news, 
  allNews, 
  onClose, 
  onNavigate 
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(news.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentIndex = allNews.findIndex(n => n.id === news.id);
  const hasNext = currentIndex < allNews.length - 1;
  const hasPrev = currentIndex > 0;

  // Enhanced keyboard navigation
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

  // Auto-scroll to top when news changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [news.id]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      
      // Enhanced PDF generation
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      
      const titleLines = pdf.splitTextToSize(news.title, maxWidth);
      let currentY = 30;
      
      titleLines.forEach((line: string) => {
        pdf.text(line, margin, currentY);
        currentY += 12;
      });
      
      currentY += 15;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Published: ${news.date}`, margin, currentY);
      currentY += 8;
      pdf.text(`Category: ${news.category}`, margin, currentY);
      if (news.author) {
        currentY += 8;
        pdf.text(`Author: ${news.author}`, margin, currentY);
      }
      currentY += 20;
      
      // Content with better formatting
      pdf.setFontSize(11);
      const contentLines = pdf.splitTextToSize(news.fullContent, maxWidth);
      
      contentLines.forEach((line: string) => {
        if (currentY > pageHeight - 30) {
          pdf.addPage();
          currentY = 30;
        }
        pdf.text(line, margin, currentY);
        currentY += 7;
      });
      
      const cleanTitle = news.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `news_${cleanTitle}.pdf`;
      
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
      await navigator.clipboard.writeText(
        `${news.title}\n\n${news.shortDescription}\n\nRead more at: ${window.location.href}`
      );
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0">
        <Safe3DCanvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ViewerBackgroundScene />
        </Safe3DCanvas>
      </div>

      {/* Safe animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={`viewer-particle-${i}`}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.7, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <motion.div
        className="relative w-full max-w-5xl max-h-[95vh] mx-4 bg-gradient-card backdrop-blur-xl rounded-3xl border border-border/50 overflow-hidden shadow-2xl"
        initial={{ scale: 0.7, opacity: 0, rotateX: -20, y: 100 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, rotateX: 20, y: -100 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Enhanced Header */}
        <div className="sticky top-0 z-20 bg-background-secondary/95 backdrop-blur-xl border-b border-border/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-foreground">News Reader</h3>
                <p className="text-sm text-foreground-secondary">
                  Article {currentIndex + 1} of {allNews.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Font Size Controls */}
              <div className="flex items-center gap-1 bg-background/50 rounded-xl p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className="h-9 w-9 p-0"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm px-3 text-foreground-secondary font-medium">
                  {fontSize}px
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="h-9 w-9 p-0"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              {/* Action Buttons */}
              <motion.div
                className="flex items-center gap-1 bg-background/50 rounded-xl p-1"
                whileHover={{ scale: 1.02 }}
              >
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
                  onClick={handleLike}
                  className={`h-9 w-9 p-0 ${hasLiked ? 'text-red-500' : ''}`}
                  disabled={hasLiked}
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
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
                  className="h-9 w-9 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced Content Area with Perfect Scrolling */}
        <div 
          ref={contentRef}
          className="overflow-y-auto max-h-[calc(95vh-200px)] p-8 scroll-smooth"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(59, 130, 246, 0.3) transparent'
          }}
        >
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Enhanced Article Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-border/30">
              <motion.div 
                className="flex items-center gap-2 text-sm text-foreground-secondary"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar className="w-5 h-5 text-primary" />
                <time dateTime={news.date} className="font-medium">{news.date}</time>
              </motion.div>
              
              <motion.div 
                className="bg-primary/10 px-4 py-2 rounded-full text-sm font-semibold text-primary flex items-center gap-2"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.15)" }}
              >
                <Tag className="w-4 h-4" />
                {news.category}
              </motion.div>

              {news.author && (
                <motion.div 
                  className="flex items-center gap-2 text-sm text-foreground-secondary"
                  whileHover={{ scale: 1.05 }}
                >
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-medium">{news.author}</span>
                </motion.div>
              )}

              <div className="flex items-center gap-4 ml-auto">
                {news.views && (
                  <motion.div 
                    className="flex items-center gap-1 text-sm text-foreground-secondary"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>{news.views.toLocaleString()}</span>
                  </motion.div>
                )}
                
                <motion.div 
                  className="flex items-center gap-1 text-sm text-foreground-secondary"
                  whileHover={{ scale: 1.05 }}
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'text-red-500 fill-current' : ''}`} />
                  <span>{likes}</span>
                </motion.div>
              </div>
            </div>

            {/* Enhanced Title */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {news.title}
            </motion.h1>

            {/* Enhanced Content */}
            <motion.div
              className="prose prose-lg max-w-none text-foreground-secondary leading-relaxed space-y-6"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {news.fullContent.split('\n\n').map((paragraph, index) => (
                <motion.div
                  key={index}
                  className="mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {paragraph.split('\n').map((line, lineIndex) => (
                    <p key={lineIndex} className="mb-3">
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </motion.div>

            {/* Article Tags */}
            {news.tags && news.tags.length > 0 && (
              <motion.div
                className="mt-12 pt-8 border-t border-border/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Related Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 bg-background-secondary/50 text-foreground-secondary text-sm rounded-full border border-border/30"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.article>
        </div>

        {/* Enhanced Navigation Footer */}
        <div className="sticky bottom-0 bg-background-secondary/95 backdrop-blur-xl border-t border-border/50 p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => hasPrev && onNavigate(allNews[currentIndex - 1])}
              disabled={!hasPrev}
              className="flex items-center gap-3 px-6 py-3 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="text-left">
                <div className="text-sm font-medium">Previous</div>
                {hasPrev && (
                  <div className="text-xs text-foreground-secondary max-w-[200px] truncate">
                    {allNews[currentIndex - 1]?.title}
                  </div>
                )}
              </div>
            </Button>

            <div className="text-center">
              <div className="text-sm text-foreground-secondary">
                Article {currentIndex + 1} of {allNews.length}
              </div>
              <div className="w-32 bg-background-secondary rounded-full h-2 mt-2">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / allNews.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={() => hasNext && onNavigate(allNews[currentIndex + 1])}
              disabled={!hasNext}
              className="flex items-center gap-3 px-6 py-3 disabled:opacity-50"
            >
              <div className="text-right">
                <div className="text-sm font-medium">Next</div>
                {hasNext && (
                  <div className="text-xs text-foreground-secondary max-w-[200px] truncate">
                    {allNews[currentIndex + 1]?.title}
                  </div>
                )}
              </div>
              <ChevronRight className="w-5 h-5" />
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
        transition={{ delay: 0.3 }}
      />
    </motion.div>
  );
};