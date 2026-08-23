import React from 'react';
import {
  BrainCircuit,
  CalendarCheck,
  HeartHandshake,
  Target,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { whyMeData } from '../../data/portfolioData';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';

export const WhyWorkWithMe: React.FC = () => {
  const { isRtl, t } = useLanguage();

  const getWhyMeIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit':
        return <BrainCircuit size={22} className="text-pink-600" />;
      case 'CalendarCheck':
        return <CalendarCheck size={22} className="text-sky-600" />;
      case 'HeartHandshake':
        return <HeartHandshake size={22} className="text-rose-600" />;
      case 'Target':
        return <Target size={22} className="text-emerald-600" />;
      default:
        return <Sparkles size={22} className="text-pink-600" />;
    }
  };

  return (
    <section id="why-me" className="py-20 md:py-24 relative bg-[#fafafc] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t('whyMe.badge')}
          title={t('whyMe.title')}
          subtitle={t('whyMe.subtitle')}
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyMeData.map((item) => (
            <GlassCard
              key={item.id}
              className="bg-white p-6 flex flex-col justify-between space-y-4 border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-pink-50/80 border border-pink-100">
                    {getWhyMeIcon(item.iconName)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-200">
                    {isRtl ? item.highlightAr : item.highlightEn}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#0f172a] font-editorial">
                  {isRtl ? item.titleAr : item.titleEn}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {isRtl ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>

              {/* Metric Pill */}
              {(item.metricEn || item.metricAr) && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="text-[11px] text-pink-600 font-mono">
                    {isRtl ? item.metricAr : item.metricEn}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
