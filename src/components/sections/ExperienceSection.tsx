import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { experienceData } from '../../data/portfolioData';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';

export const ExperienceSection: React.FC = () => {
  const { isRtl, t } = useLanguage();

  return (
    <section id="experience" className="py-20 md:py-24 relative bg-[#fafafc] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t('experience.badge')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
          align="center"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {experienceData.map((item) => (
            <GlassCard key={item.id} className="bg-white p-6 sm:p-8 border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100">
                    <Briefcase size={12} />
                    <span>{isRtl ? item.typeAr : item.typeEn}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] font-editorial pt-0.5">
                    {isRtl ? item.roleAr : item.roleEn}
                  </h3>

                  <p className="text-xs font-semibold text-slate-500">
                    {isRtl ? item.companyAr : item.companyEn}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-xs text-slate-500 shrink-0">
                  <div className="inline-flex items-center gap-1 font-bold text-pink-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    <Calendar size={13} />
                    <span>{isRtl ? item.periodAr : item.periodEn}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px]">
                    <MapPin size={11} />
                    {isRtl ? 'القاهرة / سوهاج، مصر' : 'Cairo / Sohag, Egypt'}
                  </span>
                </div>
              </div>

              {/* Growth Metric Pill if present */}
              {(item.growthEn || item.growthAr) && (
                <div className="mt-4 p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 flex items-center gap-2 text-emerald-800 text-xs font-bold">
                  <TrendingUp size={16} className="text-emerald-600 shrink-0" />
                  <span>{isRtl ? item.growthAr : item.growthEn}</span>
                </div>
              )}

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-4 pb-3 font-normal">
                {isRtl ? item.descriptionAr : item.descriptionEn}
              </p>

              {/* Responsibilities */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  {isRtl ? 'أبرز المهام والمسؤوليات المنجزة' : 'Key Responsibilities'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                  {(isRtl ? item.responsibilitiesAr : item.responsibilitiesEn).map((resp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-[#fafafc] border border-slate-100"
                    >
                      <CheckCircle2 size={14} className="text-pink-500 mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-700 font-normal leading-snug">
                        {resp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Tags */}
              <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-400 me-1">
                  {isRtl ? 'المهارات المطبقة:' : 'Applied Skills:'}
                </span>
                {item.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900 text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
