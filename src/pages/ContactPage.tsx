import { useState, useEffect, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Send, Check, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { submitContactForm } from '@/services/api'
import type { ContactFormData } from '@/types'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const { mutate: submit, isPending, isSuccess, isError, reset } = useMutation({
    mutationFn: submitContactForm,
  })

  useEffect(() => {
    document.title = `Contato | ${SITE_CONFIG.name}`
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (isError) reset()
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen">
        <header className="bg-gradient-to-r from-primary-500 to-accent-500 py-12">
          <div className="container-custom">
            <Breadcrumb
              items={[{ label: 'Contato' }]}
              className="mb-4 text-white/70"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Contato
            </h1>
          </div>
        </header>

        <section className="container-custom py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-500 rounded-full mb-6">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Mensagem Enviada!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Obrigado por entrar em contato. Responderemos em breve.
            </p>
            <button
              onClick={() => {
                reset()
                setFormData({ name: '', email: '', subject: '', message: '' })
              }}
              className="btn-primary"
            >
              Enviar nova mensagem
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-500 to-accent-500 py-12">
        <div className="container-custom">
          <Breadcrumb
            items={[{ label: 'Contato' }]}
            className="mb-4 text-white/70"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Entre em Contato
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Tem alguma pergunta ou sugestão? Adoraríamos ouvir você!
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Informações de Contato
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Email
                  </h3>
                  <a
                    href="mailto:contato@techpulsedaily.com"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    contato@techpulsedaily.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-secondary-100 dark:bg-secondary-900/30 text-secondary-500 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Telefone
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    +55 (11) 99999-9999
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent-100 dark:bg-accent-900/30 text-accent-500 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Localização
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    São Paulo, Brasil
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Horário de Atendimento
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Segunda a Sexta: 9h às 18h<br />
                Sábado: 9h às 13h
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Envie sua Mensagem
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="general">Dúvida Geral</option>
                    <option value="suggestion">Sugestão de Conteúdo</option>
                    <option value="partnership">Parceria</option>
                    <option value="advertising">Publicidade</option>
                    <option value="bug">Reportar Problema</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Digite sua mensagem..."
                  />
                </div>

                {isError && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Erro ao enviar mensagem. Por favor, tente novamente.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary w-full md:w-auto flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
