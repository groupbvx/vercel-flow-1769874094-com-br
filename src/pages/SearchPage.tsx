import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useSearchArticles } from '@/hooks/useArticles'
import { trackSearch, trackPageView } from '@/services/analytics'
import { generateMetaTitle } from '@/lib/utils'
import ArticleCard from '@/components/ui/ArticleCard'
import Pagination from '@/components/ui/Pagination'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState(query)

  const { data: searchResults, isLoading } = useSearchArticles(query, page, 12)

  useEffect(() => {
    document.title = generateMetaTitle(query ? `Busca: ${query}` : 'Buscar')
    trackPageView('search', { query })

    if (searchResults) {
      trackSearch(query, searchResults.meta.totalItems)
    }
  }, [query, searchResults])

  useEffect(() => {
    setSearchInput(query)
    setPage(1)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim().length >= 2) {
      setSearchParams({ q: searchInput.trim() })
    }
  }

  return (
    <div className="container-main py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <li>
            <Link to="/" className="hover:text-primary-500 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 dark:text-gray-100">Buscar</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Buscar Artigos
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="O que você está procurando?"
              className="input pl-12 pr-24 py-4 text-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-2"
            >
              Buscar
            </button>
          </div>
        </form>
      </header>

      {/* Results */}
      {query ? (
        <>
          {/* Results Header */}
          <div className="mb-6">
            {isLoading ? (
              <p className="text-gray-600 dark:text-gray-400">Buscando...</p>
            ) : searchResults ? (
              <p className="text-gray-600 dark:text-gray-400">
                {searchResults.meta.totalItems === 0 ? (
                  <>Nenhum resultado encontrado para "<strong className="text-gray-900 dark:text-gray-100">{query}</strong>"</>
                ) : (
                  <>
                    {searchResults.meta.totalItems} resultado{searchResults.meta.totalItems !== 1 ? 's' : ''} para "<strong className="text-gray-900 dark:text-gray-100">{query}</strong>"
                  </>
                )}
              </p>
            ) : null}
          </div>

          {/* Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton h-64 rounded-xl" />
              ))}
            </div>
          ) : searchResults && searchResults.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.data.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={searchResults.meta.totalPages}
                  onPageChange={setPage}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Nenhum resultado encontrado
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Não encontramos artigos com o termo "{query}". Tente palavras-chave diferentes.
              </p>
              <Link to="/" className="btn-primary">
                Voltar para Home
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Digite para buscar
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Use a barra de busca acima para encontrar artigos sobre qualquer assunto de tecnologia.
          </p>
        </div>
      )}
    </div>
  )
}
