import { useSpring, useTrail } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useState, useRef } from 'react';

export const useNewsAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  // Card hover animation
  const cardSpring = useSpring({
    transform: isHovered 
      ? 'scale(1.02) rotateY(5deg) rotateX(2deg)' 
      : 'scale(1) rotateY(0deg) rotateX(0deg)',
    boxShadow: isHovered
      ? '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 40px rgba(59, 130, 246, 0.15)'
      : '0 4px 6px rgba(0, 0, 0, 0.1)',
    config: { tension: 200, friction: 25 }
  });

  // Stagger animation for multiple cards
  const useStaggerAnimation = (items: any[]) => {
    return useTrail(items.length, {
      from: { opacity: 0, transform: 'translateY(50px)' },
      to: { opacity: 1, transform: 'translateY(0px)' },
      config: { tension: 280, friction: 60 },
      delay: 100,
    });
  };

  // 3D tilt effect with gesture
  const [{ x, y, rotateX, rotateY }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    config: { mass: 1, tension: 350, friction: 40 }
  }));

  const bind = useGesture({
    onMove: ({ xy: [px, py], hovering }) => {
      if (!hovering) {
        api.start({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
        return;
      }
      
      const rect = dragRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = px - rect.left - rect.width / 2;
      const y = py - rect.top - rect.height / 2;
      
      api.start({
        x: x * 0.1,
        y: y * 0.1,
        rotateX: y * -0.1,
        rotateY: x * 0.1,
      });
    },
    onHover: ({ hovering }) => {
      setIsHovered(hovering || false);
      if (!hovering) {
        api.start({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
      }
    }
  });

  // Parallax scroll animation
  const parallaxSpring = useSpring({
    from: { transform: 'translateY(100px)', opacity: 0 },
    to: { transform: 'translateY(0px)', opacity: 1 },
    config: { tension: 200, friction: 30 }
  });

  // Loading animation
  const loadingSpring = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 300, friction: 20 }
  });

  // Modal animations
  const modalSpring = useSpring({
    from: { opacity: 0, scale: 0.8, rotateX: -15 },
    to: { opacity: 1, scale: 1, rotateX: 0 },
    config: { tension: 200, friction: 25 }
  });

  // Text reveal animation
  const textRevealSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 300,
    config: { tension: 200, friction: 30 }
  });

  return {
    cardSpring,
    useStaggerAnimation,
    tiltAnimation: { x, y, rotateX, rotateY, bind, ref: dragRef },
    parallaxSpring,
    loadingSpring,
    modalSpring,
    textRevealSpring,
    isHovered,
    setIsHovered,
    isDragging,
    setIsDragging
  };
};