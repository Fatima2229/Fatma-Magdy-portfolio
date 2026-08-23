import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Search,
  Layers,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { skillCategories } from '../../data/portfolioData';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';

export const SkillsSection: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles size={18} className="text-[#8c52ff]" />;
      case 'TrendingUp':
        return <TrendingUp size={18} className="text-indigo-600" />;
      case 'Search':
        return <Search size={18} className="text-[#8c52ff]" />;
      case 'Layers':
        return <Layers size={18} className="text-purple-600" />;
      default:
        return <Sparkles size={18} className="text-[#8c52ff]" />;
    }
  };

  const filteredCategories =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-24 relative bg-[#fafafc] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t('skills.badge')}
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
          align="center"
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#0e1a36] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#e6d8f8] hover:text-[#8c52ff]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Filter size={12} />
              {isRtl ? 'جميع المهارات (11)' : 'All (11 Skills)'}
            </span>
          </button>

          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0e1a36] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#e6d8f8] hover:text-[#8c52ff]'
              }`}
            >
              {isRtl ? cat.titleAr : cat.titleEn}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((cat) => (
            <GlassCard key={cat.id} className="bg-white p-6 sm:p-7 space-y-5">
              {/* Header */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0e1a36] font-editorial">
                    {isRtl ? cat.titleAr : cat.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isRtl ? cat.descriptionAr : cat.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Skills Items */}
              <div className="space-y-2.5 pt-1">
                {cat.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#fafafc] hover:bg-[#f6f0fc] border border-slate-100 hover:border-[#e6d8f8] transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2
                        size={15}
                        className="text-[#8c52ff] shrink-0"
                      />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        {isRtl ? skill.nameAr : skill.nameEn}
                      </span>
                    </div>

                    <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200">
                      {isRtl ? skill.tagAr : skill.tagEn}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
