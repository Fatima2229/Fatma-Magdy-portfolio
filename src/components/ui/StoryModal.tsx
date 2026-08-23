import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Pause, Play, Sparkles, GraduationCap, TrendingUp, Heart, Zap, Palette, Filter, MessageSquare } from 'lucide-react';
import { useStoryStore } from '../../stores/useStoryStore';
import { useLanguage } from '../../hooks/useLanguage';

const STORY_DURATION = 6000; // 6 seconds per slide

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  GraduationCap,
  TrendingUp,
  Sparkles,
  Heart,
  Zap,
  Palette,
  Filter,
  MessageSquare,
};

export const StoryModal: React.FC = () => {
  const { activeStory, activeSlideIndex, isStoryOpen, closeStory, nextSlide, prevSlide, setActiveSlideIndex } = useStoryStore();
  const { isRtl } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedBeforePauseRef = useRef<number>(0);

  const currentSlide = activeStory?.slides[activeSlideIndex];
  const totalSlides = activeStory?.slides.length || 0;

  // Handle slide progress animation
  useEffect(() => {
    if (!isStoryOpen || !activeStory) {
      setProgress(0);
      elapsedBeforePauseRef.current = 0;
      return;
    }

    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();

    const interval = 50; // update every 50ms
    const timer = window.setInterval(() => {
      if (isPaused) return;

      const elapsed = Date.now() - startTimeRef.current + elapsedBeforePauseRef.current;
      const pct = Math.min(100, (elapsed / STORY_DURATION) * 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);
        nextSlide();
      }
    }, interval);

    timerRef.current = timer;

    return () => {
      clearInterval(timer);
    };
  }, [isStoryOpen, activeStory, activeSlideIndex, isPaused, nextSlide]);

  const handlePause = useCallback(() => {
    if (!isPaused) {
      elapsedBeforePauseRef.current += Date.now() - startTimeRef.current;
      setIsPaused(true);
    }
  }, [isPaused]);

  const handleResume = useCallback(() => {
    if (isPaused) {
      startTimeRef.current = Date.now();
      setIsPaused(false);
    }
  }, [isPaused]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStoryOpen) return;
      if (e.key === 'Escape') closeStory();
      if (e.key === 'ArrowRight') isRtl ? prevSlide() : nextSlide();
      if (e.key === 'ArrowLeft') isRtl ? nextSlide() : prevSlide();
      if (e.key === ' ') {
        e.preventDefault();
        isPaused ? handleResume() : handlePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStoryOpen, closeStory, nextSlide, prevSlide, isRtl, isPaused, handlePause, handleResume]);

  if (!isStoryOpen || !activeStory || !currentSlide) return null;

  const CurrentIcon = iconMap[currentSlide.iconName] || Sparkles;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 transition-all duration-300"
      onClick={closeStory}
    >
      {/* Container simulating a sleek social story viewport */}
      <div
        className="relative w-full max-w-[420px] h-[85vh] max-h-[780px] min-h-[540px] rounded-[32px] overflow-hidden shadow-2xl flex flex-col justify-between p-6 text-white border border-white/10 select-none bg-gradient-to-b"
        style={{
          background: 'linear-gradient(180deg, #090d16 0%, #151d30 50%, #090d16 100%)',
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handlePause}
        onMouseUp={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        {/* Ambient backdrop glow */}
        <div className="absolute inset-0 bg-radial from-pink-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Top Header: Progress bars & Story Info */}
        <div className="relative z-20 space-y-3">
          {/* Progress Bars */}
          <div className="flex gap-1.5 w-full">
            {activeStory.slides.map((slide, idx) => {
              let widthPct = 0;
              if (idx < activeSlideIndex) widthPct = 100;
              else if (idx === activeSlideIndex) widthPct = progress;
              else widthPct = 0;

              return (
                <div
                  key={slide.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                >
                  <div
                    className="h-full bg-white transition-all duration-75 ease-linear rounded-full"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Profile row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-pink-400 p-0.5 shadow-sm bg-black/40">
                <img src="/logo.png" alt="Fatma Magdy" className="w-full h-full object-cover" />
              </div>
              <div className="text-start">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-white">Fatma Magdy</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[9px] font-black">
                    ✓
                  </span>
                </div>
                <p className="text-[11px] text-pink-300 font-medium">
                  {isRtl ? activeStory.categoryAr : activeStory.categoryEn}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isPaused ? handleResume() : handlePause();
                }}
                aria-label={isPaused ? 'Resume' : 'Pause'}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <button
                onClick={closeStory}
                aria-label="Close story"
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Center Content Slide */}
        <div className="relative z-20 my-auto text-center flex flex-col items-center justify-center space-y-5 px-3">
          {/* Badge icon */}
          <div className="w-16 h-16 rounded-3xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 shadow-lg shadow-pink-500/10">
            <CurrentIcon size={32} />
          </div>

          {/* Slide Tag */}
          <span className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-200 text-xs font-semibold tracking-wider border border-pink-400/30">
            {isRtl ? currentSlide.tagAr : currentSlide.tagEn}
          </span>

          {/* Headline */}
          <h3 className="text-xl sm:text-2xl font-bold leading-snug tracking-tight text-white">
            {isRtl ? currentSlide.headlineAr : currentSlide.headlineEn}
          </h3>

          {/* Body Text */}
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-sm">
            {isRtl ? currentSlide.textAr : currentSlide.textEn}
          </p>
        </div>

        {/* Navigation Touch Areas (Left / Right) */}
        <div
          className="absolute inset-y-20 start-0 w-1/3 z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            isRtl ? nextSlide() : prevSlide();
          }}
          title={isRtl ? 'التالي' : 'Previous'}
        />
        <div
          className="absolute inset-y-20 end-0 w-1/3 z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            isRtl ? prevSlide() : nextSlide();
          }}
          title={isRtl ? 'السابق' : 'Next'}
        />

        {/* Bottom Bar: Action & Nav Hints */}
        <div className="relative z-20 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            disabled={activeSlideIndex === 0}
            className="flex items-center gap-1 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-opacity"
          >
            {isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            <span>{isRtl ? 'السابق' : 'Prev'}</span>
          </button>

          <span className="font-mono text-[11px] text-slate-400 font-medium">
            {activeSlideIndex + 1} / {totalSlides}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="flex items-center gap-1 hover:text-white transition-colors text-pink-400 font-semibold"
          >
            <span>{isRtl ? 'التالي' : 'Next'}</span>
            {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
