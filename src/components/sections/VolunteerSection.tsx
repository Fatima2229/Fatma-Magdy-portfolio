import React from 'react';
import { HeartHandshake, Utensils, Package, Users, MapPin, Clock, Award, Sparkles, Eye } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { volunteerData, certificationsData } from '../../data/portfolioData';
import { useProjectModalStore } from '../../stores/useProjectModalStore';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';

export const VolunteerSection: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const { openCertificateModal } = useProjectModalStore();

  const getVolunteerIcon = (iconType: string) => {
    switch (iconType) {
      case 'charity':
        return <HeartHandshake size={22} className="text-pink-600" />;
      case 'food':
        return <Utensils size={22} className="text-emerald-600" />;
      case 'aid':
        return <Package size={22} className="text-rose-600" />;
      case 'community':
        return <Users size={22} className="text-indigo-600" />;
      default:
        return <HeartHandshake size={22} className="text-pink-600" />;
    }
  };

  const handleOpenFoodBankCert = () => {
    const foodBankCert = certificationsData.find((c) => c.id === 'food-bank-cert');
    if (foodBankCert) {
      openCertificateModal(foodBankCert);
    }
  };

  return (
    <section id="volunteer" className="py-20 md:py-24 relative bg-[#fafafc] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t('volunteer.badge')}
          title={t('volunteer.title')}
          subtitle={t('volunteer.subtitle')}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {volunteerData.map((item) => {
            const hasCert = Boolean(item.certificateImage);

            return (
              <GlassCard
                key={item.id}
                className={`bg-white p-6 sm:p-7 flex flex-col justify-between space-y-4 rounded-3xl border transition-all duration-300 ${
                  hasCert
                    ? 'border-emerald-300 ring-2 ring-emerald-500/10 shadow-md hover:shadow-xl'
                    : 'border-slate-200/80 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-3 rounded-2xl bg-pink-50 border border-pink-100 shrink-0">
                      {getVolunteerIcon(item.iconType)}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                      <Clock size={12} className="text-slate-400" />
                      <span>{isRtl ? item.durationAr : item.durationEn}</span>
                    </div>
                  </div>

                  {/* Org & Role */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0f172a] font-editorial">
                      {isRtl ? item.organizationAr : item.organizationEn}
                    </h3>
                    <p className="text-xs font-semibold text-pink-600 mt-0.5">
                      {isRtl ? item.roleAr : item.roleEn}
                    </p>
                  </div>

                  {/* Certificate preview card if available */}
                  {hasCert && item.certificateImage && (
                    <div
                      onClick={handleOpenFoodBankCert}
                      className="relative rounded-2xl overflow-hidden border border-emerald-200 bg-slate-900 group/cert cursor-pointer"
                    >
                      <img
                        src={item.certificateImage}
                        alt="Egyptian Food Bank Certificate"
                        className="w-full h-28 object-cover object-center group-hover/cert:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-between p-2.5">
                        <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                          <Award size={12} />
                          {isRtl ? 'شهادة التقدير الرسمية' : 'Official Certificate'}
                        </span>
                        <span className="text-[10px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Eye size={11} />
                          {isRtl ? 'تكبير الشهادة' : 'Zoom'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {isRtl ? item.descriptionAr : item.descriptionEn}
                  </p>

                  {/* Impact Pill if available */}
                  {(item.impactEn || item.impactAr) && (
                    <div className="p-2.5 rounded-xl bg-pink-50/70 border border-pink-100 text-[11px] font-semibold text-pink-900 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-pink-600 shrink-0" />
                      <span>{isRtl ? item.impactAr : item.impactEn}</span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <MapPin size={12} />
                    {isRtl ? item.locationAr : item.locationEn}
                  </span>

                  {item.hasCertificate && (
                    <button
                      onClick={handleOpenFoodBankCert}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 cursor-pointer"
                    >
                      <Award size={12} />
                      <span>{isRtl ? 'معاينة الشهادة الموثقة' : 'View Certificate'}</span>
                    </button>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
