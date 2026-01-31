import { config } from '@/lib/config';

/**
 * Newsletter Service - Handles newsletter subscriptions
 */
export class NewsletterService {
  /**
   * Subscribe email to newsletter
   */
  static async subscribe(email: string, source: string): Promise<void> {
    const endpoint = config.newsletterEndpoint || `${config.apiUrl}/api/newsletter/subscribe`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        source,
        siteId: config.siteId,
        locale: config.locale,
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to subscribe');
    }
  }
}
