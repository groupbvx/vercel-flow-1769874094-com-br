import { useEffect, useRef } from 'react'
import { REVIVE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface ReviveAdProps {
  zoneId: string
  className?: string
}

export default function ReviveAd({ zoneId, className }: ReviveAdProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (!REVIVE_CONFIG.url || !zoneId) return

    const container = containerRef.current
    if (!container) return

    // Unique ID for this ad placement
    const placementId = `revive-${zoneId}-${Math.random().toString(36).substr(2, 9)}`
    container.id = placementId

    // Create the invocation code
    const invocationCode = document.createElement('ins')
    invocationCode.setAttribute('data-revive-zoneid', zoneId)
    invocationCode.setAttribute('data-revive-id', REVIVE_CONFIG.id)
    container.appendChild(invocationCode)

    // Load Revive script if not already loaded
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script')
      script.src = `${REVIVE_CONFIG.url}/www/delivery/asyncjs.php`
      script.async = true
      document.body.appendChild(script)
      scriptLoadedRef.current = true
    } else {
      // Refresh ads if script already loaded
      if (typeof (window as any).reviveAsync !== 'undefined') {
        (window as any).reviveAsync[REVIVE_CONFIG.id]?.refresh()
      }
    }

    return () => {
      // Cleanup
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [zoneId])

  if (!REVIVE_CONFIG.url || !zoneId) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={cn('ad-container', className)}
      aria-label="Anúncio"
    />
  )
}
