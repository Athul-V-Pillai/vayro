import React, { useState } from 'react';
import {
  Smartphone,
  ShieldCheck,
  Video,
  BatteryCharging,
  History,
  Sliders,
  BarChart3,
  Eye,
  AlertTriangle,
  Play
} from 'lucide-react';

export const CompanionAppSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'history' | 'battery' | 'reports'>('live');
  const [cameraStream, setCameraStream] = useState<'road' | 'cabin'>('road');

  return (
    <section id="companion-app" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Companion App Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-dim border border-teal/30 text-teal text-xs font-semibold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>iOS & Android Mobile Companion</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Control, Review, and Verify Your Safety Telemetry
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              The vayro Companion App connects via local peer-to-peer Wi-Fi and Bluetooth to offer effortless dual-camera video playback, real-time biometric fatigue indicators, and zero-cloud safety reports.
            </p>

            {/* App Features List */}
            <div className="space-y-4 pt-2">
              <div
                onClick={() => setActiveTab('live')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activeTab === 'live'
                    ? 'bg-surface-light border-teal/40 shadow-sm'
                    : 'glass-card border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <Video className="w-4 h-4 text-teal" />
                  <h4 className="text-sm font-bold text-white">Live Dual-Camera Playback & PIP</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Switch between 4K road footage and 1080p stealth infrared cabin streams with instant zero-latency Wi-Fi 6 streaming.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('history')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activeTab === 'history'
                    ? 'bg-surface-light border-teal/40 shadow-sm'
                    : 'glass-card border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <History className="w-4 h-4 text-amber" />
                  <h4 className="text-sm font-bold text-white">Fatigue Alert Timeline & Incident Vault</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Every detected micro-sleep event and sudden braking trigger is cataloged with GPS timestamps and 15-second pre-event clips.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('reports')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activeTab === 'reports'
                    ? 'bg-surface-light border-teal/40 shadow-sm'
                    : 'glass-card border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <BarChart3 className="w-4 h-4 text-teal" />
                  <h4 className="text-sm font-bold text-white">Driver Fatigue & Alertness Score</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Weekly personalized circadian insights help long-distance drivers identify their peak vulnerability hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Smartphone Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            {/* Phone Chassis */}
            <div className="w-[310px] sm:w-[350px] rounded-[44px] bg-[#0A0D14] border-[7px] border-[#1E2530] p-4 shadow-2xl relative shadow-teal-glow/10">
              {/* Dynamic Island / Speaker notch */}
              <div className="w-28 h-5 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
                <div className="w-2 h-2 rounded-full bg-teal-dark/60" />
              </div>

              {/* Phone Screen Interior */}
              <div className="rounded-[32px] bg-[#07090C] border border-white/5 p-4 space-y-4 min-h-[540px] flex flex-col justify-between">
                <div>
                  {/* App Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-teal flex items-center justify-center text-black font-bold text-[10px]">
                        V
                      </div>
                      <span className="text-xs font-bold text-white tracking-wider">vayro OS</span>
                    </div>
                    <span className="text-[10px] text-teal font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal animate-ping" />
                      SYSTEM CONNECTED
                    </span>
                  </div>

                  {/* Top Alertness Score Card */}
                  <div className="mt-3 p-3.5 rounded-2xl bg-surface border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                        Driver Alertness Score
                      </span>
                      <span className="text-2xl font-extrabold text-teal">98%</span>
                      <span className="text-[10px] text-slate-300 block">Optimal PERCLOS</span>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-teal flex items-center justify-center text-teal">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Dual Camera Stream Switcher (when activeTab === 'live') */}
                  {activeTab === 'live' && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-300">Live Dual-Stream</span>
                        <div className="flex items-center gap-1 bg-surface-light p-0.5 rounded-lg border border-white/5">
                          <button
                            onClick={() => setCameraStream('road')}
                            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                              cameraStream === 'road' ? 'bg-teal text-black' : 'text-slate-400'
                            }`}
                          >
                            Road 4K
                          </button>
                          <button
                            onClick={() => setCameraStream('cabin')}
                            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                              cameraStream === 'cabin' ? 'bg-teal text-black' : 'text-slate-400'
                            }`}
                          >
                            Cabin IR
                          </button>
                        </div>
                      </div>

                      {/* Stream Preview Box */}
                      <div className="h-40 rounded-2xl bg-[#030406] border border-white/10 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        <div className="text-center z-20 space-y-1">
                          <Play className="w-8 h-8 text-teal mx-auto fill-teal/20" />
                          <span className="text-[11px] font-mono text-slate-300 block">
                            {cameraStream === 'road' ? 'Highway Corridor • 4K HDR 30fps' : 'Cabin Eye-Track • 940nm Stealth IR'}
                          </span>
                        </div>
                        <div className="absolute top-2 left-2 z-20 text-[9px] font-mono bg-red-600 px-1.5 py-0.5 rounded text-white flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          REC
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Incident History List (when activeTab === 'history') */}
                  {activeTab === 'history' && (
                    <div className="mt-3 space-y-2">
                      <span className="text-[11px] font-semibold text-slate-300 block">Recent Event Vault</span>
                      <div className="space-y-1.5 max-h-44 overflow-y-auto">
                        <div className="p-2.5 rounded-xl bg-surface border border-amber/20 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber" />
                            <div>
                              <span className="font-semibold text-white block">Micro-Sleep Alert Chime</span>
                              <span className="text-slate-400 text-[10px]">Today, 03:42 AM • NH 44</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-amber font-mono font-bold">120ms</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-surface border border-white/5 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-teal" />
                            <div>
                              <span className="font-semibold text-white block">Eyelid Droop Warning</span>
                              <span className="text-slate-400 text-[10px]">Yesterday, 11:15 PM</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-teal font-mono">Rest Advised</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Driver Reports (when activeTab === 'reports') */}
                  {activeTab === 'reports' && (
                    <div className="mt-3 space-y-2.5">
                      <span className="text-[11px] font-semibold text-slate-300 block">Fatigue Telemetry Report</span>
                      <div className="p-3 rounded-xl bg-surface border border-white/5 space-y-2 text-[11px]">
                        <div className="flex justify-between text-slate-400">
                          <span>Total Night Hours:</span>
                          <span className="text-white font-mono">24.5 hrs</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Interventions Triggered:</span>
                          <span className="text-amber font-mono font-bold">2 events</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Cognitive Recovery:</span>
                          <span className="text-teal font-mono">&lt; 1.2 sec</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Earbuds & Dashcam Hardware Battery pill */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <BatteryCharging className="w-3.5 h-3.5 text-teal" />
                    <span>Buds: 92%</span>
                  </div>
                  <span>Case: 85%</span>
                  <span className="text-teal">12V Power OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
