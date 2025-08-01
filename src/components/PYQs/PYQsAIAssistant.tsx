import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, MessageCircle, Lightbulb, BookOpen, Zap } from 'lucide-react';

export const PYQsAIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const suggestions = [
    'Explain this physics concept',
    'Help me solve this chemistry problem',
    'Create a study schedule for JEE',
    'Find similar questions',
    'Explain step-by-step solution'
  ];

  const features = [
    {
      icon: Bot,
      title: 'Instant Explanations',
      description: 'Get detailed explanations for any question within seconds'
    },
    {
      icon: Lightbulb,
      title: 'Smart Hints',
      description: 'Receive intelligent hints without revealing the complete solution'
    },
    {
      icon: BookOpen,
      title: 'Concept Mapping',
      description: 'Understand how concepts connect across different topics'
    },
    {
      icon: Zap,
      title: 'Quick Solutions',
      description: 'Get step-by-step solutions with alternative approaches'
    }
  ];

  const chatMessages = [
    {
      type: 'user',
      message: 'Can you help me understand the concept of electric field?',
      time: '2 mins ago'
    },
    {
      type: 'ai',
      message: 'Electric field is a region around a charged particle where other charged particles experience a force. Think of it like the "zone of influence" of a charge. The strength of this field depends on the magnitude of the charge and decreases with distance. Would you like me to explain with a specific example?',
      time: '2 mins ago'
    },
    {
      type: 'user',
      message: 'Yes, please give me an example with calculations',
      time: '1 min ago'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
      setMessage('');
    }
  };

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
            AI Study Assistant
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Your personal AI tutor available 24/7 to help with doubts, explanations, and study guidance
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground-secondary text-sm">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass overflow-hidden">
              {/* Chat Header */}
              <div className="p-6 border-b border-border/20 bg-gradient-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">StudyBot AI</h3>
                    <p className="text-foreground-secondary">Your AI Study Companion</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="secondary" className="text-success">
                      <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                      Online
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 max-h-96 overflow-y-auto space-y-4">
                {chatMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`p-4 rounded-2xl ${
                        msg.type === 'user' 
                          ? 'bg-gradient-primary text-white' 
                          : 'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                      </div>
                      <p className="text-xs text-foreground-secondary mt-1 px-2">
                        {msg.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted p-4 rounded-2xl">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Suggestions */}
              <div className="p-4 border-t border-border/20">
                <p className="text-sm text-foreground-secondary mb-3">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setMessage(suggestion)}
                      className="text-xs hover:bg-primary hover:text-white"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-border/20 bg-background-secondary/50">
                <div className="flex gap-3">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything about your studies..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="px-6"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-foreground-secondary mt-2 text-center">
                  AI assistant can make mistakes. Please verify important information.
                </p>
              </div>
            </Card>
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
            <h3 className="text-3xl font-bold mb-4">Experience Personalized AI Learning</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Get instant help with your studies, doubt clearing, and exam preparation with our advanced AI assistant
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Chatting
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};