import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, ThumbsUp, Reply, Clock, Users, TrendingUp } from 'lucide-react';

export const PYQsDiscussionForum: React.FC = () => {
  const discussions = [
    {
      id: 1,
      title: 'How to approach JEE Main Physics Optics questions?',
      author: 'Arjun Kumar',
      avatar: '/placeholder.svg',
      content: 'I\'m struggling with ray optics problems, especially those involving multiple mirrors and lenses. Any tips or strategies?',
      category: 'Physics',
      tags: ['JEE Main', 'Optics', 'Physics'],
      likes: 24,
      replies: 12,
      timeAgo: '2 hours ago',
      isHot: true
    },
    {
      id: 2,
      title: 'Best approach for Organic Chemistry reactions in NEET',
      author: 'Priya Sharma',
      avatar: '/placeholder.svg',
      content: 'Looking for effective methods to memorize and understand organic chemistry reaction mechanisms for NEET preparation.',
      category: 'Chemistry',
      tags: ['NEET', 'Organic Chemistry', 'Reactions'],
      likes: 18,
      replies: 8,
      timeAgo: '4 hours ago',
      isHot: false
    },
    {
      id: 3,
      title: 'Integration by parts - when to apply which method?',
      author: 'Rohit Singh',
      avatar: '/placeholder.svg',
      content: 'I understand the basic formula but struggle with choosing the right approach for different types of integration problems.',
      category: 'Mathematics',
      tags: ['Calculus', 'Integration', 'JEE Advanced'],
      likes: 31,
      replies: 15,
      timeAgo: '6 hours ago',
      isHot: true
    }
  ];

  const forumStats = [
    { icon: Users, label: 'Active Members', value: '45,280' },
    { icon: MessageCircle, label: 'Discussions', value: '12,540' },
    { icon: ThumbsUp, label: 'Solutions', value: '28,960' },
    { icon: TrendingUp, label: 'Daily Posts', value: '340' }
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
            Discussion Forum
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Connect with fellow students, share doubts, get solutions, and learn together in our vibrant community
          </p>
        </motion.div>

        {/* Forum Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {forumStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass p-6 text-center hover-lift">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-foreground-secondary text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Discussions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Recent Discussions</h3>
                <Button>Start New Discussion</Button>
              </div>
              
              <div className="space-y-6">
                {discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass p-6 hover-lift">
                      <div className="flex gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={discussion.avatar} />
                          <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-lg font-semibold mb-1 hover:text-primary cursor-pointer">
                                {discussion.title}
                                {discussion.isHot && (
                                  <Badge variant="destructive" className="ml-2 text-xs">HOT</Badge>
                                )}
                              </h4>
                              <p className="text-foreground-secondary text-sm mb-2">
                                by {discussion.author} • {discussion.timeAgo}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-foreground-secondary mb-4 line-clamp-2">
                            {discussion.content}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {discussion.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-foreground-secondary">
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{discussion.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Reply className="h-4 w-4" />
                                <span>{discussion.replies}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Popular Categories */}
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4">Popular Categories</h3>
                <div className="space-y-3">
                  {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General'].map((category) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-foreground-secondary">{category}</span>
                      <Badge variant="outline">{Math.floor(Math.random() * 500 + 100)}</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Contributors */}
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Dr. Rajesh Kumar', posts: 245, badge: 'Expert' },
                    { name: 'Anita Sharma', posts: 189, badge: 'Helper' },
                    { name: 'Vikram Singh', posts: 156, badge: 'Active' }
                  ].map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{contributor.name}</p>
                        <p className="text-xs text-foreground-secondary">{contributor.posts} posts</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {contributor.badge}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    'New reply in "Physics Mechanics"',
                    'Question solved in "Organic Chemistry"',
                    'New discussion in "Calculus"'
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground-secondary">{activity}</span>
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
            <h3 className="text-3xl font-bold mb-4">Join the Learning Community</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Get your doubts cleared, help others, and be part of India's largest student community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                Join Discussion
              </Button>
              <Button size="lg" variant="outline">
                Browse Topics
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};