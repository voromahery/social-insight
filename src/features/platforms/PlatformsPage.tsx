import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Globe, ExternalLink, Users } from 'lucide-react'
import { MOCK_PLATFORMS } from '../../mocks/platforms'
import { Badge } from '../../components/ui/Badge'
import type { ConfidenceLevel } from '../../types'

const qualityBadge: Record<ConfidenceLevel, { label: string; variant: 'success' | 'info' | 'warning' | 'outline' }> = {
  high: { label: 'High quality data', variant: 'success' },
  medium: { label: 'Medium quality data', variant: 'info' },
  low: { label: 'Limited data', variant: 'warning' },
  insufficient: { label: 'Insufficient data', variant: 'outline' },
}

export default function PlatformsPage() {
  const [search, setSearch] = useState('')

  const filtered = MOCK_PLATFORMS.filter(p =>
    !search ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase()) ||
    p.industryRelevance.some(i => i.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Platform Directory</h1>
        <p className="text-slate-500 text-sm">
          Explore social media platforms, their audiences, content formats, and monetization methods.
        </p>
      </div>

      <div className="mb-6 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search platforms…"
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(platform => {
          const quality = qualityBadge[platform.sourceQuality]
          return (
            <div key={platform.id} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-bold text-slate-900">{platform.name}</h2>
                  {platform.monthlyActiveUsers && (
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <Users className="w-3 h-3" />
                      <span>{platform.monthlyActiveUsers} MAU</span>
                    </div>
                  )}
                </div>
                <Badge variant={quality.variant} size="sm">{quality.label}</Badge>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                {platform.description}
              </p>

              {platform.primaryDemographic && (
                <p className="text-xs text-slate-500 mb-3">
                  <span className="font-medium">Primary audience:</span> {platform.primaryDemographic}
                </p>
              )}

              <div className="mb-4">
                <p className="text-xs font-medium text-slate-500 mb-1.5">Content formats</p>
                <div className="flex flex-wrap gap-1">
                  {platform.contentFormats.slice(0, 5).map(f => (
                    <Badge key={f} variant="default" size="sm">{f}</Badge>
                  ))}
                  {platform.contentFormats.length > 5 && (
                    <span className="text-xs text-slate-400">+{platform.contentFormats.length - 5}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                <a
                  href={platform.officialDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
                >
                  <ExternalLink className="w-3 h-3" /> Official docs
                </a>
                <Link
                  to={`/platforms/${platform.id}`}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  View details →
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Globe className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No platforms match your search.</p>
          <button onClick={() => setSearch('')} className="mt-2 text-sm text-indigo-600">Clear search</button>
        </div>
      )}

      <p className="text-xs text-slate-400 mt-8 text-center">
        Last verified: November 2024. Platform details are subject to change. Always check official platform documentation for current requirements.
      </p>
    </div>
  )
}
