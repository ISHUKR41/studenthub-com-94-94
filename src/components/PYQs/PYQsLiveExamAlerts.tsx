import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Clock, Users, AlertTriangle, Zap } from 'lucide-react';

export const PYQsLiveExamAlerts: React.FC = () => {
  const examAlerts = [
    {
      exam: 'JEE Main 2024',
      date: 'March 15, 2024',
      time: '9:00 AM - 12:00 PM',
      status: 'Live Now',
      participants: 1250000,
      priority: 'high',
      timeLeft: '2h 30m',
      subject: 'Physics & Mathematics'
    },
    {
      exam: 'NEET 2024',
      date: 'March 20, 2024', 
      time: '2:00 PM - 5:00 PM',
      status: 'Starting Soon',
      participants: 850000,
      priority: 'urgent',
      timeLeft: '15m',
      subject: 'Biology & Chemistry'
    },
    {
      exam: 'CAT 2024',
      date: 'March 25, 2024',
      time: '10:00 AM - 1:00 PM', 
      status: 'Upcoming',
      participants: 350000,
      priority: 'medium',
      timeLeft: '5d 2h',
      subject: 'Quantitative Aptitude'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-accent rounded-2xl">
              <Bell className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text font-playfair">
              Live Exam Alerts
            </h2>
          </div>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Stay updated with real-time exam notifications and never miss important test schedules
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {examAlerts.map((alert, index) => (
            <motion.div
              key={alert.exam}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className={`glass p-6 border-l-4 ${
                alert.priority === 'urgent' ? 'border-l-destructive' :
                alert.priority === 'high' ? 'border-l-warning' : 'border-l-primary'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{alert.exam}</h3>
                  <Badge 
                    variant={
                      alert.status === 'Live Now' ? 'destructive' :
                      alert.status === 'Starting Soon' ? 'default' : 'secondary'
                    }
                    className="animate-pulse"
                  >
                    {alert.status === 'Live Now' && <Zap className="h-3 w-3 mr-1" />}
                    {alert.status}
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{alert.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{alert.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{alert.participants.toLocaleString()} participants</span>
                  </div>
                </div>

                <div className="bg-background-secondary/50 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground-secondary">Time Left:</span>
                    <span className="font-bold text-lg gradient-text">{alert.timeLeft}</span>
                  </div>
                </div>

                <p className="text-sm text-foreground-secondary mb-4">{alert.subject}</p>
                
                <Button 
                  className={`w-full ${
                    alert.status === 'Live Now' ? 'btn-hero animate-pulse' : ''
                  }`}
                  variant={alert.status === 'Live Now' ? 'default' : 'outline'}
                >
                  {alert.status === 'Live Now' ? 'Join Now' : 'Set Reminder'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
                <p className="text-foreground-secondary">Live Monitoring</p>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                <p className="text-foreground-secondary">Exam Schedules</p>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
                <p className="text-foreground-secondary">Alert Accuracy</p>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">2M+</div>
                <p className="text-foreground-secondary">Students Notified</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};