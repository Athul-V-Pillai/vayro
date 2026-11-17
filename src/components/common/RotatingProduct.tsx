import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type ProductType = 'dashcam' | 'pro' | 'lite';

export interface RotatingProductProps {
  product: ProductType;
  mode?: 'scroll' | 'drag' | 'both';
  className?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number; // degrees per frame
  initialAngle?: number;
  onAngleChange?: (angle: number) => void;
  showFloorShadow?: boolean;
  showGlow?: boolean;
  glowColor?: string;
  aspectRatio?: number; // width / height
  alt?: string;
}

const ANGLES = ['000', '045', '090', '135', '180', '225', '270', '315'] as const;
const NUM_FRAMES = ANGLES.length; // 8
const ANGLE_STEP = 360 / NUM_FRAMES; // 45 deg

export const RotatingProduct: React.FC<RotatingProductProps> = ({
  product,
  mode = 'drag',
  className = '',
  autoRotate = true,
  autoRotateSpeed = 0.25,
  initialAngle = 0,
  onAngleChange,
  showFloorShadow = true,
  showGlow = true,
  glowColor = '#2DD4BF',
  aspectRatio = 16 / 10,
  alt = 'Rotating 360 view'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loaded images state
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Rotation angles (degrees)
  const currentAngleRef = useRef<number>(initialAngle);
  const targetAngleRef = useRef<number>(initialAngle);

  // Interaction & inertia state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const isUserInteractingRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Accessibility: prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Preload all 8 frames for this product
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setLoadedCount(0);
    setHasError(false);

    const loadedImages: HTMLImageElement[] = new Array(NUM_FRAMES);
    let count = 0;

    ANGLES.forEach((angle, index) => {
      const img = new Image();
      img.src = `/assets/${product}_${angle}.png`;

      img.onload = () => {
        if (!isMounted) return;
        loadedImages[index] = img;
        count++;
        setLoadedCount(count);
        if (count === NUM_FRAMES) {
          imagesRef.current = loadedImages;
          setIsLoading(false);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        console.error(`Failed to load frame: /assets/${product}_${angle}.png`);
        setHasError(true);
      };
    });

    return () => {
      isMounted = false;
    };
  }, [product]);

  // Mark user interaction and reset idle timer
  const registerInteraction = useCallback(() => {
    isUserInteractingRef.current = true;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 1800);
  }, []);

  // GSAP ScrollTrigger integration when in 'scroll' or 'both' mode
  useEffect(() => {
    if (mode !== 'scroll' && mode !== 'both') return;
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    // Pin container and rotate 360° across scroll distance
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=120%',
      pin: mode === 'scroll',
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        targetAngleRef.current = self.progress * 360;
        registerInteraction();
      }
    });

    return () => {
      trigger.kill();
    };
  }, [mode, reducedMotion, registerInteraction]);

  // Canvas drawing routine
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height * 0.48;

    // 1. Draw floor shadow
    if (showFloorShadow) {
      ctx.save();
      const shadowY = height * 0.82;
      const shadowRadiusX = width * 0.32;
      const shadowRadiusY = height * 0.08;

      ctx.beginPath();
      ctx.ellipse(cx, shadowY, shadowRadiusX, shadowRadiusY, 0, 0, Math.PI * 2);
      const shadowGradient = ctx.createRadialGradient(
        cx, shadowY, 0,
        cx, shadowY, shadowRadiusX
      );
      shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
      shadowGradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.45)');
      shadowGradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.15)');
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGradient;
      ctx.fill();
      ctx.restore();
    }

    // 2. Draw soft teal glow
    if (showGlow) {
      ctx.save();
      const glowRadius = Math.min(width, height) * 0.42;
      const glowGradient = ctx.createRadialGradient(
        cx, cy, 20,
        cx, cy, glowRadius
      );
      // glowColor with subtle alpha
      glowGradient.addColorStop(0, `${glowColor}33`); // ~20% alpha
      glowGradient.addColorStop(0.4, `${glowColor}18`); // ~10% alpha
      glowGradient.addColorStop(0.8, `${glowColor}05`);
      glowGradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    const images = imagesRef.current;
    if (images.length < NUM_FRAMES || isLoading) {
      return;
    }

    // If reduced motion is preferred, strictly show front frame 000 with no rotation
    if (reducedMotion) {
      const frontImg = images[0];
      if (frontImg && frontImg.complete) {
        drawScaledImage(ctx, frontImg, cx, cy, width, height, 1.0);
      }
      return;
    }

    // Calculate normalized angle in [0, 360)
    let deg = currentAngleRef.current % 360;
    if (deg < 0) deg += 360;

    // Fractional frame position in [0, 8)
    const frameFloat = deg / ANGLE_STEP;
    const frameIndexA = Math.floor(frameFloat) % NUM_FRAMES;
    const frameIndexB = (frameIndexA + 1) % NUM_FRAMES;
    const progress = frameFloat - Math.floor(frameFloat); // 0 to 1

    const imgA = images[frameIndexA];
    const imgB = images[frameIndexB];

    // Smoothstep crossfade curve for natural optical blending
    // s(t) = 3t^2 - 2t^3
    const smoothT = progress * progress * (3 - 2 * progress);
    const alphaA = 1 - smoothT;
    const alphaB = smoothT;

    if (imgA && imgA.complete && alphaA > 0.001) {
      drawScaledImage(ctx, imgA, cx, cy, width, height, alphaA);
    }
    if (imgB && imgB.complete && alphaB > 0.001) {
      drawScaledImage(ctx, imgB, cx, cy, width, height, alphaB);
    }
  }, [isLoading, reducedMotion, showFloorShadow, showGlow, glowColor]);

  // Scaled image helper preserving aspect ratio
  const drawScaledImage = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    cx: number,
    cy: number,
    canvasW: number,
    canvasH: number,
    alpha: number
  ) => {
    if (!img.naturalWidth || !img.naturalHeight) return;

    // Fit inside 82% of canvas box
    const maxW = canvasW * 0.85;
    const maxH = canvasH * 0.75;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let targetW = maxW;
    let targetH = targetW / imgRatio;

    if (targetH > maxH) {
      targetH = maxH;
      targetW = targetH * imgRatio;
    }

    const x = cx - targetW / 2;
    const y = cy - targetH / 2;

    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.drawImage(img, x, y, targetW, targetH);
    ctx.restore();
  };

  // Main animation / physics tick loop
  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      if (reducedMotion) {
        renderFrame();
        return;
      }

      // 1. Inertia deceleration when not actively dragging
      if (!isDraggingRef.current && Math.abs(velocityRef.current) > 0.02) {
        targetAngleRef.current += velocityRef.current;
        velocityRef.current *= 0.92; // friction
      } else if (!isDraggingRef.current) {
        velocityRef.current = 0;
      }

      // 2. Slow auto-rotation when idle in drag/both mode
      if (
        autoRotate &&
        !isDraggingRef.current &&
        !isUserInteractingRef.current &&
        mode !== 'scroll'
      ) {
        targetAngleRef.current += autoRotateSpeed;
      }

      // 3. Smooth angle interpolation (lerp)
      const diff = targetAngleRef.current - currentAngleRef.current;
      currentAngleRef.current += diff * 0.15;

      // Keep targetAngleRef bounded to avoid precision overflow
      if (Math.abs(targetAngleRef.current) > 100000) {
        targetAngleRef.current %= 360;
        currentAngleRef.current %= 360;
      }

      renderFrame();

      if (onAngleChange) {
        let norm = currentAngleRef.current % 360;
        if (norm < 0) norm += 360;
        onAngleChange(norm);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoRotate, autoRotateSpeed, mode, onAngleChange, reducedMotion, renderFrame]);

  // Resize canvas to parent bounds with DevicePixelRatio
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const w = rect.width || 600;
      const h = rect.height || (w / aspectRatio);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      renderFrame();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [aspectRatio, renderFrame]);

  // Drag interaction handlers
  const handlePointerDown = (clientX: number) => {
    if (mode === 'scroll' || reducedMotion) return;
    isDraggingRef.current = true;
    startXRef.current = clientX;
    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    registerInteraction();
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDraggingRef.current || mode === 'scroll' || reducedMotion) return;
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const dx = clientX - lastXRef.current;

    // Convert pixel drag to degree rotation (sensitivity)
    const angleDelta = dx * 0.65;
    targetAngleRef.current += angleDelta;
    currentAngleRef.current += angleDelta;

    velocityRef.current = (dx / dt) * 14;

    lastXRef.current = clientX;
    lastTimeRef.current = now;
    registerInteraction();
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    registerInteraction();
  };

  // Keyboard navigation (Arrow keys rotate 15 degrees)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (reducedMotion) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      targetAngleRef.current -= 15;
      registerInteraction();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      targetAngleRef.current += 15;
      registerInteraction();
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label={`${alt}. Use left and right arrow keys or drag horizontally to rotate 360 degrees.`}
      onKeyDown={handleKeyDown}
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onMouseMove={(e) => handlePointerMove(e.clientX)}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={(e) => {
        if (e.touches[0]) handlePointerDown(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        if (e.touches[0]) handlePointerMove(e.touches[0].clientX);
      }}
      onTouchEnd={handlePointerUp}
      className={`relative select-none outline-none focus-visible:ring-2 focus-visible:ring-teal/50 rounded-2xl ${
        mode !== 'scroll' ? 'cursor-grab active:cursor-grabbing' : ''
      } ${className}`}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />

      {/* Loading state indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07090C]/80 backdrop-blur-sm rounded-2xl z-20">
          <div className="relative mb-3">
            <div className="w-12 h-12 rounded-full border-2 border-teal/20 border-t-teal animate-spin" />
          </div>
          <span className="text-xs font-mono text-teal tracking-wider uppercase">
            Loading 360° Visuals ({loadedCount}/{NUM_FRAMES})
          </span>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-950/40 rounded-2xl p-4 text-center z-20">
          <p className="text-xs text-red-300">
            Error loading image frames for {product}.
          </p>
        </div>
      )}
    </div>
  );
};
