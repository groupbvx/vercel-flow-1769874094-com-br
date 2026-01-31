import { Twitter, Facebook, Linkedin, Link2, Share2 } from 'lucide-react'
import { shareUrl, cn } from '@/lib/utils'
import { trackShare } from '@/services/analytics'
import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  title: string
  articleId: string
  variant?: 'default' | 'compact'
}

export default function ShareButtons({ url, title, articleId, variant = 'default' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp') => {
    trackShare(platform, articleId)
    window.open(shareUrl(platform, url, title), '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      trackShare('copy', articleId)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const buttonClass = cn(
    'p-2 rounded-lg transition-colors',
    variant === 'compact' ? 'p-1.5' : 'p-2'
  )

  const iconClass = variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <div className="flex items-center space-x-2">
      {variant === 'default' && (
        <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">Compartilhar:</span>
      )}

      <button
        onClick={() => handleShare('twitter')}
        className={cn(buttonClass, 'hover:bg-[#1DA1F2]/10 text-[#1DA1F2]')}
        aria-label="Compartilhar no Twitter"
        title="Twitter"
      >
        <Twitter className={iconClass} />
      </button>

      <button
        onClick={() => handleShare('facebook')}
        className={cn(buttonClass, 'hover:bg-[#4267B2]/10 text-[#4267B2]')}
        aria-label="Compartilhar no Facebook"
        title="Facebook"
      >
        <Facebook className={iconClass} />
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className={cn(buttonClass, 'hover:bg-[#0A66C2]/10 text-[#0A66C2]')}
        aria-label="Compartilhar no LinkedIn"
        title="LinkedIn"
      >
        <Linkedin className={iconClass} />
      </button>

      <button
        onClick={handleCopyLink}
        className={cn(
          buttonClass,
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          copied ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'
        )}
        aria-label={copied ? 'Link copiado!' : 'Copiar link'}
        title={copied ? 'Link copiado!' : 'Copiar link'}
      >
        <Link2 className={iconClass} />
      </button>
    </div>
  )
}
