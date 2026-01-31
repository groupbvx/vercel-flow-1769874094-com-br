import { useQuery } from '@tanstack/react-query'
import { categoriesApi } from '@/services/api'
import { CATEGORIES } from '@/lib/constants'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
    placeholderData: CATEGORIES,
  })
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoriesApi.getBySlug(slug),
    enabled: !!slug,
  })
}
