import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, TrendingUp, Eye, Heart, User, Zap } from 'lucide-react';
import { NewsItem } from '@/contexts/NewsContext';

interface Enhanced3DNewsCardProps {
  news: NewsItem;
  onClick: () => void;
}

export const Enhanced3DNewsCard: React.FC<Enhanced3DNewsCardProps> = ({ news, onClick }) => {
  return (
    <motion.article
      className="group relative bg-gradient-card backdrop-blur-lg rounded-2xl overflow-hidden border border-border/50 cursor-pointer"
      whileHover={{ 
        scale: 1.05,
        rotateY: 8,
        rotateX: 5,
        y: -10
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ 
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center'
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        bounce: 0.4
      }}
    >
      {/* Enhanced 3D Shadow Effect */}
      <motion.div
        className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl"
        style={{ transform: 'translateZ(-20px)' }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Breaking News Badge with Enhanced Animation */}
      {news.isBreaking && (
        <motion.div
          className="absolute top-4 left-4 z-20 bg-destructive text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 0 0 rgba(239, 68, 68, 0.7)',
              '0 0 0 15px rgba(239, 68, 68, 0)',
              '0 0 0 0 rgba(239, 68, 68, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="w-3 h-3" />
          BREAKING
        </motion.div>
      )}

      {/* Category Badge */}
      <motion.div
        className="absolute top-4 right-4 z-20 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.1 }}
      >
        {news.category}
      </motion.div>

      {/* Enhanced Image Container with 3D Effects */}
      <div className="relative h-48 overflow-hidden">
        {/* Dynamic Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.2), rgba(245, 101, 101, 0.3))',
              'linear-gradient(135deg, rgba(245, 101, 101, 0.3), rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.2))',
              'linear-gradient(225deg, rgba(16, 185, 129, 0.2), rgba(245, 101, 101, 0.3), rgba(59, 130, 246, 0.3))',
              'linear-gradient(315deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.2), rgba(245, 101, 101, 0.3))'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
              rotate: [0, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Hover Overlay with 3D Icon */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
          initial={{ scale: 0, rotateY: 180 }}
          whileHover={{ 
            scale: 1, 
            rotateY: 0,
            transition: { duration: 0.4, type: "spring" }
          }}
        >
          <div className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* 3D Border Animation */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-t-2xl"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent, rgba(16, 185, 129, 0.3), transparent)',
            backgroundSize: '400% 400%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Enhanced Content Section */}
      <div className="p-6 space-y-4 relative">
        {/* Date with Enhanced Styling */}
        <motion.div
          className="flex items-center gap-2 text-sm text-foreground-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.2, rotate: 180 }}
          >
            <Calendar className="w-3 h-3 text-primary" />
          </motion.div>
          <time dateTime={news.date} className="font-medium">{news.date}</time>
        </motion.div>

        {/* Enhanced Title */}
        <motion.h3
          className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ x: 5 }}
        >
          {news.title}
        </motion.h3>

        {/* Enhanced Description */}
        <motion.p
          className="text-foreground-secondary text-sm line-clamp-3 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {news.shortDescription}
        </motion.p>

        {/* Enhanced Stats Row */}
        {(news.views || news.likes || news.author) && (
          <motion.div
            className="flex items-center gap-4 text-xs text-foreground-secondary pt-2 border-t border-border/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {news.author && (
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <User className="w-3 h-3" />
                <span>{news.author}</span>
              </motion.div>
            )}
            {news.views && (
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <Eye className="w-3 h-3" />
                <span>{news.views.toLocaleString()}</span>
              </motion.div>
            )}
            {news.likes && (
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-3 h-3" />
                <span>{news.likes}</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Enhanced Read More Section */}
        <motion.div
          className="flex items-center justify-between pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <span className="text-sm text-foreground-secondary">Read full article</span>
          <motion.div
            className="flex items-center gap-2 text-primary font-medium bg-primary/10 px-3 py-1 rounded-full"
            whileHover={{ 
              x: 8, 
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              scale: 1.05
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm">Read More</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced 3D Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent, rgba(16, 185, 129, 0.1), transparent)',
          backgroundSize: '300% 300%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2), rgba(245, 101, 101, 0.2))',
          borderColor: "rgba(59, 130, 246, 0.3)"
        }}
      />

      {/* 3D Depth Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: 'translateZ(10px)' }}
      />
    </motion.article>
  );
};