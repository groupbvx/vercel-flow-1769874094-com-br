import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useFeaturedArticles, useLatestArticles } from '@/hooks/useArticles'
import { useCategories } from '@/hooks/useCategories'
import { SITE_CONFIG, CATEGORIES } from '@/lib/constants'
import FeaturedArticle from '@/components/ui/FeaturedArticle'
import ArticleCard from '@/components/ui/ArticleCard'
import Sidebar from '@/components/layout/Sidebar'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function HomePage() {
  const { data: featuredArticles, isLoading: loadingFeatured } = useFeaturedArticles(1)
  const { data: latestArticles, isLoading: loadingLatest } = useLatestArticles(12)
  const { data: categories } = useCategories()

  const mainFeatured = featuredArticles?.[0]
  const displayCategories = categories?.slice(0, 6) || CATEGORIES

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container-custom pt-8 pb-12">
        <div className="mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            {SITE_CONFIG.tagline}
          </p>
        </div>

        {loadingFeatured ? (
          <LoadingSpinner size="lg" />
        ) : mainFeatured ? (
          <FeaturedArticle article={mainFeatured} />
        ) : null}
      </section>

      {/* Latest Articles Section */}
      <section className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Últimos Artigos
              </h2>
              <Link
                to="/categoria/noticias"
                className="flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {loadingLatest ? (
              <LoadingSpinner size="lg" />
            ) : latestArticles && latestArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum artigo encontrado.
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

      {/* Categories Section */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Explorar por Categoria
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/categoria/${category.slug}`}
                className="card p-4 text-center hover:border-primary-500 dark:hover:border-primary-400 transition-colors group"
              >
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-16">
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Não perca nenhuma novidade
          </h2>
          <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
            Inscreva-se na nossa newsletter e receba os melhores conteúdos de tecnologia 
            diretamente no seu email.
          </p>
          <form 
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-white text-primary-600 font-semibold hover:bg-gray-100 transition-colors"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
