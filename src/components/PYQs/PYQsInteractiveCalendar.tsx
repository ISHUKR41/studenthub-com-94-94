import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Users, 
  Bell,
  BookOpen,
  Target,
  Award
} from 'lucide-react';

export const PYQsInteractiveCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const examEvents = [
    {
      date: new Date(2024, 2, 15), // March 15, 2024
      title: 'JEE Main 2024 - Session 1',
      time: '9:00 AM - 12:00 PM',
      type: 'Major Exam',
      participants: 1200000,
      location: 'Pan India',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      priority: 'high',
      registrationDeadline: new Date(2024, 2, 10)
    },
    {
      date: new Date(2024, 2, 20),
      title: 'NEET 2024',
      time: '2:00 PM - 5:00 PM',
      type: 'Medical Entrance',
      participants: 850000,
      location: 'Pan India',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      priority: 'high',
      registrationDeadline: new Date(2024, 2, 15)
    },
    {
      date: new Date(2024, 2, 25),
      title: 'CAT 2024 Mock Test',
      time: '10:00 AM - 1:00 PM',
      type: 'Practice Test',
      participants: 45000,
      location: 'Online',
      subjects: ['Quantitative Aptitude', 'Verbal Ability', 'Data Interpretation'],
      priority: 'medium',
      registrationDeadline: new Date(2024, 2, 23)
    },
    {
      date: new Date(2024, 2, 28),
      title: 'GATE 2024 - Computer Science',
      time: '9:30 AM - 12:30 PM',
      type: 'Engineering Exam',
      participants: 150000,
      location: 'Pan India',
      subjects: ['Computer Science'],
      priority: 'high',
      registrationDeadline: new Date(2024, 2, 25)
    }
  ];

  const studySchedule = [
    {
      date: new Date(2024, 2, 16),
      title: 'Physics Revision - Mechanics',
      time: '4:00 PM - 6:00 PM',
      type: 'Study Session',
      priority: 'medium'
    },
    {
      date: new Date(2024, 2, 18),
      title: 'Chemistry Mock Test',
      time: '10:00 AM - 12:00 PM',
      type: 'Practice',
      priority: 'high'
    },
    {
      date: new Date(2024, 2, 22),
      title: 'Mathematics Problem Solving',
      time: '3:00 PM - 5:00 PM',
      type: 'Study Session',
      priority: 'medium'
    }
  ];

  const allEvents = [...examEvents, ...studySchedule];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return allEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-primary rounded-2xl">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text font-playfair">
              Exam Calendar
            </h2>
          </div>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Plan your preparation with our comprehensive exam calendar and study scheduler
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="glass p-8">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-foreground-secondary p-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentDate).map((date, index) => {
                  if (!date) {
                    return <div key={index} className="h-20"></div>;
                  }

                  const events = getEventsForDate(date);
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  const isToday = date.toDateString() === new Date().toDateString();

                  return (
                    <motion.div
                      key={date.toDateString()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDate(date)}
                      className={`h-20 p-2 rounded-lg cursor-pointer transition-all relative ${
                        isSelected 
                          ? 'bg-gradient-primary text-white' 
                          : isToday
                          ? 'bg-primary/20 border border-primary'
                          : 'bg-background-secondary hover:bg-background-tertiary'
                      }`}
                    >
                      <div className="font-semibold text-sm">{date.getDate()}</div>
                      <div className="mt-1 space-y-1">
                        {events.slice(0, 2).map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className={`text-xs px-1 py-0.5 rounded truncate ${
                              event.type === 'Major Exam' || event.type === 'Medical Entrance' || event.type === 'Engineering Exam'
                                ? 'bg-destructive/20 text-destructive'
                                : event.type === 'Practice Test' || event.type === 'Practice'
                                ? 'bg-warning/20 text-warning'
                                : 'bg-primary/20 text-primary'
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {events.length > 2 && (
                          <div className="text-xs text-foreground-secondary">
                            +{events.length - 2} more
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass p-8">
              <h3 className="text-2xl font-bold mb-6">
                {selectedDate 
                  ? `Events for ${selectedDate.toLocaleDateString()}`
                  : 'Upcoming Events'
                }
              </h3>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {(selectedDate ? getEventsForDate(selectedDate) : allEvents.slice(0, 4)).map((event, index) => (
                    <motion.div
                      key={`${event.title}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-border rounded-lg p-4 hover-lift"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-lg">{event.title}</h4>
                        <Badge 
                          variant={
                            event.priority === 'high' ? 'destructive' :
                            event.priority === 'medium' ? 'default' : 'secondary'
                          }
                        >
                          {event.priority}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm text-foreground-secondary">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        
                        {'location' in event && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location as string}</span>
                          </div>
                        )}
                        
                        {'participants' in event && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{event.participants.toLocaleString()} participants</span>
                          </div>
                        )}
                        
                        {'subjects' in event && (
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span>{Array.isArray(event.subjects) ? (event.subjects as string[]).join(', ') : String(event.subjects)}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Bell className="h-4 w-4 mr-2" />
                          Set Reminder
                        </Button>
                        {'registrationDeadline' in event && (
                          <Button size="sm" className="flex-1">
                            Register Now
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Card>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6"
            >
              <Card className="glass p-6">
                <h4 className="font-bold mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Add Study Goal
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Schedule Reminder
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="h-4 w-4 mr-2" />
                    View Achievements
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Sync Your Study Schedule</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Connect your calendar with our AI-powered study planner for personalized exam preparation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                Sync Calendar
              </Button>
              <Button size="lg" variant="outline">
                Download Schedule
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};