import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCategory } from '@/hooks/useCategories'
import { useCategoryArticles } from '@/hooks/useArticles'
import { SITE_CONFIG, PAGINATION } from '@/lib/constants'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleCard from '@/components/ui/ArticleCard'
import Sidebar from '@/components/layout/Sidebar'
import Pagination from '@/components/ui/Pagination'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [page, setPage] = useState(1)
  
  const { data: category, isLoading: loadingCategory, isError: categoryError } = useCategory(slug || '')
  const { data: articlesData, isLoading: loadingArticles } = useCategoryArticles(slug || '', {
    page,
    limit: PAGINATION.articlesPerPage,
  })

  useEffect(() => {
    if (category) {
      document.title = `${category.name} | ${SITE_CONFIG.name}`
    }
  }, [category])

  useEffect(() => {
    setPage(1)
  }, [slug])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loadingCategory) {
    return (
      <div className="container-custom py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (categoryError || !category) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Categoria não encontrada
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A categoria que você está procurando não existe.
          </p>
          <Link to="/" className="btn-primary">
            Voltar para Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-500 to-accent-500 py-12">
        <div className="container-custom">
          <Breadcrumb
            items={[{ label: category.name }]}
            className="mb-4 text-white/70"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {category.name}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {category.description}
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            {loadingArticles ? (
              <LoadingSpinner size="lg" />
            ) : articlesData && articlesData.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {articlesData.data.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                <Pagination
                  currentPage={articlesData.meta.currentPage}
                  totalPages={articlesData.meta.lastPage}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum artigo encontrado nesta categoria.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </section>
    </div>
  )
}
