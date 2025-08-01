import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function AnimatedStars(props: any) {
  const ref = useRef<any>();
  const [sphere] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const radius = 2.5;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return [positions];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, -5]} scale={0.5}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#10b981" transparent opacity={0.3} wireframe />
    </mesh>
  );
}

function FloatingSphere() {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2, 1, -3]} scale={0.3}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#f59e0b" transparent opacity={0.4} />
    </mesh>
  );
}

export const Advanced3DBackground: React.FC = () => {
  return (
    <>
      {/* CSS Background with animated gradients */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-50"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(245, 101, 101, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated mesh pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* 3D Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.3} />
          
          <AnimatedStars />
          <FloatingGeometry />
          <FloatingSphere />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Floating particles overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Animated border elements */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl"
        animate={{
          borderColor: [
            'rgba(59, 130, 246, 0.3)',
            'rgba(16, 185, 129, 0.3)',
            'rgba(245, 101, 101, 0.3)',
            'rgba(59, 130, 246, 0.3)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div
        className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-secondary/30 rounded-br-3xl"
        animate={{
          borderColor: [
            'rgba(16, 185, 129, 0.3)',
            'rgba(245, 101, 101, 0.3)',
            'rgba(168, 85, 247, 0.3)',
            'rgba(16, 185, 129, 0.3)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />
    </>
  );
};