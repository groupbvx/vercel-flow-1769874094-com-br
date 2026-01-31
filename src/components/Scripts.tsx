'use client';

import { useEffect } from 'react';
import { config } from '@/lib/config';
import { AnalyticsService } from '@/services/AnalyticsService';

/**
 * Scripts Component - Inicializa PostHog e Revive Ads
 * DEVE ser incluído no layout principal
 */
export function Scripts() {
  useEffect(() => {
    // 1. Initialize Analytics (PostHog)
    if (config.posthogKey) {
      AnalyticsService.initialize().catch((err) =>
        console.warn('Failed to init analytics:', err)
      );
    }

    // 2. Initialize Revive Ads
    if (config.reviveUrl && config.reviveId) {
      initReviveAds();
    }
  }, []);

  return null;
}

/**
 * Inicializa o Revive Ads carregando o script dinamicamente
 */
function initReviveAds() {
  if (typeof window === 'undefined') return;

  // Evitar carregar múltiplas vezes
  if (document.getElementById('revive-async-script')) return;

  const script = document.createElement('script');
  script.id = 'revive-async-script';
  script.async = true;
  script.src = `${config.reviveUrl}/www/delivery/asyncjs.php`;

  script.onload = () => {
    console.log('[Scripts] Revive Ads loaded');
    // Trigger refresh para zonas já renderizadas
    if ((window as any).reviveAsync) {
      Object.keys((window as any).reviveAsync).forEach((id) => {
        (window as any).reviveAsync[id].refresh();
      });
    }
  };

  document.head.appendChild(script);
}
