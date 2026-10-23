import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, CircleMarker, useMap } from 'react-leaflet'
import * as topojson from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { GeographicMarket } from '../../types'
import { GEOGRAPHIC_MARKETS } from '../../data'

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// ISO 3166-1 numeric → alpha-2 for our tracked markets only
const NUMERIC_TO_ALPHA2: Record<number, string> = {
  356: 'IN', 840: 'US', 76: 'BR', 360: 'ID', 484: 'MX',
  608: 'PH', 704: 'VN', 50: 'BD', 764: 'TH', 586: 'PK',
  792: 'TR', 392: 'JP', 826: 'GB', 276: 'DE', 32: 'AR',
  643: 'RU', 818: 'EG', 566: 'NG', 124: 'CA', 36: 'AU',
  784: 'AE', 710: 'ZA',
}

const AVAILABILITY_FILL: Record<string, string> = {
  high: '#6366f1',
  medium: '#10b981',
  low: '#f59e0b',
  insufficient: '#94a3b8',
}

function formatReach(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`
  return `${(n / 1e3).toFixed(0)}K`
}

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

export function GeographicMap({ markets = GEOGRAPHIC_MARKETS, focusedMarket, height = '400px' }: GeographicMapProps) {
  const [worldGeo, setWorldGeo] = useState<GeoJSON.FeatureCollection | null>(null)

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then((topo: Topology) => {
        const geo = topojson.feature(
          topo,
          topo.objects['countries'] as GeometryCollection
        ) as GeoJSON.FeatureCollection
        setWorldGeo(geo)
      })
      .catch(() => { /* silent — map still works without polygons */ })
  }, [])

  const marketByAlpha2 = Object.fromEntries(
    markets.filter(m => m.lat !== undefined).map(m => [m.countryCode, m])
  )

  const styleFeature = (feature?: GeoJSON.Feature) => {
    const numId = Number(feature?.id)
    const alpha2 = NUMERIC_TO_ALPHA2[numId]
    const market = alpha2 ? marketByAlpha2[alpha2] : undefined
    const fill = market ? (AVAILABILITY_FILL[market.dataAvailability] ?? '#94a3b8') : '#e2e8f0'
    return {
      fillColor: fill,
      fillOpacity: market ? 0.45 : 0.5,
      color: market ? fill : '#cbd5e1',
      weight: market ? 1.5 : 0.5,
    }
  }

  const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
    const numId = Number(feature.id)
    const alpha2 = NUMERIC_TO_ALPHA2[numId]
    const market = alpha2 ? marketByAlpha2[alpha2] : undefined
    if (!market) return

    const topReach = market.platformAdReach
      ? Object.entries(market.platformAdReach)
          .filter(([, v]) => v)
          .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
      : []

    const popup = L.popup({ maxWidth: 260 }).setContent(`
      <div style="font-family:sans-serif;font-size:13px;min-width:180px">
        <div style="font-weight:700;font-size:15px;margin-bottom:4px">
          ${market.name} <span style="color:#94a3b8;font-weight:400;font-size:11px">${market.countryCode}</span>
        </div>
        ${market.population ? `<div style="font-size:11px;color:#64748b">Pop: ${formatReach(market.population)}</div>` : ''}
        ${market.internetPenetration ? `<div style="font-size:11px;color:#64748b">Internet: ${market.internetPenetration}</div>` : ''}
        ${topReach.length ? `
          <div style="margin-top:6px;font-weight:600;font-size:11px;color:#374151">Ad Reach (Jan 2025)</div>
          ${topReach.map(([p, v]) => `
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-top:2px">
              <span style="color:#64748b;text-transform:capitalize">${p}</span>
              <span style="font-weight:600;color:#6366f1">${formatReach(v ?? 0)}</span>
            </div>
          `).join('')}
        ` : ''}
        ${market.socialBehaviourNotes ? `<div style="margin-top:6px;font-size:10px;color:#94a3b8;font-style:italic;border-top:1px solid #f1f5f9;padding-top:4px">${market.socialBehaviourNotes}</div>` : ''}
        <div style="margin-top:4px;font-size:10px;color:#cbd5e1">${market.source ?? ''}</div>
      </div>
    `)

    layer.bindPopup(popup)
  }

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
        {worldGeo && (
          <GeoJSON
            key={markets.map(m => m.id).join(',')}
            data={worldGeo}
            style={styleFeature}
            onEachFeature={onEachFeature}
          />
        )}
        {/* Small dot markers for countries without polygon match */}
        {markets
          .filter(m => {
            const alpha2 = m.countryCode
            return m.lat !== undefined && !Object.values(NUMERIC_TO_ALPHA2).includes(alpha2)
          })
          .map(market => (
            <CircleMarker
              key={market.id}
              center={[market.lat!, market.lng!]}
              radius={6}
              pathOptions={{
                color: AVAILABILITY_FILL[market.dataAvailability] ?? '#94a3b8',
                fillColor: AVAILABILITY_FILL[market.dataAvailability] ?? '#94a3b8',
                fillOpacity: 0.6,
                weight: 1.5,
              }}
            />
          ))}
      </MapContainer>
    </div>
  )
}
