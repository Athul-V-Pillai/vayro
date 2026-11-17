import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFading(true);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090C] transition-opacity duration-700 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing Logo Symbol */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-surface border border-teal/40 flex items-center justify-center shadow-teal-glow">
            <svg
              className="w-12 h-12 text-teal"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" opacity="0.4" />
              <path
                d="M32 46L50 64L68 36"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="68" cy="36" r="4.5" fill="#F59E0B" />
            </svg>
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 rounded-2xl border border-teal/20 animate-ping opacity-30" />
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-extrabold tracking-wider text-white mb-2">
          vayro<span className="text-teal">.</span>
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-dark mb-8">
          Drive Safe. Stay Alert.
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-surface-lighter rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-dark via-teal to-teal-glow transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[11px] text-slate-500 font-mono mt-3">
          Loading 3D Visualizer {progress}%
        </span>
      </div>
    </div>
  );
};
