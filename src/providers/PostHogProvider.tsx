import { useEffect, ReactNode } from 'react'
import posthog from 'posthog-js'
import { POSTHOG_CONFIG } from '@/lib/constants'

interface PostHogProviderProps {
  children: ReactNode
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    if (POSTHOG_CONFIG.key && typeof window !== 'undefined') {
      posthog.init(POSTHOG_CONFIG.key, {
        api_host: POSTHOG_CONFIG.host,
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        persistence: 'localStorage',
        loaded: (posthog) => {
          if (import.meta.env.DEV) {
            posthog.debug()
          }
        },
      })
    }
  }, [])

  return <>{children}</>
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (POSTHOG_CONFIG.key && typeof window !== 'undefined') {
    posthog.capture(eventName, properties)
  }
}

export function identifyUser(userId: string, traits?: Record<string, unknown>) {
  if (POSTHOG_CONFIG.key && typeof window !== 'undefined') {
    posthog.identify(userId, traits)
  }
}
