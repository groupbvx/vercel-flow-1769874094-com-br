import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function NotFoundPage() {
  useEffect(() => {
    document.title = `Página não encontrada | ${SITE_CONFIG.name}`
  }, [])

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="container-custom py-12">
        <div className="max-w-lg mx-auto text-center">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <span className="text-[150px] md:text-[200px] font-bold text-gray-100 dark:text-gray-800 select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center animate-pulse">
                <Search className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Página não encontrada
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Ops! A página que você está procurando não existe ou foi movida.
            Verifique o endereço ou navegue para outra seção.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Home className="h-5 w-5" />
              Ir para Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar
            </button>
          </div>

          {/* Suggestions */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Talvez você esteja procurando:
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/categoria/noticias"
                className="badge hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
              >
                Notícias
              </Link>
              <Link
                to="/categoria/tutoriais"
                className="badge hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
              >
                Tutoriais
              </Link>
              <Link
                to="/categoria/reviews"
                className="badge hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
              >
                Reviews
              </Link>
              <Link
                to="/sobre"
                className="badge hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
              >
                Sobre
              </Link>
              <Link
                to="/contato"
                className="badge hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
              >
                Contato
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
