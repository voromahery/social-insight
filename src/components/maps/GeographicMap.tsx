import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { GeographicMarket } from '../../types'

// Fix default marker icon paths broken by bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface GeographicMapProps {
  markets?: GeographicMarket[]
  height?: string
}

const DEFAULT_MARKETS: GeographicMarket[] = [
  { id: 'us', name: 'United States', countryCode: 'US', lat: 37.0902, lng: -95.7129, topPlatforms: ['youtube', 'instagram', 'tiktok'], primaryLanguages: ['English'], dataAvailability: 'high' },
  { id: 'uk', name: 'United Kingdom', countryCode: 'GB', lat: 55.3781, lng: -3.4360, topPlatforms: ['youtube', 'instagram', 'tiktok'], primaryLanguages: ['English'], dataAvailability: 'high' },
  { id: 'au', name: 'Australia', countryCode: 'AU', lat: -25.2744, lng: 133.7751, topPlatforms: ['facebook', 'instagram', 'youtube'], primaryLanguages: ['English'], dataAvailability: 'medium' },
  { id: 'ca', name: 'Canada', countryCode: 'CA', lat: 56.1304, lng: -106.3468, topPlatforms: ['youtube', 'instagram', 'facebook'], primaryLanguages: ['English', 'French'], dataAvailability: 'medium' },
  { id: 'de', name: 'Germany', countryCode: 'DE', lat: 51.1657, lng: 10.4515, topPlatforms: ['youtube', 'instagram', 'linkedin'], primaryLanguages: ['German'], dataAvailability: 'medium' },
  { id: 'br', name: 'Brazil', countryCode: 'BR', lat: -14.2350, lng: -51.9253, topPlatforms: ['instagram', 'youtube', 'tiktok'], primaryLanguages: ['Portuguese'], dataAvailability: 'low' },
]

export function GeographicMap({ markets = DEFAULT_MARKETS, height = '400px' }: GeographicMapProps) {
  const positioned = markets.filter((m) => m.lat !== undefined && m.lng !== undefined)

  return (
    <div style={{ height }} className="w-full rounded-lg overflow-hidden border border-slate-200">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />
        {positioned.map((market) => (
          <Marker key={market.id} position={[market.lat!, market.lng!]}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-slate-900">{market.name}</p>
                <p className="text-slate-500 text-xs">Data: {market.dataAvailability}</p>
                <p className="text-slate-500 text-xs">
                  Platforms: {market.topPlatforms.join(', ')}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
