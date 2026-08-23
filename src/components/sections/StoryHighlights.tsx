import React from 'react';
import {
  GraduationCap,
  Flame,
  Layers,
  TrendingUp,
  Sparkles,
  Plus,
  Play,
  ArrowUpRight,
  Eye,
} from 'lucide-react';
import { storyHighlights } from '../../data/portfolioData';
import { useStoryStore } from '../../stores/useStoryStore';
import { useLanguage } from '../../hooks/useLanguage';
import { StoryItem } from '../../types/portfolio';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  GraduationCap,
  Flame,
  Layers,
  TrendingUp,
  Sparkles,
};

export const StoryHighlights: React.FC = () => {
  const { openStory } = useStoryStore();
  const { isRtl, t } = useLanguage();

  return (
    <section
      id="stories"
      className="py-20 md:py-24 relative bg-white border-y border-slate-200/80 scroll-mt-20 overflow-hidden"
    >
      {/* Background Decorative Ambient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8c52ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          badge={t('stories.badge')}
          title={t('stories.title')}
          subtitle={t('stories.subtitle')}
          align="center"
        />

        {/* 1. Quick Tap Highlights Carousel (Instagram Style) */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-5 sm:gap-8 overflow-x-auto pb-4 pt-2 no-scrollbar">
            {storyHighlights.map((story: StoryItem) => {
              const IconComponent = iconMap[story.icon] || Sparkles;

              return (
                <button
                  key={story.id}
                  onClick={() => openStory(story)}
                  className="group flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer focus:outline-none transition-transform active:scale-95"
                >
                  {/* Glowing 3D Gradient Ring */}
                  <div
                    className={`p-[3px] rounded-full bg-gradient-to-tr ${story.ringColor} group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#8c52ff]/20 transition-all duration-300 shadow-sm`}
                  >
                    <div className="p-0.5 rounded-full bg-white">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0e1a36] text-white flex items-center justify-center relative overflow-hidden group-hover:bg-[#162347] transition-colors">
                        <IconComponent
                          size={26}
                          className="text-[#c4a1eb] group-hover:scale-110 group-hover:text-white transition-all duration-300"
                        />
                        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.2 rounded-full bg-[#8c52ff] text-[10px] font-bold text-white leading-none">
                          {story.slides.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#8c52ff] transition-colors text-center max-w-[100px] truncate">
                    {isRtl ? story.titleAr : story.titleEn}
                  </span>
                </button>
              );
            })}

            {/* Direct Request CTA Bubble */}
            <a
              href="#contact"
              className="group flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer focus:outline-none transition-transform active:scale-95"
            >
              <div className="p-[3px] rounded-full border-2 border-dashed border-[#8c52ff]/40 group-hover:border-[#8c52ff] transition-colors">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f6f0fc] text-[#8c52ff] flex items-center justify-center group-hover:bg-[#eedcfc] transition-colors">
                  <Plus
                    size={26}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#733cd6] text-center max-w-[100px] truncate">
                {isRtl ? 'طلب خطة' : 'New Plan'}
              </span>
            </a>
          </div>
        </div>

        {/* 2. Interactive Stories Showcase Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {storyHighlights.map((story: StoryItem) => {
            const IconComponent = iconMap[story.icon] || Sparkles;
            const firstSlide = story.slides[0];

            return (
              <GlassCard
                key={story.id}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 hover:border-[#e6d8f8] hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer"
                onClick={() => openStory(story)}
              >
                <div className="space-y-3.5">
                  {/* Top Bar: Icon + Slide count */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${story.ringColor} p-0.5 shadow-sm`}
                    >
                      <div className="w-full h-full bg-[#0e1a36] rounded-[14px] flex items-center justify-center text-[#c4a1eb]">
                        <IconComponent size={22} />
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#f6f0fc] text-[#733cd6] border border-[#e6d8f8]">
                      <Eye size={12} />
                      <span>
                        {story.slides.length} {isRtl ? 'شرائح' : 'Slides'}
                      </span>
                    </span>
                  </div>

                  {/* Titles */}
                  <div className="text-start">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      {isRtl ? story.categoryAr : story.categoryEn}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#0e1a36] font-editorial group-hover:text-[#8c52ff] transition-colors mt-0.5">
                      {isRtl ? story.titleAr : story.titleEn}
                    </h4>
                  </div>

                  {/* Preview of first slide text */}
                  {firstSlide && (
                    <p className="text-xs text-slate-600 leading-relaxed text-start line-clamp-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      {isRtl ? firstSlide.textAr : firstSlide.textEn}
                    </p>
                  )}
                </div>

                {/* Bottom Action Button */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openStory(story);
                    }}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#0e1a36] group-hover:bg-gradient-to-r group-hover:from-[#8c52ff] group-hover:to-[#6f38b8] text-white text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Play size={13} className="fill-white" />
                    <span>{isRtl ? 'مشاهدة الستوري' : 'Watch Story'}</span>
                    <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100" />
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
