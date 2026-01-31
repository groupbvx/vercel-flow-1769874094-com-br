import { useEffect, useRef } from 'react'
import { REVIVE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface ReviveAdProps {
  zoneId: string
  className?: string
}

declare global {
  interface Window {
    reviveAsync?: Record<string, {
      id: string
      zones: Array<{
        zoneid: string
        seq: number
      }>
    }>
  }
}

export default function ReviveAd({ zoneId, className }: ReviveAdProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (!REVIVE_CONFIG.url || !zoneId || initialized.current) {
      return
    }

    initialized.current = true

    const loadRevive = () => {
      const scriptId = 'revive-script'
      let script = document.getElementById(scriptId) as HTMLScriptElement | null

      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.src = `${REVIVE_CONFIG.url}/www/delivery/asyncjs.php`
        script.async = true
        document.head.appendChild(script)
      }

      script.onload = () => {
        if (!window.reviveAsync) {
          window.reviveAsync = {}
        }

        const asyncId = REVIVE_CONFIG.id

        if (!window.reviveAsync[asyncId]) {
          window.reviveAsync[asyncId] = {
            id: asyncId,
            zones: [],
          }
        }

        const seq = window.reviveAsync[asyncId].zones.length

        window.reviveAsync[asyncId].zones.push({
          zoneid: zoneId,
          seq: seq,
        })

        if (containerRef.current) {
          const ins = document.createElement('ins')
          ins.dataset.reviveZoneid = zoneId
          ins.dataset.reviveId = asyncId
          ins.dataset.reviveSeq = seq.toString()
          containerRef.current.appendChild(ins)
        }
      }
    }

    loadRevive()
  }, [zoneId])

  if (!REVIVE_CONFIG.url || !zoneId) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={cn('revive-ad flex items-center justify-center min-h-[90px]', className)}
    />
  )
}
