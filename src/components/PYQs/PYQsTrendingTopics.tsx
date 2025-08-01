import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Flame, Eye, Users, Clock, ArrowUp, BookOpen, Target } from 'lucide-react';

export const PYQsTrendingTopics: React.FC = () => {
  const trendingTopics = [
    {
      topic: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      views: 45687,
      growth: '+25%',
      difficulty: 'Advanced',
      questions: 234,
      avgTime: '3.5 min',
      successRate: 67,
      trending: 'Hot',
      color: 'science'
    },
    {
      topic: 'Calculus & Differential Equations',
      subject: 'Mathematics',
      views: 38945,
      growth: '+18%',
      difficulty: 'Expert',
      questions: 189,
      avgTime: '4.2 min',
      successRate: 54,
      trending: 'Rising',
      color: 'primary'
    },
    {
      topic: 'Modern Physics - Quantum',
      subject: 'Physics',
      views: 32156,
      growth: '+22%',
      difficulty: 'Advanced',
      questions: 156,
      avgTime: '5.1 min',
      successRate: 61,
      trending: 'Hot',
      color: 'engineering'
    },
    {
      topic: 'Human Physiology',
      subject: 'Biology',
      views: 28743,
      growth: '+15%',
      difficulty: 'Intermediate',
      questions: 298,
      avgTime: '2.8 min',
      successRate: 73,
      trending: 'Stable',
      color: 'medical'
    },
    {
      topic: 'Coordination Chemistry',
      subject: 'Chemistry',
      views: 24589,
      growth: '+30%',
      difficulty: 'Advanced',
      questions: 167,
      avgTime: '3.9 min',
      successRate: 58,
      trending: 'Rising',
      color: 'science'
    },
    {
      topic: 'Vector Algebra & 3D Geometry',
      subject: 'Mathematics',
      views: 21456,
      growth: '+12%',
      difficulty: 'Intermediate',
      questions: 203,
      avgTime: '4.7 min',
      successRate: 69,
      trending: 'Stable',
      color: 'primary'
    }
  ];

  const weeklyStats = [
    { day: 'Mon', views: 12500 },
    { day: 'Tue', views: 15200 },
    { day: 'Wed', views: 18900 },
    { day: 'Thu', views: 16700 },
    { day: 'Fri', views: 21300 },
    { day: 'Sat', views: 25600 },
    { day: 'Sun', views: 23400 }
  ];

  const maxViews = Math.max(...weeklyStats.map(stat => stat.views));

  return (
    <section className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-accent rounded-2xl">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text font-playfair">
              Trending Topics
            </h2>
          </div>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Discover what's hot in exam preparation and stay ahead with the most popular study topics
          </p>
        </motion.div>

        {/* Weekly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Weekly Trending Pattern</h3>
            </div>
            
            <div className="grid grid-cols-7 gap-4 h-40">
              {weeklyStats.map((stat, index) => (
                <motion.div
                  key={stat.day}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(stat.views / maxViews) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex-1 w-full max-w-12 bg-gradient-primary rounded-t-lg relative group">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-background-tertiary px-2 py-1 rounded whitespace-nowrap">
                      {stat.views.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-sm font-medium mt-2">{stat.day}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Trending Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.topic}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="glass p-6 hover-lift relative overflow-hidden">
                {/* Trending Badge */}
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={topic.trending === 'Hot' ? 'destructive' : 'default'}
                    className={`${topic.trending === 'Hot' ? 'animate-pulse' : ''}`}
                  >
                    {topic.trending === 'Hot' && <Flame className="h-3 w-3 mr-1" />}
                    {topic.trending === 'Rising' && <ArrowUp className="h-3 w-3 mr-1" />}
                    {topic.trending}
                  </Badge>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2 pr-16">{topic.topic}</h3>
                  <Badge variant="secondary" className={`text-${topic.color}`}>
                    {topic.subject}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-foreground-secondary" />
                      <span className="text-sm text-foreground-secondary">Views</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{topic.views.toLocaleString()}</span>
                      <span className="text-sm text-success ml-2">{topic.growth}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-foreground-secondary" />
                      <span className="text-sm text-foreground-secondary">Questions</span>
                    </div>
                    <span className="font-bold">{topic.questions}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-foreground-secondary" />
                      <span className="text-sm text-foreground-secondary">Avg Time</span>
                    </div>
                    <span className="font-bold">{topic.avgTime}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground-secondary">Success Rate</span>
                    <span className="font-bold">{topic.successRate}%</span>
                  </div>
                  <Progress value={topic.successRate} className="h-2" />
                </div>

                <div className="flex justify-between items-center">
                  <Badge 
                    variant={
                      topic.difficulty === 'Expert' ? 'destructive' :
                      topic.difficulty === 'Advanced' ? 'default' : 'secondary'
                    }
                  >
                    {topic.difficulty}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Practice Now
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="glass p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                <p className="text-foreground-secondary">Trending Topics</p>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">2.5M+</div>
                <p className="text-foreground-secondary">Weekly Views</p>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">15K+</div>
                <p className="text-foreground-secondary">Daily Searches</p>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">98%</div>
                <p className="text-foreground-secondary">Accuracy Rate</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Stay Ahead of the Trend</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Get real-time notifications about trending topics and never miss what's important for your exam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                Enable Trend Alerts
              </Button>
              <Button size="lg" variant="outline">
                View All Topics
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};