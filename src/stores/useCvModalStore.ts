import { create } from 'zustand';

// RATIONALE: Manage CV modal global visibility with a dedicated lightweight Zustand store to enable opening from Hero, Floating button, or future navigation triggers without prop drilling.
interface CvModalState {
  isCvModalOpen: boolean;
  openCvModal: () => void;
  closeCvModal: () => void;
}

export const useCvModalStore = create<CvModalState>((set) => ({
  isCvModalOpen: false,
  openCvModal: () => set({ isCvModalOpen: true }),
  closeCvModal: () => set({ isCvModalOpen: false }),
}));
