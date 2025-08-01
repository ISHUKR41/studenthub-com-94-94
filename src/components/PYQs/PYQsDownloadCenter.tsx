import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, Search, Calendar, BookOpen, Filter, Star, Eye } from 'lucide-react';

export const PYQsDownloadCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const papers = [
    {
      id: 1,
      title: 'JEE Main 2024 - Physics (January Session)',
      exam: 'JEE Main',
      subject: 'Physics',
      year: '2024',
      session: 'January',
      format: 'PDF',
      size: '2.3 MB',
      downloads: 15420,
      rating: 4.8,
      hasAnswerKey: true,
      hasSolutions: true,
      date: '2024-01-15',
      difficulty: 'Advanced'
    },
    {
      id: 2,
      title: 'NEET 2024 - Biology Complete Paper',
      exam: 'NEET',
      subject: 'Biology',
      year: '2024',
      session: 'Main',
      format: 'PDF',
      size: '3.1 MB',
      downloads: 12890,
      rating: 4.9,
      hasAnswerKey: true,
      hasSolutions: true,
      date: '2024-05-05',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'CAT 2023 - Quantitative Aptitude (Slot 1)',
      exam: 'CAT',
      subject: 'Mathematics',
      year: '2023',
      session: 'Slot 1',
      format: 'PDF',
      size: '1.8 MB',
      downloads: 8750,
      rating: 4.7,
      hasAnswerKey: true,
      hasSolutions: false,
      date: '2023-11-26',
      difficulty: 'Expert'
    },
    {
      id: 4,
      title: 'JEE Advanced 2024 - Chemistry (Paper 1)',
      exam: 'JEE Advanced',
      subject: 'Chemistry',
      year: '2024',
      session: 'Paper 1',
      format: 'PDF',
      size: '2.7 MB',
      downloads: 9340,
      rating: 4.8,
      hasAnswerKey: true,
      hasSolutions: true,
      date: '2024-05-26',
      difficulty: 'Expert'
    },
    {
      id: 5,
      title: 'GATE 2024 - Computer Science & IT',
      exam: 'GATE',
      subject: 'Computer Science',
      year: '2024',
      session: 'Session 1',
      format: 'PDF',
      size: '2.1 MB',
      downloads: 6820,
      rating: 4.6,
      hasAnswerKey: true,
      hasSolutions: true,
      date: '2024-02-03',
      difficulty: 'Advanced'
    },
    {
      id: 6,
      title: 'CBSE Class 12 Physics 2024',
      exam: 'CBSE',
      subject: 'Physics',
      year: '2024',
      session: 'Main Exam',
      format: 'PDF',
      size: '1.9 MB',
      downloads: 18450,
      rating: 4.5,
      hasAnswerKey: true,
      hasSolutions: true,
      date: '2024-03-15',
      difficulty: 'Beginner'
    }
  ];

  const stats = [
    { icon: FileText, value: '25,000+', label: 'Question Papers' },
    { icon: Download, value: '2.5M+', label: 'Downloads' },
    { icon: Star, value: '4.8/5', label: 'Average Rating' },
    { icon: Calendar, value: '20+', label: 'Years Covered' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success';
      case 'Intermediate': return 'text-warning';
      case 'Advanced': return 'text-primary';
      case 'Expert': return 'text-destructive';
      default: return 'text-foreground-secondary';
    }
  };

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.exam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam = selectedExam === 'all' || paper.exam === selectedExam;
    const matchesSubject = selectedSubject === 'all' || paper.subject === selectedSubject;
    const matchesYear = selectedYear === 'all' || paper.year === selectedYear;
    
    return matchesSearch && matchesExam && matchesSubject && matchesYear;
  });

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 font-playfair">
            Download Center
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Access the largest collection of previous year question papers, solutions, and answer keys for all major competitive exams
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass p-6 text-center hover-lift">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-foreground-secondary text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
                  <Input
                    placeholder="Search papers, exams, subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exams</SelectItem>
                  <SelectItem value="JEE Main">JEE Main</SelectItem>
                  <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
                  <SelectItem value="NEET">NEET</SelectItem>
                  <SelectItem value="CAT">CAT</SelectItem>
                  <SelectItem value="GATE">GATE</SelectItem>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/20">
              <p className="text-foreground-secondary">
                Showing {filteredPapers.length} results
              </p>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Papers Grid */}
        <div className="space-y-6">
          {filteredPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass p-6 hover-lift">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Paper Info */}
                  <div className="lg:col-span-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{paper.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="default">{paper.exam}</Badge>
                          <Badge variant="secondary">{paper.subject}</Badge>
                          <Badge variant="outline">{paper.year}</Badge>
                          <Badge className={getDifficultyColor(paper.difficulty)}>
                            {paper.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-foreground-secondary">
                          <span>{paper.format} • {paper.size}</span>
                          <span>{paper.downloads.toLocaleString()} downloads</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current text-accent" />
                            <span>{paper.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="lg:col-span-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${paper.hasAnswerKey ? 'bg-success' : 'bg-muted'}`}></div>
                        <span className="text-sm">Answer Key</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${paper.hasSolutions ? 'bg-success' : 'bg-muted'}`}></div>
                        <span className="text-sm">Detailed Solutions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-foreground-secondary" />
                        <span className="text-sm">{new Date(paper.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-3">
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                      <Button className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Solutions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button size="lg" variant="outline">
            Load More Papers
          </Button>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Need Custom Question Papers?</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Request specific papers or get personalized paper recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                Request Paper
              </Button>
              <Button size="lg" variant="outline">
                Get Recommendations
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};