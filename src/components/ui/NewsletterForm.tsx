import { useState, useEffect } from 'react'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useNewsletter } from '@/hooks/useNewsletter'
import { cn } from '@/lib/utils'

interface NewsletterFormProps {
  source?: string
  variant?: 'light' | 'dark'
}

export default function NewsletterForm({ source = 'unknown', variant = 'light' }: NewsletterFormProps) {
  const {
    email,
    setEmail,
    subscribe,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
  } = useNewsletter(source)

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => reset(), 5000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, reset])

  if (isSuccess) {
    return (
      <div className={cn(
        'flex items-center space-x-2 p-4 rounded-lg',
        variant === 'dark'
          ? 'bg-green-900/20 text-green-400'
          : 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
      )}>
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm">Inscrição realizada com sucesso!</span>
      </div>
    )
  }

  return (
    <form onSubmit={subscribe} className="space-y-3">
      <div className="relative">
        <Mail className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5',
          variant === 'dark' ? 'text-gray-500' : 'text-gray-400 dark:text-gray-500'
        )} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          className={cn(
            'w-full pl-10 pr-4 py-3 rounded-lg border transition-colors',
            variant === 'dark'
              ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-primary-500'
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:border-primary-500 dark:focus:border-primary-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20'
          )}
        />
      </div>

      {isError && (
        <div className={cn(
          'flex items-center space-x-2 text-sm',
          variant === 'dark' ? 'text-red-400' : 'text-red-500 dark:text-red-400'
        )}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error?.message || 'Erro ao se inscrever. Tente novamente.'}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          'w-full py-3 rounded-lg font-medium transition-all',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variant === 'dark'
            ? 'bg-primary-500 text-white hover:bg-primary-600'
            : 'bg-primary-500 text-white hover:bg-primary-600',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
        )}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
        ) : (
          'Inscrever-se'
        )}
      </button>

      <p className={cn(
        'text-xs text-center',
        variant === 'dark' ? 'text-gray-500' : 'text-gray-500 dark:text-gray-400'
      )}>
        Sem spam. Cancele quando quiser.
      </p>
    </form>
  )
}
