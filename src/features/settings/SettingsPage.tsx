import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../lib/cn'
import { DEFAULT_WEIGHTS } from '../../lib/scoring'

type Tab = 'profile' | 'preferences' | 'scoring' | 'data-sources'
const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'profile', label: 'Profile' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'scoring', label: 'Scoring Weights' },
  { id: 'data-sources', label: 'Data Sources' },
]

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [tab, setTab] = useState<Tab>('profile')
  const [weights, setWeights] = useState({
    demand: Math.round(DEFAULT_WEIGHTS.demand * 100),
    trendMomentum: Math.round(DEFAULT_WEIGHTS.trendMomentum * 100),
    contentScarcity: Math.round(DEFAULT_WEIGHTS.contentScarcity * 100),
    audienceRelevance: Math.round(DEFAULT_WEIGHTS.audienceRelevance * 100),
    monetizationPotential: Math.round(DEFAULT_WEIGHTS.monetizationPotential * 100),
  })

  const total = Object.values(weights).reduce((a, b) => a + b, 0)

  const updateWeight = (key: keyof typeof weights, val: number) => {
    setWeights((w) => ({ ...w, [key]: val }))
  }

  const DATA_SOURCES = [
    { name: 'Social Insight Sample Dataset', status: 'active', type: 'illustrative', lastUpdated: '2024-11-01', note: 'Demonstration fixture data. Not measured market observations.' },
    { name: 'Official Platform APIs', status: 'not-configured', type: 'verified', lastUpdated: '—', note: 'Connect authorized platform accounts to access real analytics.' },
    { name: 'User-Provided CSV', status: 'not-configured', type: 'user-provided', lastUpdated: '—', note: 'Upload your own research data for personal analysis.' },
    { name: 'Licensed Market Research', status: 'not-configured', type: 'published-estimate', lastUpdated: '—', note: 'Integrate third-party research datasets when available.' },
  ]

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your profile, preferences, and scoring configuration.</p>
      </div>

      <div className="flex gap-1 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
              tab === t.id
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <Card>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Name</p>
              <p className="text-slate-900 font-medium">{user?.name ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Email</p>
              <p className="text-slate-900">{user?.email ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Account type</p>
              <p className="text-slate-900">Development mode (no cloud persistence)</p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <Button variant="danger" size="sm" onClick={logout}>Sign out</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 'preferences' && (
        <Card>
          <CardContent className="space-y-4">
            {user?.preferences ? (
              <dl className="space-y-3 text-sm">
                {[
                  { label: 'Primary goal', value: user.preferences.primaryGoal?.replace(/-/g, ' ') ?? '—' },
                  { label: 'Experience level', value: user.preferences.experienceLevel ?? '—' },
                  { label: 'Geographic scope', value: user.preferences.geographicScope ?? '—' },
                  { label: 'Primary language', value: user.preferences.primaryLanguage ?? '—' },
                  { label: 'Industries', value: user.preferences.industries.length ? user.preferences.industries.join(', ') : 'Not set' },
                  { label: 'Platforms', value: user.preferences.platforms.length ? user.preferences.platforms.join(', ') : 'Not set' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-4">
                    <dt className="text-slate-500 w-36 flex-shrink-0 capitalize">{label}</dt>
                    <dd className="text-slate-900 capitalize">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-slate-500 text-sm">No preferences saved. Complete onboarding to set your preferences.</p>
            )}
            <div className="pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/onboarding'}>Re-run onboarding</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 'scoring' && (
        <Card>
          <CardContent className="space-y-5">
            <div>
              <p className="text-sm text-slate-600 mb-1">Adjust the weight of each component in the opportunity score formula.</p>
              <p className="text-xs text-amber-600">
                Current total: <strong>{total}%</strong> {total !== 100 && `— must equal 100% (currently ${total > 100 ? 'over' : 'under'})`}
              </p>
            </div>
            {Object.entries(weights).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <label className="font-medium text-slate-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  <span className="text-slate-900 font-semibold">{val}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={5}
                  value={val}
                  onChange={(e) => updateWeight(key as keyof typeof weights, Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            ))}
            <p className="text-xs text-slate-400 italic">
              These weights affect how future opportunity scores are calculated. Default weights are not scientifically validated — they are a starting point for your research.
            </p>
          </CardContent>
        </Card>
      )}

      {tab === 'data-sources' && (
        <div className="space-y-4">
          {DATA_SOURCES.map((src) => (
            <Card key={src.name}>
              <CardContent>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-slate-900">{src.name}</h3>
                      <span className={cn(
                        'text-xs px-2 py-0.5 rounded-full',
                        src.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      )}>
                        {src.status === 'active' ? 'Active' : 'Not configured'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{src.note}</p>
                    <p className="text-xs text-slate-400 mt-1">Last updated: {src.lastUpdated} · Type: {src.type}</p>
                  </div>
                  {src.status !== 'active' && (
                    <Button variant="outline" size="sm" disabled>Configure</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
