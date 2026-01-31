export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string | null
  category: Category
  author: Author
  tags: string[]
  publishedAt: string
  updatedAt: string
  readTime: number
  views: number
  status: 'draft' | 'published' | 'archived'
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  articleCount?: number
}

export interface Author {
  id: string
  name: string
  slug: string
  avatar: string | null
  bio: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export interface ApiError {
  message: string
  statusCode: number
}

export interface NewsletterSubscription {
  email: string
  source?: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface SearchParams {
  query?: string
  category?: string
  page?: number
  limit?: number
}

export interface SiteConfig {
  id: string
  name: string
  url: string
  description: string
  locale: string
  apiUrl: string
}
