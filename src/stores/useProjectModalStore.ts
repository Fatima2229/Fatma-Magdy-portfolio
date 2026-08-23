import { create } from 'zustand';
import { ProjectItem, CertificationItem } from '../types/portfolio';

interface ProjectModalState {
  selectedProject: ProjectItem | null;
  selectedCertificate: CertificationItem | null;
  isProjectModalOpen: boolean;
  isCertificateModalOpen: boolean;
  openProjectModal: (project: ProjectItem) => void;
  closeProjectModal: () => void;
  openCertificateModal: (cert: CertificationItem) => void;
  closeCertificateModal: () => void;
}

export const useProjectModalStore = create<ProjectModalState>((set) => ({
  selectedProject: null,
  selectedCertificate: null,
  isProjectModalOpen: false,
  isCertificateModalOpen: false,

  openProjectModal: (project: ProjectItem) =>
    set({ selectedProject: project, isProjectModalOpen: true }),
  closeProjectModal: () =>
    set({ selectedProject: null, isProjectModalOpen: false }),

  openCertificateModal: (cert: CertificationItem) =>
    set({ selectedCertificate: cert, isCertificateModalOpen: true }),
  closeCertificateModal: () =>
    set({ selectedCertificate: null, isCertificateModalOpen: false }),
}));
