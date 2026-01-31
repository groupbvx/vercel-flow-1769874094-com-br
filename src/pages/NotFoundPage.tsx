import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { trackPageView } from '@/services/analytics'
import { generateMetaTitle } from '@/lib/utils'

export default function NotFoundPage() {
  useEffect(() => {
    document.title = generateMetaTitle('Página não encontrada')
    trackPageView('404')
  }, [])

  return (
    <div className="container-main py-16 min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-primary-500 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Página não encontrada
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          A página que você está procurando não existe, foi removida ou está temporariamente indisponível.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Ir para Home
          </Link>
          <Link
            to="/busca"
            className="btn-secondary inline-flex items-center justify-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar Artigos
          </Link>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-6 text-primary-500 hover:text-primary-600 inline-flex items-center transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar à página anterior
        </button>
      </div>
    </div>
  )
}
