import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { Pagination } from '@/components/ui/Pagination';
import { Sidebar } from '@/components/layout/Sidebar';
import { HeaderAd } from '@/components/ads/ReviveAd';
import { getCategoryBySlug, getArticlesByCategory } from '@/services/api';
import { SITE_CONFIG } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return {
      title: 'Categoria não encontrada',
    };
  }

  return {
    title: category.name,
    description: category.description || `Artigos sobre ${category.name}`,
    openGraph: {
      title: `${category.name} | ${SITE_CONFIG.name}`,
      description: category.description || `Artigos sobre ${category.name}`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/categoria/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const category = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1;
  const articlesResponse = await getArticlesByCategory(resolvedParams.slug, page);

  return (
    <>
      <HeaderAd />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
        </nav>

        {/* Category Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
              {category.description}
            </p>
          )}
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {articlesResponse.meta.total} artigo{articlesResponse.meta.total !== 1 ? 's' : ''} encontrado{articlesResponse.meta.total !== 1 ? 's' : ''}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles */}
          <div className="lg:col-span-2">
            {articlesResponse.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articlesResponse.data.map((article, index) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      priority={index < 4}
                    />
                  ))}
                </div>

                {articlesResponse.meta.lastPage > 1 && (
                  <div className="mt-10">
                    <Pagination
                      currentPage={articlesResponse.meta.currentPage}
                      totalPages={articlesResponse.meta.lastPage}
                      basePath={`/categoria/${category.slug}`}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p>Nenhum artigo encontrado nesta categoria.</p>
                <p className="mt-2 text-sm">
                  Novos conteúdos serão publicados em breve.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </>
  );
}
