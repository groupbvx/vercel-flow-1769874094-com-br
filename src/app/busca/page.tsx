import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Search, ChevronRight } from 'lucide-react';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { Pagination } from '@/components/ui/Pagination';
import { Sidebar } from '@/components/layout/Sidebar';
import { searchArticles } from '@/services/api';
import { SITE_CONFIG } from '@/lib/constants';

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';

  return {
    title: query ? `Busca: ${query}` : 'Buscar',
    description: `Resultados de busca para "${query}" no ${SITE_CONFIG.name}`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const page = resolvedParams.page ? parseInt(resolvedParams.page) : 1;

  const results = query ? await searchArticles(query, page).catch(() => ({ articles: [], categories: [], total: 0 })) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-700 dark:text-gray-300">Busca</span>
      </nav>

      {/* Search Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Search className="w-8 h-8 text-primary-600" />
          {query ? `Resultados para "${query}"` : 'Buscar Artigos'}
        </h1>
        {results && (
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {results.total} resultado{results.total !== 1 ? 's' : ''} encontrado{results.total !== 1 ? 's' : ''}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Results */}
        <div className="lg:col-span-2">
          {!query ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Use a barra de busca para encontrar artigos.
              </p>
            </div>
          ) : results && results.articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.articles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    priority={index < 4}
                  />
                ))}
              </div>

              {results.total > 12 && (
                <div className="mt-10">
                  <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(results.total / 12)}
                    basePath={`/busca?q=${encodeURIComponent(query)}`}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Nenhum resultado encontrado para &ldquo;{query}&rdquo;
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                Tente usar palavras-chave diferentes ou mais genéricas.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-96 rounded-xl" />}>
          <Sidebar />
        </Suspense>
      </div>
    </div>
  );
}
