import { Link } from 'react-router-dom'
import { Clock, Calendar } from 'lucide-react'
import { formatDate, getImageUrl, cn } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'horizontal' | 'compact'
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'horizontal') {
    return (
      <Link to={`/artigo/${article.slug}`} className="card overflow-hidden group">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 md:w-56 flex-shrink-0">
            <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden">
              <img
                src={getImageUrl(article.featuredImage)}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex-1 p-4 sm:p-5 flex flex-col">
            <Link
              to={`/categoria/${article.category.slug}`}
              className="text-xs font-medium text-primary-500 hover:text-primary-600 uppercase tracking-wide mb-2"
              onClick={(e) => e.stopPropagation()}
            >
              {article.category.name}
            </Link>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary-500 transition-colors mb-2">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {article.excerpt}
            </p>
            <div className="mt-auto flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(article.publishedAt)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime} min</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link to={`/artigo/${article.slug}`} className="flex space-x-3 group">
        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded">
          <img
            src={getImageUrl(article.featuredImage)}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary-500 transition-colors">
            {article.title}
          </h4>
          <span className="text-xs text-gray-500 mt-1 block">
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link to={`/artigo/${article.slug}`} className="card overflow-hidden group">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={getImageUrl(article.featuredImage)}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <Link
          to={`/categoria/${article.category.slug}`}
          className="absolute top-3 left-3 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full hover:bg-primary-600 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {article.category.name}
        </Link>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary-500 transition-colors mb-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(article.publishedAt)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime} min de leitura</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
