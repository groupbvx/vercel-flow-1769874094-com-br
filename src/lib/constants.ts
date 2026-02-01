/**
 * Site Configuration Constants
 * TechPulse Daily - Your Daily Dose of Tech Innovation
 */

export const SITE_CONFIG = {
  name: 'TechPulse Daily',
  tagline: 'Your Daily Dose of Tech Innovation',
  description: 'TechPulse Daily delivers cutting-edge technology news, software reviews, tutorials, and insights into the digital world.',
  url: 'https://vercel-flow-1769874094.com.br',
  locale: 'en-US',
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#8B5CF6',
  },
} as const;

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/categoria/news' },
  { label: 'Tutorials', href: '/categoria/tutorials' },
  { label: 'Reviews', href: '/categoria/reviews' },
  { label: 'AI & ML', href: '/categoria/ai-ml' },
  { label: 'About', href: '/about' },
] as const;

export const CATEGORIES = [
  { name: 'News', slug: 'news', description: 'Latest technology news and updates' },
  { name: 'Tutorials', slug: 'tutorials', description: 'Step-by-step guides and how-tos' },
  { name: 'Reviews', slug: 'reviews', description: 'In-depth product and software reviews' },
  { name: 'AI & ML', slug: 'ai-ml', description: 'Artificial Intelligence and Machine Learning' },
  { name: 'Development', slug: 'development', description: 'Software development tips and best practices' },
  { name: 'Cloud', slug: 'cloud', description: 'Cloud computing and DevOps' },
] as const;

export const SOCIAL_LINKS = {
  twitter: '#',
  linkedin: '#',
  github: '#',
  facebook: '#',
} as const;

export const SEO_CONFIG = {
  titleTemplate: '%s | TechPulse Daily',
  defaultTitle: 'TechPulse Daily - Your Daily Dose of Tech Innovation',
  ogImage: '/og-image.png',
  twitterHandle: '@techpulsedaily',
} as const;
