'use client';

import Link from 'next/link';
import { TrendingUp, Tag, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { NewsletterForm } from '@/components/NewsletterForm';
import { AdSpot } from '@/components/AdSpot';
import { cn, formatRelativeTime, getImageUrl } from '@/lib/utils';
import type { Article } from '@/types';

interface SidebarProps {
  popularArticles?: Article[];
  className?: string;
}

export function Sidebar({ popularArticles = [], className }: SidebarProps) {
  return (
    <aside className={cn('space-y-6', className)}>
      {/* Newsletter Widget */}
      <div className="card p-6 bg-gradient-to-br from-primary to-accent text-white">
        <h3 className="text-lg font-bold mb-2">Newsletter</h3>
        <p className="text-white/80 text-sm mb-4">
          Get the latest tech news delivered to your inbox.
        </p>
        <NewsletterForm source="sidebar" variant="dark" />
      </div>

      {/* Sidebar Ad */}
      <AdSpot position="sidebar" className="min-h-[250px] rounded-xl" />

      {/* Popular Articles */}
      {popularArticles.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Trending
            </h3>
          </div>
          <div className="space-y-4">
            {popularArticles.slice(0, 5).map((article, index) => (
              <Link
                key={article.id}
                href={`/artigo/${article.slug}`}
                className="flex items-start space-x-3 group"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatRelativeTime(article.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories Widget */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Tag className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Categories
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/categoria/${category.slug}`}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* About Widget */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          About TechPulse Daily
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Your trusted source for the latest technology news, in-depth reviews, and expert tutorials.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center text-sm text-primary hover:text-blue-600 font-medium transition-colors"
        >
          Learn more
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </aside>
  );
}
