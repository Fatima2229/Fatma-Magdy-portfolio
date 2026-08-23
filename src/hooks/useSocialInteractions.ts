import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface PostStats {
  liked: boolean;
  saved: boolean;
  likeCount: number;
}

// RATIONALE: Custom hook encapsulating all client-side social micro-interactions (like pulsing, bookmarking, share links) to keep UI components purely presentational.
export const useSocialInteractions = () => {
  const [postInteractions, setPostInteractions] = useState<Record<string, PostStats>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getPostStats = useCallback((postId: string, initialLikes = 100): PostStats => {
    return (
      postInteractions[postId] || {
        liked: false,
        saved: false,
        likeCount: initialLikes,
      }
    );
  }, [postInteractions]);

  const toggleLike = useCallback((postId: string, initialLikes = 100) => {
    setPostInteractions((prev) => {
      const current = prev[postId] || { liked: false, saved: false, likeCount: initialLikes };
      const nextLiked = !current.liked;
      const nextCount = nextLiked ? current.likeCount + 1 : Math.max(initialLikes, current.likeCount - 1);

      if (nextLiked) {
        // Trigger subtle celebration sparkle
        try {
          confetti({
            particleCount: 18,
            spread: 45,
            origin: { y: 0.8 },
            colors: ['#ec4899', '#f43f5e', '#a855f7', '#fb7185'],
            disableForReducedMotion: true,
          });
        } catch {
          // safe fallback
        }
      }

      return {
        ...prev,
        [postId]: {
          ...current,
          liked: nextLiked,
          likeCount: nextCount,
        },
      };
    });
  }, []);

  const toggleSave = useCallback((postId: string, initialLikes = 100) => {
    setPostInteractions((prev) => {
      const current = prev[postId] || { liked: false, saved: false, likeCount: initialLikes };
      return {
        ...prev,
        [postId]: {
          ...current,
          saved: !current.saved,
        },
      };
    });
  }, []);

  const sharePost = useCallback((postId: string, postTitle: string) => {
    const url = `${window.location.origin}${window.location.pathname}#project-${postId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedId(postId);
        setTimeout(() => setCopiedId(null), 2500);
      });
    } else if (navigator.share) {
      navigator.share({
        title: postTitle,
        url,
      }).catch(() => {
        // user aborted share
      });
    }
  }, []);

  return {
    getPostStats,
    toggleLike,
    toggleSave,
    sharePost,
    copiedId,
  };
};
