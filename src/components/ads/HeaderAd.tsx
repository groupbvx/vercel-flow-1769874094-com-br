import ReviveAd from './ReviveAd'
import { REVIVE_CONFIG } from '@/lib/constants'

export default function HeaderAd() {
  if (!REVIVE_CONFIG.url) return null

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-2">
      <div className="container-main">
        <ReviveAd
          zoneId={REVIVE_CONFIG.zones.header}
          className="flex justify-center"
        />
      </div>
    </div>
  )
}
