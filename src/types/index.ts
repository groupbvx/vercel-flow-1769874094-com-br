/**
 * Type definitions for TechPulse Daily
 */

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  mainImage?: string;
  imageUrl?: string;
  author?: string | Author;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  category?: string | Category;
  categorySlug?: string;
  readingTime?: number;
}

export interface Author {
  id?: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  articleCount?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface ReviveZones {
  header?: string;
  sidebar?: string;
  inArticle1?: string;
  inArticle2?: string;
  stickyFooter?: string;
}

export interface AdConfig {
  url: string;
  id: string;
  zones: ReviveZones;
}
