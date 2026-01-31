import { useState, useEffect, useRef, type FormEvent } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSearchArticles } from '@/hooks/useArticles'
import { formatRelativeDate, getImageUrl, cn } from '@/lib/utils'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => void
}

export default function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: results, isLoading } = useSearchArticles(query)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-4">
            <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar artigos..."
              className="flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="text-xs font-medium">ESC</span>
            </button>
          </div>
        </form>

        {/* Results */}
        <div className={cn(
          'max-h-96 overflow-y-auto scrollbar-thin',
          !query && 'hidden'
        )}>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
            </div>
          ) : results && results.data.length > 0 ? (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {results.data.slice(0, 5).map((article) => (
                <li key={article.id}>
                  <Link
                    to={`/artigo/${article.slug}`}
                    onClick={onClose}
                    className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <img
                      src={getImageUrl(article.featuredImage)}
                      alt={article.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span className="badge-secondary">
                          {article.category.name}
                        </span>
                        <span>{formatRelativeDate(article.publishedAt)}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Nenhum resultado encontrado para "{query}"
              </p>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Digite pelo menos 2 caracteres para buscar
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {results && results.data.length > 5 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <button
              onClick={() => onSearch(query)}
              className="w-full text-center text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Ver todos os {results.meta.total} resultados
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
