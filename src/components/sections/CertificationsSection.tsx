import React from 'react';
import {
  GraduationCap,
  Award,
  BadgeCheck,
  Users,
  Laptop,
  Globe,
  Eye,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { certificationsData } from '../../data/portfolioData';
import { useProjectModalStore } from '../../stores/useProjectModalStore';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';

export const CertificationsSection: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const { openCertificateModal } = useProjectModalStore();

  const getCertIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap size={22} className="text-[#8c52ff]" />;
      case 'Award':
        return <Award size={22} className="text-amber-600" />;
      case 'BadgeCheck':
        return <BadgeCheck size={22} className="text-emerald-600" />;
      case 'Users':
        return <Users size={22} className="text-indigo-600" />;
      case 'Laptop':
        return <Laptop size={22} className="text-sky-600" />;
      case 'Globe':
        return <Globe size={22} className="text-rose-600" />;
      default:
        return <Award size={22} className="text-[#8c52ff]" />;
    }
  };

  return (
    <section id="certifications" className="py-20 md:py-24 relative bg-[#fafafc] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t('certifications.badge')}
          title={t('certifications.title')}
          subtitle={t('certifications.subtitle')}
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsData.map((cert) => {
            const hasImage = Boolean(cert.certificateImage);

            return (
              <GlassCard
                key={cert.id}
                onClick={() => openCertificateModal(cert)}
                className={`bg-white p-5 sm:p-6 rounded-3xl flex flex-col justify-between space-y-4 group cursor-pointer border transition-all duration-300 ${
                  hasImage
                    ? 'border-[#8c52ff]/40 ring-2 ring-[#8c52ff]/10 shadow-md hover:shadow-xl hover:scale-[1.02]'
                    : 'border-slate-200/80 hover:border-[#e6d8f8] hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  {/* Header: Icon + Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl border ${hasImage ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-slate-50 border-slate-100'}`}>
                      {getCertIcon(cert.iconName)}
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-50 text-slate-700 border border-slate-200">
                      {isRtl ? cert.categoryAr : cert.categoryEn}
                    </span>
                  </div>

                  {/* If certificate image is present, show a luxury thumbnail preview */}
                  {hasImage && cert.certificateImage && (
                    <div className="relative rounded-2xl overflow-hidden border border-[#8c52ff]/30 bg-slate-900 group/img">
                      <img
                        src={cert.certificateImage}
                        alt={isRtl ? cert.titleAr : cert.titleEn}
                        className="w-full h-32 object-cover object-center group-hover/img:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                        <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                          <Sparkles size={11} />
                          {isRtl ? 'شهادة رسمية موثقة' : 'Verified Official Document'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-[#0e1a36] font-editorial group-hover:text-[#8c52ff] transition-colors leading-snug">
                    {isRtl ? cert.titleAr : cert.titleEn}
                  </h3>

                  {/* Issuer */}
                  <p className="text-xs text-slate-500 font-medium">
                    {isRtl ? cert.issuerAr : cert.issuerEn}
                  </p>
                </div>

                {/* Status & Preview Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    <span>{isRtl ? cert.statusAr : cert.statusEn}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] text-[#8c52ff] font-bold group-hover:underline">
                    <Eye size={13} />
                    <span>{isRtl ? 'معاينة' : 'Preview'}</span>
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
