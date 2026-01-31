/**
 * Configuração centralizada do site (Next.js)
 * Todas as variáveis de ambiente em um único lugar
 * 
 * IMPORTANTE: Usa NEXT_PUBLIC_* para variáveis acessíveis no cliente
 */

export const config = {
  // Site - CRÍTICO para isolamento
  siteId: process.env.NEXT_PUBLIC_SITE_ID || '',
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Site',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '',
  siteKeywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS || '',

  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
  contentApiUrl: process.env.NEXT_PUBLIC_CONTENT_API_BASE_URL || '',

  // Analytics (PostHog)
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',

  // Ads (Revive)
  reviveUrl: process.env.NEXT_PUBLIC_REVIVE_URL || '',
  reviveId: process.env.NEXT_PUBLIC_REVIVE_ID || '',
  reviveZoneHeader: process.env.NEXT_PUBLIC_REVIVE_ZONE_HEADER || '',
  reviveZoneSidebar: process.env.NEXT_PUBLIC_REVIVE_ZONE_SIDEBAR || '',
  reviveZoneInArticle1: process.env.NEXT_PUBLIC_REVIVE_ZONE_INARTICLE_1 || '',
  reviveZoneInArticle2: process.env.NEXT_PUBLIC_REVIVE_ZONE_INARTICLE_2 || '',
  reviveZoneStickyFooter: process.env.NEXT_PUBLIC_REVIVE_ZONE_STICKY_FOOTER || '',

  // Newsletter
  newsletterEndpoint: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || '',

  // Locale
  locale: process.env.NEXT_PUBLIC_LOCALE || 'pt-BR',
} as const;

export type Config = typeof config;

/**
 * Valida se as variáveis críticas estão configuradas
 */
export function validateConfig(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  if (!config.siteId) missing.push('NEXT_PUBLIC_SITE_ID');
  if (!config.apiUrl) missing.push('NEXT_PUBLIC_API_URL');

  return { valid: missing.length === 0, missing };
}
