import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { NewsletterForm } from '@/components/NewsletterForm';
import { getArticles, getFeaturedArticles } from '@/services/ArticleService';
import { SITE_CONFIG, CATEGORIES } from '@/lib/constants';

export const revalidate = 300; // Revalidate every 5 minutes

async function FeaturedSection() {
  const featured = await getFeaturedArticles(5);
  const mainFeatured = featured[0];
  const secondaryFeatured = featured.slice(1, 5);

  if (!mainFeatured) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No featured articles available.</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Featured Article */}
      <section className="mb-12">
        <ArticleCard article={mainFeatured} variant="featured" showAuthor />
      </section>

      {/* Secondary Featured */}
      {secondaryFeatured.length > 0 && (
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryFeatured.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

async function LatestArticles() {
  const response = await getArticles({ pageSize: 9 });
  const articles = response.data;

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No articles found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} variant="horizontal" />
      ))}
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <>
      <div className="skeleton h-[400px] rounded-2xl mb-12" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-64 rounded-xl" />
        ))}
      </div>
    </>
  );
}

function LatestSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton h-32 rounded-xl" />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="container-main py-8">
      {/* Featured Section */}
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedSection />
      </Suspense>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Latest Articles */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Latest Articles
              </h2>
              <Link
                href="/categoria/news"
                className="flex items-center space-x-1 text-primary hover:text-blue-600 text-sm font-medium transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <Suspense fallback={<LatestSkeleton />}>
              <LatestArticles />
            </Suspense>
          </section>

          {/* Categories Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Explore by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categoria/${category.slug}`}
                  className="card p-6 text-center hover:shadow-md transition-all group"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="mt-12 card p-8 bg-gradient-to-r from-primary to-accent text-white">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-2">
                Don&apos;t miss any updates!
              </h2>
              <p className="text-white/80 mb-6">
                Subscribe to our newsletter and receive the best tech content
                directly in your inbox.
              </p>
              <NewsletterForm source="homepage-cta" variant="dark" />
            </div>
          </section>
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
