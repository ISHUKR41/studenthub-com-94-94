import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { UltraMega3DPYQsHub } from './UltraMega3DPYQsHub';
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
  return <UltraMega3DPYQsHub />;
};