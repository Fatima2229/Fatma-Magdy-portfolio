import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { SocialPostCard } from '../ui/SocialPostCard';
import { projectsData } from '../../data/portfolioData';
import { useLanguage } from '../../hooks/useLanguage';
import { ProjectItem } from '../../types/portfolio';
import { Sparkles, Grid3X3 } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TikTokIcon, LinkedInIcon } from '../ui/SocialIcons';

type FilterType = 'all' | 'instagram' | 'facebook' | 'tiktok' | 'linkedin' | 'strategy';

export const ProjectsSection: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return projectsData;
    return projectsData.filter((p: ProjectItem) => p.platform === selectedFilter);
  }, [selectedFilter]);

  const filterButtons: { id: FilterType; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t('projects.filters.all'), icon: <Grid3X3 size={15} /> },
    { id: 'instagram', label: t('projects.filters.instagram'), icon: <InstagramIcon size={15} className="text-pink-500" /> },
    { id: 'facebook', label: t('projects.filters.facebook'), icon: <FacebookIcon size={15} className="text-blue-600" /> },
    { id: 'tiktok', label: t('projects.filters.tiktok'), icon: <TikTokIcon size={15} className="text-slate-800" /> },
    { id: 'linkedin', label: t('projects.filters.linkedin'), icon: <LinkedInIcon size={15} className="text-[#0A66C2]" /> },
    { id: 'strategy', label: t('projects.filters.strategy'), icon: <Sparkles size={15} className="text-amber-500" /> },
  ];

  return (
    <section id="projects" className="py-20 bg-[#fafafc] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t('projects.badge')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        {/* Filter Tabs Bar Styled Like Social Navigation */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-x-auto max-w-full">
            {filterButtons.map((btn) => {
              const isActive = selectedFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setSelectedFilter(btn.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{btn.icon}</span>
                  <span>{btn.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {btn.id === 'all'
                      ? projectsData.length
                      : projectsData.filter((p) => p.platform === btn.id).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feed Grid of Social Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project: ProjectItem) => (
            <SocialPostCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">
              {isRtl ? 'لا توجد منشورات مطابقة لهذا الفلتر حالياً.' : 'No posts found under this filter.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
