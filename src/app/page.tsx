import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { getArticles, getFeaturedArticle } from '@/services/ArticleService';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { NewsletterForm } from '@/components/NewsletterForm';
import { AdSpot } from '@/components/AdSpot';
import { CATEGORIES, SITE_CONFIG } from '@/lib/constants';

export const revalidate = 300;

async function HeroSection() {
  const featuredArticle = await getFeaturedArticle();
  
  if (!featuredArticle) {
    return (
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-16">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {SITE_CONFIG.tagline}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
      <div className="container-main">
        <ArticleCard article={featuredArticle} variant="featured" showAuthor />
      </div>
    </section>
  );
}

async function LatestArticles() {
  const response = await getArticles({ pageSize: 6 });
  const articles = response.data;

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No articles available yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

async function TrendingArticles() {
  const response = await getArticles({ pageSize: 4 });
  const articles = response.data;

  if (articles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {articles.slice(0, 4).map((article, index) => (
        <Link
          key={article.id}
          href={`/artigo/${article.slug}`}
          className="group flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors"
        >
          <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-bold text-primary">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 text-sm">
              {article.title}
            </h3>
            {article.category && (
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                {typeof article.category === 'string' ? article.category : article.category.name}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

function ArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="skeleton h-72 rounded-xl" />
      ))}
    </div>
  );
}

function HeroSkeleton() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
      <div className="container-main">
        <div className="skeleton h-[400px] rounded-xl" />
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Featured Article */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Trending Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="container-main">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Trending Now
            </h2>
          </div>
          <Suspense fallback={<div className="skeleton h-24 rounded-xl" />}>
            <TrendingArticles />
          </Suspense>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-main py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Latest Articles
              </h2>
              <Link
                href="/categoria/news"
                className="text-primary hover:text-blue-600 font-medium text-sm flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <Suspense fallback={<ArticlesSkeleton />}>
              <LatestArticles />
            </Suspense>

            {/* In-Content Ad */}
            <AdSpot position="in-content" className="my-8" />

            {/* Categories Section */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Explore Topics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    className="group p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-lg transition-all"
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {category.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <Suspense fallback={<div className="skeleton h-[600px] rounded-xl" />}>
                <SidebarWithArticles />
              </Suspense>
            </div>
          </aside>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Stay Ahead of the Curve
            </h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter and get the latest tech news, tutorials, and insights delivered straight to your inbox every week.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm 
                source="homepage-footer" 
                variant="dark"
                buttonText="Subscribe Now"
                title=""
                description=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

async function SidebarWithArticles() {
  const response = await getArticles({ pageSize: 5 });
  return <Sidebar popularArticles={response.data} />;
}
