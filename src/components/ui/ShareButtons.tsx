import { Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-react'
import { useState } from 'react'
import { getShareUrl, cn } from '@/lib/utils'
import { trackShare } from '@/services/posthog'

interface ShareButtonsProps {
  url: string
  title: string
  articleId: string
  variant?: 'horizontal' | 'vertical'
}

export default function ShareButtons({ url, title, articleId, variant = 'horizontal' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const shareUrl = getShareUrl(platform, url, title)
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
    trackShare(platform, articleId)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      trackShare('copy_link', articleId)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error('Failed to copy link')
    }
  }

  const buttonClasses = 'p-2 rounded-lg transition-colors'

  return (
    <div className={cn(
      'flex gap-2',
      variant === 'vertical' && 'flex-col'
    )}>
      <button
        onClick={() => handleShare('twitter')}
        className={cn(buttonClasses, 'text-gray-600 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 dark:text-gray-400')}
        title="Compartilhar no Twitter"
        aria-label="Compartilhar no Twitter"
      >
        <Twitter className="h-5 w-5" />
      </button>
      <button
        onClick={() => handleShare('facebook')}
        className={cn(buttonClasses, 'text-gray-600 hover:text-[#4267B2] hover:bg-[#4267B2]/10 dark:text-gray-400')}
        title="Compartilhar no Facebook"
        aria-label="Compartilhar no Facebook"
      >
        <Facebook className="h-5 w-5" />
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className={cn(buttonClasses, 'text-gray-600 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 dark:text-gray-400')}
        title="Compartilhar no LinkedIn"
        aria-label="Compartilhar no LinkedIn"
      >
        <Linkedin className="h-5 w-5" />
      </button>
      <button
        onClick={handleCopyLink}
        className={cn(
          buttonClasses,
          copied 
            ? 'text-secondary-500 bg-secondary-500/10' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'
        )}
        title={copied ? 'Link copiado!' : 'Copiar link'}
        aria-label="Copiar link"
      >
        {copied ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />}
      </button>
    </div>
  )
}
