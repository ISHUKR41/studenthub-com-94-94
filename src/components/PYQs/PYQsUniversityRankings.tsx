import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Award, MapPin, Users, GraduationCap, Building } from 'lucide-react';

export const PYQsUniversityRankings: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('engineering');

  const rankings = {
    engineering: [
      {
        rank: 1,
        name: 'Indian Institute of Technology, Delhi',
        location: 'New Delhi',
        nirf: 2,
        placements: '98.2%',
        avgPackage: '₹18.5 LPA',
        highestPackage: '₹1.2 Cr',
        intakeSeats: 1208,
        cutoffRank: 'AIR 1-250',
        logo: '/placeholder.svg'
      },
      {
        rank: 2,
        name: 'Indian Institute of Technology, Bombay',
        location: 'Mumbai',
        nirf: 3,
        placements: '97.8%',
        avgPackage: '₹17.9 LPA',
        highestPackage: '₹1.8 Cr',
        intakeSeats: 1032,
        cutoffRank: 'AIR 1-300',
        logo: '/placeholder.svg'
      },
      {
        rank: 3,
        name: 'Indian Institute of Technology, Kanpur',
        location: 'Kanpur',
        nirf: 4,
        placements: '96.5%',
        avgPackage: '₹16.8 LPA',
        highestPackage: '₹1.5 Cr',
        intakeSeats: 987,
        cutoffRank: 'AIR 1-400',
        logo: '/placeholder.svg'
      },
      {
        rank: 4,
        name: 'Indian Institute of Technology, Kharagpur',
        location: 'Kharagpur',
        nirf: 5,
        placements: '95.8%',
        avgPackage: '₹15.9 LPA',
        highestPackage: '₹1.3 Cr',
        intakeSeats: 1456,
        cutoffRank: 'AIR 1-500',
        logo: '/placeholder.svg'
      },
      {
        rank: 5,
        name: 'Indian Institute of Technology, Madras',
        location: 'Chennai',
        nirf: 1,
        placements: '97.2%',
        avgPackage: '₹17.2 LPA',
        highestPackage: '₹1.4 Cr',
        intakeSeats: 1121,
        cutoffRank: 'AIR 1-450',
        logo: '/placeholder.svg'
      }
    ],
    medical: [
      {
        rank: 1,
        name: 'All India Institute of Medical Sciences, Delhi',
        location: 'New Delhi',
        nirf: 1,
        placements: '100%',
        avgPackage: '₹12.5 LPA',
        highestPackage: '₹35 LPA',
        intakeSeats: 125,
        cutoffRank: 'AIR 1-50',
        logo: '/placeholder.svg'
      },
      {
        rank: 2,
        name: 'Post Graduate Institute of Medical Education',
        location: 'Chandigarh',
        nirf: 2,
        placements: '98.5%',
        avgPackage: '₹11.8 LPA',
        highestPackage: '₹30 LPA',
        intakeSeats: 180,
        cutoffRank: 'AIR 1-80',
        logo: '/placeholder.svg'
      },
      {
        rank: 3,
        name: 'Christian Medical College',
        location: 'Vellore',
        nirf: 3,
        placements: '97.8%',
        avgPackage: '₹10.9 LPA',
        highestPackage: '₹28 LPA',
        intakeSeats: 150,
        cutoffRank: 'AIR 1-100',
        logo: '/placeholder.svg'
      }
    ],
    management: [
      {
        rank: 1,
        name: 'Indian Institute of Management, Ahmedabad',
        location: 'Ahmedabad',
        nirf: 1,
        placements: '100%',
        avgPackage: '₹33.2 LPA',
        highestPackage: '₹1.15 Cr',
        intakeSeats: 395,
        cutoffRank: '99.5+ %ile',
        logo: '/placeholder.svg'
      },
      {
        rank: 2,
        name: 'Indian Institute of Management, Bangalore',
        location: 'Bangalore',
        nirf: 2,
        placements: '99.8%',
        avgPackage: '₹31.2 LPA',
        highestPackage: '₹89 LPA',
        intakeSeats: 406,
        cutoffRank: '99.2+ %ile',
        logo: '/placeholder.svg'
      },
      {
        rank: 3,
        name: 'Indian Institute of Management, Calcutta',
        location: 'Kolkata',
        nirf: 3,
        placements: '99.5%',
        avgPackage: '₹29.1 LPA',
        highestPackage: '₹75 LPA',
        intakeSeats: 462,
        cutoffRank: '99.0+ %ile',
        logo: '/placeholder.svg'
      }
    ]
  };

  const categories = [
    { id: 'engineering', label: 'Engineering', icon: Building },
    { id: 'medical', label: 'Medical', icon: Award },
    { id: 'management', label: 'Management', icon: TrendingUp }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 font-playfair">
            University Rankings & Insights
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Explore top universities, admission cutoffs, placement statistics, and make informed decisions for your career
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <category.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(rankings).map(([categoryId, institutions]) => (
              <TabsContent key={categoryId} value={categoryId}>
                <div className="space-y-6">
                  {institutions.map((institution, index) => (
                    <motion.div
                      key={institution.rank}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass p-6 hover-lift">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Rank & Logo */}
                          <div className="lg:col-span-2 text-center">
                            <div className="flex items-center justify-center gap-4 lg:flex-col">
                              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">#{institution.rank}</span>
                              </div>
                              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center">
                                <GraduationCap className="h-8 w-8 text-primary" />
                              </div>
                            </div>
                          </div>

                          {/* Institution Info */}
                          <div className="lg:col-span-4">
                            <h3 className="text-xl font-bold mb-2">{institution.name}</h3>
                            <div className="flex items-center gap-2 mb-3">
                              <MapPin className="h-4 w-4 text-foreground-secondary" />
                              <span className="text-foreground-secondary">{institution.location}</span>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="secondary">NIRF #{institution.nirf}</Badge>
                              <Badge variant="outline">Cutoff: {institution.cutoffRank}</Badge>
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-background-secondary/50 rounded-lg">
                              <p className="text-xs text-foreground-secondary mb-1">Placements</p>
                              <p className="font-bold text-success">{institution.placements}</p>
                            </div>
                            <div className="text-center p-3 bg-background-secondary/50 rounded-lg">
                              <p className="text-xs text-foreground-secondary mb-1">Avg Package</p>
                              <p className="font-bold text-primary">{institution.avgPackage}</p>
                            </div>
                            <div className="text-center p-3 bg-background-secondary/50 rounded-lg">
                              <p className="text-xs text-foreground-secondary mb-1">Highest</p>
                              <p className="font-bold text-accent">{institution.highestPackage}</p>
                            </div>
                            <div className="text-center p-3 bg-background-secondary/50 rounded-lg">
                              <p className="text-xs text-foreground-secondary mb-1">Seats</p>
                              <p className="font-bold">{institution.intakeSeats}</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4 pt-4 border-t border-border/20">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Admission Process
                          </Button>
                          <Button size="sm" variant="outline">
                            Previous Cutoffs
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {[
            { icon: GraduationCap, value: '500+', label: 'Universities Covered' },
            { icon: Users, value: '2.5M+', label: 'Student Placements' },
            { icon: TrendingUp, value: '85%', label: 'Avg Placement Rate' },
            { icon: Award, value: '₹15.2L', label: 'Avg Package (Top 100)' }
          ].map((stat, index) => (
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

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Explore More Universities</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Get detailed insights, admission guidance, and expert counseling for your dream university
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                College Predictor
              </Button>
              <Button size="lg" variant="outline">
                Admission Guidance
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};