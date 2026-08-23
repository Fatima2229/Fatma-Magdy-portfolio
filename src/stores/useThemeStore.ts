import { create } from 'zustand';
import i18n from '../i18n/i18n';
import { Language } from '../types/portfolio';

interface ThemeState {
  language: Language;
  direction: 'rtl' | 'ltr';
  mobileMenuOpen: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

// RATIONALE: Manage global language state and direction synchronizing with i18n and HTML document root attributes (defaults to Arabic RTL).
export const useThemeStore = create<ThemeState>((set, get) => {
  const initialLang: Language = (typeof window !== 'undefined' && localStorage.getItem('i18nextLng') === 'en') ? 'en' : 'ar';
  const initialDir = initialLang === 'ar' ? 'rtl' : 'ltr';

  return {
    language: initialLang,
    direction: initialDir,
    mobileMenuOpen: false,

    setLanguage: (lang: Language) => {
      i18n.changeLanguage(lang);
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = dir;
      document.documentElement.lang = lang;
      localStorage.setItem('i18nextLng', lang);
      set({ language: lang, direction: dir });
    },

    toggleLanguage: () => {
      const nextLang = get().language === 'ar' ? 'en' : 'ar';
      get().setLanguage(nextLang);
    },

    setMobileMenuOpen: (open: boolean) => set({ mobileMenuOpen: open }),
    toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  };
});
