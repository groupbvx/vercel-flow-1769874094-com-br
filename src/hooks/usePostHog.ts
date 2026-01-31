'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { POSTHOG_CONFIG } from '@/lib/constants';

let initialized = false;

export function usePostHog() {
  useEffect(() => {
    if (!initialized && POSTHOG_CONFIG.key && typeof window !== 'undefined') {
      posthog.init(POSTHOG_CONFIG.key, {
        api_host: POSTHOG_CONFIG.host,
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        persistence: 'localStorage+cookie',
        loaded: () => {
          initialized = true;
        },
      });
    }
  }, []);
  
  const trackEvent = (event: string, properties?: Record<string, unknown>) => {
    if (initialized) {
      posthog.capture(event, properties);
    }
  };
  
  const identifyUser = (userId: string, properties?: Record<string, unknown>) => {
    if (initialized) {
      posthog.identify(userId, properties);
    }
  };
  
  return { trackEvent, identifyUser };
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  usePostHog();
  return <>{children}</>;
}
