import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes CSS com suporte a Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata data para exibição
 */
export function formatDate(date: string | Date, locale: string = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Formata data longa
 */
export function formatDateLong(date: string | Date, locale: string = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Formata data relativa (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

/**
 * Formata número
 */
export function formatNumber(num: number, locale: string = 'en-US'): string {
  return num.toLocaleString(locale);
}

/**
 * Formata moeda
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return value.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}

/**
 * Trunca texto com ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Gera slug a partir de texto
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Calcula tempo de leitura
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Processa URL de imagem
 * Retorna a URL correta ou um placeholder
 */
export function getImageUrl(imageUrl: string | null | undefined, fallback: string = '/placeholder.jpg'): string {
  if (!imageUrl) return fallback;
  
  // Se já é uma URL completa, retorna
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Se começa com /, é relativa ao domínio
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  return fallback;
}

/**
 * Extrai texto puro de HTML
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Gera ID único
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Verifica se está no cliente (browser)
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Alias para isClient - verificação de ambiente browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Verifica se é mobile
 */
export function isMobile(): boolean {
  if (!isClient()) return false;
  return window.innerWidth < 768;
}

/**
 * Copia texto para clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isClient()) return false;
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para navegadores mais antigos
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
}

/**
 * Aguarda um tempo (para uso com async/await)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Capitaliza a primeira letra
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Extrai headings de conteúdo HTML para Table of Contents
 */
export function extractHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  if (!content) return [];
  
  const headings: Array<{ id: string; text: string; level: number }> = [];
  const headingRegex = /<h([2-4])[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h[2-4]>/gi;
  
  let match;
  let counter = 0;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1], 10);
    const existingId = match[2];
    const text = stripHtml(match[3]);
    
    if (text) {
      const id = existingId || `heading-${slugify(text)}-${counter}`;
      headings.push({ id, text, level });
      counter++;
    }
  }
  
  return headings;
}

/**
 * Adiciona IDs aos headings no HTML para navegação
 */
export function addHeadingIds(content: string): string {
  if (!content) return content;
  
  let counter = 0;
  
  return content.replace(
    /<h([2-4])([^>]*)>(.*?)<\/h[2-4]>/gi,
    (match, level, attrs, text) => {
      // Se já tem id, manter
      if (attrs.includes('id="')) return match;
      
      const plainText = stripHtml(text);
      const id = `heading-${slugify(plainText)}-${counter}`;
      counter++;
      
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    }
  );
}
