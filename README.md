# TechPulse Daily

Your Daily Dose of Tech Innovation - Um site de tecnologia moderno construído com Next.js 14.

## Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Analytics**: PostHog
- **Ads**: Revive Adserver
- **Deploy**: Vercel

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar em produção
npm start
```

## Variáveis de Ambiente

Copie `.env.production` para `.env.local` e ajuste conforme necessário:

```bash
cp .env.production .env.local
```

## Estrutura do Projeto

```
src/
├── app/                    # App Router pages
│   ├── artigo/[slug]/     # Página de artigo
│   ├── categoria/[slug]/  # Página de categoria
│   ├── sobre/             # Página sobre
│   ├── contato/           # Página de contato
│   └── busca/             # Página de busca
├── components/
│   ├── layout/            # Header, Footer, Sidebar
│   ├── ui/                # Componentes reutilizáveis
│   └── ads/               # Componentes de anúncios
├── hooks/                 # Custom React hooks
├── lib/                   # Utilitários e constantes
├── services/              # API services
└── types/                 # TypeScript types
```

## Features

- ✅ Dark Mode
- ✅ Busca
- ✅ Newsletter
- ✅ SEO otimizado
- ✅ Analytics (PostHog)
- ✅ Ads (Revive)
- ✅ Responsivo
- ✅ Performance otimizada

## Licença

Proprietary - © TechPulse Daily
