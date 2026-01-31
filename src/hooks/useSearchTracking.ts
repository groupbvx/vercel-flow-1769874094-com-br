'use client';

import { useEffect, useRef } from 'react';
import { AnalyticsService } from '../services/AnalyticsService';

/**
 * Hook para rastrear buscas
 * Use na página de busca para rastrear automaticamente
 */
export function useSearchTracking(
  searchQuery: string | null,
  resultsCount: number,
  searchLocation: string = 'search-page'
): void {
  const lastQueryRef = useRef<string | null>(null);

  useEffect(() => {
    // Evitar rastrear a mesma query múltiplas vezes
    if (searchQuery && searchQuery.trim().length > 0 && searchQuery !== lastQueryRef.current) {
      lastQueryRef.current = searchQuery;
      AnalyticsService.captureSearchPerformed(searchQuery.trim(), resultsCount, searchLocation);
    }
  }, [searchQuery, resultsCount, searchLocation]);
}

/**
 * Helper para rastrear clique em resultado de busca
 */
export function trackSearchResultClick(
  searchQuery: string,
  resultPosition: number,
  resultTitle: string
): void {
  AnalyticsService.captureSearchResultClick(searchQuery, resultPosition, resultTitle);
}
