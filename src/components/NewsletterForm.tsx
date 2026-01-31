'use client';

import { useState } from 'react';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NewsletterService } from '@/services/NewsletterService';
import { AnalyticsService } from '@/services/AnalyticsService';

interface NewsletterFormProps {
  source: string;
  variant?: 'light' | 'dark';
  className?: string;
  showIcon?: boolean;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterForm({
  source,
  variant = 'light',
  className,
  showIcon = true,
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      await NewsletterService.subscribe(email, source);
      setStatus('success');
      setEmail('');
      
      // Track conversion
      AnalyticsService.captureNewsletterSubscription(email, source);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Subscription failed. Please try again.');
    }
  };

  const isDark = variant === 'dark';

  if (status === 'success') {
    return (
      <div className={cn(
        'flex items-center justify-center gap-2 p-4 rounded-lg',
        isDark ? 'bg-white/10 text-white' : 'bg-green-50 text-green-700',
        className
      )}>
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">Thanks for subscribing!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div className={cn(
        'flex flex-col sm:flex-row gap-2',
        isDark ? 'text-white' : ''
      )}>
        <div className="relative flex-1">
          {showIcon && (
            <Mail className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5',
              isDark ? 'text-white/50' : 'text-gray-400'
            )} />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading'}
            className={cn(
              'w-full py-3 rounded-lg transition-all',
              showIcon ? 'pl-10 pr-4' : 'px-4',
              isDark 
                ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40' 
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20',
              'focus:outline-none disabled:opacity-50'
            )}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !email.trim()}
          className={cn(
            'px-6 py-3 font-medium rounded-lg transition-all',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'flex items-center justify-center gap-2',
            isDark
              ? 'bg-white text-primary hover:bg-gray-100'
              : 'bg-primary text-white hover:bg-blue-600'
          )}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>

      {status === 'error' && (
        <div className={cn(
          'flex items-center gap-2 mt-2 text-sm',
          isDark ? 'text-red-300' : 'text-red-600'
        )}>
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      <p className={cn(
        'text-xs mt-2',
        isDark ? 'text-white/60' : 'text-gray-500'
      )}>
        No spam, unsubscribe at any time.
      </p>
    </form>
  );
}
