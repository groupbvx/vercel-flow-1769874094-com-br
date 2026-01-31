import { Link } from 'react-router-dom'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import { formatDate, getImageUrl } from '@/lib/utils'
import type { Article } from '@/types'

interface FeaturedArticleProps {
  article: Article
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Link
      to={`/artigo/${article.slug}`}
      className="relative block group rounded-2xl overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(article.featuredImage)}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] flex flex-col justify-end p-6 md:p-10">
        <div className="max-w-3xl">
          <Link
            to={`/categoria/${article.category.slug}`}
            className="inline-block px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full hover:bg-primary-600 transition-colors mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {article.category.name}
          </Link>

          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 line-clamp-3 group-hover:text-primary-200 transition-colors">
            {article.title}
          </h2>

          <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min de leitura</span>
            </span>
            <span className="flex items-center space-x-1 text-primary-400 group-hover:text-primary-300 transition-colors">
              <span>Ler artigo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
