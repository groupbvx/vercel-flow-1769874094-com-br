/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_ID: string
  readonly VITE_SITE_NAME: string
  readonly VITE_SITE_URL: string
  readonly VITE_SITE_DESCRIPTION: string
  readonly VITE_SITE_KEYWORDS: string
  readonly VITE_API_URL: string
  readonly VITE_CONTENT_API_BASE_URL: string
  readonly VITE_LOCALE: string
  readonly VITE_POSTHOG_KEY: string
  readonly VITE_POSTHOG_HOST: string
  readonly VITE_REVIVE_URL: string
  readonly VITE_REVIVE_ID: string
  readonly VITE_REVIVE_ZONE_HEADER: string
  readonly VITE_REVIVE_ZONE_SIDEBAR: string
  readonly VITE_REVIVE_ZONE_INARTICLE_1: string
  readonly VITE_REVIVE_ZONE_INARTICLE_2: string
  readonly VITE_REVIVE_ZONE_STICKY_FOOTER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
