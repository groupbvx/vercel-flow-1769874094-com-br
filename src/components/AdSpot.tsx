'use client';

import { useRef, useEffect } from 'react';
import { AnalyticsService } from '@/services/AnalyticsService';
import { cn } from '@/lib/utils';

export type AdPosition = 'header' | 'sidebar' | 'in-content' | 'footer' | 'sticky-bottom';

interface AdSpotProps {
  position: AdPosition;
  zoneId?: string;
  className?: string;
}

// Try to import config - handle both old and new formats
let reviveConfig: { url?: string; id?: string; zones?: Record<string, string> } = { zones: {} };
let config: Record<string, string> = {};

try {
  // New format with separate reviveConfig
  const configModule = require('@/lib/config');
  if (configModule.reviveConfig) {
    reviveConfig = configModule.reviveConfig;
    config = configModule.config || {};
  } else if (configModule.config) {
    // Old format with flat config
    config = configModule.config;
    reviveConfig = {
      id: config.reviveId,
      url: config.reviveUrl,
      zones: {
        header: config.reviveZoneHeader,
        sidebar: config.reviveZoneSidebar,
        inArticle1: config.reviveZoneInArticle1,
        inArticle2: config.reviveZoneInArticle2,
        stickyFooter: config.reviveZoneStickyFooter,
      }
    };
  }
} catch (e) {
  console.warn('AdSpot: Could not load config');
}

/**
 * AdSpot - Componente para exibição de anúncios Revive
 * Supports both old flat config and new structured reviveConfig
 */
export function AdSpot({ position, zoneId, className = '' }: AdSpotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reviveId = reviveConfig.id || config.reviveId || '';

  // Map position to zoneId - supports both config formats
  const getZoneId = () => {
    if (zoneId && zoneId.length > 0 && !zoneId.includes('ZONE_ID')) {
      return zoneId;
    }
    
    const zones = reviveConfig.zones || {};
    
    switch (position) {
      case 'header':
        return zones.header || config.reviveZoneHeader || '';
      case 'sidebar':
        return zones.sidebar || config.reviveZoneSidebar || '';
      case 'in-content':
        return zones.inArticle1 || config.reviveZoneInArticle1 || '';
      case 'sticky-bottom':
        return zones.stickyFooter || config.reviveZoneStickyFooter || '';
      default:
        return zones.header || config.reviveZoneHeader || '';
    }
  };

  const effectiveZoneId = getZoneId();

  // Track ad clicks
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link) {
        AnalyticsService.captureAdSenseBannerClick(position, effectiveZoneId);
      }
    };

    container.addEventListener('click', handleClick, true);

    return () => {
      container.removeEventListener('click', handleClick, true);
    };
  }, [position, effectiveZoneId]);

  const getPositionStyles = () => {
    switch (position) {
      case 'header':
        return 'min-h-[90px]';
      case 'sidebar':
        return 'min-h-[250px]';
      case 'in-content':
        return 'min-h-[90px] my-8';
      case 'sticky-bottom':
        return 'fixed bottom-0 left-0 right-0 min-h-[50px] z-50 bg-white shadow-lg border-t';
      default:
        return '';
    }
  };

  // Don't render if Revive not configured
  if (!reviveId || !effectiveZoneId) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex items-center justify-center bg-gray-50 overflow-hidden',
        getPositionStyles(),
        className
      )}
      data-bvx-track={`AD_VIEW_${position.toUpperCase().replace(/-/g, '_')}`}
    >
      <ins
        className="adsbyrevive"
        data-revive-zoneid={effectiveZoneId}
        data-revive-id={reviveId}
      />
    </div>
  );
}
