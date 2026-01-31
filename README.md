# BVX Next.js Base Template

Template base para geração de sites BVX com Next.js 14 (App Router).

## Serviços Obrigatórios

### ArticleService
Busca artigos do backend BVX.

```tsx
import { getArticles, getArticleBySlug, getFeaturedArticle } from '@/services/ArticleService';

// Buscar artigos paginados
const { data, meta } = await getArticles({ page: 1, pageSize: 10 });

// Buscar artigo por slug
const article = await getArticleBySlug('meu-artigo');

// Buscar artigo em destaque
const featured = await getFeaturedArticle();
```

### NewsletterService
Inscrição na newsletter integrada ao backend.

```tsx
import { NewsletterService } from '@/services/NewsletterService';

// Validar email
if (NewsletterService.validateEmail(email)) {
  const response = await NewsletterService.subscribe({ email, source: 'footer' });
}
```

### AnalyticsService
Tracking com PostHog.

```tsx
import { AnalyticsService } from '@/services/AnalyticsService';

// Inicializar (automático via Scripts component)
await AnalyticsService.initialize();

// Capturar eventos
AnalyticsService.captureArticleView({ slug, title, category });
AnalyticsService.captureToolUsed('calculadora', 'calculator', 'finance');
```

## Hooks Obrigatórios

### useScrollDepth
Rastreia scroll em páginas de artigo.

```tsx
import { useScrollDepth } from '@/hooks/useScrollDepth';

function ArticleDetail({ article }) {
  // IMPORTANTE: Chamar ANTES de qualquer return condicional
  useScrollDepth(article?.id, article?.slug, !!article, 50);
  
  if (!article) return null;
  return <div>...</div>;
}
```

### useSearchTracking
Rastreia buscas.

```tsx
import { useSearchTracking, trackSearchResultClick } from '@/hooks/useSearchTracking';

function SearchPage({ query, results }) {
  useSearchTracking(query, results.length, 'search-page');
  
  return (
    <ul>
      {results.map((r, i) => (
        <a onClick={() => trackSearchResultClick(query, i, r.title)}>
          {r.title}
        </a>
      ))}
    </ul>
  );
}
```

### useToolTracking
Rastreia uso de calculadoras/ferramentas.

```tsx
import { trackToolUsed } from '@/hooks/useToolTracking';

function Calculator() {
  const handleCalculate = () => {
    // lógica...
    trackToolUsed('juros_compostos', 'calculator', 'finance');
  };
}
```

## Componentes Obrigatórios

### Scripts
Inicializa PostHog e Revive Ads. **DEVE estar no layout principal.**

```tsx
// app/layout.tsx
import { Scripts } from '@/components/Scripts';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Scripts />
        {children}
      </body>
    </html>
  );
}
```

### AdSpot
Exibe anúncios Revive nas zonas corretas.

```tsx
import { AdSpot } from '@/components/AdSpot';

<AdSpot position="header" />
<AdSpot position="sidebar" />
<AdSpot position="in-content" />
<AdSpot position="sticky-bottom" />
```

### NewsletterForm
Formulário de newsletter integrado.

```tsx
import { NewsletterForm } from '@/components/NewsletterForm';

<NewsletterForm source="footer" variant="compact" />
<NewsletterForm 
  title="Newsletter" 
  description="Receba nossas dicas"
  source="article_cta"
/>
```

## Variáveis de Ambiente

```env
# Site
NEXT_PUBLIC_SITE_ID=xxx
NEXT_PUBLIC_SITE_NAME=Meu Site
NEXT_PUBLIC_SITE_URL=https://meusite.com
NEXT_PUBLIC_LOCALE=pt-BR

# API
NEXT_PUBLIC_API_URL=https://api.bvx.com

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Ads (Revive)
NEXT_PUBLIC_REVIVE_URL=https://ads.bvx.com
NEXT_PUBLIC_REVIVE_ID=xxx
NEXT_PUBLIC_REVIVE_ZONE_HEADER=1
NEXT_PUBLIC_REVIVE_ZONE_SIDEBAR=2
NEXT_PUBLIC_REVIVE_ZONE_INARTICLE_1=3
NEXT_PUBLIC_REVIVE_ZONE_STICKY_FOOTER=4
```

## Regras de Ouro

1. **NUNCA criar dados mockados** - Use sempre os serviços reais
2. **Rota de artigo: `/artigo/[slug]`** (SINGULAR) - NUNCA `/artigos/[slug]`
3. **Hooks ANTES de returns condicionais**
4. **Scripts component no layout** - Obrigatório para analytics/ads
5. **Honeypot em formulários** - Campo `website_url` oculto
