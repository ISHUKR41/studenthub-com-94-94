import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface Safe3DCanvasProps {
  children: React.ReactNode;
  camera?: any;
  className?: string;
}

const CanvasFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
    <div className="text-center space-y-2">
      <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse mx-auto" />
      <p className="text-sm text-foreground-secondary">Loading 3D Scene...</p>
    </div>
  </div>
);

const CanvasError = () => (
  <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
    <div className="text-center space-y-2">
      <div className="w-8 h-8 bg-primary/30 rounded-full mx-auto" />
      <p className="text-xs text-foreground-secondary">3D Scene Unavailable</p>
    </div>
  </div>
);

export const Safe3DCanvas: React.FC<Safe3DCanvasProps> = ({ 
  children, 
  camera = { position: [0, 0, 10], fov: 75 },
  className = ""
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <ErrorBoundary fallback={<CanvasError />}>
        <Suspense fallback={<CanvasFallback />}>
          <Canvas
            camera={camera}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance"
            }}
            dpr={[1, 2]}
            performance={{
              min: 0.5,
              max: 1,
              debounce: 200
            }}
            onCreated={({ gl }) => {
              gl.toneMappingExposure = 1;
            }}
          >
            {children}
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};