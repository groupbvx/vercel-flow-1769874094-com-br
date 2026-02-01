'use client';

import { useEffect } from 'react';
import { AnalyticsService } from '@/services/AnalyticsService';

interface ArticleViewTrackerProps {
  articleId: string;
  title: string;
  category?: string;
}

export function ArticleViewTracker({ articleId, title, category }: ArticleViewTrackerProps) {
  useEffect(() => {
    // Track article view
    AnalyticsService.captureArticleView(articleId, title, category);

    // Track scroll depth
    let maxDepth = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxDepth) {
        maxDepth = scrollPercent;
        
        // Track at 25%, 50%, 75%, 100%
        if ([25, 50, 75, 100].includes(maxDepth)) {
          AnalyticsService.captureScrollDepth(maxDepth, articleId);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [articleId, title, category]);

  return null;
}
