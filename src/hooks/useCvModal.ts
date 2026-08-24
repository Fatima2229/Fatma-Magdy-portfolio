import { useCallback, useEffect } from 'react';
import { useCvModalStore } from '../stores/useCvModalStore';

// RATIONALE: Encapsulate all CV operations, keyboard listening, and file access logic in a custom hook to keep components strictly UI-focused.
export const useCvModal = () => {
  const { isCvModalOpen, openCvModal, closeCvModal } = useCvModalStore();
  const cvUrl = '/CV.pdf';

  const downloadCv = useCallback(() => {
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Fatma_Magdy_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [cvUrl]);

  const openCvExternal = useCallback(() => {
    window.open(cvUrl, '_blank', 'noopener,noreferrer');
  }, [cvUrl]);

  // RATIONALE: Handle ESC key and prevent body scroll when modal is open
  useEffect(() => {
    if (!isCvModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCvModal();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCvModalOpen, closeCvModal]);

  return {
    isOpen: isCvModalOpen,
    openModal: openCvModal,
    closeModal: closeCvModal,
    downloadCv,
    openCvExternal,
    cvUrl,
  };
};
