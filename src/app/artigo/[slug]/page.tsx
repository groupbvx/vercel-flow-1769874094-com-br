import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Clock, Calendar, User, ChevronRight } from 'lucide-react';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { TableOfContents } from '@/components/ui/TableOfContents';
import { InArticleAd, SidebarAd } from '@/components/ads/ReviveAd';
import { getArticleBySlug, getRelatedArticles, getLatestArticles } from '@/services/api';
import { formatDate, getImageUrl, extractHeadings } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Artigo não encontrado',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: article.featuredImage ? [getImageUrl(article.featuredImage)] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.featuredImage ? [getImageUrl(article.featuredImage)] : [],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/artigo/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const [relatedArticles, latestArticles] = await Promise.all([
    getRelatedArticles(article.id, article.category.id, 3).catch(() => []),
    getLatestArticles(5).catch(() => []),
  ]);

  const tocItems = extractHeadings(article.content);
  const articleUrl = `${SITE_CONFIG.url}/artigo/${article.slug}`;

  // Structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage ? getImageUrl(article.featuredImage) : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/categoria/${article.category.slug}`} className="hover:text-primary-600">
            {article.category.name}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-700 dark:text-gray-300 line-clamp-1">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <header className="mb-8">
              <Link
                href={`/categoria/${article.category.slug}`}
                className="inline-block px-3 py-1 text-sm font-medium text-primary-600 bg-primary-100 dark:bg-primary-900 dark:text-primary-300 rounded-full mb-4"
              >
                {article.category.name}
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-balance">
                {article.title}
              </h1>

              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                {article.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  {article.author.avatar && (
                    <Image
                      src={getImageUrl(article.author.avatar)}
                      alt={article.author.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.author.name}
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.publishedAt, "dd 'de' MMMM 'de' yyyy")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min de leitura
                </span>
              </div>

              <div className="mt-6">
                <ShareButtons url={articleUrl} title={article.title} />
              </div>
            </header>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="relative aspect-video mb-8 rounded-2xl overflow-hidden">
                <Image
                  src={getImageUrl(article.featuredImage)}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* In-Article Ad 1 */}
            <InArticleAd position={1} />

            {/* Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* In-Article Ad 2 */}
            <InArticleAd position={2} />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/tag/${tag.slug}`}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {article.author.bio && (
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-start gap-4">
                  {article.author.avatar && (
                    <Image
                      src={getImageUrl(article.author.avatar)}
                      alt={article.author.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {article.author.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {article.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="mt-8">
              <NewsletterForm />
            </div>

            {/* Share Buttons (Bottom) */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <ShareButtons url={articleUrl} title={article.title} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Table of Contents */}
            {tocItems.length > 0 && (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm sticky top-24">
                <TableOfContents items={tocItems} />
              </div>
            )}

            {/* Sidebar Ad */}
            <SidebarAd />

            {/* Latest Articles */}
            {latestArticles.length > 0 && (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Últimas Notícias
                </h3>
                <div className="space-y-4">
                  {latestArticles.map((item) => (
                    <ArticleCard key={item.id} article={item} variant="compact" />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Artigos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
