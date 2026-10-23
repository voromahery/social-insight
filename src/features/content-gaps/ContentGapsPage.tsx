import { useState } from 'react'
import { Search, Filter, AlertCircle } from 'lucide-react'
import { MOCK_OPPORTUNITIES } from '../../mocks/opportunities'
import { MOCK_PLATFORMS } from '../../mocks/platforms'
import type { FilterState, ContentOpportunity } from '../../types'
import { OpportunityCard } from './OpportunityCard'
import { cn } from '../../lib/cn'

const MODES: Array<{ key: ContentOpportunity['mode'] | 'all'; label: string; description: string }> = [
  { key: 'all', label: 'All Opportunities', description: 'All discovered opportunities' },
  { key: 'rising-demand', label: 'Rising Demand', description: 'Topics with growing audience interest' },
  { key: 'underserved', label: 'Underserved Topics', description: 'High demand, low content coverage' },
  { key: 'audience-questions', label: 'Audience Questions', description: 'Recurring unmet information needs' },
  { key: 'market-specific', label: 'Market-Specific', description: 'Geographic opportunity gaps' },
]

export default function ContentGapsPage() {
  const [filters, setFilters] = useState<FilterState>({})
  const [activeMode, setActiveMode] = useState<ContentOpportunity['mode'] | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const filtered = MOCK_OPPORTUNITIES
    .filter(o => activeMode === 'all' || o.mode === activeMode)
    .filter(o => !filters.platform || o.platform === filters.platform)
    .filter(o => !filters.trendDirection || o.trendDirection === filters.trendDirection)
    .filter(o => !filters.minScore || o.score.total >= filters.minScore)
    .filter(o =>
      !searchQuery ||
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => b.score.total - a.score.total)

  const handleSave = (_id: string) => {
    // Save functionality connects to saved-insights page via localStorage in a future release
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Content Gap Explorer</h1>
        <p className="text-slate-500 text-sm">
          Discover underserved content niches with evidence-backed opportunity scoring.
        </p>
      </div>

      {/* Sample data notice */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-700">
          <span className="font-semibold">Sample data mode.</span>{' '}
          All opportunities shown are illustrative examples with sample evidence scores. They are not verified market research findings.
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-6 overflow-x-auto">
        {MODES.map(mode => (
          <button
            key={mode.key}
            onClick={() => setActiveMode(mode.key)}
            className={cn(
              'flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              activeMode === mode.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            )}
            title={mode.description}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="lg:w-60 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Filters
              </h2>
              <button
                onClick={() => setFilters({})}
                className="text-xs text-indigo-600 hover:text-indigo-700"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Topics, keywords…"
                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Platform filter */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Platform</label>
                <select
                  value={filters.platform ?? ''}
                  onChange={e => setFilters(f => ({ ...f, platform: e.target.value || undefined }))}
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All platforms</option>
                  {MOCK_PLATFORMS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Trend direction */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Trend</label>
                <select
                  value={filters.trendDirection ?? ''}
                  onChange={e => setFilters(f => ({ ...f, trendDirection: (e.target.value as FilterState['trendDirection']) || undefined }))}
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Any direction</option>
                  <option value="rising">Rising</option>
                  <option value="emerging">Emerging</option>
                  <option value="stable">Stable</option>
                  <option value="declining">Declining</option>
                </select>
              </div>

              {/* Min score */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Minimum score: {filters.minScore ?? 0}
                </label>
                <input
                  type="range"
                  min={0}
                  max={90}
                  step={5}
                  value={filters.minScore ?? 0}
                  onChange={e => setFilters(f => ({ ...f, minScore: Number(e.target.value) || undefined }))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-0.5">
                  <span>0</span><span>90</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'opportunity' : 'opportunities'} found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-700 mb-1">No opportunities match your filters</h3>
              <p className="text-sm text-slate-500">Try adjusting your filters or broadening your search.</p>
              <button
                onClick={() => { setFilters({}); setSearchQuery(''); setActiveMode('all'); }}
                className="mt-4 text-sm text-indigo-600 hover:text-indigo-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-4">
              {filtered.map(opportunity => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onSave={() => handleSave(opportunity.id)}
                  onDismiss={undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
