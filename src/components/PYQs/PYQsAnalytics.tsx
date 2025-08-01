import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Target, Calendar, BarChart3, PieChart } from 'lucide-react';

export const PYQsAnalytics: React.FC = () => {
  const stats = [
    { icon: TrendingUp, label: 'Accuracy Rate', value: '89%', change: '+12%', color: 'text-success' },
    { icon: Award, label: 'Rank Improvement', value: '2,150', change: '+340', color: 'text-accent' },
    { icon: Target, label: 'Questions Solved', value: '4,275', change: '+89', color: 'text-primary' },
    { icon: Calendar, label: 'Study Streak', value: '15 days', change: '+2', color: 'text-secondary' },
  ];

  const subjects = [
    { name: 'Physics', progress: 85, solved: 1250, total: 1470 },
    { name: 'Chemistry', progress: 78, solved: 980, total: 1260 },
    { name: 'Mathematics', progress: 92, solved: 1540, total: 1680 },
    { name: 'Biology', progress: 67, solved: 730, total: 1090 },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 font-playfair">
            Performance Analytics
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Track your progress with detailed analytics and personalized insights to maximize your exam performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
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
              <Card className="glass p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-primary/10`}>
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className={stat.color}>
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-foreground-secondary text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Subject Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass p-8">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Subject-wise Progress</h3>
              </div>
              <div className="space-y-6">
                {subjects.map((subject, index) => (
                  <div key={subject.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{subject.name}</span>
                      <span className="text-foreground-secondary text-sm">
                        {subject.solved}/{subject.total} solved
                      </span>
                    </div>
                    <Progress value={subject.progress} className="h-3" />
                    <div className="text-right mt-1">
                      <span className="text-primary font-semibold">{subject.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass p-8">
              <div className="flex items-center gap-3 mb-6">
                <PieChart className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Weekly Performance</h3>
              </div>
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-foreground-secondary">{day}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium min-w-[3rem]">
                        {Math.floor(Math.random() * 50 + 20)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};