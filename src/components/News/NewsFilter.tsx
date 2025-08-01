import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, Tag } from 'lucide-react';

interface NewsFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const NewsFilter: React.FC<NewsFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <motion.div
      className="bg-gradient-card backdrop-blur-lg rounded-2xl border border-border/50 p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Filter News</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground-secondary">Search</label>
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 bg-background-secondary/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground-secondary">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 bg-background-secondary/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick filters */}
      <div className="mt-4 pt-4 border-t border-border/30">
        <div className="flex flex-wrap gap-2">
          {categories.slice(1).map(category => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-background-secondary/50 text-foreground-secondary hover:bg-primary/20 hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};