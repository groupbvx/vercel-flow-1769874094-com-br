import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useFeaturedArticles, useLatestArticles } from '@/hooks/useArticles'
import { useCategories } from '@/hooks/useCategories'
import { trackPageView } from '@/services/analytics'
import ArticleCard from '@/components/ui/ArticleCard'
import FeaturedArticle from '@/components/ui/FeaturedArticle'
import NewsletterForm from '@/components/ui/NewsletterForm'
import Sidebar from '@/components/layout/Sidebar'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { SITE_CONFIG } from '@/lib/constants'

export default function HomePage() {
  const { data: featuredArticles, isLoading: isLoadingFeatured } = useFeaturedArticles(5)
  const { data: latestArticles, isLoading: isLoadingLatest } = useLatestArticles(9)
  const { data: categories } = useCategories()

  useEffect(() => {
    trackPageView('home')
    document.title = `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`
  }, [])

  const mainFeatured = featuredArticles?.[0]
  const secondaryFeatured = featuredArticles?.slice(1, 5) || []

  return (
    <div className="container-main py-8">
      {/* Hero Section */}
      <section className="mb-12">
        {isLoadingFeatured ? (
          <div className="skeleton h-[400px] rounded-2xl" />
        ) : mainFeatured ? (
          <FeaturedArticle article={mainFeatured} />
        ) : null}
      </section>

      {/* Secondary Featured */}
      {secondaryFeatured.length > 0 && (
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryFeatured.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Últimos Artigos
              </h2>
              <Link
                to="/categoria/noticias"
                className="flex items-center space-x-1 text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
              >
                <span>Ver todos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {isLoadingLatest ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton h-48 rounded-xl" />
                ))}
              </div>
            ) : latestArticles && latestArticles.length > 0 ? (
              <div className="space-y-6">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Nenhum artigo encontrado.
              </div>
            )}
          </section>

          {/* Categories Section */}
          {categories && categories.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Explore por Categoria
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categoria/${category.slug}`}
                    className="card p-6 text-center hover:shadow-md transition-shadow group"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {category.articleCount || 0} artigos
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Newsletter CTA */}
          <section className="mt-12 card p-8 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-2">
                Não perca nenhuma novidade!
              </h2>
              <p className="text-white/80 mb-6">
                Inscreva-se na nossa newsletter e receba os melhores conteúdos de tecnologia.
              </p>
              <NewsletterForm source="homepage-cta" variant="dark" />
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
