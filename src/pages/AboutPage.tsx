import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Target, Award, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import Breadcrumb from '@/components/ui/Breadcrumb'
import NewsletterForm from '@/components/ui/NewsletterForm'

export default function AboutPage() {
  useEffect(() => {
    document.title = `Sobre | ${SITE_CONFIG.name}`
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-500 to-accent-500 py-12">
        <div className="container-custom">
          <Breadcrumb
            items={[{ label: 'Sobre' }]}
            className="mb-4 text-white/70"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Sobre o {SITE_CONFIG.name}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {SITE_CONFIG.tagline}
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Mission */}
          <div className="prose dark:prose-dark max-w-none mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Nossa Missão
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              O {SITE_CONFIG.name} nasceu com o objetivo de democratizar o acesso à informação 
              sobre tecnologia. Acreditamos que todos devem ter acesso a conteúdo de qualidade 
              sobre as últimas tendências, inovações e ferramentas do mundo tech.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Nossa equipe de especialistas trabalha diariamente para trazer as notícias mais 
              relevantes, tutoriais detalhados e análises aprofundadas sobre software, hardware, 
              inteligência artificial e muito mais.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-xl mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Qualidade
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Conteúdo verificado e revisado por especialistas da área.
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-500 rounded-xl mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Comunidade
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Uma comunidade engajada de entusiastas de tecnologia.
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 dark:bg-accent-900/30 text-accent-500 rounded-xl mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Inovação
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sempre na vanguarda das tendências tecnológicas.
              </p>
            </div>
          </div>

          {/* What We Cover */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              O Que Cobrimos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Notícias de Tecnologia',
                'Reviews de Produtos',
                'Tutoriais e Guias',
                'Inteligência Artificial',
                'Desenvolvimento de Software',
                'Cloud Computing',
                'Cybersegurança',
                'Startups e Inovação',
              ].map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full" />
                  <span className="text-gray-700 dark:text-gray-300">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="card p-8 text-center">
            <Mail className="h-12 w-12 text-primary-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Entre em Contato
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tem alguma sugestão, dúvida ou quer fazer uma parceria? 
              Adoraríamos ouvir você!
            </p>
            <Link to="/contato" className="btn-primary">
              Enviar Mensagem
            </Link>
          </div>

          {/* Newsletter */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl text-white text-center">
            <h2 className="text-2xl font-bold mb-2">
              Fique Atualizado
            </h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Inscreva-se na nossa newsletter e receba as últimas notícias 
              diretamente no seu email.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
