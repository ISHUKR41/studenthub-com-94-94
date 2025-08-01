import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    shortDescription: string;
    date: string;
    category: string;
    imageUrl: string;
    isBreaking?: boolean;
  };
  onClick: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <motion.article
      className="group relative bg-gradient-card backdrop-blur-lg rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer"
      whileHover={{ 
        scale: 1.03,
        rotateY: 5,
        rotateX: 2,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Breaking News Badge */}
      {news.isBreaking && (
        <motion.div
          className="absolute top-4 left-4 z-10 bg-destructive px-3 py-1 rounded-full text-xs font-bold text-white"
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 0 0 rgba(239, 68, 68, 0.7)',
              '0 0 0 10px rgba(239, 68, 68, 0)',
              '0 0 0 0 rgba(239, 68, 68, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          BREAKING
        </motion.div>
      )}

      {/* Category Badge */}
      <motion.div
        className="absolute top-4 right-4 z-10 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {news.category}
      </motion.div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.1), rgba(245, 101, 101, 0.2))',
              'linear-gradient(225deg, rgba(245, 101, 101, 0.2), rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.1))',
              'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.1), rgba(245, 101, 101, 0.2))'
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated particles in image area */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Hover effect - trending icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Date */}
        <motion.div
          className="flex items-center gap-2 text-sm text-foreground-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Calendar className="w-4 h-4" />
          <time dateTime={news.date}>{formatDate(news.date)}</time>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {news.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-foreground-secondary text-sm line-clamp-3 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {news.shortDescription}
        </motion.p>

        {/* Read More */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-border/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm text-foreground-secondary">Read full article</span>
          <motion.div
            className="flex items-center gap-1 text-primary font-medium"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm">Read More</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* 3D hover effect borders */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.article>
  );
};