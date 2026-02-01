'use client';

import { useState, FormEvent } from 'react';
import { NewsletterService } from '@/services/NewsletterService';
import { AnalyticsService } from '@/services/AnalyticsService';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  source?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'inline' | 'dark';
  title?: string;
  description?: string;
  buttonText?: string;
  successMessage?: string;
}

/**
 * NewsletterForm - Newsletter subscription form
 * Integrated with backend via NewsletterService
 */
export function NewsletterForm({
  source = 'newsletter_form',
  className,
  variant = 'default',
  title = 'Newsletter',
  description = 'Get the best tips delivered to your inbox.',
  buttonText = 'Subscribe',
  successMessage = 'Successfully subscribed!',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's a bot
    if (honeypot) return;

    if (!NewsletterService.validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');

    const response = await NewsletterService.subscribe({
      email,
      source,
    });

    if (response.success) {
      setSubmitted(true);
      setEmail('');
      AnalyticsService.captureNewsletterSubscribe(source, email);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  const isDark = variant === 'dark';

  if (submitted) {
    return (
      <div className={cn('text-center p-4', className)}>
        <div className={cn(
          'font-medium',
          isDark ? 'text-white' : 'text-green-600'
        )}>
          {successMessage}
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className={cn(
            'mt-2 text-sm transition-colors',
            isDark ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  if (variant === 'compact' || variant === 'dark') {
    return (
      <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
        {/* Honeypot */}
        <input
          type="text"
          name="website_url"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px]"
          aria-hidden="true"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          placeholder="Your email"
          className={cn(
            'flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50',
            isDark 
              ? 'bg-white/20 text-white placeholder-white/60 border border-white/30' 
              : 'bg-white border border-gray-300 text-gray-900'
          )}
          data-bvx-track="NEWSLETTER_INPUT"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50',
            isDark
              ? 'bg-white text-primary hover:bg-gray-100'
              : 'bg-primary text-white hover:bg-blue-600'
          )}
          data-bvx-track="NEWSLETTER_SUBMIT"
        >
          {loading ? '...' : buttonText}
        </button>
      </form>
    );
  }

  return (
    <div className={cn('p-6 bg-gray-50 dark:bg-gray-800 rounded-xl', className)}>
      {title && <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>}
      {description && <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot */}
        <input
          type="text"
          name="website_url"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px]"
          aria-hidden="true"
        />

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="Your best email"
            className={cn(
              'input',
              error && 'border-red-500'
            )}
            data-bvx-track="NEWSLETTER_INPUT"
            required
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3"
          data-bvx-track="NEWSLETTER_SUBMIT"
        >
          {loading ? 'Sending...' : buttonText}
        </button>
      </form>
    </div>
  );
}
