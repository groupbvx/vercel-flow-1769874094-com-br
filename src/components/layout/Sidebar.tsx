import { Link } from 'react-router-dom'
import { TrendingUp, Tag } from 'lucide-react'
import { usePopularArticles } from '@/hooks/useArticles'
import { useCategories } from '@/hooks/useCategories'
import { formatRelativeDate, getImageUrl } from '@/lib/utils'
import NewsletterForm from '@/components/ui/NewsletterForm'
import SidebarAd from '@/components/ads/SidebarAd'

export default function Sidebar() {
  const { data: popularArticles, isLoading: isLoadingPopular } = usePopularArticles(5)
  const { data: categories } = useCategories()

  return (
    <aside className="space-y-8">
      {/* Newsletter Widget */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Newsletter
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Receba as melhores notícias de tecnologia diretamente no seu email.
        </p>
        <NewsletterForm source="sidebar" />
      </div>

      {/* Sidebar Ad */}
      <SidebarAd />

      {/* Popular Articles */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Mais Lidos
          </h3>
        </div>

        {isLoadingPopular ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-3">
                <div className="skeleton w-16 h-16 rounded flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {popularArticles?.map((article, index) => (
              <Link
                key={article.id}
                to={`/artigo/${article.slug}`}
                className="flex space-x-3 group"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img
                    src={getImageUrl(article.featuredImage)}
                    alt={article.title}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                  />
                  <span className="absolute -top-2 -left-2 w-6 h-6 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary-500 transition-colors">
                    {article.title}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {formatRelativeDate(article.publishedAt)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Tag className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Categorias
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/20 dark:hover:text-primary-400 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Second Sidebar Ad */}
      <SidebarAd />
    </aside>
  )
}
