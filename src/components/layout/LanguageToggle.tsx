import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language between Arabic and English"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 hover:bg-[#fdf2f8] text-[#131d38] hover:text-[#db2777] border border-pink-100 shadow-2xs transition-all duration-300 active:scale-95 cursor-pointer ${className}`}
    >
      <Globe size={14} className="text-[#f472b6]" />
      <span className="font-bold">{language === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
};
