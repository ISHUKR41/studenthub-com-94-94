import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  Star,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  Globe,
  Smartphone,
  Download,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Lightbulb,
  Medal,
  Trophy
} from 'lucide-react';

interface LearningMetric {
  id: string;
  title: string;
  value: number;
  target: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  change: number;
}

interface StudySession {
  id: string;
  subject: string;
  duration: number;
  completed: boolean;
  score: number;
  date: string;
}

export const ModernLearningDashboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeMetric, setActiveMetric] = useState(0);
  const [isLive, setIsLive] = useState(true);

  const learningMetrics: LearningMetric[] = [
    {
      id: 'study-time',
      title: 'Study Time Today',
      value: 6.5,
      target: 8,
      unit: 'hours',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      change: 15
    },
    {
      id: 'topics-mastered',
      title: 'Topics Mastered',
      value: 47,
      target: 60,
      unit: 'topics',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      change: 8
    },
    {
      id: 'practice-tests',
      title: 'Practice Tests',
      value: 23,
      target: 30,
      unit: 'tests',
      icon: <Target className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      change: 3
    },
    {
      id: 'accuracy',
      title: 'Average Accuracy',
      value: 87,
      target: 90,
      unit: '%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      change: 5
    }
  ];

  const recentSessions: StudySession[] = [
    {
      id: '1',
      subject: 'Physics - Mechanics',
      duration: 90,
      completed: true,
      score: 92,
      date: '2024-12-08'
    },
    {
      id: '2',
      subject: 'Mathematics - Calculus',
      duration: 75,
      completed: true,
      score: 88,
      date: '2024-12-08'
    },
    {
      id: '3',
      subject: 'Chemistry - Organic',
      duration: 60,
      completed: true,
      score: 85,
      date: '2024-12-07'
    },
    {
      id: '4',
      subject: 'Biology - Genetics',
      duration: 45,
      completed: false,
      score: 0,
      date: '2024-12-07'
    }
  ];

  const achievements = [
    { icon: <Medal className="w-5 h-5" />, title: "Week Warrior", description: "7 days study streak" },
    { icon: <Trophy className="w-5 h-5" />, title: "High Scorer", description: "90%+ in 5 tests" },
    { icon: <Star className="w-5 h-5" />, title: "Quick Learner", description: "Completed 10 topics" },
    { icon: <Zap className="w-5 h-5" />, title: "Speed Master", description: "Under 30s per question" }
  ];

  const upcomingEvents = [
    { title: "JEE Main Mock Test", time: "2:00 PM", date: "Today", type: "exam" },
    { title: "Physics Doubt Session", time: "4:30 PM", date: "Today", type: "session" },
    { title: "Mathematics Quiz", time: "10:00 AM", date: "Tomorrow", type: "quiz" },
    { title: "Chemistry Lab", time: "2:00 PM", date: "Tomorrow", type: "lab" }
  ];

  // Auto-cycle through metrics
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % learningMetrics.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive, learningMetrics.length]);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-background via-background-secondary to-background overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Circuit pattern */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='9' cy='9' r='3'/%3E%3Ccircle cx='51' cy='9' r='3'/%3E%3Ccircle cx='9' cy='51' r='3'/%3E%3Ccircle cx='51' cy='51' r='3'/%3E%3Cpath d='M9 9h42v42H9z' stroke='%233B82F6' stroke-width='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Activity className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold text-lg">Learning Dashboard</span>
            <motion.div
              className="flex gap-1"
              animate={{ opacity: isLive ? [0.5, 1, 0.5] : 1 }}
              transition={{ duration: 2, repeat: isLive ? Infinity : 0 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs text-green-500">Live</span>
            </motion.div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-space">
            <span className="gradient-text">Smart Learning</span>{" "}
            <span className="text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
              Analytics
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Track your progress, analyze your performance, and{" "}
            <span className="gradient-text-accent font-semibold">optimize your learning</span>{" "}
            with intelligent insights
          </p>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Learning Metrics */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="glassmorphism border-primary/20 h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Today's Progress</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsLive(!isLive)}
                      className="text-xs"
                    >
                      {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isLive ? 'Pause' : 'Resume'}
                    </Button>
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                      Real-time
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {learningMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        activeMetric === index 
                          ? 'border-primary/40 bg-primary/5 scale-105' 
                          : 'border-border/20 hover:border-primary/20'
                      }`}
                      onClick={() => setActiveMetric(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color} text-white`}>
                          {metric.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{metric.title}</h4>
                          <div className="text-xs text-green-500 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +{metric.change}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold gradient-text">
                            {metric.value}
                          </span>
                          <span className="text-sm text-foreground-secondary">
                            / {metric.target} {metric.unit}
                          </span>
                        </div>
                        <Progress 
                          value={(metric.value / metric.target) * 100} 
                          className="h-2"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Featured Metric Details */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMetric}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${learningMetrics[activeMetric].color} text-white`}>
                        {learningMetrics[activeMetric].icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{learningMetrics[activeMetric].title}</h4>
                        <p className="text-foreground-secondary">Detailed analytics and insights</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-background/50 rounded-lg">
                        <div className="text-lg font-bold text-primary">
                          {Math.round((learningMetrics[activeMetric].value / learningMetrics[activeMetric].target) * 100)}%
                        </div>
                        <div className="text-xs text-foreground-secondary">Completed</div>
                      </div>
                      <div className="text-center p-3 bg-background/50 rounded-lg">
                        <div className="text-lg font-bold text-green-500">+{learningMetrics[activeMetric].change}%</div>
                        <div className="text-xs text-foreground-secondary">vs Yesterday</div>
                      </div>
                      <div className="text-center p-3 bg-background/50 rounded-lg">
                        <div className="text-lg font-bold text-accent">
                          {learningMetrics[activeMetric].target - learningMetrics[activeMetric].value}
                        </div>
                        <div className="text-xs text-foreground-secondary">Remaining</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions & Achievements */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Quick Actions */}
            <Card className="glassmorphism border-primary/20">
              <CardHeader>
                <h3 className="text-xl font-bold">Quick Actions</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="ghost">
                  <Play className="w-4 h-4 mr-3" />
                  Start New Session
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <BookOpen className="w-4 h-4 mr-3" />
                  Take Practice Test
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <BarChart3 className="w-4 h-4 mr-3" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Users className="w-4 h-4 mr-3" />
                  Join Study Group
                </Button>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="glassmorphism border-primary/20">
              <CardHeader>
                <h3 className="text-xl font-bold">Recent Achievements</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-background/30 rounded-lg border border-border/20 hover:border-primary/30 transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      <p className="text-xs text-foreground-secondary">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section - Recent Sessions & Upcoming */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Study Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Card className="glassmorphism border-primary/20 h-full">
              <CardHeader>
                <h3 className="text-xl font-bold">Recent Study Sessions</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    className="flex items-center gap-4 p-4 bg-background/30 rounded-lg border border-border/20 hover:border-primary/30 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className={`p-3 rounded-lg ${session.completed ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>
                      {session.completed ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{session.subject}</h4>
                      <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                        <span>{session.duration} minutes</span>
                        {session.completed && (
                          <>
                            <span>•</span>
                            <span className="text-green-500">{session.score}% score</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-foreground-secondary">
                      {session.date}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Card className="glassmorphism border-primary/20 h-full">
              <CardHeader>
                <h3 className="text-xl font-bold">Upcoming Events</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-background/30 rounded-lg border border-border/20 hover:border-primary/30 transition-colors group cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 bg-primary/20 rounded-lg text-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">{event.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                        <span>{event.time}</span>
                        <span>•</span>
                        <span>{event.date}</span>
                        <Badge variant="secondary" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};