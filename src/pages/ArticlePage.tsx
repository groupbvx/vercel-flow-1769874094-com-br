import { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, Calendar, Eye, ChevronLeft } from 'lucide-react'
import { useArticle, useRelatedArticles } from '@/hooks/useArticles'
import { formatDate, getImageUrl, extractHeadings } from '@/lib/utils'
import { trackArticleView } from '@/services/posthog'
import { trackArticleView as trackApiView } from '@/services/api'
import { SITE_CONFIG } from '@/lib/constants'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ShareButtons from '@/components/ui/ShareButtons'
import TableOfContents from '@/components/ui/TableOfContents'
import ArticleCard from '@/components/ui/ArticleCard'
import NewsletterForm from '@/components/ui/NewsletterForm'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import InArticleAd from '@/components/ads/InArticleAd'
import SidebarAd from '@/components/ads/SidebarAd'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: article, isLoading, isError } = useArticle(slug || '')
  const { data: relatedArticles } = useRelatedArticles(article?.id || '', 3)

  const headings = useMemo(() => {
    if (!article?.content) return []
    return extractHeadings(article.content)
  }, [article?.content])

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | ${SITE_CONFIG.name}`
      trackArticleView(article.id, article.title, article.category.name)
      trackApiView(article.id)
    }
  }, [article])

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !article) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Artigo não encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            O artigo que você está procurando não existe ou foi removido.
          </p>
          <Link to="/" className="btn-primary">
            Voltar para Home
          </Link>
        </div>
      </div>
    )
  }

  const articleUrl = `${SITE_CONFIG.url}/artigo/${article.slug}`

  return (
    <article className="min-h-screen">
      {/* Hero */}
      <header className="relative">
        {article.featuredImage && (
          <div className="aspect-[21/9] max-h-[500px] overflow-hidden">
            <img
              src={getImageUrl(article.featuredImage)}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}
      </header>

      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: article.category.name, href: `/categoria/${article.category.slug}` },
            { label: article.title },
          ]}
          className="mb-6"
        />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            {/* Article Header */}
            <div className="mb-8">
              <Link
                to={`/categoria/${article.category.slug}`}
                className="badge mb-4"
              >
                {article.category.name}
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {article.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  {article.author.avatar && (
                    <img
                      src={getImageUrl(article.author.avatar)}
                      alt={article.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {article.author.name}
                    </p>
                    <p className="text-xs">{article.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {article.readTime} min de leitura
                  </span>
                  {article.viewCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {article.viewCount.toLocaleString()} visualizações
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Compartilhar:
              </span>
              <ShareButtons
                url={articleUrl}
                title={article.title}
                articleId={article.id}
              />
            </div>

            {/* Ad before content */}
            <InArticleAd position={1} />

            {/* Article Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Ad after content */}
            <InArticleAd position={2} />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  Tags:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      to={`/busca?tag=${tag.slug}`}
                      className="badge-secondary"
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
                    <img
                      src={getImageUrl(article.author.avatar)}
                      alt={article.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {article.author.name}
                    </h4>
                    <p className="text-sm text-primary-500 dark:text-primary-400 mb-2">
                      {article.author.role}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {article.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-white">
              <h3 className="text-xl font-bold mb-2">
                Gostou do artigo?
              </h3>
              <p className="text-white/80 mb-4">
                Receba mais conteúdos como este diretamente no seu email.
              </p>
              <NewsletterForm variant="inline" />
            </div>

            {/* Back Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-8 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar para Home
            </Link>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <TableOfContents headings={headings} />
              )}

              {/* Share */}
              <div className="card p-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Compartilhar
                </h4>
                <ShareButtons
                  url={articleUrl}
                  title={article.title}
                  articleId={article.id}
                />
              </div>

              {/* Ad */}
              <SidebarAd />

              {/* Related Articles */}
              {relatedArticles && relatedArticles.length > 0 && (
                <div className="card p-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Artigos Relacionados
                  </h4>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <ArticleCard
                        key={related.id}
                        article={related}
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
