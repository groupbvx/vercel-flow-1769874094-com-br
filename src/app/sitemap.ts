import { MetadataRoute } from 'next';
import { getArticles, getCategories } from '@/services/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vercel-flow-1769874094.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Add categories
  try {
    const categories = await getCategories();
    const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${SITE_URL}/categoria/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));
    baseUrls.push(...categoryUrls);
  } catch {
    // Continue without categories
  }

  // Add articles
  try {
    const { data: articles } = await getArticles(1, 100);
    const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${SITE_URL}/artigo/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
    baseUrls.push(...articleUrls);
  } catch {
    // Continue without articles
  }

  return baseUrls;
}
