import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, TrendingUp, Users, BookOpen, Target, Lightbulb } from 'lucide-react';

export const PYQsExpertTipsSection: React.FC = () => {
  const experts = [
    {
      name: 'Dr. Rajesh Kumar',
      title: 'IIT Delhi Professor',
      subject: 'Physics',
      experience: '15+ years',
      students: '50,000+',
      rating: 4.9,
      avatar: 'RK',
      tips: [
        'Focus on concept clarity before attempting numerical problems',
        'Practice previous year questions systematically',
        'Time management is crucial in competitive exams'
      ],
      specialization: 'JEE Physics'
    },
    {
      name: 'Dr. Priya Sharma',
      title: 'AIIMS Faculty',
      subject: 'Biology',
      experience: '12+ years', 
      students: '75,000+',
      rating: 4.8,
      avatar: 'PS',
      tips: [
        'Create visual mind maps for complex biological processes',
        'Regular revision of NCERT is non-negotiable',
        'Focus on diagram-based questions for NEET'
      ],
      specialization: 'NEET Biology'
    },
    {
      name: 'Prof. Amit Gupta',
      title: 'IIM Bangalore Alumnus',
      subject: 'Mathematics',
      experience: '10+ years',
      students: '40,000+', 
      rating: 4.9,
      avatar: 'AG',
      tips: [
        'Master speed calculation techniques',
        'Practice mental math daily for 30 minutes',
        'Understand pattern recognition in data interpretation'
      ],
      specialization: 'CAT Quantitative'
    }
  ];

  const masterTips = [
    {
      icon: Target,
      title: 'Strategic Preparation',
      description: 'Focus on high-weightage topics first, then cover remaining syllabus systematically.'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analysis',
      description: 'Track your progress weekly and identify weak areas for targeted improvement.'
    },
    {
      icon: BookOpen,
      title: 'Quality over Quantity',
      description: 'Solve fewer questions but understand each concept thoroughly and completely.'
    },
    {
      icon: Lightbulb,
      title: 'Smart Techniques',
      description: 'Learn time-saving tricks and shortcuts specific to your target examination.'
    }
  ];

  return (
    <section className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 font-playfair">
            Expert Tips & Strategies
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Learn from India's top educators and toppers who have helped millions of students achieve their dreams
          </p>
        </motion.div>

        {/* Master Tips Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {masterTips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <tip.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{tip.title}</h3>
                <p className="text-foreground-secondary text-sm">{tip.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Expert Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="glass p-8 hover-lift">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/20">
                    <AvatarImage src="" alt={expert.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-white">
                      {expert.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
                  <p className="text-foreground-secondary mb-2">{expert.title}</p>
                  <Badge variant="secondary" className="mb-3">{expert.specialization}</Badge>
                  
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{expert.rating}</span>
                    <span className="text-foreground-secondary">rating</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-sm text-foreground-secondary mb-1">Experience</div>
                    <div className="font-semibold">{expert.experience}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-foreground-secondary mb-1">Students Taught</div>
                    <div className="font-semibold">{expert.students}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-lg mb-3">Expert Tips:</h4>
                  {expert.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-foreground-secondary">{tip}</p>
                    </div>
                  ))}
                </div>

                <Button className="w-full" variant="outline">
                  View More Tips
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Get Personalized Expert Guidance</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Join our premium mentorship program and get one-on-one guidance from top experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                Join Mentorship Program
              </Button>
              <Button size="lg" variant="outline">
                Download Free Study Guide
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};