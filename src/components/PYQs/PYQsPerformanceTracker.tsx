import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award, 
  BarChart3, 
  PieChart, 
  Calendar,
  Zap,
  Brain,
  Trophy
} from 'lucide-react';

export const PYQsPerformanceTracker: React.FC = () => {
  const performanceData = {
    overallScore: 78,
    weeklyImprovement: 12,
    questionsAttempted: 2847,
    correctAnswers: 2221,
    studyStreak: 15,
    rank: 245,
    totalStudents: 125000
  };

  const subjectPerformance = [
    { subject: 'Physics', score: 85, improvement: '+8%', status: 'Excellent', color: 'science' },
    { subject: 'Chemistry', score: 72, improvement: '+15%', status: 'Good', color: 'success' },
    { subject: 'Mathematics', score: 91, improvement: '+5%', status: 'Outstanding', color: 'primary' },
    { subject: 'Biology', score: 68, improvement: '+22%', status: 'Improving', color: 'medical' }
  ];

  const recentTests = [
    { test: 'JEE Main Mock Test #15', score: 89, date: '2 days ago', rank: 156 },
    { test: 'Physics Chapter Test', score: 94, date: '4 days ago', rank: 89 },
    { test: 'Full Syllabus Test', score: 76, date: '1 week ago', rank: 278 },
    { test: 'Chemistry Quick Test', score: 82, date: '1 week ago', rank: 198 }
  ];

  const achievements = [
    { title: 'Speed Master', description: '100 questions in 90 minutes', icon: Zap, earned: true },
    { title: 'Consistent Learner', description: '15-day study streak', icon: Calendar, earned: true },
    { title: 'Problem Solver', description: 'Solved 2500+ questions', icon: Brain, earned: true },
    { title: 'Top Performer', description: 'Top 1% in last test', icon: Trophy, earned: false }
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
            Performance Analytics
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Track your progress with detailed analytics and insights to optimize your preparation strategy
          </p>
        </motion.div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Overall Performance */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="glass p-8">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Overall Performance</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">{performanceData.overallScore}%</div>
                  <p className="text-foreground-secondary text-sm">Overall Score</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">+{performanceData.weeklyImprovement}%</div>
                  <p className="text-foreground-secondary text-sm">Weekly Growth</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">{performanceData.questionsAttempted}</div>
                  <p className="text-foreground-secondary text-sm">Questions Solved</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">{performanceData.studyStreak}</div>
                  <p className="text-foreground-secondary text-sm">Day Streak</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground-secondary">Accuracy Rate</span>
                  <span className="font-bold">{Math.round((performanceData.correctAnswers / performanceData.questionsAttempted) * 100)}%</span>
                </div>
                <Progress value={Math.round((performanceData.correctAnswers / performanceData.questionsAttempted) * 100)} className="h-3" />
              </div>
            </Card>
          </motion.div>

          {/* Current Rank */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass p-8 text-center">
              <Trophy className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Current Rank</h3>
              <div className="text-4xl font-bold gradient-text mb-2">#{performanceData.rank}</div>
              <p className="text-foreground-secondary mb-4">out of {performanceData.totalStudents.toLocaleString()} students</p>
              <Badge variant="secondary" className="bg-gradient-accent text-accent-foreground">
                Top 1% Performer
              </Badge>
            </Card>
          </motion.div>
        </div>

        {/* Subject Performance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Subject-wise Performance</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subjectPerformance.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={`hsl(var(--${subject.color}))`}
                        strokeWidth="2"
                        strokeDasharray={`${subject.score}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold">{subject.score}%</span>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-1">{subject.subject}</h4>
                  <Badge 
                    variant="secondary" 
                    className={`text-${subject.color} bg-${subject.color}/10 mb-2`}
                  >
                    {subject.status}
                  </Badge>
                  <p className="text-sm text-success font-medium">{subject.improvement}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Tests & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Tests */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Recent Tests</h3>
              </div>
              
              <div className="space-y-4">
                {recentTests.map((test, index) => (
                  <motion.div
                    key={test.test}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center p-4 bg-background-secondary/30 rounded-lg hover-lift"
                  >
                    <div>
                      <h4 className="font-semibold mb-1">{test.test}</h4>
                      <p className="text-sm text-foreground-secondary">{test.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold gradient-text">{test.score}%</div>
                      <div className="text-sm text-foreground-secondary">Rank #{test.rank}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Achievements</h3>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      achievement.earned 
                        ? 'bg-gradient-primary/10 border border-primary/20' 
                        : 'bg-muted/30'
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${
                      achievement.earned 
                        ? 'bg-gradient-primary text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <achievement.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                      }`}>{achievement.title}</h4>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-foreground-secondary' : 'text-muted-foreground'
                      }`}>{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        Earned
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Want Detailed Analytics?</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Upgrade to premium for advanced performance insights and personalized recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                Upgrade to Premium
              </Button>
              <Button size="lg" variant="outline">
                Download Report
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};