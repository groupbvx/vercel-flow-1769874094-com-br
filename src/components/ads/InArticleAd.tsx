import ReviveAd from './ReviveAd'
import { REVIVE_CONFIG } from '@/lib/constants'

interface InArticleAdProps {
  position?: 1 | 2
}

export default function InArticleAd({ position = 1 }: InArticleAdProps) {
  if (!REVIVE_CONFIG.url) return null

  const zoneId = position === 1 
    ? REVIVE_CONFIG.zones.inArticle1 
    : REVIVE_CONFIG.zones.inArticle2

  return (
    <div className="my-8 py-4 border-y border-gray-200 dark:border-gray-700">
      <p className="text-xs text-gray-400 text-center mb-2">Publicidade</p>
      <ReviveAd
        zoneId={zoneId}
        className="flex justify-center"
      />
    </div>
  )
}
