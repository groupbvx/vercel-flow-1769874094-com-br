import { SITE_CONFIG } from '@/lib/constants'
import type { ContactFormData } from '@/types'

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${SITE_CONFIG.apiUrl}/api/sites/${SITE_CONFIG.id}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Site-ID': SITE_CONFIG.id,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro ao enviar mensagem' }))
    throw new Error(error.message || 'Erro ao enviar mensagem')
  }

  return response.json()
}
