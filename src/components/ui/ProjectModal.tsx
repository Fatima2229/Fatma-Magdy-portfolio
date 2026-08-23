import React, { useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Award, Calendar, Layers, ExternalLink, ShieldCheck } from 'lucide-react';
import { useProjectModalStore } from '../../stores/useProjectModalStore';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from './Button';

export const ProjectModal: React.FC = () => {
  const {
    selectedProject,
    selectedCertificate,
    isProjectModalOpen,
    isCertificateModalOpen,
    closeProjectModal,
    closeCertificateModal,
  } = useProjectModalStore();

  const { isRtl, t } = useLanguage();

  const isOpen = isProjectModalOpen || isCertificateModalOpen;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProjectModal();
        closeCertificateModal();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeProjectModal, closeCertificateModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0b1124]/75 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={() => {
          closeProjectModal();
          closeCertificateModal();
        }}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-pink-100/60 z-10 max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* Close button */}
        <button
          onClick={() => {
            closeProjectModal();
            closeCertificateModal();
          }}
          aria-label={t('modal.close')}
          className="absolute top-4 end-4 p-2.5 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-600 hover:text-pink-600 transition-colors duration-200 cursor-pointer z-20"
        >
          <X size={20} />
        </button>

        {/* Project Modal Content */}
        {selectedProject && (
          <div className="space-y-6">
            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-200">
                {isRtl ? selectedProject.badgeAr : selectedProject.badgeEn}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {isRtl ? selectedProject.categoryAr : selectedProject.categoryEn}
              </span>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#131d38] font-editorial">
                {isRtl ? selectedProject.titleAr : selectedProject.titleEn}
              </h3>
              <p className="text-sm sm:text-base text-pink-600 font-medium mt-1">
                {isRtl ? selectedProject.taglineAr : selectedProject.taglineEn}
              </p>
            </div>

            {/* Summary */}
            <div className="p-5 rounded-2xl bg-[#faf9fc] border border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles size={14} className="text-pink-500" />
                {t('modal.overview')}
              </h4>
              <p>{isRtl ? selectedProject.summaryAr : selectedProject.summaryEn}</p>
            </div>

            {/* Deliverables List */}
            <div>
              <h4 className="text-sm font-bold text-[#131d38] mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-500" />
                {t('modal.deliverables')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(isRtl ? selectedProject.deliverablesAr : selectedProject.deliverablesEn).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-pink-100/70 text-slate-700 text-xs sm:text-sm font-medium shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-pink-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Used */}
            <div>
              <h4 className="text-sm font-bold text-[#131d38] mb-2.5 flex items-center gap-2">
                <Layers size={18} className="text-pink-500" />
                {t('modal.tools')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900 text-white"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="secondary"
                size="sm"
                onClick={closeProjectModal}
              >
                {t('modal.close')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                as="a"
                href="#contact"
                onClick={closeProjectModal}
              >
                {t('hero.letsConnect')}
              </Button>
            </div>
          </div>
        )}

        {/* Certificate Modal Content */}
        {selectedCertificate && (
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-lg shadow-pink-500/20 mb-3">
                <Award size={32} />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-200 mb-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>{isRtl ? selectedCertificate.categoryAr : selectedCertificate.categoryEn}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#131d38] font-editorial">
                {isRtl ? selectedCertificate.titleAr : selectedCertificate.titleEn}
              </h3>

              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {isRtl ? selectedCertificate.issuerAr : selectedCertificate.issuerEn}
              </p>
            </div>

            {/* Certificate Image Viewer if image is provided */}
            {selectedCertificate.certificateImage ? (
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden border-2 border-pink-200/80 shadow-xl bg-slate-950 p-1 group">
                  <img
                    src={selectedCertificate.certificateImage}
                    alt={isRtl ? selectedCertificate.titleAr : selectedCertificate.titleEn}
                    className="w-full h-auto max-h-[460px] object-contain rounded-xl mx-auto"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={selectedCertificate.certificateImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold flex items-center gap-2 shadow-lg hover:bg-pink-50"
                    >
                      <ExternalLink size={14} />
                      <span>{isRtl ? 'عرض الصورة بالحجم الكامل' : 'Open Full Size'}</span>
                    </a>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>
                    {isRtl
                      ? 'شهادة رسمية موثقة من بنك الطعام المصري تقديراً للجهود التطوعية والمجتمعية.'
                      : 'Official certificate issued by the Egyptian Food Bank recognizing volunteer dedication.'}
                  </span>
                </div>
              </div>
            ) : (
              /* Fallback / Verification status banner */
              <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50/50 to-purple-50/30 border border-pink-200/60 flex flex-col items-center justify-center gap-3">
                <Calendar className="text-pink-500" size={28} />
                <p className="text-sm font-semibold text-[#131d38]">
                  {isRtl ? selectedCertificate.statusAr : selectedCertificate.statusEn}
                </p>
                <p className="text-xs text-slate-500 max-w-md">
                  {isRtl
                    ? 'شهادة معتمدة موثقة ضمن المؤهلات المهنية والأكاديمية لفاطمة مجدي.'
                    : "Verified qualification documented in Fatma Magdy's professional portfolio records."}
                </p>
              </div>
            )}

            {/* Acquired Skills row */}
            {selectedCertificate.skillsAcquiredEn && (
              <div className="pt-2 text-start">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {isRtl ? 'المهارات والكفاءات المرتبطة:' : 'Key Competencies:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(isRtl
                    ? selectedCertificate.skillsAcquiredAr
                    : selectedCertificate.skillsAcquiredEn
                  )?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-center gap-3">
              <Button variant="primary" size="sm" onClick={closeCertificateModal}>
                {t('modal.close')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
