'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { cn, formatDate, getImageUrl, truncateText } from '@/lib/utils';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'horizontal' | 'featured';
  className?: string;
  showExcerpt?: boolean;
  showCategory?: boolean;
  showAuthor?: boolean;
}

export function ArticleCard({
  article,
  variant = 'default',
  className,
  showExcerpt = true,
  showCategory = true,
  showAuthor = false,
}: ArticleCardProps) {
  const imageUrl = getImageUrl(article.mainImage || article.imageUrl, '/placeholder.jpg');

  if (variant === 'horizontal') {
    return (
      <article className={cn('card-hover flex flex-col sm:flex-row gap-4', className)}>
        {/* Image */}
        <Link
          href={`/artigo/${article.slug}`}
          className="relative w-full sm:w-48 h-32 sm:h-full flex-shrink-0"
        >
          <div className="relative w-full h-32 sm:h-full min-h-[120px]">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
              sizes="(max-width: 640px) 100vw, 192px"
            />
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 p-4 sm:py-4 sm:pr-4 sm:pl-0">
          {showCategory && article.category && (
            <Link
              href={`/categoria/${article.categorySlug || article.category}`}
              className="badge-primary mb-2"
            >
              {typeof article.category === 'string' ? article.category : article.category.name}
            </Link>
          )}

          <Link href={`/artigo/${article.slug}`}>
            <h3 className="font-bold text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-2 mb-2">
              {article.title}
            </h3>
          </Link>

          {showExcerpt && article.excerpt && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {truncateText(article.excerpt, 120)}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.publishedAt)}
            </span>
            {article.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime} min read
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article className={cn('card-hover relative overflow-hidden group', className)}>
        <Link href={`/artigo/${article.slug}`} className="block">
          {/* Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            {showCategory && article.category && (
              <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-medium rounded-full mb-3">
                {typeof article.category === 'string' ? article.category : article.category.name}
              </span>
            )}

            <h2 className="text-2xl md:text-4xl font-bold mb-3 line-clamp-2">
              {article.title}
            </h2>

            {showExcerpt && article.excerpt && (
              <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
                {truncateText(article.excerpt, 200)}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-white/70">
              {showAuthor && article.author && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {typeof article.author === 'string' ? article.author : article.author.name}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </span>
              {article.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min read
                </span>
              )}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Default card
  return (
    <article className={cn('card-hover', className)}>
      {/* Image */}
      <Link href={`/artigo/${article.slug}`} className="block">
        <div className="relative aspect-video">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {showCategory && article.category && (
          <Link
            href={`/categoria/${article.categorySlug || article.category}`}
            className="badge-primary mb-2"
          >
            {typeof article.category === 'string' ? article.category : article.category.name}
          </Link>
        )}

        <Link href={`/artigo/${article.slug}`}>
          <h3 className="font-bold text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
        </Link>

        {showExcerpt && article.excerpt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {truncateText(article.excerpt, 100)}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(article.publishedAt)}
          </span>
          {article.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime} min
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
