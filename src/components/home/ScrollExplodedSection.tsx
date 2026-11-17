import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ConceptBadge } from '../common/ConceptBadge';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ScanEye,
  Cpu,
  Radio,
  Volume2,
  ShieldCheck,
  Eye,
  AlertTriangle,
  Sparkles,
  Layers
} from 'lucide-react';
import { playDrowsinessAlertSound } from '../../utils/audioAlert';
import { SITE_DISCLAIMERS } from '../../data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollExplodedSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0); // 0: Detect, 1: Analyse, 2: Alert, 3: Stay Safe
  const [isPlaying, setIsPlaying] = useState(true);
  const [stageProgress, setStageProgress] = useState(0); // 0 to 1 within the active stage
  const [reducedMotion, setReducedMotion] = useState(false);

  // Dashcam rotation angle frame index for Stage 1 (crossfade between 000, 045, 090)
  const [dashcamAngleIndex, setDashcamAngleIndex] = useState(0); // 0 -> 000, 1 -> 045, 2 -> 090
  const [dashcamFadeProgress, setDashcamFadeProgress] = useState(0); // 0 to 1 between neighbouring frames

  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Stage configuration
  const stages = [
    {
      id: 0,
      name: 'Detect',
      label: 'Driver-facing camera watches for fatigue',
      summary: 'Invisible 940nm infrared illumination tracks eyelid closure velocity and head-nod trajectories at 60 fps.',
      icon: <ScanEye className="w-4 h-4" />
    },
    {
      id: 1,
      name: 'Analyse',
      label: 'AI analyses on the device',
      summary: 'Dedicated Edge-AI neural chip calculates PERCLOS biometrics with zero cloud lag.',
      icon: <Cpu className="w-4 h-4" />
    },
    {
      id: 2,
      name: 'Alert',
      label: 'Music lowers, voice warning plays',
      summary: 'Prioritized wireless BLE payload cuts through cabin audio, delivering an urgent binaural chime to the earbuds.',
      icon: <Volume2 className="w-4 h-4" />
    },
    {
      id: 3,
      name: 'Stay safe',
      label: 'Driver pulls over and rests',
      summary: 'Acoustic intervention breaks the sleep trance, allowing safe navigation to a rest area with Smart Ambient awareness.',
      icon: <ShieldCheck className="w-4 h-4" />
    }
  ];

  // GSAP ScrollTrigger for pinned scroll mode
  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    triggerRef.current = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Map 0 -> 1 progress to the 4 stages (0, 1, 2, 3)
        const p = self.progress;
        const newStage = Math.min(3, Math.floor(p * 4));
        const subProgress = (p * 4) % 1;
        setActiveStage(newStage);
        setStageProgress(subProgress);

        // Pause auto-play when user is actively scrolling
        if (self.getVelocity() !== 0) {
          setIsPlaying(false);
        }
      }
    });

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [reducedMotion]);

  // Automatic 12-second looping video-style animation (~3s per stage)
  useEffect(() => {
    if (!isPlaying || reducedMotion) return;

    const STAGE_DURATION = 3000; // 3 seconds per stage
    const INTERVAL_STEP = 30; // 30ms updates
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += INTERVAL_STEP;
      const progress = Math.min(1, elapsed / STAGE_DURATION);
      setStageProgress(progress);

      // Smooth dashcam rotation in Stage 0 (Detect)
      if (activeStage === 0) {
        // Cycle smoothly across angles 000, 045, 090
        const angleCycle = (progress * 2) % 2; // 0 to 2
        setDashcamAngleIndex(Math.floor(angleCycle));
        setDashcamFadeProgress(angleCycle - Math.floor(angleCycle));
      }

      if (elapsed >= STAGE_DURATION) {
        elapsed = 0;
        setActiveStage((prev) => {
          const next = (prev + 1) % 4;
          if (next === 2) {
            playDrowsinessAlertSound();
          }
          return next;
        });
      }
    }, INTERVAL_STEP);

    return () => clearInterval(timer);
  }, [isPlaying, activeStage, reducedMotion]);

  // Stage selection handler
  const handleStageClick = (index: number) => {
    setActiveStage(index);
    setStageProgress(0);
    setIsPlaying(false);
    if (index === 2) {
      playDrowsinessAlertSound();
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);
  };

  return (
    <section
      id="exploded-explainer"
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#05070A] border-t border-white/5 relative overflow-hidden text-slate-100"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-teal-dark/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-amber-dim rounded-full blur-[140px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-between min-h-[750px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-dim border border-teal/30 text-teal text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Driver Protection Sequence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              How the Alert Loop Works
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              From ocular micro-sleep detection to sub-120ms binaural acoustic intervention—step through how vayro anticipates driver fatigue.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border backdrop-blur-md transition-all flex items-center gap-2 ${
                isPlaying
                  ? 'bg-teal text-black border-teal shadow-teal-glow'
                  : 'bg-surface-light text-slate-300 border-white/10 hover:border-teal/40'
              }`}
              aria-label={isPlaying ? 'Pause sequence' : 'Play sequence'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause Auto-Play' : 'Play Sequence (12s)'}</span>
            </button>

            <ConceptBadge />
          </div>
        </div>

        {/* 4-Stage Progress Bar with Clickable Stage Dots */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stages.map((st, i) => {
            const isActive = activeStage === i;
            const isCompleted = activeStage > i;

            return (
              <button
                key={st.id}
                onClick={() => handleStageClick(i)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isActive
                    ? 'bg-surface-light border-teal shadow-teal-glow/20'
                    : 'bg-surface/50 border-white/5 hover:border-white/15 text-slate-400'
                }`}
              >
                {/* Active progress fill bar inside tab */}
                {isActive && isPlaying && !reducedMotion && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal via-teal-glow to-amber transition-all duration-75"
                    style={{ width: `${stageProgress * 100}%` }}
                  />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-teal' : isCompleted ? 'text-teal/70' : 'text-slate-500'}`}>
                    0{i + 1}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-teal-dim text-teal' : 'text-slate-500'}`}>
                    {st.icon}
                  </div>
                </div>

                <h4 className={`text-sm font-bold mb-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {st.name}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {st.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Reduced Motion View: Static 4-Step Cards Layout */}
        {reducedMotion ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            {stages.map((st, i) => (
              <div key={st.id} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal">STAGE 0{i + 1}</span>
                  <span className="text-sm font-bold text-white">{st.name}</span>
                </div>
                <div className="w-full h-44 rounded-xl bg-[#030406] flex items-center justify-center p-4">
                  <img
                    src={i === 0 || i === 1 ? '/assets/dashcam_000.png' : i === 2 ? '/assets/pro_000.png' : '/assets/lite_000.png'}
                    alt={st.name}
                    className="max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h5 className="text-sm font-bold text-teal">{st.label}</h5>
                <p className="text-xs text-slate-400">{st.summary}</p>
              </div>
            ))}
          </div>
        ) : (
          /* Main Interactive Cinematic Stage Viewport (GSAP / CSS / Real Photos) */
          <div className="relative rounded-3xl bg-surface border border-white/10 overflow-hidden min-h-[460px] sm:min-h-[520px] shadow-2xl flex flex-col justify-between p-6 sm:p-10 my-4">
            {/* Top Stage Announcement Badge */}
            <div className="flex items-center justify-between z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-light border border-white/10 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                <span className="font-mono text-teal uppercase font-bold">Stage 0{activeStage + 1} of 04</span>
                <span className="text-slate-500">•</span>
                <span className="font-semibold text-white">{stages[activeStage].name}</span>
              </div>

              {/* Stage Headline Pill */}
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                activeStage === 1
                  ? 'bg-amber-dim text-amber border-amber shadow-amber-glow animate-pulse'
                  : activeStage === 2
                  ? 'bg-amber-dim text-amber border-amber shadow-amber-glow'
                  : 'bg-teal-dim text-teal border-teal/30'
              }`}>
                {stages[activeStage].label}
              </div>
            </div>

            {/* Central Animation Stage with Real Photos */}
            <div className="relative flex-1 flex items-center justify-center w-full py-6">
              {/* STAGE 0: DETECT (Dashcam slowly rotating with cross-fade + Soft IR glow + Teal Tracking Dots) */}
              {activeStage === 0 && (
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in">
                  {/* Left: Rotating Dashcam with Cross-fade */}
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                    {/* Floor shadow */}
                    <div className="absolute bottom-6 w-56 h-8 bg-black/80 rounded-full blur-md" />

                    {/* Soft Infrared Glow from driver lens */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-red-600/25 blur-2xl animate-pulse" />

                    {/* Cross-fading Real Dashcam Photos (000, 045, 090) */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src="/assets/dashcam_000.png"
                        alt="Dashcam 0 degrees"
                        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                        style={{
                          opacity: dashcamAngleIndex === 0 ? 1 - dashcamFadeProgress : dashcamAngleIndex === 2 ? dashcamFadeProgress : 0
                        }}
                      />
                      <img
                        src="/assets/dashcam_045.png"
                        alt="Dashcam 45 degrees"
                        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                        style={{
                          opacity: dashcamAngleIndex === 0 ? dashcamFadeProgress : dashcamAngleIndex === 1 ? 1 - dashcamFadeProgress : 0
                        }}
                      />
                      <img
                        src="/assets/dashcam_090.png"
                        alt="Dashcam 90 degrees"
                        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                        style={{
                          opacity: dashcamAngleIndex === 1 ? dashcamFadeProgress : 0
                        }}
                      />
                    </div>

                    {/* Pulsing Stealth IR Ring Dot */}
                    <div className="absolute top-[46%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-red-500 bg-red-500/30 animate-ping pointer-events-none" />
                  </div>

                  {/* Right: Computer Vision Tracking Dots & HUD Telemetry */}
                  <div className="flex-1 max-w-md space-y-4">
                    <div className="p-5 rounded-2xl bg-surface-light/80 border border-teal/30 space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                        <span className="flex items-center gap-1.5 text-teal font-mono font-bold">
                          <Eye className="w-4 h-4" />
                          OCULAR FACIAL TRACKING ACTIVE
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">60 FPS REAL-TIME</span>
                      </div>

                      {/* Animated Biometric Tracking Markers */}
                      <div className="relative h-28 rounded-xl bg-[#030406] border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
                        {/* Thin teal tracking lines & crosshairs */}
                        <div className="absolute inset-x-4 top-1/2 h-px bg-teal/30 dashed" />
                        <div className="absolute top-3 left-1/3 w-px h-20 bg-teal/30 dashed" />
                        <div className="absolute top-3 right-1/3 w-px h-20 bg-teal/30 dashed" />

                        {/* Eyelid Tracking Dots */}
                        <div className="flex justify-around items-center h-full px-8 relative z-10">
                          <div className="text-center space-y-1">
                            <div className="w-4 h-4 rounded-full border-2 border-teal bg-teal/20 animate-pulse mx-auto" />
                            <span className="text-[9px] font-mono text-teal block">LEFT PUPIL</span>
                          </div>
                          <div className="text-center space-y-1">
                            <div className="w-4 h-4 rounded-full border-2 border-teal bg-teal/20 animate-pulse mx-auto" />
                            <span className="text-[9px] font-mono text-teal block">RIGHT PUPIL</span>
                          </div>
                        </div>

                        {/* Telemetry Status Line */}
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1 z-10">
                          <span>PERCLOS: <strong className="text-teal">18.4%</strong> (Monitoring)</span>
                          <span>BLINK VELOCITY: <strong className="text-teal">Normal</strong></span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        The cabin camera uses 940nm invisible stealth infrared LEDs to illuminate the driver’s facial landmarks in total darkness without causing glare or retina distraction.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 1: ANALYSE (Pulsing Edge-AI chip + Progress Ring filling to Amber) */}
              {activeStage === 1 && (
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in">
                  {/* Left: Dashcam with pulsing Edge AI Chip */}
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                    <div className="absolute bottom-6 w-56 h-8 bg-black/80 rounded-full blur-md" />
                    <img
                      src="/assets/dashcam_000.png"
                      alt="vayro Dashcam"
                      className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                    />

                    {/* Small Edge AI Chip Graphic Pulsing on the Dashcam */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-2.5 rounded-xl bg-surface/95 border-2 border-amber shadow-amber-glow animate-bounce flex items-center gap-2 backdrop-blur-md">
                      <Cpu className="w-5 h-5 text-amber animate-spin" style={{ animationDuration: '6s' }} />
                      <div>
                        <span className="text-[10px] font-mono font-bold text-amber block uppercase tracking-wider">
                          Edge-AI NPU
                        </span>
                        <span className="text-[9px] text-slate-300 block">On-Device Compute</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Circular Progress Ring Filling & Turning Amber */}
                  <div className="flex-1 max-w-md space-y-4">
                    <div className="p-6 rounded-2xl bg-surface-light/80 border border-amber/40 shadow-amber-glow/20 space-y-4">
                      <div className="flex items-center gap-4">
                        {/* Circular SVG Progress Ring */}
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth="8"
                              fill="none"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="#F59E0B"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={251.2}
                              strokeDashoffset={251.2 * (1 - Math.max(0.2, stageProgress))}
                              strokeLinecap="round"
                              className="transition-all duration-100 ease-out"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-amber">
                            {Math.round(Math.max(20, stageProgress * 100))}%
                          </div>
                        </div>

                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-dim text-amber text-[10px] font-mono font-bold uppercase mb-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Drowsiness Pattern Detected
                          </div>
                          <h4 className="text-base font-bold text-white">Neural Threshold Exceeded</h4>
                          <span className="text-xs text-slate-400">PERCLOS exceeds safety limit (&gt; 3.2 sec)</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#030406] border border-white/5 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Facial Analysis:</span>
                          <span className="text-amber font-mono font-semibold">Head Nodding Downward</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Inference Location:</span>
                          <span className="text-teal font-mono font-semibold">100% On-Device (Zero Cloud)</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Action Trigger:</span>
                          <span className="text-white font-mono">Prioritizing Bluetooth Alert Pulse</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        Zero video leaves your vehicle. The on-device neural network correlates eyelid drooping with head pitch angles to eliminate false blink alarms.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 2: ALERT (Glowing Signal Arc + Earbuds Pro & Lite together with Teal Sound-Wave Ripple & Amber Pulse) */}
              {activeStage === 2 && (
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in">
                  {/* Left: Dashcam Transmitting */}
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center flex-shrink-0">
                    <div className="absolute bottom-4 w-40 h-6 bg-black/80 rounded-full blur-md" />
                    <img
                      src="/assets/dashcam_000.png"
                      alt="Dashcam"
                      className="w-full h-full object-contain relative z-10"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber shadow-amber-glow animate-ping z-20" />
                  </div>

                  {/* Center: Glowing Signal Arc traveling from Dashcam to Earbuds */}
                  <div className="flex-1 w-full max-w-xs relative flex flex-col items-center justify-center my-4 md:my-0">
                    <div className="w-full relative h-16 flex items-center justify-center">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 240 60" fill="none">
                        <path
                          d="M 10 30 Q 120 -15 230 30"
                          stroke="rgba(45,212,191,0.2)"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        <path
                          d="M 10 30 Q 120 -15 230 30"
                          stroke="#F59E0B"
                          strokeWidth="3.5"
                          strokeDasharray="25 150"
                          strokeDashoffset="0"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="175"
                            to="0"
                            dur="0.5s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>

                      {/* Signal Pill */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber text-black uppercase tracking-wider shadow-amber-glow animate-pulse">
                          &lt; 120ms Alert
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-teal">Ultra-Low Latency Direct BLE</span>
                  </div>

                  {/* Right: Both Earbuds (Pro Neckband + Lite TWS) lighting up with Teal Sound-Wave Ripple & Amber Pulse */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center flex-shrink-0">
                    {/* Concentric Teal & Amber Sound-Wave Ripples */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-36 h-36 rounded-full border-2 border-teal animate-ripple absolute" style={{ animationDuration: '1.2s' }} />
                      <div className="w-48 h-48 rounded-full border-2 border-amber animate-ripple absolute" style={{ animationDuration: '1.6s', animationDelay: '0.3s' }} />
                      <div className="w-60 h-60 rounded-full border border-teal/40 animate-ripple absolute" style={{ animationDuration: '2s', animationDelay: '0.6s' }} />
                    </div>

                    {/* Both Earbuds Shown Together */}
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <div className="w-36 h-36 relative">
                        <img
                          src="/assets/pro_000.png"
                          alt="vayro Pro Neckband"
                          className="w-full h-full object-contain drop-shadow-2xl animate-pulse"
                        />
                      </div>
                      <div className="w-32 h-32 relative">
                        <img
                          src="/assets/lite_000.png"
                          alt="vayro Lite TWS"
                          className="w-full h-full object-contain drop-shadow-2xl animate-pulse"
                        />
                      </div>
                    </div>

                    {/* Alert Audio Badge */}
                    <div className="absolute bottom-0 z-20 px-3 py-1 rounded-xl bg-surface/90 border border-amber/50 text-[10px] font-mono text-amber flex items-center gap-1.5 shadow-amber-glow">
                      <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                      <span>Binaural Chime Playing</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3: STAY SAFE (Products settle side by side: Dashcam, Pro, and Lite with calm teal glow & checkmark) */}
              {activeStage === 3 && (
                <div className="w-full flex flex-col items-center justify-center space-y-6 animate-fade-in py-2">
                  {/* Glowing Checkmark Announcement */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-teal-dim border border-teal text-teal text-sm font-bold uppercase tracking-wider shadow-teal-glow">
                    <CheckCircle2 className="w-5 h-5 text-teal" />
                    <span>Driver Safely Pulled Over • Rest Stop Active</span>
                  </div>

                  {/* Products Settled Side-by-Side with Calm Teal Glow & Floor Shadows */}
                  <div className="grid grid-cols-2 gap-4 sm:gap-8 items-end max-w-2xl w-full px-4">
                    {/* 1. Pro Neckband */}
                    <div className="flex flex-col items-center space-y-2 group">
                      <div className="relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center">
                        <div className="absolute bottom-2 w-24 h-4 bg-black/80 rounded-full blur-sm" />
                        <div className="absolute inset-0 rounded-full bg-teal/15 blur-xl" />
                        <img
                          src="/assets/pro_000.png"
                          alt="vayro Pro"
                          className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="text-xs font-bold text-white">vayro Pro</span>
                      <span className="text-[10px] text-teal font-mono">28h Endurance</span>
                    </div>

                    {/* 2. Lite TWS */}
                    <div className="flex flex-col items-center space-y-2 group">
                      <div className="relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center">
                        <div className="absolute bottom-2 w-24 h-4 bg-black/80 rounded-full blur-sm" />
                        <div className="absolute inset-0 rounded-full bg-teal/10 blur-xl" />
                        <img
                          src="/assets/lite_000.png"
                          alt="vayro Lite"
                          className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="text-xs font-bold text-white">vayro Lite</span>
                      <span className="text-[10px] text-teal font-mono">Smart Pebble Case</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 text-center max-w-lg leading-relaxed">
                    By delivering immediate in-ear intervention without startling loud car sirens, the driver calmly recovers cognitive awareness and guides the vehicle to a highway rest plaza.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Status / Stage Description Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs z-20 bg-surface/70 backdrop-blur-md rounded-2xl p-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-teal font-bold block">{stages[activeStage].label}</span>
                <span className="text-slate-400">{stages[activeStage].summary}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => playDrowsinessAlertSound()}
                  className="px-3 py-1.5 rounded-xl bg-surface-light border border-teal/40 text-teal hover:bg-teal hover:text-black font-semibold text-xs transition-all flex items-center gap-1.5 shadow-teal-glow"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Test Alert Chime</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Required Bottom Disclaimer */}
        <div className="text-center text-xs text-slate-500 pt-4">
          * {SITE_DISCLAIMERS.drowsiness}
        </div>
      </div>
    </section>
  );
};
