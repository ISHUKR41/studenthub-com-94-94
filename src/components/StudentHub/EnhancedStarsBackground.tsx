import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';

// Ultra-modern stars background with advanced animations
export const EnhancedStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Create star particles
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      twinkle: number;
      color: string;
    }> = [];

    // Initialize stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        color: `hsl(${210 + Math.random() * 60}, ${70 + Math.random() * 30}%, ${60 + Math.random() * 40}%)`
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Update star properties
        star.twinkle += 0.02;
        star.y -= star.speed;
        
        // Reset star position when it goes off screen
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        // Draw star with twinkle effect
        const twinkleOpacity = star.opacity * (0.5 + 0.5 * Math.sin(star.twinkle));
        ctx.save();
        ctx.globalAlpha = twinkleOpacity;
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.size * 2;
        
        // Create star shape
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Canvas for smooth stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ background: 'transparent' }}
      />

      {/* Enhanced React-based stars for interaction */}
      <div className="absolute inset-0">
        {/* Small twinkling dots */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-0.5 h-0.5 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Medium animated stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              rotate: [0, 360],
              scale: [0.8, 1.4, 0.8],
              x: [0, Math.random() * 30 - 15, 0],
              y: [0, Math.random() * 30 - 15, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
          >
            <Star className="w-2 h-2" />
          </motion.div>
        ))}

        {/* Large sparkle effects */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-accent/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
              scale: [0, 1.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
        ))}

        {/* Shooting stars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"
            style={{
              left: `${Math.random() * 50}%`,
              top: `${Math.random() * 50}%`,
              boxShadow: '0 0 10px currentColor, 0 0 20px currentColor',
            }}
            animate={{
              x: [0, window.innerWidth * 0.4],
              y: [0, window.innerHeight * 0.3],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 8 + Math.random() * 15,
              repeat: Infinity,
              repeatDelay: 20,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Connection lines between stars */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${20 + i * 12}%`}
              y1={`${10 + i * 8}%`}
              x2={`${30 + i * 15}%`}
              y2={`${40 + i * 10}%`}
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0], 
                opacity: [0, 0.4, 0] 
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        {/* Morphing background shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`morph-${i}`}
            className="absolute bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              width: `${200 + Math.random() * 300}px`,
              height: `${200 + Math.random() * 300}px`,
              borderRadius: '60% 40% 30% 70%',
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.3, 0.8, 1],
              opacity: [0.1, 0.3, 0.1, 0.1],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedStarsBackground;