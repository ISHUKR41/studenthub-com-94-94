import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Mail, 
  User, 
  MessageSquare, 
  Phone, 
  Star, 
  Sparkles,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield
} from 'lucide-react';

export const UltraModern3DContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));

  const handleMouseMove = (event: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(event.clientX - centerX);
      mouseY.set(event.clientY - centerY);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="relative py-20 px-4 min-h-screen bg-gradient-to-br from-background via-background-secondary/50 to-background-tertiary/30 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Badge className="text-xl px-8 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 font-space mb-6">
            Ultra Modern Contact Experience
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold font-playfair gradient-text mb-6">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed font-poppins">
            Experience our revolutionary contact form with advanced animations and instant response
          </p>
        </motion.div>

        <motion.div
          ref={cardRef}
          className="perspective-1000"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Card className="relative overflow-hidden glassmorphism border-2 border-border/30 hover:border-primary/50 transition-all duration-500 shadow-2xl">
            <CardContent className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center space-y-4 mb-8">
                    <h2 className="text-3xl font-bold font-playfair gradient-text">Contact Form</h2>
                    <p className="text-foreground-secondary font-poppins">
                      Fill out the form below and we'll get back to you within 24 hours
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-foreground-secondary z-10" />
                        <Input
                          type="text"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-12 h-12 bg-background/50 border-border/30 focus:border-primary/50 transition-all duration-300"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }}>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-foreground-secondary z-10" />
                        <Input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-12 h-12 bg-background/50 border-border/30 focus:border-primary/50 transition-all duration-300"
                          required
                        />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <div className="relative">
                      <Star className="absolute left-3 top-3 h-5 w-5 text-foreground-secondary z-10" />
                      <Input
                        type="text"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="pl-12 h-12 bg-background/50 border-border/30 focus:border-primary/50 transition-all duration-300"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-foreground-secondary z-10" />
                      <Textarea
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="pl-12 pt-3 min-h-[120px] bg-background/50 border-border/30 focus:border-primary/50 transition-all duration-300 resize-none"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold text-lg relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="h-5 w-5" />
                            </motion.div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            Send Message
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </form>
              ) : (
                <motion.div
                  className="text-center py-12 space-y-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                    transition={{ duration: 2 }}
                  >
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold gradient-text font-playfair">Message Sent Successfully!</h3>
                    <p className="text-lg text-foreground-secondary font-poppins">
                      Thank you for contacting STUDENTHUB. We'll get back to you shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};