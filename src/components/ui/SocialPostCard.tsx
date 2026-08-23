import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';
import { useLanguage } from '../../hooks/useLanguage';
import { useSocialInteractions } from '../../hooks/useSocialInteractions';
import { useProjectModalStore } from '../../stores/useProjectModalStore';
import { InstagramIcon, FacebookIcon, TikTokIcon, LinkedInIcon } from './SocialIcons';

interface SocialPostCardProps {
  project: ProjectItem;
}

const PlatformPill: React.FC<{ platform: ProjectItem['platform']; size?: number }> = ({ platform, size = 15 }) => {
  switch (platform) {
    case 'instagram':
      return <InstagramIcon size={size} className="text-[#8c52ff]" />;
    case 'facebook':
      return <FacebookIcon size={size} className="text-blue-600" />;
    case 'tiktok':
      return <TikTokIcon size={size} className="text-slate-800" />;
    case 'linkedin':
      return <LinkedInIcon size={size} className="text-[#0A66C2]" />;
    default:
      return <Sparkles size={size} className="text-amber-500" />;
  }
};

export const SocialPostCard: React.FC<SocialPostCardProps> = ({ project }) => {
  const { isRtl, t } = useLanguage();
  const { getPostStats, toggleLike, toggleSave, sharePost, copiedId } = useSocialInteractions();
  const { openProjectModal } = useProjectModalStore();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

  const stats = getPostStats(project.id, project.likesCount);
  const isCopied = copiedId === project.id;

  const slides = project.carouselSlides || [
    {
      id: `${project.id}-single`,
      titleEn: project.titleEn,
      titleAr: project.titleAr,
      contentEn: project.summaryEn,
      contentAr: project.summaryAr,
      type: 'value' as const,
    },
  ];

  const totalSlides = slides.length;
  const currentSlide = slides[activeSlideIndex] || slides[0];

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeSlideIndex < totalSlides - 1) {
      setActiveSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeSlideIndex > 0) {
      setActiveSlideIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* 1. Header: Profile Info & Platform Badge */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#8c52ff]/40 p-0.5 shadow-2xs bg-white">
              <img src="/logo.png" alt="Fatma Magdy" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -bottom-0.5 -end-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="text-start min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-[#0e1a36] truncate">
                Fatma Magdy
              </h4>
              <span className="w-3.5 h-3.5 rounded-full bg-[#8c52ff] text-white flex items-center justify-center text-[9px] font-black shrink-0" title="Verified Creator">
                ✓
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 truncate">@fatma.content</p>
          </div>
        </div>

        {/* Platform tag pill */}
        <div className="shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs">
            <PlatformPill platform={project.platform} />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700">
              {project.platform}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Visual Content Slide / Carousel Screen */}
      <div
        className="relative min-h-[260px] sm:min-h-[290px] p-5 sm:p-6 flex flex-col justify-between text-white overflow-hidden select-none"
        style={{
          background: 'linear-gradient(135deg, #0a1224 0%, #152245 60%, #0e1a36 100%)',
        }}
      >
        {/* Subtle background mesh */}
        <div
          className="absolute inset-0 opacity-20 bg-radial from-[#8c52ff] via-transparent to-transparent pointer-events-none"
          style={{ transform: `scale(${1 + activeSlideIndex * 0.1})` }}
        />

        {/* Top bar inside slide: Category Tag + Sub-badge + Slide Count */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-bold text-[#e9dcf7]">
              {isRtl ? project.postDateAr : project.postDateEn}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#8c52ff]/25 backdrop-blur-md border border-[#8c52ff]/35 text-[10px] sm:text-[11px] font-semibold text-white">
              {isRtl ? project.badgeAr : project.badgeEn}
            </span>
          </div>

          {totalSlides > 1 && (
            <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-bold text-white/90 shrink-0">
              {activeSlideIndex + 1}/{totalSlides}
            </span>
          )}
        </div>

        {/* Slide Main Content */}
        <div className="relative z-10 my-auto text-start space-y-3 py-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#8c52ff]/20 text-[#e9dcf7] text-[10px] font-bold uppercase tracking-wider">
            <span>
              {currentSlide.type === 'hook' && (isRtl ? 'افتتاحية جاذبة (Hook)' : 'Viral Hook')}
              {currentSlide.type === 'strategy' && (isRtl ? 'الاستراتيجية' : 'Strategy')}
              {currentSlide.type === 'value' && (isRtl ? 'القيمة المضافة' : 'Value')}
              {currentSlide.type === 'result' && (isRtl ? 'النتائج' : 'Impact')}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold leading-snug text-white font-editorial">
            {isRtl ? currentSlide.titleAr : currentSlide.titleEn}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md font-normal line-clamp-3">
            {isRtl ? currentSlide.contentAr : currentSlide.contentEn}
          </p>
        </div>

        {/* Bottom indicator dots & carousel controls */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlideIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeSlideIndex ? 'w-5 bg-[#a77cd6]' : 'w-1.5 bg-white/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {totalSlides > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevSlide}
                disabled={activeSlideIndex === 0}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors text-white"
                aria-label="Previous slide"
              >
                {isRtl ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </button>
              <button
                onClick={handleNextSlide}
                disabled={activeSlideIndex === totalSlides - 1}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors text-white"
                aria-label="Next slide"
              >
                {isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Action Bar: Like, Comment, Share, Save */}
      <div className="p-4 sm:p-5 flex flex-col space-y-3.5 flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            {/* Left/Start Actions */}
            <div className="flex items-center gap-4">
              {/* Like Button */}
              <button
                onClick={() => toggleLike(project.id, project.likesCount)}
                className="flex items-center gap-1.5 group/btn focus:outline-none transition-transform active:scale-90"
                aria-label={stats.liked ? t('projects.postCard.liked') : t('projects.postCard.like')}
              >
                <Heart
                  size={20}
                  className={`transition-all duration-200 ${
                    stats.liked
                      ? 'fill-rose-500 text-rose-500 scale-110'
                      : 'text-slate-600 group-hover/btn:text-rose-500'
                  }`}
                />
                <span className={`text-xs font-bold ${stats.liked ? 'text-rose-600' : 'text-slate-700'}`}>
                  {stats.likeCount.toLocaleString()}
                </span>
              </button>

              {/* Comment / Discussion button */}
              <button
                onClick={() => openProjectModal(project)}
                className="flex items-center gap-1.5 text-slate-600 hover:text-[#8c52ff] transition-colors focus:outline-none"
                aria-label={t('projects.postCard.comment')}
              >
                <MessageCircle size={19} />
                <span className="text-xs font-bold text-slate-700">{project.commentsCount}</span>
              </button>

              {/* Share button */}
              <button
                onClick={() => sharePost(project.id, isRtl ? project.titleAr : project.titleEn)}
                className="flex items-center gap-1.5 text-slate-600 hover:text-[#8c52ff] transition-colors focus:outline-none relative"
                aria-label={t('projects.postCard.share')}
              >
                {isCopied ? <Check size={19} className="text-emerald-500" /> : <Share2 size={19} />}
                <span className="text-xs font-bold text-slate-700">{project.sharesCount}</span>
                {isCopied && (
                  <span className="absolute -top-7 start-0 px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-bold whitespace-nowrap shadow-md">
                    {t('projects.postCard.linkCopied')}
                  </span>
                )}
              </button>
            </div>

            {/* Right/End Bookmark / Save Button */}
            <button
              onClick={() => toggleSave(project.id, project.likesCount)}
              className="text-slate-600 hover:text-[#8c52ff] transition-transform active:scale-90 focus:outline-none"
              aria-label={stats.saved ? t('projects.postCard.saved') : t('projects.postCard.save')}
            >
              <Bookmark
                size={20}
                className={`transition-all duration-200 ${
                  stats.saved ? 'fill-[#8c52ff] text-[#8c52ff]' : 'text-slate-600'
                }`}
              />
            </button>
          </div>

          {/* Caption with Toggle */}
          <div className="pt-2 text-start">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 me-1">Fatma Magdy</span>
              <span>
                {isCaptionExpanded
                  ? isRtl
                    ? project.captionAr
                    : project.captionEn
                  : `${(isRtl ? project.captionAr : project.captionEn).slice(0, 110)}...`}
              </span>
              <button
                onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
                className="ms-1.5 text-xs font-bold text-[#8c52ff] hover:underline focus:outline-none"
              >
                {isCaptionExpanded ? t('projects.postCard.readLess') : t('projects.postCard.readMore')}
              </button>
            </p>
          </div>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1.5 pt-2.5">
            {project.hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium text-[#8c52ff] hover:text-[#733cd6] cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Explore Full Strategy Case Button */}
        <div className="pt-3 border-t border-slate-100">
          <button
            onClick={() => openProjectModal(project)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#f6f0fc] border border-slate-200/80 hover:border-[#e6d8f8] text-xs sm:text-sm font-bold text-slate-800 hover:text-[#733cd6] transition-all flex items-center justify-center gap-2 group/cta"
          >
            <span>{t('projects.postCard.viewCase')}</span>
            <ArrowUpRight size={15} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
