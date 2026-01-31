import { Suspense } from 'react';
import { FeaturedArticle } from '@/components/ui/FeaturedArticle';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { Sidebar } from '@/components/layout/Sidebar';
import { HeaderAd } from '@/components/ads/ReviveAd';
import { getFeaturedArticles, getLatestArticles, getCategories } from '@/services/api';
import { SITE_CONFIG, CATEGORIES } from '@/lib/constants';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const [featuredArticles, latestArticles, categories] = await Promise.all([
    getFeaturedArticles(5).catch(() => []),
    getLatestArticles(12).catch(() => []),
    getCategories().catch(() => CATEGORIES),
  ]);

  const mainFeatured = featuredArticles[0];
  const secondaryFeatured = featuredArticles.slice(1, 3);

  return (
    <>
      {/* Header Ad */}
      <HeaderAd />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-balance">
            {SITE_CONFIG.tagline}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {SITE_CONFIG.description}
          </p>
        </div>

        {/* Featured Articles */}
        {mainFeatured && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FeaturedArticle article={mainFeatured} size="large" />
            </div>
            <div className="space-y-6">
              {secondaryFeatured.map((article) => (
                <FeaturedArticle key={article.id} article={article} size="medium" />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Categories Bar */}
      {categories.length > 0 && (
        <section className="bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Categorias:
              </span>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categoria/${category.slug}`}
                  className="px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900 dark:hover:text-primary-300 transition-colors whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content with Sidebar */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Últimas Publicações
              </h2>
              <Link
                href="/categoria/noticias"
                className="flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                Ver mais
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {latestArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestArticles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    priority={index < 4}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p>Nenhum artigo encontrado.</p>
                <p className="mt-2 text-sm">
                  Novos conteúdos serão publicados em breve.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-96 rounded-xl" />}>
            <Sidebar />
          </Suspense>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Não perca nenhuma novidade
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que recebem as melhores atualizações de tecnologia todas as semanas.
          </p>
          <div className="mt-8 max-w-md mx-auto">
            <NewsletterForm variant="compact" className="bg-white/10 backdrop-blur rounded-xl p-4" />
          </div>
        </div>
      </section>
    </>
  );
}
