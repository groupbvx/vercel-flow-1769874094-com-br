import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useContact } from '@/hooks/useContact'
import { trackPageView } from '@/services/analytics'
import { generateMetaTitle, cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

export default function ContactPage() {
  const {
    formData,
    updateField,
    handleSubmit,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useContact()

  useEffect(() => {
    document.title = generateMetaTitle('Contato')
    trackPageView('contact')
  }, [])

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
          <li className="text-gray-900 dark:text-gray-100">Contato</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Entre em Contato
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Tem alguma dúvida, sugestão ou quer colaborar? Adoramos ouvir nossos leitores!
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="card p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Email</h3>
                <a
                  href="mailto:contato@techpulsedaily.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  contato@techpulsedaily.com
                </a>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Tempo de Resposta</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Geralmente respondemos em até 48 horas úteis.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Localização</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  100% Digital<br />Brasil
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Envie sua mensagem
            </h2>

            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Mensagem enviada!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Obrigado pelo contato. Responderemos em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      required
                      className="input"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      required
                      className="input"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                    className="input"
                    placeholder="Sobre o que você quer falar?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    required
                    rows={5}
                    className="input resize-none"
                    placeholder="Escreva sua mensagem..."
                  />
                </div>

                {isError && (
                  <div className="flex items-center space-x-2 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error?.message || 'Erro ao enviar mensagem. Tente novamente.'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    'btn-primary w-full sm:w-auto',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
