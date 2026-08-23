import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language between Arabic and English"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 hover:bg-[#f6f0fc] text-[#0e1a36] hover:text-[#8c52ff] border border-[#e6d8f8] shadow-2xs transition-all duration-300 active:scale-95 cursor-pointer ${className}`}
    >
      <Globe size={14} className="text-[#8c52ff]" />
      <span className="font-bold">{language === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
};
