import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import { useSearchArticles } from '@/hooks/useArticles'
import { trackSearch } from '@/services/posthog'
import { SITE_CONFIG, PAGINATION } from '@/lib/constants'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleCard from '@/components/ui/ArticleCard'
import Sidebar from '@/components/layout/Sidebar'
import Pagination from '@/components/ui/Pagination'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  
  const [inputValue, setInputValue] = useState(query)
  
  const { data: results, isLoading, isFetched } = useSearchArticles(query, currentPage)

  useEffect(() => {
    document.title = query 
      ? `Busca: ${query} | ${SITE_CONFIG.name}`
      : `Busca | ${SITE_CONFIG.name}`
  }, [query])

  useEffect(() => {
    if (isFetched && results && query) {
      trackSearch(query, results.meta.total)
    }
  }, [isFetched, results, query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() })
    }
  }

  const handlePageChange = (page: number) => {
    setSearchParams({ q: query, page: page.toString() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-500 to-accent-500 py-12">
        <div className="container-custom">
          <Breadcrumb
            items={[{ label: 'Busca' }]}
            className="mb-4 text-white/70"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {query ? `Resultados para "${query}"` : 'Buscar Artigos'}
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua busca..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Content */}
      <section className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            {!query ? (
              <div className="text-center py-12">
                <SearchIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  O que você está procurando?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Digite um termo na busca acima para encontrar artigos.
                </p>
              </div>
            ) : isLoading ? (
              <LoadingSpinner size="lg" />
            ) : results && results.data.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  {results.meta.total} resultado{results.meta.total !== 1 ? 's' : ''} encontrado{results.meta.total !== 1 ? 's' : ''}
                </p>

                <div className="space-y-6">
                  {results.data.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      variant="horizontal"
                    />
                  ))}
                </div>

                <div className="mt-8">
                  <Pagination
                    currentPage={results.meta.currentPage}
                    totalPages={results.meta.lastPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Nenhum resultado encontrado
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Não encontramos artigos para "{query}".
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Tente usar palavras-chave diferentes ou mais genéricas.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </section>
    </div>
  )
}
