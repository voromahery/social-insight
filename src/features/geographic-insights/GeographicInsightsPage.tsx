import { useState } from 'react'
import { Globe, Map, AlertCircle, Wifi } from 'lucide-react'
import { GEOGRAPHIC_MARKETS, GLOBAL_STATS } from '../../data'
import { Badge } from '../../components/ui/Badge'
import { GeographicMap } from '../../components/maps/GeographicMap'
import type { ConfidenceLevel } from '../../types'

const dataAvailBadge: Record<ConfidenceLevel, { label: string; variant: 'success' | 'info' | 'warning' | 'outline' }> = {
  high: { label: 'Good coverage', variant: 'success' },
  medium: { label: 'Moderate', variant: 'info' },
  low: { label: 'Limited', variant: 'warning' },
  insufficient: { label: 'Insufficient', variant: 'outline' },
}

function fmt(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`
  return `${n}`
}

export default function GeographicInsightsPage() {
  const [scope, setScope] = useState<'global' | 'local'>('global')
  const [selectedCountry, setSelectedCountry] = useState<string>('')

  const displayMarkets = selectedCountry
    ? GEOGRAPHIC_MARKETS.filter(m => m.countryCode === selectedCountry)
    : GEOGRAPHIC_MARKETS

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Geographic Insights</h1>
        <p className="text-slate-500 text-sm">
          Platform reach and social media adoption across global markets. Data from DataReportal Digital 2025.
        </p>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Social media users', value: fmt(GLOBAL_STATS.socialMediaUserIdentities), sub: 'user identities' },
          { label: 'Internet users', value: fmt(GLOBAL_STATS.internetUsers), sub: `${GLOBAL_STATS.internetPenetration}% penetration` },
          { label: 'Social penetration', value: `${GLOBAL_STATS.socialMediaPenetration}%`, sub: 'of world population' },
          { label: 'Avg platforms/user', value: `${GLOBAL_STATS.avgPlatformsPerUser}`, sub: 'per month' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
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
          By Country
        </button>
      </div>

      {scope === 'local' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Select country</label>
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white w-56"
          >
            <option value="">All countries</option>
            {GEOGRAPHIC_MARKETS.map(m => (
              <option key={m.countryCode} value={m.countryCode}>{m.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Map — circle size = total ad reach */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <p className="text-xs text-slate-500">
            Circle size = combined ad reach across platforms. Click a marker for details.
          </p>
          <div className="flex items-center gap-3 ml-auto text-xs">
            {[
              { color: '#6366f1', label: 'High data' },
              { color: '#10b981', label: 'Medium' },
              { color: '#f59e0b', label: 'Limited' },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: color }} />
                <span className="text-slate-500">{label}</span>
              </span>
            ))}
          </div>
        </div>
        <GeographicMap markets={displayMarkets} height="380px" />
      </div>

      {/* Market table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Market Overview</h2>
          <p className="text-xs text-slate-500 mt-0.5">{displayMarkets.length} markets · DataReportal Jan 2025</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Market</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Population</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Internet</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Top Platforms</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Largest Reach</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayMarkets.map(market => {
                const avail = dataAvailBadge[market.dataAvailability]
                const topReach = market.platformAdReach
                  ? Object.entries(market.platformAdReach).sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))[0]
                  : null
                return (
                  <tr key={market.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{market.name}</div>
                      <div className="text-xs text-slate-400">{market.countryCode} · {market.primaryLanguages.join(', ')}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-600 text-xs">
                      {market.population ? fmt(market.population) : '—'}
                    </td>
                    <td className="px-4 py-4 text-slate-600 text-xs">
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
                    <td className="px-4 py-4 text-xs">
                      {topReach ? (
                        <span className="font-semibold text-indigo-700">
                          {topReach[0]}: {fmt(topReach[1] ?? 0)}
                        </span>
                      ) : <span className="text-slate-400">—</span>}
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
          Ad reach figures are from platform ad planning tools (Meta, ByteDance, Google) via DataReportal Digital 2025 (published Feb 2025).
          Ad reach is not equivalent to monthly active users. Population and internet penetration are estimates.
        </p>
      </div>
    </div>
  )
}
