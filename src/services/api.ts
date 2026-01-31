import { SITE_CONFIG } from '@/lib/constants'
import type { Article, Category, PaginatedResponse, SearchParams } from '@/types'

const API_BASE = SITE_CONFIG.contentApiUrl

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Site-ID': SITE_CONFIG.id,
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getArticles(params: SearchParams = {}): Promise<PaginatedResponse<Article>> {
  const searchParams = new URLSearchParams()
  
  if (params.page) searchParams.set('page', String(params.page))
  if (params.limit) searchParams.set('limit', String(params.limit))
  if (params.category) searchParams.set('category', params.category)
  if (params.query) searchParams.set('q', params.query)
  
  const query = searchParams.toString()
  return fetchApi<PaginatedResponse<Article>>(`/api/sites/${SITE_CONFIG.id}/articles${query ? `?${query}` : ''}`)
}

export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  const response = await fetchApi<PaginatedResponse<Article>>(
    `/api/sites/${SITE_CONFIG.id}/articles?featured=true&limit=${limit}`
  )
  return response.data
}

export async function getLatestArticles(limit = 10): Promise<Article[]> {
  const response = await fetchApi<PaginatedResponse<Article>>(
    `/api/sites/${SITE_CONFIG.id}/articles?limit=${limit}&sort=-publishedAt`
  )
  return response.data
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  return fetchApi<Article>(`/api/sites/${SITE_CONFIG.id}/articles/${slug}`)
}

export async function getArticlesByCategory(categorySlug: string, page = 1, limit = 12): Promise<PaginatedResponse<Article>> {
  return fetchApi<PaginatedResponse<Article>>(
    `/api/sites/${SITE_CONFIG.id}/articles?category=${categorySlug}&page=${page}&limit=${limit}`
  )
}

export async function getRelatedArticles(articleId: string, limit = 3): Promise<Article[]> {
  const response = await fetchApi<PaginatedResponse<Article>>(
    `/api/sites/${SITE_CONFIG.id}/articles/${articleId}/related?limit=${limit}`
  )
  return response.data
}

export async function getPopularArticles(limit = 5): Promise<Article[]> {
  const response = await fetchApi<PaginatedResponse<Article>>(
    `/api/sites/${SITE_CONFIG.id}/articles?sort=-views&limit=${limit}`
  )
  return response.data
}

export async function searchArticles(query: string, page = 1, limit = 10): Promise<PaginatedResponse<Article>> {
  return fetchApi<PaginatedResponse<Article>>(
    `/api/sites/${SITE_CONFIG.id}/articles?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
  )
}

export async function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>(`/api/sites/${SITE_CONFIG.id}/categories`)
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  return fetchApi<Category>(`/api/sites/${SITE_CONFIG.id}/categories/${slug}`)
}

export async function trackArticleView(articleId: string): Promise<void> {
  try {
    await fetchApi(`/api/sites/${SITE_CONFIG.id}/articles/${articleId}/view`, {
      method: 'POST',
    })
  } catch (error) {
    console.error('Failed to track article view:', error)
  }
}
