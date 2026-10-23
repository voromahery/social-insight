import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import type { GeographicMarket } from '../../types'
import { GEOGRAPHIC_MARKETS } from '../../data'

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function FlyToMarket({ market }: { market: GeographicMarket | undefined }) {
  const map = useMap()
  useEffect(() => {
    if (market?.lat !== undefined && market?.lng !== undefined) {
      map.flyTo([market.lat, market.lng], 5, { duration: 1.2 })
    } else {
      map.flyTo([20, 0], 2, { duration: 1.2 })
    }
  }, [market, map])
  return null
}

interface GeographicMapProps {
  markets?: GeographicMarket[]
  focusedMarket?: GeographicMarket
  height?: string
}

function formatReach(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`
  return `${(n / 1e3).toFixed(0)}K`
}

function totalReach(m: GeographicMarket): number {
  if (!m.platformAdReach) return 0
  return Object.values(m.platformAdReach).reduce((s, v) => s + (v ?? 0), 0)
}

function circleRadius(reach: number): number {
  if (reach === 0) return 6
  const max = 1300000000
  return 6 + Math.sqrt(reach / max) * 28
}

const AVAILABILITY_COLORS: Record<string, string> = {
  high: '#6366f1',
  medium: '#10b981',
  low: '#f59e0b',
  insufficient: '#94a3b8',
}

export function GeographicMap({ markets = GEOGRAPHIC_MARKETS, focusedMarket, height = '400px' }: GeographicMapProps) {
  const positioned = markets.filter(m => m.lat !== undefined && m.lng !== undefined)

  return (
    <div style={{ height }} className="w-full rounded-xl overflow-hidden border border-slate-200">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        minZoom={1}
      >
        <FlyToMarket market={focusedMarket} />
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Data: <a href="https://datareportal.com">DataReportal</a>'
          maxZoom={19}
        />
        {positioned.map(market => {
          const reach = totalReach(market)
          const color = AVAILABILITY_COLORS[market.dataAvailability] ?? '#94a3b8'
          const r = circleRadius(reach)
          const hasReach = market.platformAdReach && Object.keys(market.platformAdReach).length > 0

          return (
            <CircleMarker
              key={market.id}
              center={[market.lat!, market.lng!]}
              radius={r}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.35,
                weight: 1.5,
              }}
            >
              <Popup maxWidth={260}>
                <div className="text-sm min-w-[200px]">
                  <div className="font-bold text-slate-900 text-base mb-1">
                    {market.name} <span className="text-slate-400 font-normal text-xs">{market.countryCode}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs mb-2">
                    {market.population && (
                      <>
                        <span className="text-slate-500">Population</span>
                        <span className="font-medium">{formatReach(market.population)}</span>
                      </>
                    )}
                    {market.internetPenetration && (
                      <>
                        <span className="text-slate-500">Internet</span>
                        <span className="font-medium">{market.internetPenetration}</span>
                      </>
                    )}
                    {market.gdpPerCapita && (
                      <>
                        <span className="text-slate-500">GDP/capita</span>
                        <span className="font-medium">{market.gdpPerCapita}</span>
                      </>
                    )}
                  </div>
                  {hasReach && (
                    <>
                      <div className="text-xs font-semibold text-slate-700 mb-1">Ad Reach (Jan 2025)</div>
                      <div className="space-y-0.5">
                        {Object.entries(market.platformAdReach!).map(([platform, reach]) =>
                          reach ? (
                            <div key={platform} className="flex justify-between text-xs">
                              <span className="text-slate-500 capitalize">{platform}</span>
                              <span className="font-semibold text-indigo-700">{formatReach(reach)}</span>
                            </div>
                          ) : null
                        )}
                      </div>
                    </>
                  )}
                  {market.socialBehaviourNotes && (
                    <div className="mt-2 text-xs text-slate-500 italic border-t border-slate-100 pt-1">
                      {market.socialBehaviourNotes}
                    </div>
                  )}
                  {market.source && (
                    <div className="mt-1 text-xs text-slate-400">Source: {market.source}</div>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}
