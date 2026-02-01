import { config } from '../lib/config';

/**
 * Interface para dados de inscrição
 */
export interface NewsletterSubscription {
  email: string;
  name?: string;
  source?: string;
}

/**
 * Interface para resposta da API
 */
export interface NewsletterResponse {
  success: boolean;
  message: string;
}

/**
 * Retorna o endpoint da newsletter
 */
function getEndpoint(): string {
  return config.newsletterEndpoint || `${config.apiUrl}/api/public/newsletter/subscribe`;
}

/**
 * Inscreve email na newsletter
 */
export async function subscribe(data: NewsletterSubscription): Promise<NewsletterResponse> {
  try {
    const response = await fetch(getEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        websiteId: config.siteId,
        source: data.source || 'website',
        website_url: '', // Honeypot field - deve estar vazio
      }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('[NewsletterService] Resposta não é JSON');
      throw new Error('Erro de configuração da API');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return {
        success: false,
        message: error.message || 'Erro ao inscrever. Tente novamente.',
      };
    }

    await response.json();

    return {
      success: true,
      message: 'Inscrição realizada com sucesso!',
    };
  } catch (error) {
    console.error('[NewsletterService] Erro:', error);
    return {
      success: false,
      message: 'Erro de conexão. Verifique sua internet.',
    };
  }
}

/**
 * Valida formato de email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Export como objeto para compatibilidade com padrão existente
export const NewsletterService = {
  subscribe,
  validateEmail,
};
