import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Enhanced3DPYQsHero } from './Enhanced3DPYQsHero';
import { Enhanced3DPYQsStatsSection } from './Enhanced3DPYQsStatsSection';
import { PYQsExamCategories } from './PYQsExamCategories';
import { PYQsAdvancedFilters } from './PYQsAdvancedFilters';
import { PYQsQuestionBank } from './PYQsQuestionBank';
import { PYQsAnalytics } from './PYQsAnalytics';
import { PYQsMockTestSection } from './PYQsMockTestSection';
import { PYQsStudyPlan } from './PYQsStudyPlan';
import { PYQsAIAssistant } from './PYQsAIAssistant';
import { PYQsDiscussionForum } from './PYQsDiscussionForum';
import { PYQsSuccessStories } from './PYQsSuccessStories';
import { PYQsUniversityRankings } from './PYQsUniversityRankings';
import { PYQsDownloadCenter } from './PYQsDownloadCenter';
import { PYQsCommunitySection } from './PYQsCommunitySection';
import { PYQsFAQSection } from './PYQsFAQSection';
import { FooterSection } from '@/components/StudentHub/FooterSection';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import { PYQsLiveExamAlerts } from './PYQsLiveExamAlerts';
import { PYQsExpertTipsSection } from './PYQsExpertTipsSection';
import { PYQsPerformanceTracker } from './PYQsPerformanceTracker';
import { PYQsTrendingTopics } from './PYQsTrendingTopics';
import { PYQsInteractiveCalendar } from './PYQsInteractiveCalendar';

// Section wrapper with advanced animations
const SectionWrapper = React.memo(({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
});

export const PYQsHub: React.FC = () => {
  return (
    <ParallaxContainer className="relative">
      {/* Enhanced 3D Hero Section */}
      <SectionWrapper delay={0.1}>
        <Enhanced3DPYQsHero />
      </SectionWrapper>

      {/* Enhanced 3D Stats Section */}
      <SectionWrapper delay={0.2}>
        <Enhanced3DPYQsStatsSection />
      </SectionWrapper>

      {/* Exam Categories Section */}
      <SectionWrapper delay={0.2}>
        <ParallaxScroll speed={0.2} direction="up">
          <PYQsExamCategories />
        </ParallaxScroll>
      </SectionWrapper>

      {/* Advanced Filters & Search */}
      <SectionWrapper delay={0.1}>
        <PYQsAdvancedFilters />
      </SectionWrapper>

      {/* Main Question Bank */}
      <SectionWrapper delay={0.2}>
        <ParallaxScroll speed={0.3} direction="down">
          <PYQsQuestionBank />
        </ParallaxScroll>
      </SectionWrapper>

      {/* Analytics Dashboard */}
      <SectionWrapper delay={0.1}>
        <PYQsAnalytics />
      </SectionWrapper>

      {/* Mock Test Section */}
      <SectionWrapper delay={0.2}>
        <PYQsMockTestSection />
      </SectionWrapper>

      {/* AI-Powered Study Plan */}
      <SectionWrapper delay={0.1}>
        <ParallaxScroll speed={0.2} direction="up">
          <PYQsStudyPlan />
        </ParallaxScroll>
      </SectionWrapper>

      {/* AI Assistant */}
      <SectionWrapper delay={0.2}>
        <PYQsAIAssistant />
      </SectionWrapper>

      {/* University Rankings */}
      <SectionWrapper delay={0.1}>
        <PYQsUniversityRankings />
      </SectionWrapper>

      {/* Download Center */}
      <SectionWrapper delay={0.2}>
        <ParallaxScroll speed={0.3} direction="down">
          <PYQsDownloadCenter />
        </ParallaxScroll>
      </SectionWrapper>

      {/* Discussion Forum */}
      <SectionWrapper delay={0.1}>
        <PYQsDiscussionForum />
      </SectionWrapper>

      {/* Success Stories */}
      <SectionWrapper delay={0.2}>
        <PYQsSuccessStories />
      </SectionWrapper>

      {/* Community Section */}
      <SectionWrapper delay={0.1}>
        <ParallaxScroll speed={0.2} direction="up">
          <PYQsCommunitySection />
        </ParallaxScroll>
      </SectionWrapper>

      {/* Live Exam Alerts */}
      <SectionWrapper delay={0.1}>
        <PYQsLiveExamAlerts />
      </SectionWrapper>

      {/* Expert Tips */}
      <SectionWrapper delay={0.2}>
        <ParallaxScroll speed={0.2} direction="up">
          <PYQsExpertTipsSection />
        </ParallaxScroll>
      </SectionWrapper>

      {/* Performance Tracker */}
      <SectionWrapper delay={0.1}>
        <PYQsPerformanceTracker />
      </SectionWrapper>

      {/* Trending Topics */}
      <SectionWrapper delay={0.2}>
        <PYQsTrendingTopics />
      </SectionWrapper>

      {/* Interactive Calendar */}
      <SectionWrapper delay={0.1}>
        <ParallaxScroll speed={0.3} direction="down">
          <PYQsInteractiveCalendar />
        </ParallaxScroll>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper delay={0.2}>
        <PYQsFAQSection />
      </SectionWrapper>

      {/* Footer */}
      <SectionWrapper delay={0.1}>
        <FooterSection />
      </SectionWrapper>

      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.button 
          className="w-16 h-16 rounded-full bg-gradient-primary backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-glow"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white text-2xl font-bold"
          >
            ↑
          </motion.div>
        </motion.button>
      </motion.div>
    </ParallaxContainer>
  );
};