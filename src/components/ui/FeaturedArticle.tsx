import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import { formatRelativeDate, getImageUrl } from '@/lib/utils'
import type { Article } from '@/types'

interface FeaturedArticleProps {
  article: Article
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <article className="relative rounded-2xl overflow-hidden group">
      {/* Background Image */}
      <div className="aspect-[16/9] md:aspect-[21/9]">
        <img
          src={getImageUrl(article.featuredImage)}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="max-w-3xl">
          <Link
            to={`/categoria/${article.category.slug}`}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-500 text-white mb-3 hover:bg-primary-600 transition-colors"
          >
            {article.category.name}
          </Link>

          <Link
            to={`/artigo/${article.slug}`}
            className="block group/title"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 group-hover/title:text-primary-300 transition-colors">
              {article.title}
            </h2>
          </Link>

          <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-2 max-w-2xl">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              {article.author.avatar && (
                <img
                  src={getImageUrl(article.author.avatar)}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                />
              )}
              <div>
                <p className="text-sm font-medium text-white">
                  {article.author.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{formatRelativeDate(article.publishedAt)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min de leitura
                  </span>
                </div>
              </div>
            </div>

            <Link
              to={`/artigo/${article.slug}`}
              className="ml-auto flex items-center gap-2 text-sm font-medium text-white hover:text-primary-300 transition-colors"
            >
              Ler artigo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
