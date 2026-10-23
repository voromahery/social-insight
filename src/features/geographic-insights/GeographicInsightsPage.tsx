import { useState } from 'react'
import { Globe, Map, AlertCircle, Wifi } from 'lucide-react'
import { MOCK_MARKETS } from '../../mocks/geographic'
import { Badge } from '../../components/ui/Badge'
import { GeographicMap } from '../../components/maps/GeographicMap'
import type { ConfidenceLevel } from '../../types'

const dataAvailBadge: Record<ConfidenceLevel, { label: string; variant: 'success' | 'info' | 'warning' | 'outline' }> = {
  high: { label: 'Good data coverage', variant: 'success' },
  medium: { label: 'Moderate data', variant: 'info' },
  low: { label: 'Limited data', variant: 'warning' },
  insufficient: { label: 'Insufficient data', variant: 'outline' },
}

export default function GeographicInsightsPage() {
  const [scope, setScope] = useState<'global' | 'local'>('global')
  const [selectedCountry, setSelectedCountry] = useState<string>('')

  const displayMarkets = selectedCountry
    ? MOCK_MARKETS.filter(m => m.countryCode === selectedCountry)
    : MOCK_MARKETS

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Geographic Insights</h1>
        <p className="text-slate-500 text-sm">
          Explore market opportunities and audience distribution across global and local markets.
        </p>
      </div>

      {/* Scope selector */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit mb-6">
        <button
          onClick={() => setScope('global')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            scope === 'global' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Globe className="w-4 h-4 inline mr-1.5" />
          Global
        </button>
        <button
          onClick={() => setScope('local')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            scope === 'local' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Map className="w-4 h-4 inline mr-1.5" />
          Local & Regional
        </button>
      </div>

      {scope === 'local' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Select country</label>
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white w-48"
          >
            <option value="">All countries</option>
            {MOCK_MARKETS.map(m => (
              <option key={m.countryCode} value={m.countryCode}>{m.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Leaflet map */}
      <div className="mb-6">
        <GeographicMap markets={displayMarkets.filter(m => m.lat !== undefined && m.lng !== undefined)} height="320px" />
      </div>

      {/* Market table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Market Overview</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Accessible table alternative to the geographic map
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Market</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Population</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Internet</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Top Platforms</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Languages</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayMarkets.map(market => {
                const avail = dataAvailBadge[market.dataAvailability]
                return (
                  <tr key={market.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{market.name}</div>
                      <div className="text-xs text-slate-400">{market.countryCode}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {market.population ? `${(market.population / 1e6).toFixed(0)}M` : '—'}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Wifi className="w-3 h-3 text-slate-400" />
                        {market.internetPenetration ?? '—'}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {market.topPlatforms.slice(0, 3).map(p => (
                          <Badge key={p} variant="info" size="sm">{p}</Badge>
                        ))}
                        {market.topPlatforms.length > 3 && (
                          <span className="text-xs text-slate-400">+{market.topPlatforms.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {market.primaryLanguages.map(l => (
                          <Badge key={l} variant="outline" size="sm">{l}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={avail.variant} size="sm">{avail.label}</Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-slate-400">
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        <p>
          All market data is from public sources as of 2024. Population and internet penetration figures are estimates. Data availability refers to the platform's research data coverage for this market, not general data quality.
        </p>
      </div>
    </div>
  )
}
