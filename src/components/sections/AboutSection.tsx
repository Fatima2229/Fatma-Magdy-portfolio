import React from 'react';
import {
  CalendarDays,
  PenTool,
  TrendingUp,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';

export const AboutSection: React.FC = () => {
  const { isRtl, t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-24 relative bg-[#fafafc] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t('about.badge')}
          title={t('about.title')}
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Visual Profile Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <div className="relative bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 text-center space-y-5">
                {/* Logo Showcase */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full p-1.5 bg-slate-50 border border-slate-200">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden p-1 shadow-2xs">
                    <img
                      src="/logo.png"
                      alt="Fatma Magdy Personal Brand"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0e1a36] font-editorial">
                    {isRtl ? 'فاطمة مجدي' : 'Fatma Magdy'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8c52ff] font-semibold mt-0.5">
                    {isRtl ? 'أخصائية سوشيال ميديا ومحتوى' : 'Social Media & Content Specialist'}
                  </p>
                </div>

                {/* Academic & Spec Quick Tags */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 px-3 py-2 rounded-xl bg-slate-50">
                    <span className="flex items-center gap-1.5 font-medium">
                      <GraduationCap size={15} className="text-slate-400" />
                      {isRtl ? 'المؤهل العلمي' : 'Degree'}
                    </span>
                    <span className="font-bold text-[#0e1a36]">
                      {isRtl ? 'نظم معلومات الأعمال 2026' : 'BIS Degree (2026)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 px-3 py-2 rounded-xl bg-slate-50">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles size={15} className="text-[#8c52ff]" />
                      {isRtl ? 'التخصص' : 'Focus'}
                    </span>
                    <span className="font-bold text-[#0e1a36]">
                      {isRtl ? 'إدارة محتوى ونمو رقمي' : 'Content & Growth'}
                    </span>
                  </div>
                </div>

                {/* Tagline Pill */}
                <div className="p-2.5 rounded-xl bg-[#f6f0fc] text-[#733cd6] text-xs font-semibold border border-[#e6d8f8]">
                  <span>Plan • Create • Engage • Grow</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-slate-900 text-base sm:text-lg">
                {t('about.p1')}
              </p>
              <p>
                {t('about.p2')}
              </p>
              <p>
                {t('about.p3')}
              </p>
            </div>

            {/* Strengths Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {[
                { en: 'Fast Learner', ar: 'سريعة التعلم', icon: Sparkles },
                { en: 'Strong Communication', ar: 'تواصل فعال', icon: CheckCircle2 },
                { en: 'Deep Research', ar: 'بحث معمق', icon: Search },
                { en: 'Problem Solver', ar: 'حل المشكلات', icon: TrendingUp },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-center flex flex-col items-center justify-center gap-1"
                  >
                    <IconComponent size={16} className="text-[#8c52ff] mb-0.5" />
                    <span className="text-xs font-bold text-[#0e1a36]">
                      {isRtl ? item.ar : item.en}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <GlassCard className="p-4 sm:p-5 text-start bg-white">
                <div className="p-2 rounded-xl bg-[#f6f0fc] text-[#8c52ff] w-fit mb-2.5">
                  <CalendarDays size={16} />
                </div>
                <h4 className="text-sm font-bold text-[#0e1a36] mb-1">
                  {t('about.pillars.planning')}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('about.pillars.planningDesc')}
                </p>
              </GlassCard>

              <GlassCard className="p-4 sm:p-5 text-start bg-white">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600 w-fit mb-2.5">
                  <PenTool size={16} />
                </div>
                <h4 className="text-sm font-bold text-[#0e1a36] mb-1">
                  {t('about.pillars.creation')}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('about.pillars.creationDesc')}
                </p>
              </GlassCard>

              <GlassCard className="p-4 sm:p-5 text-start bg-white">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 w-fit mb-2.5">
                  <TrendingUp size={16} />
                </div>
                <h4 className="text-sm font-bold text-[#0e1a36] mb-1">
                  {t('about.pillars.growth')}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('about.pillars.growthDesc')}
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
