import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { getArticles } from '@/services/ArticleService';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { CATEGORIES, SITE_CONFIG } from '@/lib/constants';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { page?: string };
}

export const revalidate = 300;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  const categoryName = category?.name || params.slug;

  return {
    title: `${categoryName} - ${SITE_CONFIG.name}`,
    description: category?.description || `Browse ${categoryName} articles on ${SITE_CONFIG.name}`,
    openGraph: {
      title: `${categoryName} - ${SITE_CONFIG.name}`,
      description: category?.description || `Browse ${categoryName} articles`,
    },
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

async function CategoryArticles({
  slug,
  page,
}: {
  slug: string;
  page: number;
}) {
  const response = await getArticles({
    category: slug,
    page,
    pageSize: 12,
  });

  const articles = response.data;
  const { totalPages } = response.meta;

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No articles found in this category.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 text-primary hover:text-blue-600 font-medium"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {page > 1 && (
            <Link
              href={`/categoria/${slug}?page=${page - 1}`}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Previous
            </Link>
          )}
          
          <span className="px-4 py-2 text-gray-600 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>

          {page < totalPages && (
            <Link
              href={`/categoria/${slug}?page=${page + 1}`}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
}

function ArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="skeleton h-64 rounded-xl" />
      ))}
    </div>
  );
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  const categoryName = category?.name || params.slug;
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));

  return (
    <div className="container-main py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li className="text-gray-900 dark:text-white">
            {categoryName}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {categoryName}
        </h1>
        {category?.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {category.description}
          </p>
        )}
      </header>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Articles */}
        <div className="lg:col-span-2">
          <Suspense fallback={<ArticlesSkeleton />}>
            <CategoryArticles slug={params.slug} page={page} />
          </Suspense>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
