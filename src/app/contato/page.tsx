'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${SITE_CONFIG.apiUrl}/api/v1/sites/${SITE_CONFIG.id}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Não foi possível enviar sua mensagem. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Mensagem Enviada!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Obrigado por entrar em contato. Responderemos o mais breve possível.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-700 dark:text-gray-300">Contato</span>
      </nav>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Entre em Contato
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Tem uma dúvida, sugestão ou proposta? Adoraríamos ouvir você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Informações de Contato
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">E-mail</p>
                    <a
                      href={`mailto:contato@${SITE_CONFIG.url.replace('https://', '')}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600"
                    >
                      contato@{SITE_CONFIG.url.replace('https://', '')}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Localização</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      São Paulo, Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Resposta Rápida
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Respondemos todas as mensagens em até 48 horas úteis. Para questões urgentes, entre em contato diretamente por e-mail.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border',
                      'bg-gray-50 dark:bg-gray-700',
                      'border-gray-300 dark:border-gray-600',
                      'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                      'placeholder:text-gray-400'
                    )}
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border',
                      'bg-gray-50 dark:bg-gray-700',
                      'border-gray-300 dark:border-gray-600',
                      'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                      'placeholder:text-gray-400'
                    )}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assunto *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border',
                    'bg-gray-50 dark:bg-gray-700',
                    'border-gray-300 dark:border-gray-600',
                    'focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                  )}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="general">Pergunta Geral</option>
                  <option value="partnership">Parceria / Publicidade</option>
                  <option value="feedback">Feedback</option>
                  <option value="bug">Reportar Problema</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border resize-none',
                    'bg-gray-50 dark:bg-gray-700',
                    'border-gray-300 dark:border-gray-600',
                    'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                    'placeholder:text-gray-400'
                  )}
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'mt-6 w-full py-4 px-6 rounded-lg font-semibold',
                  'bg-primary-600 text-white',
                  'hover:bg-primary-700 transition-colors',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'flex items-center justify-center gap-2'
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
