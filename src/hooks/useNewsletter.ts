import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { subscribeToNewsletter } from '@/services/newsletter'
import { trackNewsletterSubscribe } from '@/services/analytics'

export function useNewsletter(source = 'unknown') {
  const [email, setEmail] = useState('')

  const mutation = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      trackNewsletterSubscribe(source)
      setEmail('')
    },
  })

  const subscribe = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (email) {
      mutation.mutate({ email, source })
    }
  }

  return {
    email,
    setEmail,
    subscribe,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  }
}
