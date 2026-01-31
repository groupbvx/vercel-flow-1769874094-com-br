import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useArticlesByCategory } from '@/hooks/useArticles'
import { useCategory } from '@/hooks/useCategories'
import { trackPageView } from '@/services/analytics'
import { generateMetaTitle } from '@/lib/utils'
import ArticleCard from '@/components/ui/ArticleCard'
import Pagination from '@/components/ui/Pagination'
import Sidebar from '@/components/layout/Sidebar'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [page, setPage] = useState(1)

  const { data: category } = useCategory(slug || '')
  const { data: articlesData, isLoading } = useArticlesByCategory(slug || '', page, 12)

  useEffect(() => {
    if (category) {
      document.title = generateMetaTitle(category.name)
      trackPageView('category', { category: category.name })
    }
    setPage(1)
  }, [slug, category])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  if (isLoading && page === 1) {
    return <LoadingSpinner fullScreen />
  }

  return (
    <div className="container-main py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <li>
            <Link to="/" className="hover:text-primary-500 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 dark:text-gray-100">
            {category?.name || 'Categoria'}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {category?.name || 'Categoria'}
        </h1>
        {category?.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {category.description}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton h-64 rounded-xl" />
              ))}
            </div>
          ) : articlesData && articlesData.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articlesData.data.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={articlesData.meta.totalPages}
                  onPageChange={setPage}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Nenhum artigo encontrado
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ainda não há artigos nesta categoria.
              </p>
              <Link to="/" className="btn-primary">
                Voltar para Home
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
