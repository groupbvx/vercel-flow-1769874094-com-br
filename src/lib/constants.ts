export const SITE_CONFIG = {
  id: import.meta.env.VITE_SITE_ID || '',
  name: 'TechPulse Daily',
  tagline: 'Your Daily Dose of Tech Innovation',
  url: import.meta.env.VITE_SITE_URL || 'https://vercel-flow-1769874094.com.br',
  description: import.meta.env.VITE_SITE_DESCRIPTION || 'TechPulse Daily delivers cutting-edge technology news, software reviews, tutorials, and insights into the digital world.',
  locale: import.meta.env.VITE_LOCALE || 'pt-BR',
  apiUrl: import.meta.env.VITE_API_URL || 'https://painel.bvx.my.srv.br',
  contentApiUrl: import.meta.env.VITE_CONTENT_API_BASE_URL || 'https://painel.bvx.my.srv.br',
}

export const POSTHOG_CONFIG = {
  key: import.meta.env.VITE_POSTHOG_KEY || '',
  host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
}

export const REVIVE_CONFIG = {
  url: import.meta.env.VITE_REVIVE_URL || '',
  id: import.meta.env.VITE_REVIVE_ID || '1',
  zones: {
    header: import.meta.env.VITE_REVIVE_ZONE_HEADER || '1278',
    sidebar: import.meta.env.VITE_REVIVE_ZONE_SIDEBAR || '1279',
    inArticle1: import.meta.env.VITE_REVIVE_ZONE_INARTICLE_1 || '1280',
    inArticle2: import.meta.env.VITE_REVIVE_ZONE_INARTICLE_2 || '1281',
    stickyFooter: import.meta.env.VITE_REVIVE_ZONE_STICKY_FOOTER || '1282',
  },
}

export const CATEGORIES = [
  { name: 'Notícias', slug: 'noticias', description: 'Últimas notícias de tecnologia' },
  { name: 'Tutoriais', slug: 'tutoriais', description: 'Guias passo a passo' },
  { name: 'Reviews', slug: 'reviews', description: 'Análises de produtos e software' },
  { name: 'IA & ML', slug: 'ia-ml', description: 'Inteligência Artificial e Machine Learning' },
  { name: 'Desenvolvimento', slug: 'desenvolvimento', description: 'Dicas de programação' },
  { name: 'Cloud', slug: 'cloud', description: 'Computação em nuvem e DevOps' },
]

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Notícias', href: '/categoria/noticias' },
  { label: 'Tutoriais', href: '/categoria/tutoriais' },
  { label: 'Reviews', href: '/categoria/reviews' },
  { label: 'IA & ML', href: '/categoria/ia-ml' },
  { label: 'Sobre', href: '/sobre' },
]

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/techpulsedaily',
  facebook: 'https://facebook.com/techpulsedaily',
  instagram: 'https://instagram.com/techpulsedaily',
  linkedin: 'https://linkedin.com/company/techpulsedaily',
  github: 'https://github.com/techpulsedaily',
}
