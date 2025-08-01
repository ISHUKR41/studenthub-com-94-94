import React from 'react';
import { motion } from 'framer-motion';
import { Download, Heart, Eye, Copy, Star, FileText, Calendar, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  subject: string;
  language: string;
  year: number;
  fileSize: string;
  rating: number;
  downloadCount: number;
  coverImage: string;
  downloadLink: string;
  previewPages: number;
  isbn: string;
  publisher: string;
}

interface BookCardProps {
  book: Book;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onDownload: () => void;
  onFavorite: () => void;
  onView: () => void;
  onCopyLink: () => void;
  compact?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  viewMode,
  isFavorite,
  onDownload,
  onFavorite,
  onView,
  onCopyLink,
  compact = false
}) => {
  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="glass overflow-hidden hover:shadow-glow transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex">
              {/* Book Cover */}
              <div className="relative w-32 h-40 flex-shrink-0">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    {book.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-foreground-secondary mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {book.author}
                    </p>
                    <p className="text-sm text-foreground-secondary line-clamp-2 mb-4">
                      {book.description}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onFavorite}
                    className="ml-4"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-foreground-secondary">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{book.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{book.downloadCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{book.fileSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{book.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>{book.language}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button onClick={onDownload} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" onClick={onView}>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onCopyLink}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group"
    >
      <Card className={`glass overflow-hidden hover:shadow-glow transition-all duration-300 ${compact ? 'h-64' : 'h-96'}`}>
        <CardContent className="p-0 h-full flex flex-col">
          {/* Book Cover */}
          <div className={`relative ${compact ? 'h-32' : 'h-48'} overflow-hidden`}>
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
              <Badge variant="secondary" className="text-xs">
                {book.category}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onFavorite}
                className="text-white hover:bg-white/20"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>

            {/* Rating */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{book.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            <h3 className={`font-semibold text-foreground mb-2 line-clamp-2 ${compact ? 'text-sm' : 'text-base'}`}>
              {book.title}
            </h3>
            
            {!compact && (
              <>
                <p className="text-sm text-foreground-secondary mb-2 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {book.author}
                </p>
                <p className="text-xs text-foreground-secondary line-clamp-2 mb-3 flex-1">
                  {book.description}
                </p>
              </>
            )}

            {/* Metadata */}
            <div className={`flex items-center justify-between text-xs text-foreground-secondary mb-3 ${compact ? 'mb-2' : ''}`}>
              <div className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                <span>{book.downloadCount > 1000 ? `${(book.downloadCount / 1000).toFixed(1)}k` : book.downloadCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                <span>{book.fileSize}</span>
              </div>
              <span>{book.year}</span>
            </div>

            {/* Actions */}
            <div className={`flex gap-2 ${compact ? 'flex-col' : ''}`}>
              <Button 
                onClick={onDownload} 
                className={`${compact ? 'text-xs py-1 px-2' : 'flex-1'}`}
                size={compact ? "sm" : "default"}
              >
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
              {!compact && (
                <>
                  <Button variant="outline" onClick={onView} size="sm">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onCopyLink}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};