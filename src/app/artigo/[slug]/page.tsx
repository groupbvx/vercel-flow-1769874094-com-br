import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles, getArticles } from '@/services/ArticleService';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { TableOfContents } from '@/components/ui/TableOfContents';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Sidebar } from '@/components/layout/Sidebar';
import { AdSpot } from '@/components/AdSpot';
import { ArticleViewTracker } from './ArticleViewTracker';
import { formatDate, getImageUrl } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

interface ArticlePageProps {
  params: { slug: string };
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const imageUrl = article.mainImage || article.imageUrl;
  const authorName = article.author
    ? typeof article.author === 'string'
      ? article.author
      : article.author.name
    : undefined;

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `${SITE_CONFIG.url}/artigo/${article.slug}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: authorName ? [authorName] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export async function generateStaticParams() {
  try {
    const response = await getArticles({ pageSize: 50 });
    return response.data.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.warn('[ArticlePage] Could not fetch articles for static params:', error);
    return [];
  }
}

async function RelatedArticles({ slug }: { slug: string }) {
  const articles = await getRelatedArticles(slug, 3);

  if (articles.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `${SITE_CONFIG.url}/artigo/${article.slug}`;
  const imageUrl = getImageUrl(article.mainImage || article.imageUrl);
  const authorName = article.author
    ? typeof article.author === 'string'
      ? article.author
      : article.author.name
    : null;
  const categoryName = article.category
    ? typeof article.category === 'string'
      ? article.category
      : article.category.name
    : null;
  const categorySlug = article.categorySlug || (article.category && typeof article.category !== 'string' ? article.category.slug : null);

  return (
    <article className="container-main py-8">
      {/* View Tracker */}
      <ArticleViewTracker
        articleId={article.id}
        title={article.title}
        category={categoryName || undefined}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap gap-2 text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          {categorySlug && categoryName && (
            <>
              <li>
                <Link
                  href={`/categoria/${categorySlug}`}
                  className="hover:text-primary transition-colors"
                >
                  {categoryName}
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4" />
              </li>
            </>
          )}
          <li className="text-gray-900 dark:text-white truncate max-w-[200px]">
            {article.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Article Header */}
          <header className="mb-8">
            {categoryName && categorySlug && (
              <Link
                href={`/categoria/${categorySlug}`}
                className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 hover:bg-primary/20 transition-colors"
              >
                {categoryName}
              </Link>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {article.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              {authorName && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {authorName}
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

            <ShareButtons
              url={articleUrl}
              title={article.title}
              articleId={article.id}
            />
          </header>

          {/* Featured Image */}
          {imageUrl && imageUrl !== '/placeholder.jpg' && (
            <figure className="mb-8">
              <div className="relative aspect-video">
                <Image
                  src={imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            </figure>
          )}

          {/* In-Article Ad 1 */}
          <AdSpot position="in-content" zoneId="3" className="my-8" />

          {/* Article Content */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* In-Article Ad 2 */}
          <AdSpot position="in-content" zoneId="4" className="my-8" />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Enjoyed this article? Share it!
              </span>
              <ShareButtons
                url={articleUrl}
                title={article.title}
                articleId={article.id}
              />
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-8 card p-8 bg-gradient-to-r from-primary to-accent text-white">
            <h3 className="text-xl font-bold mb-2">
              Want more content like this?
            </h3>
            <p className="text-white/80 mb-6">
              Subscribe to our newsletter and stay updated with the latest articles.
            </p>
            <NewsletterForm source="article-end" variant="dark" />
          </div>

          {/* Related Articles */}
          <Suspense fallback={<div className="skeleton h-64 mt-12 rounded-xl" />}>
            <RelatedArticles slug={article.slug} />
          </Suspense>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <TableOfContents content={article.content} />
            <Sidebar />
          </div>
        </aside>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            image: imageUrl,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt || article.publishedAt,
            author: authorName
              ? {
                  '@type': 'Person',
                  name: authorName,
                }
              : undefined,
            publisher: {
              '@type': 'Organization',
              name: SITE_CONFIG.name,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_CONFIG.url}/logo.svg`,
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': articleUrl,
            },
          }),
        }}
      />
    </article>
  );
}
