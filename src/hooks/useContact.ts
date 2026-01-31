import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { submitContactForm } from '@/services/contact'
import type { ContactFormData } from '@/types'

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export function useContact() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      setFormData(initialFormData)
    },
  })

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (formData.name && formData.email && formData.message) {
      mutation.mutate(formData)
    }
  }

  return {
    formData,
    updateField,
    handleSubmit,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  }
}
