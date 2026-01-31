import { useState, type FormEvent } from 'react'
import { Send, Check, Loader2 } from 'lucide-react'
import { useNewsletter } from '@/hooks/useNewsletter'
import { cn } from '@/lib/utils'

interface NewsletterFormProps {
  variant?: 'default' | 'sidebar' | 'footer' | 'inline'
}

export default function NewsletterForm({ variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const { mutate: subscribe, isPending, isSuccess, isError, reset } = useNewsletter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      subscribe({ email: email.trim() })
    }
  }

  if (isSuccess) {
    return (
      <div className={cn(
        'flex items-center gap-2 text-secondary-500',
        variant === 'footer' && 'justify-center'
      )}>
        <Check className="h-5 w-5" />
        <span className="text-sm font-medium">Inscrição realizada com sucesso!</span>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (isError) reset()
          }}
          placeholder="seu@email.com"
          className="input-field flex-1"
          required
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary px-4"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>
    )
  }

  if (variant === 'footer') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (isError) reset()
          }}
          placeholder="seu@email.com"
          className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <span>Inscrever</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
        {isError && (
          <p className="text-red-400 text-sm mt-2">
            Erro ao inscrever. Tente novamente.
          </p>
        )}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (isError) reset()
        }}
        placeholder="seu@email.com"
        className="input-field"
        required
        disabled={isPending}
      />
      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <span>Inscrever-se</span>
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
      {isError && (
        <p className="text-red-500 dark:text-red-400 text-sm">
          Erro ao inscrever. Tente novamente.
        </p>
      )}
    </form>
  )
}
