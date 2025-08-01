import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Calendar, Target, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export const PYQsStudyPlan: React.FC = () => {
  const studyPlan = [
    {
      week: 1,
      title: 'Foundation Building',
      topics: ['Basic Concepts', 'Fundamental Principles', 'Core Formulas'],
      progress: 100,
      status: 'completed',
      questions: 45,
      timeSpent: '8.5h'
    },
    {
      week: 2,
      title: 'Advanced Topics',
      topics: ['Complex Problems', 'Application-based Questions', 'Theory Deep-dive'],
      progress: 75,
      status: 'in-progress',
      questions: 32,
      timeSpent: '6.2h'
    },
    {
      week: 3,
      title: 'Problem Solving',
      topics: ['Previous Year Analysis', 'Pattern Recognition', 'Speed Techniques'],
      progress: 25,
      status: 'upcoming',
      questions: 0,
      timeSpent: '0h'
    },
    {
      week: 4,
      title: 'Mock Tests & Revision',
      topics: ['Full-length Tests', 'Weak Area Focus', 'Final Preparation'],
      progress: 0,
      status: 'upcoming',
      questions: 0,
      timeSpent: '0h'
    }
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Adaptation',
      description: 'Plan adjusts based on your performance and learning speed'
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Customized milestones aligned with your target exam date'
    },
    {
      icon: TrendingUp,
      title: 'Performance Tracking',
      description: 'Real-time monitoring of your improvement and weak areas'
    }
  ];

  return (
    <section className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 font-playfair">
            AI-Powered Study Plan
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Let artificial intelligence create a personalized study roadmap that adapts to your pace and maximizes your potential
          </p>
        </motion.div>

        {/* AI Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground-secondary">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Study Plan Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="glass p-8">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Your Personalized Study Timeline</h3>
            </div>
            
            <div className="space-y-6">
              {studyPlan.map((week, index) => (
                <motion.div
                  key={week.week}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline line */}
                  {index !== studyPlan.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-12 bg-border"></div>
                  )}
                  
                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      week.status === 'completed' ? 'bg-success' :
                      week.status === 'in-progress' ? 'bg-primary' : 'bg-muted'
                    }`}>
                      {week.status === 'completed' ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : (
                        <span className="text-white font-bold">{week.week}</span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <Card className={`p-6 ${week.status === 'in-progress' ? 'ring-2 ring-primary' : ''}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-semibold mb-2">Week {week.week}: {week.title}</h4>
                            <div className="flex flex-wrap gap-2">
                              {week.topics.map((topic) => (
                                <Badge key={topic} variant="secondary">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Badge 
                            variant={
                              week.status === 'completed' ? 'default' :
                              week.status === 'in-progress' ? 'destructive' : 'secondary'
                            }
                          >
                            {week.status.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-foreground-secondary">Progress</span>
                              <span className="text-sm font-medium">{week.progress}%</span>
                            </div>
                            <Progress value={week.progress} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              <span className="text-sm">{week.questions} Questions</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-secondary" />
                              <span className="text-sm">{week.timeSpent}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your AI-Guided Journey?</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Create your personalized study plan now and let AI guide you to exam success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                Generate Study Plan
              </Button>
              <Button size="lg" variant="outline">
                View Sample Plan
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};