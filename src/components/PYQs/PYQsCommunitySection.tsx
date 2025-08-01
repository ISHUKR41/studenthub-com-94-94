import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageSquare, BookOpen, Trophy, Heart, Share2, Calendar, Star } from 'lucide-react';

export const PYQsCommunitySection: React.FC = () => {
  const communityStats = [
    { icon: Users, value: '150K+', label: 'Active Students' },
    { icon: MessageSquare, value: '50K+', label: 'Daily Discussions' },
    { icon: BookOpen, value: '25K+', label: 'Study Groups' },
    { icon: Trophy, value: '500+', label: 'Top Rankers' }
  ];

  const featuredGroups = [
    {
      id: 1,
      name: 'JEE 2025 Preparation',
      description: 'Join fellow JEE aspirants for daily practice, doubt clearing, and motivation',
      members: 28540,
      category: 'Engineering',
      posts: 1250,
      isActive: true,
      moderator: 'Dr. Rajesh Kumar',
      tags: ['JEE Main', 'JEE Advanced', 'Physics', 'Mathematics']
    },
    {
      id: 2,
      name: 'NEET Biology Mastery',
      description: 'Master biology concepts with interactive sessions and expert guidance',
      members: 19380,
      category: 'Medical',
      posts: 890,
      isActive: true,
      moderator: 'Dr. Priya Sharma',
      tags: ['NEET', 'Biology', 'Botany', 'Zoology']
    },
    {
      id: 3,
      name: 'CAT MBA Aspirants 2025',
      description: 'Strategic preparation for CAT with mock tests and peer learning',
      members: 15620,
      category: 'Management',
      posts: 675,
      isActive: true,
      moderator: 'Rohit Singh',
      tags: ['CAT', 'MBA', 'Quantitative', 'Verbal']
    }
  ];

  const recentActivities = [
    {
      user: 'Ananya Gupta',
      action: 'shared a solution',
      content: 'Physics - Wave Optics Problem',
      time: '2 hours ago',
      likes: 24,
      comments: 8
    },
    {
      user: 'Rahul Verma',
      action: 'asked a question',
      content: 'Organic Chemistry Mechanism doubt',
      time: '4 hours ago',
      likes: 12,
      comments: 15
    },
    {
      user: 'Sneha Patel',
      action: 'completed a study session',
      content: 'Mathematics - Calculus Chapter',
      time: '6 hours ago',
      likes: 18,
      comments: 5
    }
  ];

  const upcomingEvents = [
    {
      title: 'Live Physics Doubt Session',
      date: 'Today, 7:00 PM',
      host: 'Dr. Vikram Singh',
      attendees: 450,
      type: 'Live Session'
    },
    {
      title: 'Chemistry Mock Test Series',
      date: 'Tomorrow, 10:00 AM',
      host: 'StudyHub Team',
      attendees: 1200,
      type: 'Mock Test'
    },
    {
      title: 'Group Study - Mathematics',
      date: 'Sunday, 3:00 PM',
      host: 'Math Masters Group',
      attendees: 85,
      type: 'Study Group'
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
            Learning Community
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Connect, collaborate, and grow with thousands of like-minded students in our vibrant learning ecosystem
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-foreground-secondary text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Study Groups */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Featured Study Groups</h3>
                <Button variant="outline">Browse All Groups</Button>
              </div>
              
              <div className="space-y-6">
                {featuredGroups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass p-6 hover-lift">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-semibold">{group.name}</h4>
                            {group.isActive && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-success rounded-full"></div>
                                <span className="text-xs text-success">Active</span>
                              </div>
                            )}
                          </div>
                          <p className="text-foreground-secondary mb-3">{group.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {group.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Badge variant="outline">{group.category}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-foreground-secondary">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{group.members.toLocaleString()} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{group.posts} posts today</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">{group.moderator.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>by {group.moderator}</span>
                          </div>
                        </div>
                        <Button size="sm">Join Group</Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">{activity.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm mb-1">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-sm text-primary cursor-pointer hover:underline">
                            {activity.content}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-foreground-secondary">
                            <span>{activity.time}</span>
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              <span>{activity.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{activity.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-foreground-secondary mb-2">{event.date}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs">by {event.host}</p>
                        <div className="flex items-center gap-1 text-xs text-foreground-secondary">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Top Contributors
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Arjun Kumar', contributions: 245, badge: 'Physics Expert' },
                    { name: 'Priya Sharma', contributions: 189, badge: 'Chemistry Helper' },
                    { name: 'Vikram Singh', contributions: 156, badge: 'Math Wizard' }
                  ].map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">{contributor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{contributor.name}</p>
                          <p className="text-xs text-foreground-secondary">{contributor.contributions} contributions</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {contributor.badge}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Connect with fellow students, share knowledge, and accelerate your learning journey together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <Users className="h-5 w-5 mr-2" />
                Join Community
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5 mr-2" />
                Invite Friends
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};