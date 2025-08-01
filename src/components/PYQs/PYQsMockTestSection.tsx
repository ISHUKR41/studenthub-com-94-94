import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy, Play, BookOpen, Target } from 'lucide-react';

export const PYQsMockTestSection: React.FC = () => {
  const mockTests = [
    {
      title: 'JEE Main 2024 - Physics Complete',
      duration: '3 hours',
      questions: 75,
      participants: 12543,
      difficulty: 'Advanced',
      subject: 'Physics',
      color: 'text-science'
    },
    {
      title: 'NEET Biology Mock Test',
      duration: '90 mins',
      questions: 45,
      participants: 8921,
      difficulty: 'Intermediate',
      subject: 'Biology',
      color: 'text-medical'
    },
    {
      title: 'CAT Quantitative Aptitude',
      duration: '2 hours',
      questions: 34,
      participants: 15672,
      difficulty: 'Expert',
      subject: 'Mathematics',
      color: 'text-competitive'
    },
    {
      title: 'CBSE Class 12 Chemistry',
      duration: '3 hours',
      questions: 70,
      participants: 5431,
      difficulty: 'Beginner',
      subject: 'Chemistry',
      color: 'text-success'
    }
  ];

  const features = [
    {
      icon: Clock,
      title: 'Real-time Simulation',
      description: 'Experience actual exam conditions with timer and interface'
    },
    {
      icon: Trophy,
      title: 'Live Rankings',
      description: 'Compete with thousands of students across the country'
    },
    {
      icon: Target,
      title: 'Detailed Analysis',
      description: 'Get comprehensive performance reports and improvement suggestions'
    }
  ];

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
            Mock Test Hub
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto mb-8">
            Simulate real exam conditions with our comprehensive mock tests featuring latest patterns and difficulty levels
          </p>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground-secondary">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mock Tests Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {mockTests.map((test, index) => (
            <motion.div
              key={test.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass p-8 hover-lift">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{test.title}</h3>
                    <Badge variant="secondary" className={test.color}>
                      {test.subject}
                    </Badge>
                  </div>
                  <Badge 
                    variant={test.difficulty === 'Expert' ? 'destructive' : 
                           test.difficulty === 'Advanced' ? 'default' : 'secondary'}
                  >
                    {test.difficulty}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-foreground-secondary mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <p className="font-semibold">{test.duration}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-foreground-secondary mb-1">
                      <BookOpen className="h-4 w-4" />
                      <span className="text-sm">Questions</span>
                    </div>
                    <p className="font-semibold">{test.questions}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-foreground-secondary mb-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Taken by</span>
                    </div>
                    <p className="font-semibold">{test.participants.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Start Test
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Test Your Knowledge?</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of students taking mock tests daily and improve your exam performance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                Browse All Tests
              </Button>
              <Button size="lg" variant="outline">
                Create Custom Test
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};