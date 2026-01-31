import { config } from '../lib/config';

/**
 * Interface para artigo
 */
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  mainImage?: string;
  imageUrl?: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  category?: string;
  categorySlug?: string;
  readingTime?: number;
}

/**
 * Interface para resposta paginada
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

/**
 * Transforma URLs relativas de imagens para usar o proxy
 */
function transformImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  if (imageUrl.startsWith('/api/')) {
    return imageUrl.replace('/api/', '/api-proxy/api/');
  }
  
  return imageUrl;
}

/**
 * Transforma URLs de imagens dentro do conteúdo HTML
 */
function transformContentImages(content: string): string {
  if (!content) return content;
  
  let transformedContent = content.replace(/src="\/api\//g, 'src="/api-proxy/api/');
  transformedContent = transformedContent.replace(/src='\/api\//g, "src='/api-proxy/api/");
  
  return transformedContent;
}

/**
 * Mapeia um snapshot do backend para a interface Article
 */
function mapSnapshotToArticle(snapshot: any): Article {
  const currentLocale = config.locale.toLowerCase();
  const localeData = snapshot.locales?.find((l: any) => l.locale.toLowerCase() === currentLocale)
    || snapshot.locales?.[0]
    || {};

  const content = localeData.body || '';
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200) || 1;

  const transformedImageUrl = transformImageUrl(localeData.mainImage);
  const transformedContent = transformContentImages(content);

  return {
    id: snapshot.id,
    slug: snapshot.slug,
    title: localeData.title || '',
    excerpt: localeData.summary || '',
    content: transformedContent,
    mainImage: transformedImageUrl || undefined,
    imageUrl: transformedImageUrl || undefined,
    author: snapshot.author || undefined,
    publishedAt: snapshot.publishedAt || snapshot.updatedAt || new Date().toISOString(),
    updatedAt: snapshot.updatedAt || undefined,
    tags: snapshot.tags || [],
    category: snapshot.category || undefined,
    categorySlug: snapshot.categorySlug || undefined,
    readingTime: minutes,
  };
}

/**
 * Busca artigos com paginação
 */
export async function getArticles(params: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
  search?: string;
} = {}): Promise<PaginatedResponse<Article>> {
  const { page = 1, pageSize = 10, search, category, tag } = params;
  const offset = (page - 1) * pageSize;

  const queryParams = new URLSearchParams({
    limit: String(pageSize),
    offset: String(offset),
    ...(search && { q: search }),
    ...(category && { category }),
    ...(tag && { tag }),
    locale: config.locale,
  });

  try {
    const response = await fetch(
      `${config.apiUrl}/api/headless/sites-by-id/${config.siteId}?${queryParams}`,
      { next: { revalidate: 300 } } // Cache por 5 minutos
    );

    if (response.ok) {
      const data = await response.json();
      const articlesArray = data.articles || [];
      const mappedArticles = articlesArray.map(mapSnapshotToArticle);

      return {
        data: mappedArticles,
        meta: {
          total: data.stats?.totalArticles || mappedArticles.length,
          page,
          pageSize,
          totalPages: Math.ceil((data.stats?.totalArticles || mappedArticles.length) / pageSize),
        },
      };
    }
  } catch (error) {
    console.error('[ArticleService] Erro:', error);
  }

  // Fallback: retorna vazio
  return {
    data: [],
    meta: { total: 0, page, pageSize, totalPages: 0 },
  };
}

/**
 * Busca artigo em destaque
 */
export async function getFeaturedArticle(): Promise<Article | null> {
  const response = await getArticles({ pageSize: 1 });
  return response.data[0] || null;
}

/**
 * Busca artigos em destaque (múltiplos)
 */
export async function getFeaturedArticles(limit: number = 3): Promise<Article[]> {
  const response = await getArticles({ pageSize: limit });
  return response.data;
}

/**
 * Busca artigo por slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(
      `${config.apiUrl}/api/headless/sites-by-id/${config.siteId}/articles/${slug}?locale=${config.locale}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP ${response.status}`);
    }

    const snapshot = await response.json();
    return mapSnapshotToArticle(snapshot);
  } catch (error) {
    console.error('[ArticleService] Erro ao buscar artigo:', error);
    return null;
  }
}

/**
 * Busca artigos relacionados
 */
export async function getRelatedArticles(slug: string, limit = 3): Promise<Article[]> {
  const response = await getArticles({ pageSize: limit + 1 });
  return response.data.filter((a) => a.slug !== slug).slice(0, limit);
}

/**
 * Busca categorias disponíveis
 */
export async function getCategories(): Promise<string[]> {
  // Por enquanto, retorna categorias fixas
  // Em uma implementação completa, buscaria do backend
  return ['Geral', 'Novidades', 'Guia'];
}
