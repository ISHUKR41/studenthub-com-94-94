import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookCard } from './BookCard';
import type { Book } from './BookData';

interface BookGridProps {
  books: Book[];
  viewMode: 'grid' | 'list';
  favorites: string[];
  onDownload: (book: Book) => void;
  onFavorite: (bookId: string) => void;
  onView: (book: Book) => void;
  onCopyLink: (book: Book) => void;
}

export const BookGrid: React.FC<BookGridProps> = ({
  books,
  viewMode,
  favorites,
  onDownload,
  onFavorite,
  onView,
  onCopyLink
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (books.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary/10 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No Books Found</h3>
        <p className="text-foreground-secondary">
          Try adjusting your search or filter criteria
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
      }
    >
      <AnimatePresence mode="popLayout">
        {books.map((book) => (
          <motion.div
            key={book.id}
            variants={itemVariants}
            layout
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <BookCard
              book={book}
              viewMode={viewMode}
              isFavorite={favorites.includes(book.id)}
              onDownload={() => onDownload(book)}
              onFavorite={() => onFavorite(book.id)}
              onView={() => onView(book)}
              onCopyLink={() => onCopyLink(book)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};