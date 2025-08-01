import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, LayoutGrid, Calendar, Star, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface BookFiltersProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalBooks: number;
  filteredCount: number;
}

const categories = [
  { name: 'All', color: 'bg-primary' },
  { name: 'Academic', color: 'bg-science' },
  { name: 'Technical', color: 'bg-engineering' },
  { name: 'Business', color: 'bg-commerce' },
  { name: 'Literature', color: 'bg-arts' },
];

const sortOptions = [
  { value: 'rating', label: 'Highest Rated', icon: Star },
  { value: 'downloads', label: 'Most Downloaded', icon: Download },
  { value: 'newest', label: 'Newest First', icon: Calendar },
  { value: 'title', label: 'Title A-Z', icon: Filter },
];

export const BookFilters: React.FC<BookFiltersProps> = ({
  viewMode,
  onViewModeChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalBooks,
  filteredCount
}) => {
  return (
    <Card className="glass mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Results Count */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-foreground-secondary">
              Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{' '}
              <span className="font-semibold text-foreground">{totalBooks}</span> books
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 transition-all duration-300 ${
                    selectedCategory === category.name
                      ? `${category.color} text-white shadow-glow`
                      : 'hover:bg-background-secondary'
                  }`}
                  onClick={() => onCategoryChange(category.name)}
                >
                  {category.name}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Options */}
            <div className="flex gap-1">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onSortChange(option.value)}
                  className="flex items-center gap-2"
                >
                  <option.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{option.label}</span>
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="rounded-none border-0"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="rounded-none border-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};