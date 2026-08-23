import React from 'react';
import { ArrowUp, Mail, MapPin, Phone, Heart } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { navItems } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const { isRtl, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0a1224] text-white pt-16 pb-12 overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 overflow-hidden border border-slate-700">
                <img src="/logo.png" alt="Fatma Magdy" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-editorial text-white tracking-tight">
                  {isRtl ? 'فاطمة مجدي' : 'Fatma Magdy'}
                </h3>
                <p className="text-[11px] text-[#c4a1eb] font-semibold uppercase tracking-wider">
                  {isRtl ? 'أخصائية سوشيال ميديا ومحتوى' : 'Social & Content Specialist'}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-medium">
              <span>PLAN • CREATE • ENGAGE • GROW</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c4a1eb] mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-xs text-slate-300 hover:text-[#c4a1eb] transition-colors"
                  >
                    {isRtl ? item.labelAr : item.labelEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Sections */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c4a1eb] mb-4">
              {isRtl ? 'أقسام إضافية' : 'More Highlights'}
            </h4>
            <ul className="space-y-2.5">
              {navItems.slice(5).map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-xs text-slate-300 hover:text-[#c4a1eb] transition-colors"
                  >
                    {isRtl ? item.labelAr : item.labelEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Snippets */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c4a1eb] mb-4">
              {t('footer.connect')}
            </h4>
            <a
              href="mailto:fatimamagdy.8884@gmail.com"
              className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition-colors group"
            >
              <div className="p-1.5 rounded-lg bg-slate-800 text-[#c4a1eb] group-hover:bg-[#8c52ff]/30 transition-colors">
                <Mail size={14} />
              </div>
              <span className="truncate">fatimamagdy.8884@gmail.com</span>
            </a>

            <a
              href="https://wa.me/201154328884"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition-colors group"
            >
              <div className="p-1.5 rounded-lg bg-slate-800 text-emerald-400 group-hover:bg-emerald-950 transition-colors">
                <Phone size={14} />
              </div>
              <span dir="ltr">+20 115 432 8884</span>
            </a>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <div className="p-1.5 rounded-lg bg-slate-800 text-[#c4a1eb]">
                <MapPin size={14} />
              </div>
              <span>{isRtl ? 'القاهرة / سوهاج، مصر' : 'Cairo / Sohag, Egypt'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Fatma Magdy.</span>
            <span>{t('footer.rights')}</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[#c4a1eb]/80">
              Crafted with <Heart size={11} className="fill-[#8c52ff] text-[#8c52ff]" />
            </span>
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-[#8c52ff] text-white transition-colors text-xs font-semibold cursor-pointer"
          >
            <span>{isRtl ? 'للأعلى' : 'Back to Top'}</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
