import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, Users, Star, TrendingUp, Globe } from 'lucide-react';

interface BooksHeaderProps {
  totalBooks: number;
}

export const BooksHeader: React.FC<BooksHeaderProps> = ({ totalBooks }) => {
  const stats = [
    { icon: BookOpen, label: 'Books Available', value: totalBooks.toLocaleString() },
    { icon: Download, label: 'Total Downloads', value: '2.5M+' },
    { icon: Users, label: 'Active Readers', value: '180K+' },
    { icon: Star, label: 'Average Rating', value: '4.8' },
  ];

  return (
    <div className="relative z-10 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Digital Library
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-foreground-secondary max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover thousands of academic books, research papers, and educational resources. 
            Download instantly from our curated collection.
          </motion.p>

          {/* Floating Action Indicators */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: Download, text: 'Instant Download' },
              { icon: Globe, text: 'Google Drive Links' },
              { icon: TrendingUp, text: 'Latest Updates' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="glass px-4 py-2 rounded-full flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass p-6 rounded-2xl text-center group hover:shadow-glow transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div
                className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center group-hover:shadow-glow"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div
                className="text-2xl font-bold text-foreground mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              
              <div className="text-sm text-foreground-secondary font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm text-foreground-secondary font-medium">Explore Books</span>
            <motion.div
              className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 bg-primary rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};