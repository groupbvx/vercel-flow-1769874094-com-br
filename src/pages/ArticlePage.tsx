import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { useArticle, useRelatedArticles } from '@/hooks/useArticles'
import { trackArticleView, trackPageView } from '@/services/analytics'
import { trackArticleView as trackApiView } from '@/services/api'
import { formatDate, getImageUrl, generateMetaTitle } from '@/lib/utils'
import ArticleCard from '@/components/ui/ArticleCard'
import ShareButtons from '@/components/ui/ShareButtons'
import TableOfContents from '@/components/ui/TableOfContents'
import NewsletterForm from '@/components/ui/NewsletterForm'
import InArticleAd from '@/components/ads/InArticleAd'
import Sidebar from '@/components/layout/Sidebar'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { SITE_CONFIG } from '@/lib/constants'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: article, isLoading, error } = useArticle(slug || '')
  const { data: relatedArticles } = useRelatedArticles(article?.id || '', 3)

  useEffect(() => {
    if (article) {
      document.title = generateMetaTitle(article.title)
      trackPageView('article', { articleId: article.id, title: article.title })
      trackArticleView(article.id, article.title, article.category.name)
      trackApiView(article.id)

      // Update meta tags
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', article.excerpt)
      }
    }
  }, [article])

  if (isLoading) {
    return <LoadingSpinner fullScreen />
  }

  if (error || !article) {
    return (
      <div className="container-main py-16 text-center">
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
    )
  }

  const articleUrl = `${SITE_CONFIG.url}/artigo/${article.slug}`

  return (
    <article className="container-main py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <li>
            <Link to="/" className="hover:text-primary-500 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              to={`/categoria/${article.category.slug}`}
              className="hover:text-primary-500 transition-colors"
            >
              {article.category.name}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 dark:text-gray-100 truncate max-w-[200px]">
            {article.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Article Header */}
          <header className="mb-8">
            <Link
              to={`/categoria/${article.category.slug}`}
              className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full mb-4 hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-colors"
            >
              {article.category.name}
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              {article.author && (
                <div className="flex items-center space-x-2">
                  {article.author.avatar && (
                    <img
                      src={getImageUrl(article.author.avatar)}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span>{article.author.name}</span>
                </div>
              )}
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min de leitura</span>
              </span>
            </div>

            <ShareButtons
              url={articleUrl}
              title={article.title}
              articleId={article.id}
            />
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <figure className="mb-8">
              <img
                src={getImageUrl(article.featuredImage)}
                alt={article.title}
                className="w-full rounded-xl"
              />
            </figure>
          )}

          {/* In-Article Ad 1 */}
          <InArticleAd position={1} />

          {/* Article Content */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* In-Article Ad 2 */}
          <InArticleAd position={2} />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
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
                Gostou do artigo? Compartilhe!
              </span>
              <ShareButtons
                url={articleUrl}
                title={article.title}
                articleId={article.id}
              />
            </div>
          </div>

          {/* Author Bio */}
          {article.author && (
            <div className="mt-8 card p-6">
              <div className="flex items-start space-x-4">
                {article.author.avatar && (
                  <img
                    src={getImageUrl(article.author.avatar)}
                    alt={article.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {article.author.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {article.author.bio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-8 card p-8 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
            <h3 className="text-xl font-bold mb-2">
              Quer receber mais conteúdos como este?
            </h3>
            <p className="text-white/80 mb-6">
              Inscreva-se na nossa newsletter e fique por dentro das novidades.
            </p>
            <NewsletterForm source="article-end" variant="dark" />
          </div>

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Artigos Relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <TableOfContents content={article.content} />
            <Sidebar />
          </div>
        </aside>
      </div>
    </article>
  )
}
