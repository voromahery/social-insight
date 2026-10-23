import { useState } from 'react'
import { DollarSign, Filter } from 'lucide-react'
import { MOCK_MONETIZATION } from '../../mocks/monetization'
import { MOCK_PLATFORMS } from '../../mocks/platforms'
import { Badge } from '../../components/ui/Badge'
import { Card, CardContent, CardHeader, CardFooter } from '../../components/ui/Card'

export default function MonetizationPage() {
  const [category, setCategory] = useState<string>('')
  const [platform, setPlatform] = useState<string>('')

  const filtered = MOCK_MONETIZATION
    .filter(m => !category || m.category === category)
    .filter(m => !platform || m.platforms.includes(platform))

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Monetization Explorer</h1>
        <p className="text-slate-500 text-sm">
          Browse documented monetization methods with requirements, eligibility, and platform compatibility.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">Note:</span> Income figures and earnings are not provided — monetization potential varies significantly based on audience size, niche, geography, and effort. All information was verified from public sources as of the dates shown.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-600">Filter:</span>
        </div>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="">All categories</option>
          <option value="direct-platform">Direct platform monetization</option>
          <option value="business-model">Business model</option>
        </select>
        <select
          value={platform}
          onChange={e => setPlatform(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="">All platforms</option>
          {MOCK_PLATFORMS.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {(category || platform) && (
          <button
            onClick={() => { setCategory(''); setPlatform('') }}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Clear filters
          </button>
        )}
        <span className="text-sm text-slate-500 ml-auto">{filtered.length} methods</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(method => (
          <Card key={method.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold text-slate-900 text-sm leading-tight">{method.name}</h2>
                <Badge
                  variant={method.category === 'direct-platform' ? 'info' : 'default'}
                  size="sm"
                >
                  {method.category === 'direct-platform' ? 'Platform' : 'Business model'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">{method.description}</p>

              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Revenue mechanism</p>
                <p className="text-xs text-slate-700">{method.revenueMechanism}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 mb-1.5">Platforms</p>
                <div className="flex flex-wrap gap-1">
                  {method.platforms.slice(0, 5).map(p => (
                    <Badge key={p} variant="info" size="sm">{p}</Badge>
                  ))}
                  {method.platforms.length > 5 && (
                    <span className="text-xs text-slate-400">+{method.platforms.length - 5}</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Requirements</p>
                <p className="text-xs text-slate-600">{method.startupRequirements}</p>
              </div>

              {method.eligibilityRestrictions.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Eligibility restrictions</p>
                  <ul className="space-y-0.5">
                    {method.eligibilityRestrictions.map(r => (
                      <li key={r} className="text-xs text-amber-700">• {r}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-slate-500 mb-1.5">Required skills</p>
                <div className="flex flex-wrap gap-1">
                  {method.requiredSkills.slice(0, 3).map(s => (
                    <Badge key={s} variant="outline" size="sm">{s}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-slate-400">Verified: {method.lastVerified}</span>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <DollarSign className="w-3 h-3" />
                  <span className="capitalize">{method.category.replace('-', ' ')}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
