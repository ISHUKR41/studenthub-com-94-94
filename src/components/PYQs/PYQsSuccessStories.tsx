import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Trophy, Target, Calendar, Star } from 'lucide-react';

export const PYQsSuccessStories: React.FC = () => {
  const successStories = [
    {
      name: 'Ananya Gupta',
      exam: 'JEE Advanced 2024',
      rank: 'AIR 47',
      college: 'IIT Delhi - Computer Science',
      avatar: '/placeholder.svg',
      story: 'PYQs platform helped me understand question patterns and improve my speed. The AI-powered study plan was game-changing for my preparation.',
      score: '342/360',
      previousRank: 'AIR 2,340 (Mock Tests)',
      improvement: '+2,293 ranks',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      timeUsed: '8 months'
    },
    {
      name: 'Rohan Sharma',
      exam: 'NEET 2024',
      rank: 'AIR 156',
      college: 'AIIMS Delhi',
      avatar: '/placeholder.svg',
      story: 'The discussion forum and AI assistant were incredibly helpful. I could clear my doubts instantly and learned from other students\' mistakes.',
      score: '695/720',
      previousRank: 'AIR 5,670 (Practice Tests)',
      improvement: '+5,514 ranks',
      subjects: ['Biology', 'Chemistry', 'Physics'],
      timeUsed: '10 months'
    },
    {
      name: 'Preethi Nair',
      exam: 'CAT 2024',
      rank: '99.8 Percentile',
      college: 'IIM Bangalore',
      avatar: '/placeholder.svg',
      story: 'Mock tests with real-time analysis helped me identify my weak areas. The adaptive learning system personalized my preparation perfectly.',
      score: '99.8 %ile',
      previousRank: '89.2 %ile (Initial)',
      improvement: '+10.6 percentile',
      subjects: ['Quantitative', 'Verbal', 'Logical'],
      timeUsed: '6 months'
    }
  ];

  const achievements = [
    { icon: Trophy, value: '25,000+', label: 'Success Stories' },
    { icon: Target, value: '92%', label: 'Average Improvement' },
    { icon: Star, value: '4.9/5', label: 'Student Rating' },
    { icon: Calendar, value: '5 years', label: 'Track Record' }
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
            Success Stories
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Real students, real results. Discover how our PYQs platform helped thousands achieve their dream ranks
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-2xl font-bold mb-1">{achievement.value}</p>
                <p className="text-foreground-secondary text-sm">{achievement.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Stories */}
        <div className="space-y-12">
          {successStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className={`glass p-8 overflow-hidden relative ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                <div className="absolute top-6 right-6">
                  <Quote className="h-12 w-12 text-primary/20" />
                </div>
                
                <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'lg:text-right'
                }`}>
                  {/* Content */}
                  <div className="lg:col-span-3 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{story.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="default" className="bg-success">
                          {story.rank}
                        </Badge>
                        <Badge variant="secondary">
                          {story.exam}
                        </Badge>
                        <Badge variant="outline">
                          {story.college}
                        </Badge>
                      </div>
                    </div>
                    
                    <blockquote className="text-lg text-foreground-secondary italic leading-relaxed">
                      "{story.story}"
                    </blockquote>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-background-secondary/50 p-4 rounded-xl">
                        <p className="text-sm text-foreground-secondary">Final Score</p>
                        <p className="text-xl font-bold text-success">{story.score}</p>
                      </div>
                      <div className="bg-background-secondary/50 p-4 rounded-xl">
                        <p className="text-sm text-foreground-secondary">Improvement</p>
                        <p className="text-xl font-bold text-primary">{story.improvement}</p>
                      </div>
                      <div className="bg-background-secondary/50 p-4 rounded-xl">
                        <p className="text-sm text-foreground-secondary">Preparation Time</p>
                        <p className="text-xl font-bold text-accent">{story.timeUsed}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-foreground-secondary mb-2">Subjects Mastered:</p>
                      <div className="flex flex-wrap gap-2">
                        {story.subjects.map((subject) => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Avatar & Stats */}
                  <div className="lg:col-span-2 text-center">
                    <div className="relative mb-6">
                      <div className="w-48 h-48 mx-auto rounded-full bg-gradient-primary/10 flex items-center justify-center">
                        <Avatar className="w-40 h-40">
                          <AvatarImage src={story.avatar} />
                          <AvatarFallback className="text-4xl font-bold">
                            {story.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Trophy className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-sm text-foreground-secondary">Previous Rank</p>
                        <p className="text-lg font-semibold">{story.previousRank}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground-secondary">Current Rank</p>
                        <p className="text-2xl font-bold text-success">{story.rank}</p>
                      </div>
                    </div>
                  </div>
                </div>
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
            <h3 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who achieved their dream ranks with our comprehensive PYQs platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-hero px-8 py-4 text-lg font-semibold"
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-ghost px-8 py-4 text-lg font-semibold"
              >
                View More Stories
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};