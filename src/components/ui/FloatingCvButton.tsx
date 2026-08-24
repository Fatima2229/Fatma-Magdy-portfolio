import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { useCvModal } from '../../hooks/useCvModal';
import { useLanguage } from '../../hooks/useLanguage';

// RATIONALE: Floating action button providing ubiquitous 1-click access to the CV modal across all scroll positions.
export const FloatingCvButton: React.FC = () => {
  const { openModal } = useCvModal();
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 start-6 z-30 animate-fade-in group">
      <button
        onClick={openModal}
        aria-label={t('cv.floatingButton')}
        className="relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#0e1a36] via-[#1b2a52] to-[#0e1a36] text-white shadow-xl hover:shadow-2xl shadow-[#8c52ff]/25 border border-[#8c52ff]/40 hover:border-[#8c52ff] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer"
      >
        {/* Glowing pulse indicator */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c52ff] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#a77cd6]" />
        </span>

        <div className="w-5 h-5 rounded-md bg-[#8c52ff]/30 text-[#e9dcf7] flex items-center justify-center">
          <FileText size={13} className="stroke-[2.5]" />
        </div>

        <span className="text-xs sm:text-sm font-bold tracking-wide">
          {t('cv.floatingButton')}
        </span>

        <Sparkles size={13} className="text-[#c4a1eb] hidden sm:inline-block animate-pulse" />
      </button>
    </div>
  );
};
