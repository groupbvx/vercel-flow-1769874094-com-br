import { config } from '@/lib/config';

/**
 * Analytics Service - PostHog integration
 */

let posthog: any = null;
let initialized = false;

export class AnalyticsService {
  /**
   * Initialize PostHog
   */
  static async initialize(): Promise<void> {
    if (initialized || typeof window === 'undefined') return;
    
    if (!config.posthogKey) {
      console.log('[Analytics] PostHog key not configured');
      return;
    }

    try {
      const posthogModule = await import('posthog-js');
      posthog = posthogModule.default;
      
      posthog.init(config.posthogKey, {
        api_host: config.posthogHost || 'https://us.i.posthog.com',
        loaded: (ph: any) => {
          console.log('[Analytics] PostHog initialized');
        },
        autocapture: true,
        capture_pageview: true,
        capture_pageleave: true,
        persistence: 'localStorage',
      });

      initialized = true;
    } catch (error) {
      console.error('[Analytics] Failed to initialize PostHog:', error);
    }
  }

  /**
   * Capture custom event
   */
  static capture(eventName: string, properties?: Record<string, any>): void {
    if (posthog && initialized) {
      posthog.capture(eventName, {
        ...properties,
        siteId: config.siteId,
        siteName: config.siteName,
      });
    }
  }

  /**
   * Capture page view
   */
  static capturePageView(pageName: string, properties?: Record<string, any>): void {
    this.capture('$pageview', {
      page: pageName,
      ...properties,
    });
  }

  /**
   * Capture article view
   */
  static captureArticleView(
    articleId: string,
    title: string,
    category?: string
  ): void {
    this.capture('article_view', {
      articleId,
      title,
      category,
    });
  }

  /**
   * Capture article share
   */
  static captureArticleShare(
    articleId: string,
    title: string,
    platform: string
  ): void {
    this.capture('article_share', {
      articleId,
      title,
      platform,
    });
  }

  /**
   * Capture newsletter subscription
   */
  static captureNewsletterSubscription(email: string, source: string): void {
    this.capture('newsletter_subscribe', {
      source,
      // Don't send actual email for privacy
      hasEmail: !!email,
    });
  }

  /**
   * Capture search
   */
  static captureSearch(query: string, resultsCount: number): void {
    this.capture('search', {
      query,
      resultsCount,
    });
  }

  /**
   * Capture ad click
   */
  static captureAdSenseBannerClick(position: string, zoneId: string): void {
    this.capture('ad_click', {
      position,
      zoneId,
    });
  }

  /**
   * Capture scroll depth
   */
  static captureScrollDepth(depth: number, articleId?: string): void {
    this.capture('scroll_depth', {
      depth,
      articleId,
    });
  }

  /**
   * Identify user
   */
  static identify(userId: string, properties?: Record<string, any>): void {
    if (posthog && initialized) {
      posthog.identify(userId, properties);
    }
  }

  /**
   * Reset user
   */
  static reset(): void {
    if (posthog && initialized) {
      posthog.reset();
    }
  }
}
