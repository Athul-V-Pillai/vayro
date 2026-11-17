import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

interface CanvasContainerProps {
  children: React.ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  enablePointer?: boolean;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
  children,
  className = 'w-full h-full',
  camera = { position: [0, 0, 5], fov: 45 },
}) => {
  const [hasWebGl, setHasWebGl] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGl(false);
      }
    } catch {
      setHasWebGl(false);
    }

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!hasWebGl || prefersReducedMotion) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#07090C]/60 rounded-2xl border border-white/5 p-8 text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-teal-dim border border-teal/30 flex items-center justify-center mb-4">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-teal animate-spin" />
        </div>
        <p className="text-sm font-medium text-slate-300 mb-1">Interactive 3D Visualizer</p>
        <p className="text-xs text-muted-dark">
          {prefersReducedMotion 
            ? 'Reduced motion mode active. Static rendering enabled.' 
            : 'WebGL acceleration unavailable on this device.'}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: camera.position || [0, 0, 5], fov: camera.fov || 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};
