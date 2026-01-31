import { useState } from 'react'
import { X } from 'lucide-react'
import ReviveAd from './ReviveAd'
import { REVIVE_CONFIG } from '@/lib/constants'

export default function StickyFooterAd() {
  const [isVisible, setIsVisible] = useState(true)

  if (!REVIVE_CONFIG.url || !isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="container-main py-2 relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
          aria-label="Fechar anúncio"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
        <ReviveAd
          zoneId={REVIVE_CONFIG.zones.stickyFooter}
          className="flex justify-center"
        />
      </div>
    </div>
  )
}
