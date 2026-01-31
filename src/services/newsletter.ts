import { SITE_CONFIG } from '@/lib/constants'
import type { NewsletterSubscription } from '@/types'

export async function subscribeToNewsletter(data: NewsletterSubscription): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${SITE_CONFIG.apiUrl}/api/sites/${SITE_CONFIG.id}/newsletter/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Site-ID': SITE_CONFIG.id,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro ao se inscrever' }))
    throw new Error(error.message || 'Erro ao se inscrever na newsletter')
  }

  return response.json()
}
