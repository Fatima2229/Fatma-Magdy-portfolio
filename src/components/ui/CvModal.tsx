import React from 'react';
import { X, Download, ExternalLink, FileText, ShieldCheck } from 'lucide-react';
import { useCvModal } from '../../hooks/useCvModal';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from './Button';

// RATIONALE: High-end luxury modal for interactive CV review, download, and fullscreen inspection. UI-only component consuming useCvModal hook.
export const CvModal: React.FC = () => {
  const { isOpen, closeModal, downloadCv, openCvExternal, cvUrl } = useCvModal();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Backdrop with smooth blur */}
      <div
        className="fixed inset-0 bg-[#0b1124]/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-[#8c52ff]/25 z-10 flex flex-col overflow-hidden animate-scale-up">
        {/* Modal Header */}
        <div className="px-3.5 sm:px-6 py-3 sm:py-4 border-b border-slate-100/90 flex items-center justify-between gap-2 sm:gap-3 bg-gradient-to-r from-white via-[#faf7fd] to-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#8c52ff] to-[#6f38b8] text-white flex items-center justify-center shadow-md shadow-[#8c52ff]/20 shrink-0">
              <FileText size={18} className="sm:w-5 sm:h-5" />
            </div>
            <div className="text-start min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="text-sm sm:text-lg font-bold text-[#0e1a36] font-editorial leading-tight truncate">
                  {t('cv.modalTitle')}
                </h3>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f6f0fc] text-[#733cd6] border border-[#e6d8f8]">
                  <ShieldCheck size={11} className="text-[#8c52ff]" />
                  <span>{t('cv.badge')}</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate max-w-full mt-0.5">
                {t('cv.modalSubtitle')}
              </p>
            </div>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="hidden sm:block">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadCv}
                className="font-bold text-xs"
                icon={<Download size={14} />}
                iconPosition="left"
              >
                {t('cv.download')}
              </Button>
            </div>

            <button
              onClick={openCvExternal}
              title={t('cv.openNewTab')}
              aria-label={t('cv.openNewTab')}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-[#f6f0fc] text-slate-700 hover:text-[#8c52ff] border border-slate-200/80 transition-colors cursor-pointer"
            >
              <ExternalLink size={16} />
            </button>

            <button
              onClick={closeModal}
              title={t('cv.close')}
              aria-label={t('cv.close')}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200/80 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 w-full bg-slate-100/70 p-2 sm:p-4 overflow-hidden relative flex flex-col">
          <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-inner flex flex-col">
            <object
              data={cvUrl}
              type="application/pdf"
              className="w-full h-full min-h-full flex-1"
            >
              <iframe
                src={`${cvUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0 flex-1"
                title="Fatma Magdy CV"
              >
                {/* Fallback container for devices that do not support inline PDF iframe rendering */}
                <div className="flex flex-col items-center justify-center p-8 text-center h-full space-y-4 bg-white">
                  <div className="w-16 h-16 rounded-full bg-[#f6f0fc] text-[#8c52ff] flex items-center justify-center">
                    <FileText size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-[#0e1a36]">
                    {t('cv.modalTitle')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
                    {t('cv.fallbackNotice')}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <Button variant="primary" size="md" onClick={openCvExternal}>
                      {t('cv.openNewTab')}
                    </Button>
                    <Button variant="outline" size="md" onClick={downloadCv}>
                      {t('cv.download')}
                    </Button>
                  </div>
                </div>
              </iframe>
            </object>
          </div>
        </div>

        {/* Mobile Action Bar Footer */}
        <div className="sm:hidden px-4 py-3 border-t border-slate-100 bg-white flex items-center justify-between gap-2 shrink-0">
          <Button
            variant="primary"
            size="sm"
            onClick={downloadCv}
            className="flex-1 text-xs font-bold"
            icon={<Download size={14} />}
            iconPosition="left"
          >
            {t('cv.download')}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={openCvExternal}
            className="flex-1 text-xs font-bold"
            icon={<ExternalLink size={14} />}
            iconPosition="left"
          >
            {t('cv.openNewTab')}
          </Button>
        </div>
      </div>
    </div>
  );
};
