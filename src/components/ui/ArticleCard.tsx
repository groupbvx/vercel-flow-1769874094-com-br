import { Link } from 'react-router-dom'
import { Clock, Eye } from 'lucide-react'
import { formatRelativeDate, getImageUrl, cn } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'compact' | 'horizontal'
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'horizontal') {
    return (
      <article className="card overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <Link
            to={`/artigo/${article.slug}`}
            className="sm:w-48 flex-shrink-0"
          >
            <img
              src={getImageUrl(article.featuredImage)}
              alt={article.title}
              className="w-full h-48 sm:h-full object-cover"
              loading="lazy"
            />
          </Link>
          <div className="flex-1 p-4">
            <Link
              to={`/categoria/${article.category.slug}`}
              className="badge mb-2"
            >
              {article.category.name}
            </Link>
            <Link
              to={`/artigo/${article.slug}`}
              className="block"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime} min
              </span>
              <span>{formatRelativeDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'compact') {
    return (
      <article className="flex gap-3">
        <Link
          to={`/artigo/${article.slug}`}
          className="flex-shrink-0"
        >
          <img
            src={getImageUrl(article.featuredImage)}
            alt={article.title}
            className="w-20 h-20 object-cover rounded-lg"
            loading="lazy"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            to={`/artigo/${article.slug}`}
            className="block"
          >
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors line-clamp-2">
              {article.title}
            </h4>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {formatRelativeDate(article.publishedAt)}
          </p>
        </div>
      </article>
    )
  }

  return (
    <article className={cn('card overflow-hidden group')}>
      <Link
        to={`/artigo/${article.slug}`}
        className="block aspect-video overflow-hidden"
      >
        <img
          src={getImageUrl(article.featuredImage)}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Link
            to={`/categoria/${article.category.slug}`}
            className="badge"
          >
            {article.category.name}
          </Link>
        </div>
        <Link
          to={`/artigo/${article.slug}`}
          className="block"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime} min
            </span>
            {article.viewCount > 0 && (
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {article.viewCount.toLocaleString()}
              </span>
            )}
          </div>
          <span>{formatRelativeDate(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  )
}
