import { useQuery } from '@tanstack/react-query'
import { articlesApi } from '@/services/api'

export function useArticles(page = 1, limit = 12) {
  return useQuery({
    queryKey: ['articles', page, limit],
    queryFn: () => articlesApi.getAll(page, limit),
  })
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesApi.getBySlug(slug),
    enabled: !!slug,
  })
}

export function useArticlesByCategory(categorySlug: string, page = 1, limit = 12) {
  return useQuery({
    queryKey: ['articles', 'category', categorySlug, page, limit],
    queryFn: () => articlesApi.getByCategory(categorySlug, page, limit),
    enabled: !!categorySlug,
  })
}

export function useFeaturedArticles(limit = 5) {
  return useQuery({
    queryKey: ['articles', 'featured', limit],
    queryFn: () => articlesApi.getFeatured(limit),
  })
}

export function useLatestArticles(limit = 10) {
  return useQuery({
    queryKey: ['articles', 'latest', limit],
    queryFn: () => articlesApi.getLatest(limit),
  })
}

export function useRelatedArticles(articleId: string, limit = 3) {
  return useQuery({
    queryKey: ['articles', 'related', articleId, limit],
    queryFn: () => articlesApi.getRelated(articleId, limit),
    enabled: !!articleId,
  })
}

export function useSearchArticles(query: string, page = 1) {
  return useQuery({
    queryKey: ['articles', 'search', query, page],
    queryFn: () => articlesApi.search(query, page),
    enabled: query.length >= 3,
  })
}
