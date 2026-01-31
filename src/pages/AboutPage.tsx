import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Target, Award, Zap } from 'lucide-react'
import { trackPageView } from '@/services/analytics'
import { generateMetaTitle } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'
import NewsletterForm from '@/components/ui/NewsletterForm'

export default function AboutPage() {
  useEffect(() => {
    document.title = generateMetaTitle('Sobre Nós')
    trackPageView('about')
  }, [])

  const values = [
    {
      icon: Target,
      title: 'Precisão',
      description: 'Informações verificadas e atualizadas sobre o mundo da tecnologia.',
    },
    {
      icon: Zap,
      title: 'Inovação',
      description: 'Sempre à frente das tendências, trazendo o que há de mais novo.',
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Construímos uma comunidade de entusiastas e profissionais de tecnologia.',
    },
    {
      icon: Award,
      title: 'Qualidade',
      description: 'Conteúdo de alta qualidade, escrito por especialistas da área.',
    },
  ]

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
          <li className="text-gray-900 dark:text-gray-100">Sobre</li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Sobre o {SITE_CONFIG.name}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Somos apaixonados por tecnologia e dedicados a trazer as melhores notícias, 
          tutoriais e análises para você ficar sempre atualizado no mundo digital.
        </p>
      </header>

      {/* Mission */}
      <section className="mb-16">
        <div className="card p-8 md:p-12 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
            <p className="text-lg text-white/90">
              Democratizar o acesso à informação tecnológica de qualidade, 
              capacitando desenvolvedores, entusiastas e profissionais de TI 
              a tomar decisões informadas e se manterem competitivos no mercado.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
          Nossos Valores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="card p-6 text-center">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-7 h-7 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Cover */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              O Que Cobrimos
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No {SITE_CONFIG.name}, você encontra uma ampla variedade de conteúdos 
              sobre o universo da tecnologia:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Notícias:</strong> As últimas novidades do mundo tech
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Tutoriais:</strong> Guias passo a passo para desenvolvedores
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Reviews:</strong> Análises detalhadas de produtos e serviços
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>IA & ML:</strong> Inteligência Artificial e Machine Learning
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Cloud:</strong> Computação em nuvem e DevOps
                </span>
              </li>
            </ul>
          </div>
          <div className="card p-8 bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Fique Conectado
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Inscreva-se na nossa newsletter e receba conteúdo exclusivo diretamente no seu email.
            </p>
            <NewsletterForm source="about-page" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Tem alguma dúvida ou sugestão?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Entre em contato conosco. Adoramos ouvir nossos leitores!
        </p>
        <Link to="/contato" className="btn-primary">
          Fale Conosco
        </Link>
      </section>
    </div>
  )
}
