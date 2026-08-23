import { create } from 'zustand';
import { StoryItem } from '../types/portfolio';

interface StoryState {
  activeStory: StoryItem | null;
  activeSlideIndex: number;
  isStoryOpen: boolean;
  openStory: (story: StoryItem, initialIndex?: number) => void;
  closeStory: () => void;
  nextSlide: () => void;
  prevSlide: () => void;
  setActiveSlideIndex: (index: number) => void;
}

// RATIONALE: Centralized Zustand store for interactive social story modal state, allowing smooth cross-component story triggers.
export const useStoryStore = create<StoryState>((set, get) => ({
  activeStory: null,
  activeSlideIndex: 0,
  isStoryOpen: false,

  openStory: (story: StoryItem, initialIndex = 0) =>
    set({
      activeStory: story,
      activeSlideIndex: initialIndex,
      isStoryOpen: true,
    }),

  closeStory: () =>
    set({
      activeStory: null,
      activeSlideIndex: 0,
      isStoryOpen: false,
    }),

  nextSlide: () => {
    const { activeStory, activeSlideIndex } = get();
    if (!activeStory) return;
    if (activeSlideIndex < activeStory.slides.length - 1) {
      set({ activeSlideIndex: activeSlideIndex + 1 });
    } else {
      // Close when finished all slides in story
      set({ isStoryOpen: false, activeStory: null, activeSlideIndex: 0 });
    }
  },

  prevSlide: () => {
    const { activeSlideIndex } = get();
    if (activeSlideIndex > 0) {
      set({ activeSlideIndex: activeSlideIndex - 1 });
    }
  },

  setActiveSlideIndex: (index: number) => set({ activeSlideIndex: index }),
}));
