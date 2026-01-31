'use client';

import { useEffect, useRef } from 'react';
import { AnalyticsService } from '../services/AnalyticsService';

/**
 * Hook para rastrear profundidade de scroll em páginas de artigo
 * Dispara evento 'article_scroll_deep' no PostHog quando usuário rola mais de 50%
 *
 * @param articleId - ID do artigo (opcional)
 * @param articleSlug - Slug do artigo (opcional)
 * @param enabled - Se o tracking está habilitado (padrão: true)
 * @param threshold - Porcentagem de scroll necessária para disparar evento (padrão: 50)
 */
export function useScrollDepth(
  articleId?: string,
  articleSlug?: string,
  enabled: boolean = true,
  threshold: number = 50
): void {
  const hasTrackedRef = useRef(false);
  const scrollListenerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!enabled || hasTrackedRef.current || typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => {
      if (hasTrackedRef.current) {
        return;
      }

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;

      if (scrollPercentage >= threshold) {
        hasTrackedRef.current = true;

        AnalyticsService.captureArticleScrollDeep(articleId, articleSlug, scrollPercentage);

        if (scrollListenerRef.current) {
          window.removeEventListener('scroll', scrollListenerRef.current);
          scrollListenerRef.current = null;
        }
      }
    };

    // Throttle para performance
    let lastCall = 0;
    const throttledHandleScroll = () => {
      const now = Date.now();
      if (now - lastCall >= 100) {
        lastCall = now;
        handleScroll();
      }
    };

    scrollListenerRef.current = throttledHandleScroll;
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Verificar scroll inicial
    handleScroll();

    return () => {
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current);
        scrollListenerRef.current = null;
      }
    };
  }, [enabled, articleId, articleSlug, threshold]);
}
