import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  subjects: string[];
  languages: string[];
  selectedCategory: string;
  selectedSubject: string;
  selectedLanguage: string;
  sortBy: string;
  onCategoryChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  categories,
  subjects,
  languages,
  selectedCategory,
  selectedSubject,
  selectedLanguage,
  sortBy,
  onCategoryChange,
  onSubjectChange,
  onLanguageChange,
  onSortChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedSubject !== 'All',
    selectedLanguage !== 'All',
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    onCategoryChange('All');
    onSubjectChange('All');
    onLanguageChange('All');
  };

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'downloads', label: 'Most Downloaded' },
    { value: 'newest', label: 'Newest First' },
    { value: 'title', label: 'Title A-Z' },
  ];

  return (
    <Card className="glass">
      <CardContent className="p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-secondary w-5 h-5" />
          <Input
            type="text"
            placeholder="Search books, authors, subjects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-4 py-3 text-lg border-0 bg-background/50 backdrop-blur-sm focus:bg-background/80 transition-all duration-300"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2">
              {selectedCategory !== 'All' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedCategory}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCategoryChange('All')}
                    className="h-auto p-0 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {selectedSubject !== 'All' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedSubject}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSubjectChange('All')}
                    className="h-auto p-0 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {selectedLanguage !== 'All' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedLanguage}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLanguageChange('All')}
                    className="h-auto p-0 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-destructive hover:text-destructive"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Expandable Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/20">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <Select value={selectedCategory} onValueChange={onCategoryChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Select value={selectedSubject} onValueChange={onSubjectChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Language
                  </label>
                  <Select value={selectedLanguage} onValueChange={onLanguageChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};