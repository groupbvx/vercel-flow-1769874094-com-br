import posthog from 'posthog-js'
import { POSTHOG_CONFIG } from '@/lib/constants'

let isInitialized = false

export function initPostHog(): void {
  if (isInitialized || !POSTHOG_CONFIG.key) return
  
  posthog.init(POSTHOG_CONFIG.key, {
    api_host: POSTHOG_CONFIG.host,
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,
    persistence: 'localStorage',
    loaded: () => {
      isInitialized = true
    },
  })
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (!POSTHOG_CONFIG.key) return
  posthog.capture(eventName, properties)
}

export function trackPageView(pageName: string, properties?: Record<string, unknown>): void {
  if (!POSTHOG_CONFIG.key) return
  posthog.capture('$pageview', {
    $current_url: window.location.href,
    page_name: pageName,
    ...properties,
  })
}

export function trackArticleView(articleId: string, articleTitle: string, category: string): void {
  trackEvent('article_view', {
    article_id: articleId,
    article_title: articleTitle,
    category,
  })
}

export function trackNewsletterSubscribe(source: string): void {
  trackEvent('newsletter_subscribe', { source })
}

export function trackSearch(query: string, resultsCount: number): void {
  trackEvent('search', {
    query,
    results_count: resultsCount,
  })
}

export function trackShare(platform: string, articleId: string): void {
  trackEvent('article_share', {
    platform,
    article_id: articleId,
  })
}

export function identifyUser(userId: string, properties?: Record<string, unknown>): void {
  if (!POSTHOG_CONFIG.key) return
  posthog.identify(userId, properties)
}

export function resetUser(): void {
  if (!POSTHOG_CONFIG.key) return
  posthog.reset()
}
