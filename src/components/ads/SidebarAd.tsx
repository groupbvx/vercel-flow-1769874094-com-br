import ReviveAd from './ReviveAd'
import { REVIVE_CONFIG } from '@/lib/constants'

export default function SidebarAd() {
  if (!REVIVE_CONFIG.url) return null

  return (
    <div className="card p-4">
      <ReviveAd
        zoneId={REVIVE_CONFIG.zones.sidebar}
        className="flex justify-center"
      />
    </div>
  )
}
