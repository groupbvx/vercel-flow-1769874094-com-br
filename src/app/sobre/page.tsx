import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Users, Zap, Shield, ChevronRight } from 'lucide-react';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: `Conheça o ${SITE_CONFIG.name} - sua fonte confiável de notícias, tutoriais e insights sobre tecnologia.`,
  openGraph: {
    title: `Sobre Nós | ${SITE_CONFIG.name}`,
    description: `Conheça o ${SITE_CONFIG.name} - sua fonte confiável de notícias, tutoriais e insights sobre tecnologia.`,
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Precisão',
      description: 'Entregamos informações verificadas e análises aprofundadas para manter você informado.',
    },
    {
      icon: Zap,
      title: 'Atualização',
      description: 'Cobertura rápida das últimas tendências e novidades do mundo tecnológico.',
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Construímos uma comunidade de profissionais e entusiastas de tecnologia.',
    },
    {
      icon: Shield,
      title: 'Integridade',
      description: 'Reviews imparciais e conteúdo independente para decisões informadas.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-700 dark:text-gray-300">Sobre</span>
      </nav>

      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Sobre o {SITE_CONFIG.name}
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {SITE_CONFIG.tagline}. Somos apaixonados por tecnologia e dedicados a trazer o melhor conteúdo para profissionais e entusiastas.
        </p>
      </section>

      {/* Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Nossa Missão
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              No {SITE_CONFIG.name}, nossa missão é democratizar o acesso ao conhecimento tecnológico. Acreditamos que informação de qualidade deve estar disponível para todos.
            </p>
            <p>
              Desde tutoriais práticos até análises profundas de tendências, nosso objetivo é capacitar profissionais e entusiastas a se manterem atualizados em um mundo digital em constante evolução.
            </p>
            <p>
              Trabalhamos incansavelmente para entregar conteúdo original, verificado e relevante que faça diferença na sua jornada profissional.
            </p>
          </div>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary-500 to-accent-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-24">
              <Image
                src="/logo-dark.svg"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Nossos Valores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center">
                <value.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Cover */}
      <section className="mb-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          O Que Cobrimos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Notícias Tech', desc: 'Últimas novidades do mundo da tecnologia, startups e inovação.' },
            { title: 'Tutoriais', desc: 'Guias práticos e passo a passo para desenvolvedores de todos os níveis.' },
            { title: 'Reviews', desc: 'Análises detalhadas de softwares, ferramentas e produtos tecnológicos.' },
            { title: 'IA & Machine Learning', desc: 'Exploração profunda do universo da inteligência artificial.' },
            { title: 'Desenvolvimento', desc: 'Dicas, melhores práticas e tendências em programação.' },
            { title: 'Cloud & DevOps', desc: 'Guias sobre infraestrutura, containers e automação.' },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Faça Parte da Nossa Comunidade
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Receba conteúdo exclusivo, novidades e atualizações diretamente no seu e-mail.
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterForm variant="hero" />
        </div>
      </section>
    </div>
  );
}
