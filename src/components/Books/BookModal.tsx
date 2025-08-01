import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, Heart, Copy, Share2, Star, FileText, Calendar, User, Globe, Eye, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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

interface BookModalProps {
  book: Book;
  isFavorite: boolean;
  onClose: () => void;
  onDownload: () => void;
  onFavorite: () => void;
  onCopyLink: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({
  book,
  isFavorite,
  onClose,
  onDownload,
  onFavorite,
  onCopyLink,
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `Check out this book: ${book.title} by ${book.author}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      onCopyLink();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <motion.div
        className="relative bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Book Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Book Cover and Quick Actions */}
            <div className="space-y-4">
              <div className="relative group">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-80 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary">{book.category}</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{book.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">{book.downloadCount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button onClick={onDownload} className="w-full" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download Book
                </Button>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    onClick={onFavorite}
                    className="flex items-center justify-center"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onCopyLink}
                    className="flex items-center justify-center"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="flex items-center justify-center"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Info */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-secondary">File Size</span>
                    <span className="font-medium">{book.fileSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-secondary">Pages</span>
                    <span className="font-medium">{book.previewPages}+ pages</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-secondary">Language</span>
                    <span className="font-medium">{book.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-secondary">Year</span>
                    <span className="font-medium">{book.year}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Book Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Author */}
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{book.title}</h1>
                <p className="text-xl text-foreground-secondary flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {book.author}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-background-secondary">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                  <div className="font-semibold">{book.rating}</div>
                  <div className="text-xs text-foreground-secondary">Rating</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-background-secondary">
                  <Download className="w-6 h-6 text-primary mx-auto mb-1" />
                  <div className="font-semibold">{(book.downloadCount / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-foreground-secondary">Downloads</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-background-secondary">
                  <BookOpen className="w-6 h-6 text-accent mx-auto mb-1" />
                  <div className="font-semibold">{book.previewPages}+</div>
                  <div className="text-xs text-foreground-secondary">Pages</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-background-secondary">
                  <Calendar className="w-6 h-6 text-secondary mx-auto mb-1" />
                  <div className="font-semibold">{book.year}</div>
                  <div className="text-xs text-foreground-secondary">Published</div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {book.description}
                </p>
              </div>

              <Separator />

              {/* Additional Details */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Book Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-foreground-secondary">Subject</span>
                      <div className="font-medium">{book.subject}</div>
                    </div>
                    <div>
                      <span className="text-sm text-foreground-secondary">Publisher</span>
                      <div className="font-medium">{book.publisher}</div>
                    </div>
                    <div>
                      <span className="text-sm text-foreground-secondary">ISBN</span>
                      <div className="font-medium font-mono text-sm">{book.isbn}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-foreground-secondary">Category</span>
                      <div className="font-medium">{book.category}</div>
                    </div>
                    <div>
                      <span className="text-sm text-foreground-secondary">Language</span>
                      <div className="font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {book.language}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-foreground-secondary">File Format</span>
                      <div className="font-medium">PDF</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Note */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Google Drive Download</h4>
                      <p className="text-sm text-foreground-secondary">
                        This book is hosted on Google Drive for fast and reliable downloads. 
                        Click the download button to open the file in your browser.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};