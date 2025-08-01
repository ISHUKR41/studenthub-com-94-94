import React from 'react';
import { motion } from 'framer-motion';

export const NewsBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.05), rgba(245, 101, 101, 0.1))',
            'linear-gradient(135deg, rgba(245, 101, 101, 0.1), rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.05))',
            'linear-gradient(225deg, rgba(16, 185, 129, 0.05), rgba(245, 101, 101, 0.1), rgba(59, 130, 246, 0.1))',
            'linear-gradient(315deg, rgba(59, 130, 246, 0.1), rgba(245, 101, 101, 0.1), rgba(16, 185, 129, 0.05))',
            'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.05), rgba(245, 101, 101, 0.1))'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
      />

      {/* Floating geometric shapes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        >
          {i % 3 === 0 && (
            <div className="w-8 h-8 border border-primary/20 rounded-lg rotate-45" />
          )}
          {i % 3 === 1 && (
            <div className="w-6 h-6 bg-secondary/10 rounded-full" />
          )}
          {i % 3 === 2 && (
            <div className="w-4 h-12 bg-accent/10 rounded-full" />
          )}
        </motion.div>
      ))}

      {/* News-themed floating elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`news-${i}`}
          className="absolute text-primary/5 text-6xl font-bold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontFamily: 'system-ui',
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.5, 1.2, 0.5],
            opacity: [0.02, 0.08, 0.02],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        >
          {['NEWS', 'LIVE', 'UPDATES', 'BREAKING', 'LATEST', 'INFO', 'ALERT', 'TRENDS'][i]}
        </motion.div>
      ))}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/10 to-background/30" />
    </div>
  );
};