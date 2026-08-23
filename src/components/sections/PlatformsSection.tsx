import React from 'react';
import { BarChart3, Palette } from 'lucide-react';
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  LinkedInIcon,
} from '../ui/SocialIcons';
import { useLanguage } from '../../hooks/useLanguage';
import { platformsData } from '../../data/portfolioData';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';

export const PlatformsSection: React.FC = () => {
  const { isRtl, t } = useLanguage();

  const getPlatformIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'Instagram':
        return <InstagramIcon size={22} style={{ color }} />;
      case 'Facebook':
        return <FacebookIcon size={22} style={{ color }} />;
      case 'TikTok':
        return <TikTokIcon size={22} style={{ color }} />;
      case 'Linkedin':
        return <LinkedInIcon size={22} style={{ color }} />;
      case 'WhatsApp':
        return <WhatsAppIcon size={22} style={{ color }} />;
      case 'Palette':
        return <Palette size={22} style={{ color }} />;
      case 'BarChart3':
        return <BarChart3 size={22} style={{ color }} />;
      default:
        return <InstagramIcon size={22} style={{ color }} />;
    }
  };

  return (
    <section id="platforms" className="py-20 md:py-24 relative bg-[#fafafc] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t('platforms.badge')}
          title={t('platforms.title')}
          subtitle={t('platforms.subtitle')}
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformsData.map((platform) => (
            <GlassCard
              key={platform.id}
              className="bg-white p-6 flex flex-col justify-between space-y-5 border border-slate-200/80 hover:border-[#e6d8f8] hover:shadow-xl transition-all duration-300 rounded-3xl"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-100 shadow-2xs"
                    style={{ backgroundColor: platform.bgGlow }}
                  >
                    {getPlatformIcon(platform.icon, platform.color)}
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-50 text-slate-700 border border-slate-200">
                    {isRtl ? platform.badgeAr : platform.badgeEn}
                  </span>
                </div>

                {/* Title & Role */}
                <div>
                  <h3 className="text-lg font-bold text-[#0e1a36] font-editorial">
                    {platform.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#8c52ff] mt-0.5">
                    {isRtl ? platform.roleAr : platform.roleEn}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isRtl ? platform.descriptionAr : platform.descriptionEn}
                </p>

                {/* Key Formats Pills */}
                {platform.formatsEn && (
                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      {isRtl ? 'صيغ المحتوى الأساسية:' : 'Primary Formats:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(isRtl ? platform.formatsAr : platform.formatsEn).map((fmt, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700"
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
