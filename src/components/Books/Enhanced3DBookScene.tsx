import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const points = useRef<THREE.Points>(null);
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.1;
      points.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Points ref={points} positions={particlePositions}>
      <PointMaterial
        color="#3b82f6"
        size={0.5}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </Points>
  );
};

const FloatingBook = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      position={position}
    >
      <mesh>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial
          color="#1e40af"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

export const Enhanced3DBookScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="night" />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
        
        <ParticleField />
        
        <FloatingBook position={[-8, 4, -5]} />
        <FloatingBook position={[8, -3, -3]} />
        <FloatingBook position={[0, 6, -8]} />
        <FloatingBook position={[-6, -4, -6]} />
        <FloatingBook position={[6, 2, -4]} />
      </Canvas>
    </div>
  );
};