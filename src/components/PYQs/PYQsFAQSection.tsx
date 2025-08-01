import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Book, Download, Users, Shield } from 'lucide-react';

export const PYQsFAQSection: React.FC = () => {
  const faqCategories = [
    {
      id: 'general',
      name: 'General',
      icon: HelpCircle,
      color: 'text-primary',
      count: 12
    },
    {
      id: 'download',
      name: 'Downloads',
      icon: Download,
      color: 'text-success',
      count: 8
    },
    {
      id: 'study',
      name: 'Study Plans',
      icon: Book,
      color: 'text-accent',
      count: 6
    },
    {
      id: 'community',
      name: 'Community',
      icon: Users,
      color: 'text-secondary',
      count: 5
    },
    {
      id: 'privacy',
      name: 'Privacy & Security',
      icon: Shield,
      color: 'text-destructive',
      count: 4
    }
  ];

  const faqs = {
    general: [
      {
        question: 'What is PYQs platform and how does it help in exam preparation?',
        answer: 'PYQs (Previous Year Questions) platform is a comprehensive study resource that provides access to thousands of previous year question papers from various competitive exams like JEE, NEET, CAT, GATE, and more. It helps students understand exam patterns, practice with real questions, and improve their performance through AI-powered analytics and personalized study plans.'
      },
      {
        question: 'Which exams are covered on this platform?',
        answer: 'We cover over 50+ competitive exams including JEE Main, JEE Advanced, NEET, CAT, GATE, UPSC, SSC, Banking exams, CBSE boards, state board exams, and many more. Our database is constantly updated with the latest question papers and patterns.'
      },
      {
        question: 'How accurate are the solutions provided?',
        answer: 'All solutions are prepared and verified by subject matter experts and experienced faculty members. We maintain a rigorous quality check process and update solutions based on official answer keys and expert feedback. Our accuracy rate is over 99%.'
      },
      {
        question: 'Is there a mobile app available?',
        answer: 'Yes, we have dedicated mobile apps for both Android and iOS platforms. The apps provide offline access to downloaded papers, push notifications for new uploads, and synchronized progress tracking across devices.'
      }
    ],
    download: [
      {
        question: 'How can I download question papers?',
        answer: 'You can download question papers directly from our platform. Simply search for your desired exam/subject, select the paper, and click the download button. Papers are available in PDF format with high-quality scans.'
      },
      {
        question: 'Are downloads free or paid?',
        answer: 'We offer both free and premium content. Basic question papers are free to download, while premium features like detailed solutions, video explanations, and advanced analytics require a subscription.'
      },
      {
        question: 'What file formats are available for download?',
        answer: 'All question papers are available in PDF format optimized for both mobile and desktop viewing. Solutions are provided in PDF format with step-by-step explanations and diagrams.'
      },
      {
        question: 'Is there a download limit?',
        answer: 'Free users can download up to 10 papers per day. Premium subscribers have unlimited downloads along with access to exclusive content and features.'
      }
    ],
    study: [
      {
        question: 'How does the AI-powered study plan work?',
        answer: 'Our AI analyzes your performance, learning pace, target exam date, and weak areas to create a personalized study schedule. It adapts in real-time based on your progress and suggests optimal practice sessions and revision schedules.'
      },
      {
        question: 'Can I customize my study plan?',
        answer: 'Yes, you can fully customize your study plan by selecting specific subjects, topics, difficulty levels, and time allocation. The AI will adjust recommendations based on your preferences while maintaining optimal learning efficiency.'
      },
      {
        question: 'How often is the study plan updated?',
        answer: 'Study plans are dynamically updated based on your daily performance and progress. Major revisions happen weekly, while minor adjustments occur daily to ensure you stay on track with your goals.'
      }
    ],
    community: [
      {
        question: 'How do I join study groups?',
        answer: 'You can browse available study groups by exam type, subject, or location. Simply click "Join Group" on any group that interests you. You can also create your own study group and invite friends or like-minded students.'
      },
      {
        question: 'Are the discussion forums moderated?',
        answer: 'Yes, all our forums are moderated by experienced educators and community moderators. We maintain strict guidelines to ensure constructive discussions and prevent spam or inappropriate content.'
      },
      {
        question: 'Can I get my doubts cleared by experts?',
        answer: 'Absolutely! Our platform has a dedicated doubt-clearing section where subject experts and top-performing students help resolve queries. Premium users get priority responses and one-on-one sessions.'
      }
    ],
    privacy: [
      {
        question: 'How is my personal data protected?',
        answer: 'We follow industry-standard security practices including data encryption, secure servers, and regular security audits. Your personal information is never shared with third parties without explicit consent.'
      },
      {
        question: 'Can I delete my account and data?',
        answer: 'Yes, you can permanently delete your account and all associated data from your account settings. The deletion process is irreversible and will remove all your progress, downloads, and community contributions.'
      },
      {
        question: 'What information do you collect?',
        answer: 'We collect only essential information required for platform functionality: email, study preferences, performance data, and usage analytics. All data collection is transparent and with user consent.'
      }
    ]
  };

  const [selectedCategory, setSelectedCategory] = React.useState('general');

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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Find answers to common questions about our PYQs platform, features, and services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="glass p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-background-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className={`h-5 w-5 ${
                        selectedCategory === category.id ? 'text-white' : category.color
                      }`} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Badge 
                      variant={selectedCategory === category.id ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* FAQ Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <Card className="glass p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  {faqCategories.find(cat => cat.id === selectedCategory)?.name} Questions
                </h3>
                <p className="text-foreground-secondary">
                  {faqs[selectedCategory as keyof typeof faqs]?.length} questions in this category
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs[selectedCategory as keyof typeof faqs]?.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-border/20 rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="text-foreground-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </motion.div>
        </div>

        {/* Still Have Questions */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass p-12 max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Support
              </Button>
              <Button size="lg" variant="outline">
                <Users className="h-5 w-5 mr-2" />
                Ask Community
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/20">
              <p className="text-foreground-secondary text-sm">
                Average response time: <span className="font-semibold text-primary">2 hours</span> • 
                Customer satisfaction: <span className="font-semibold text-success">98.5%</span>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};