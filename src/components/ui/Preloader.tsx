import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface PreloaderProps {
  onFinish?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const { isRtl } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 600); // Wait for exit animation
          }, 300);
          return 100;
        }
        // Smooth progression
        const step = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b1124] text-white transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle background luxury glow */}
      <div className="absolute w-96 h-96 rounded-full bg-pink-600/15 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none -top-10 -right-10" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center space-y-6">
        {/* Animated Brand Logo Container */}
        <div className="relative flex items-center justify-center">
          {/* Rotating Outer Ring */}
          <div className="absolute -inset-4 rounded-full border border-pink-500/30 border-t-pink-400 border-r-transparent animate-spin duration-1000" />
          
          {/* Pulsing Middle Ring */}
          <div className="absolute -inset-2 rounded-full border border-pink-500/20 animate-pulse" />

          {/* Logo Frame */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1.5 shadow-2xl shadow-pink-500/20 overflow-hidden">
            <img
              src="/logo.png"
              alt="Fatma Magdy"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold font-editorial text-white tracking-wide">
            {isRtl ? 'فاطمة مجدي' : 'Fatma Magdy'}
          </h2>
          <p className="text-xs font-semibold text-pink-400 uppercase tracking-widest">
            {isRtl ? 'أخصائية سوشيال ميديا ومحتوى' : 'Social & Content Specialist'}
          </p>
        </div>

        {/* Progress Bar & Counter */}
        <div className="w-48 sm:w-56 space-y-2">
          {/* Progress Track */}
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-300 rounded-full transition-all duration-200 ease-out shadow-sm shadow-pink-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 font-medium px-0.5">
            <span>{isRtl ? 'جاري التحميل...' : 'Loading...'}</span>
            <span className="text-pink-400 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Tagline Badge */}
        <div className="pt-2">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-slate-900/80 border border-slate-800 text-slate-300 shadow-inner">
            Plan • Create • Engage • Grow
          </span>
        </div>
      </div>
    </div>
  );
};
