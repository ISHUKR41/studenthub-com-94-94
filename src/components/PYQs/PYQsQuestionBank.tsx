import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Download, Eye, Star } from 'lucide-react';

export const PYQsQuestionBank: React.FC = () => {
  return (
    <section className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-6">Question Bank</h2>
          <p className="text-xl text-foreground-secondary">Browse our extensive collection</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <Badge>Sample Paper {i + 1}</Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2">JEE Main 2024 Physics</h3>
              <p className="text-foreground-secondary mb-4">Complete question paper with solutions</p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};