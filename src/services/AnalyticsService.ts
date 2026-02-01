'use client';

import { config } from '../lib/config';

/**
 * Tipos de eventos de analytics
 */
export type AnalyticsEvent =
  | 'page_view'
  | 'article_view'
  | 'article_scroll_deep'
  | 'article_share'
  | 'newsletter_subscribe'
  | 'ad_click'
  | 'search'
  | 'tool_use'
  | 'contact_submit'
  | 'scroll_depth';

/**
 * Propriedades do evento
 */
export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

let posthog: any = null;
let initialized = false;
let queue: Array<{ event: string; properties: EventProperties }> = [];

/**
 * Inicializa o PostHog
 */
export async function initialize(): Promise<void> {
  if (initialized || !config.posthogKey || typeof window === 'undefined') return;

  try {
    const posthogModule = await import('posthog-js');
    posthog = posthogModule.default;

    posthog.init(config.posthogKey, {
      api_host: config.posthogHost,
      persistence: 'localStorage',
      autocapture: true,
      capture_pageview: false,
      loaded: () => {
        initialized = true;
        flushQueue();
        captureUTMParams();
      },
    });
  } catch (error) {
    console.warn('[AnalyticsService] PostHog não disponível:', error);
  }
}

/**
 * Captura evento
 */
export function capture(event: AnalyticsEvent | string, properties: EventProperties = {}): void {
  const enrichedProps = {
    ...properties,
    site_id: config.siteId,
    website_id: config.siteId,
    site_name: config.siteName,
    timestamp: new Date().toISOString(),
  };

  if (!initialized) {
    queue.push({ event, properties: enrichedProps });
    return;
  }

  posthog?.capture(event, enrichedProps);
}

/**
 * Captura visualização de página
 */
export function capturePageView(path?: string): void {
  if (typeof window === 'undefined') return;
  
  capture('page_view', {
    path: path || window.location.pathname,
    url: window.location.href,
    referrer: document.referrer,
    title: document.title,
  });
}

/**
 * Captura visualização de artigo
 * Supports both old signature (object) and new signature (separate params)
 */
export function captureArticleView(
  articleOrId: string | { slug: string; title: string; category?: string },
  title?: string,
  category?: string
): void {
  if (typeof articleOrId === 'object') {
    // Object signature
    capture('article_view', {
      article_slug: articleOrId.slug,
      article_title: articleOrId.title,
      article_category: articleOrId.category,
    });
  } else {
    // Separate params signature
    capture('article_view', {
      article_id: articleOrId,
      article_title: title,
      article_category: category,
    });
  }
}

/**
 * Captura scroll depth em artigo
 */
export function captureScrollDepth(depth: number, articleId?: string): void {
  if (typeof window === 'undefined') return;
  
  capture('scroll_depth', {
    scroll_percentage: depth,
    article_id: articleId,
    page_url: window.location.pathname,
  });
}

/**
 * Captura scroll profundo em artigo (alias)
 */
export function captureArticleScrollDeep(
  articleId?: string,
  articleSlug?: string,
  scrollPercentage: number = 50
): void {
  if (typeof window === 'undefined') return;
  
  capture('article_scroll_deep', {
    article_id: articleId,
    article_slug: articleSlug,
    scroll_percentage: Math.round(scrollPercentage),
    page_url: window.location.pathname,
    page_full_url: window.location.href,
  });
}

/**
 * Captura compartilhamento de artigo
 */
export function captureArticleShare(
  articleId: string,
  title: string,
  platform: string
): void {
  capture('article_share', {
    article_id: articleId,
    article_title: title,
    share_platform: platform,
  });
}

/**
 * Captura clique em banner de patrocínio
 */
export function captureSponsorBannerClick(
  sponsorLocation: string,
  sponsorId?: string,
  sponsorName?: string
): void {
  if (typeof window === 'undefined') return;
  
  capture('sponsor_banner_clicked', {
    page_url: window.location.pathname,
    page_full_url: window.location.href,
    sponsor_location: sponsorLocation,
    sponsor_id: sponsorId,
    sponsor_name: sponsorName,
  });
}

/**
 * Captura clique em banner AdSense/Revive
 */
export function captureAdSenseBannerClick(adsLocation: string, adsSlot?: string): void {
  if (typeof window === 'undefined') return;
  
  capture('adsense_banner_clicked', {
    page_url: window.location.pathname,
    page_full_url: window.location.href,
    ads_location: adsLocation,
    ads_slot: adsSlot,
  });
}

/**
 * Captura uso de ferramenta/calculadora
 */
export function captureToolUsed(
  toolName: string,
  toolType: string = 'calculator',
  toolCategory: string = 'general',
  toolLocation?: string
): void {
  if (typeof window === 'undefined') return;
  
  capture('tool_used', {
    tool_name: toolName,
    tool_type: toolType,
    tool_category: toolCategory,
    tool_location: toolLocation || window.location.pathname,
  });
}

/**
 * Captura busca realizada
 */
export function captureSearchPerformed(
  searchQuery: string,
  searchResultsCount: number,
  searchLocation: string = 'search-page'
): void {
  capture('search_performed', {
    search_query: searchQuery,
    search_results_count: searchResultsCount,
    search_location: searchLocation,
  });
}

/**
 * Captura clique em resultado de busca
 */
export function captureSearchResultClick(
  searchQuery: string,
  resultPosition: number,
  resultTitle: string
): void {
  capture('search_result_clicked', {
    search_query: searchQuery,
    result_position: resultPosition,
    result_title: resultTitle,
  });
}

/**
 * Captura inscrição em newsletter
 */
export function captureNewsletterSubscribe(source: string, email?: string): void {
  capture('newsletter_subscribe', {
    source,
    email_domain: email ? email.split('@')[1] : undefined,
  });
}

function captureUTMParams(): void {
  if (typeof window === 'undefined') return;
  
  const params = new URLSearchParams(window.location.search);
  const utmParams: EventProperties = {};

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((param) => {
    const value = params.get(param);
    if (value) utmParams[param] = value;
  });

  if (Object.keys(utmParams).length > 0) {
    posthog?.people?.set(utmParams);
  }
}

function flushQueue(): void {
  while (queue.length > 0) {
    const { event, properties } = queue.shift()!;
    posthog?.capture(event, properties);
  }
}

export function isReady(): boolean {
  return initialized;
}

// Export como objeto para compatibilidade
export const AnalyticsService = {
  initialize,
  capture,
  capturePageView,
  captureArticleView,
  captureScrollDepth,
  captureArticleScrollDeep,
  captureArticleShare,
  captureSponsorBannerClick,
  captureAdSenseBannerClick,
  captureToolUsed,
  captureSearchPerformed,
  captureSearchResultClick,
  captureNewsletterSubscribe,
  isReady,
};
