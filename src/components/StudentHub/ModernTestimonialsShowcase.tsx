import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Quote, 
  Star, 
  Play, 
  Pause,
  ChevronLeft,
  ChevronRight,
  Heart,
  Award,
  TrendingUp,
  Users,
  MapPin,
  Calendar
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  exam: string;
  score: string;
  year: number;
  avatar: string;
  content: string;
  rating: number;
  verified: boolean;
  featured: boolean;
  videoUrl?: string;
}

export const ModernTestimonialsShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Arjun Sharma',
      role: 'JEE Advanced AIR 23',
      location: 'Delhi',
      exam: 'JEE Advanced',
      score: 'AIR 23',
      year: 2024,
      avatar: '👨‍🎓',
      content: 'StudentHub completely transformed my JEE preparation. The AI-powered recommendations helped me focus on my weak areas, and the extensive question bank gave me the confidence to tackle any problem.',
      rating: 5,
      verified: true,
      featured: true
    },
    {
      id: '2',
      name: 'Priya Patel',
      role: 'NEET Topper',
      location: 'Mumbai',
      exam: 'NEET UG',
      score: 'AIR 89',
      year: 2024,
      avatar: '👩‍🎓',
      content: 'The biology section helped me immensely. Mock tests were exactly like the real exam. Thanks to StudentHub, I achieved my dream of getting into AIIMS!',
      rating: 5,
      verified: true,
      featured: true
    },
    {
      id: '3',
      name: 'Rahul Singh',
      role: 'IAS Officer',
      location: 'Lucknow',
      exam: 'UPSC CSE',
      score: 'AIR 45',
      year: 2023,
      avatar: '👨‍💼',
      content: 'The current affairs section and previous year papers were game-changers for my UPSC preparation. The quality of content is unmatched.',
      rating: 5,
      verified: true,
      featured: false
    },
    {
      id: '4',
      name: 'Ananya Gupta',
      role: 'CA Final',
      location: 'Bangalore',
      exam: 'CA Final',
      score: 'AIR 12',
      year: 2024,
      avatar: '👩‍💻',
      content: 'The accounting and taxation papers helped me understand complex concepts easily. The study material is comprehensive and well-structured.',
      rating: 5,
      verified: true,
      featured: false
    },
    {
      id: '5',
      name: 'Vikash Kumar',
      role: 'Banking PO',
      location: 'Patna',
      exam: 'SBI PO',
      score: 'Selected',
      year: 2024,
      avatar: '👨‍💼',
      content: 'Mock tests and reasoning questions were exactly what I needed. The platform helped me crack SBI PO in my first attempt!',
      rating: 5,
      verified: true,
      featured: false
    },
    {
      id: '6',
      name: 'Shruti Reddy',
      role: 'Medical Student',
      location: 'Hyderabad',
      exam: 'NEET UG',
      score: 'AIR 156',
      year: 2024,
      avatar: '👩‍⚕️',
      content: 'The physics and chemistry sections were challenging but helped me improve significantly. Got admission in my dream medical college!',
      rating: 5,
      verified: true,
      featured: true
    }
  ];

  const stats = [
    { label: 'Success Stories', value: '50,000+', icon: <Award className="w-5 h-5" /> },
    { label: 'Average Rating', value: '4.9/5', icon: <Star className="w-5 h-5" /> },
    { label: 'Top Rankers', value: '15,000+', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Happy Students', value: '2M+', icon: <Heart className="w-5 h-5" /> }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], displayIndex: i });
    }
    return visible;
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-background-secondary via-background to-background-tertiary overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Quote Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20zm20 0c0-11.046-8.954-20-20-20v20h20zm20 0c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Quote Icons */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Quote className="w-8 h-8 text-primary/20" />
          </motion.div>
        ))}
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
            <Users className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold text-lg">Student Success Stories</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-space">
            <span className="gradient-text">Real Students,</span>{" "}
            <span className="text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
              Real Results
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Discover how{" "}
            <span className="gradient-text-accent font-semibold">millions of students</span>{" "}
            achieved their dreams with StudentHub
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-2xl glassmorphism group hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 text-primary mb-3 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-foreground-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Testimonials Carousel */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Carousel Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold">Featured Stories</h3>
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                <Heart className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="border-primary/30 hover:border-primary"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="border-primary/30 hover:border-primary"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="border-primary/30 hover:border-primary"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${currentIndex}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeInOut"
                  }}
                  className={`group ${index === 1 ? 'md:scale-110 md:z-10' : 'md:scale-95'}`}
                >
                  <Card className={`glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden h-full ${
                    testimonial.featured ? 'border-accent/40 shadow-2xl' : ''
                  }`}>
                    <CardContent className="p-6">
                      {/* Quote Icon */}
                      <motion.div
                        className="text-primary/30 mb-4"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                      >
                        <Quote className="w-8 h-8" />
                      </motion.div>

                      {/* Content */}
                      <p className="text-foreground-secondary mb-6 leading-relaxed italic">
                        "{testimonial.content}"
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Student Info */}
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{testimonial.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-primary">{testimonial.name}</h4>
                            {testimonial.verified && (
                              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground-secondary">{testimonial.role}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-foreground-secondary">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {testimonial.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {testimonial.year}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Achievement Badge */}
                      <motion.div 
                        className="mt-4 p-3 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{testimonial.exam}</span>
                          <Badge className="bg-gradient-to-r from-accent to-primary text-white">
                            {testimonial.score}
                          </Badge>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary scale-125' : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="glassmorphism rounded-3xl p-8 border-primary/20">
            <h3 className="text-3xl font-bold mb-4 gradient-text">Join the Success Stories</h3>
            <p className="text-foreground-secondary mb-6 text-lg">
              Be the next success story. Start your journey with StudentHub today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero bg-gradient-to-r from-primary to-accent px-8 py-4 text-lg">
                Start Your Success Journey
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg border-primary/40 hover:border-primary">
                Read More Stories
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};