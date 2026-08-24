import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { navItems } from '../../data/portfolioData';
import { LanguageToggle } from './LanguageToggle';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-[#8c52ff]/15 shadow-xs'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
            aria-label="Fatma Magdy - Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#8c52ff]/30 shadow-2xs group-hover:scale-105 transition-transform duration-300 bg-white shrink-0">
              <img
                src="/logo.png"
                alt="Fatma Magdy Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#0e1a36] font-editorial leading-none group-hover:text-[#8c52ff] transition-colors whitespace-nowrap">
                {isRtl ? 'فاطمة مجدي' : 'Fatma Magdy'}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#8c52ff] font-semibold tracking-wider uppercase mt-1 whitespace-nowrap">
                {isRtl ? 'أخصائية سوشيال ميديا ومحتوى' : 'Social & Content Specialist'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-[#e6d8f8] shadow-2xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-2.5 2xl:px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0e1a36] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#8c52ff] hover:bg-[#f6f0fc]'
                  }`}
                >
                  {isRtl ? item.labelAr : item.labelEn}
                </a>
              );
            })}
          </nav>

          {/* Actions: Lang Switcher + CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageToggle className="whitespace-nowrap shrink-0" />

            <div className="hidden sm:block">
              <Button
                as="a"
                href="#contact"
                variant="primary"
                size="sm"
                className="whitespace-nowrap font-bold"
                icon={<ArrowUpRight size={14} />}
                iconPosition="right"
              >
                {t('nav.letsTalk')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/80 border border-[#e6d8f8] text-[#0e1a36] xl:hidden hover:bg-[#f6f0fc] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0b1124]/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed top-20 inset-x-4 max-w-md mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-[#e6d8f8] space-y-4 animate-scale-up">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0e1a36] text-white font-bold'
                        : 'text-slate-700 hover:bg-[#f6f0fc] hover:text-[#8c52ff]'
                    }`}
                  >
                    {isRtl ? item.labelAr : item.labelEn}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Button
                as="a"
                href="#contact"
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.letsTalk')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
