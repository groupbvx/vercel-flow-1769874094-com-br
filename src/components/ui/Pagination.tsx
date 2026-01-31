import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = []
  const showEllipsisStart = currentPage > 3
  const showEllipsisEnd = currentPage < totalPages - 2

  // Always show first page
  pages.push(1)

  if (showEllipsisStart) {
    pages.push('...')
  }

  // Show pages around current
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (!pages.includes(i)) {
      pages.push(i)
    }
  }

  if (showEllipsisEnd) {
    pages.push('...')
  }

  // Always show last page
  if (totalPages > 1 && !pages.includes(totalPages)) {
    pages.push(totalPages)
  }

  return (
    <nav className="flex items-center justify-center space-x-2" aria-label="Paginação">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'p-2 rounded-lg transition-colors',
          currentPage === 1
            ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={cn(
            'min-w-[40px] h-10 rounded-lg text-sm font-medium transition-colors',
            page === currentPage
              ? 'bg-primary-500 text-white'
              : page === '...'
              ? 'cursor-default text-gray-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'p-2 rounded-lg transition-colors',
          currentPage === totalPages
            ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
        aria-label="Próxima página"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  )
}
