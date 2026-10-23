import { TrendingUp, AlertCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Badge } from '../../components/ui/Badge'

const SAMPLE_TRENDS = [
  { topic: 'AI tools for non-technical users', platform: 'LinkedIn', direction: 'rising' as const, changePercent: 42, industry: 'Technology' },
  { topic: 'Sustainable living on a budget', platform: 'TikTok', direction: 'rising' as const, changePercent: 38, industry: 'Lifestyle' },
  { topic: 'Freelancer tax planning', platform: 'YouTube', direction: 'rising' as const, changePercent: 29, industry: 'Finance' },
  { topic: 'Gaming for adults 40+', platform: 'YouTube', direction: 'emerging' as const, changePercent: 21, industry: 'Gaming' },
  { topic: 'Solo cooking & meal prep', platform: 'Instagram', direction: 'stable' as const, changePercent: 18, industry: 'Food' },
  { topic: 'B2B LinkedIn content strategy', platform: 'LinkedIn', direction: 'rising' as const, changePercent: 16, industry: 'Marketing' },
  { topic: 'Mental health for students', platform: 'TikTok', direction: 'rising' as const, changePercent: 14, industry: 'Health' },
  { topic: 'Farm-to-table food stories', platform: 'Instagram', direction: 'stable' as const, changePercent: 8, industry: 'Food' },
]

const CHART_DATA = [
  { month: 'Jun', aiTools: 55, sustainability: 48, freelance: 62 },
  { month: 'Jul', aiTools: 62, sustainability: 52, freelance: 65 },
  { month: 'Aug', aiTools: 70, sustainability: 58, freelance: 68 },
  { month: 'Sep', aiTools: 78, sustainability: 65, freelance: 71 },
  { month: 'Oct', aiTools: 88, sustainability: 75, freelance: 79 },
  { month: 'Nov', aiTools: 95, sustainability: 82, freelance: 85 },
]

const directionColor = {
  rising: 'text-emerald-600',
  stable: 'text-slate-500',
  declining: 'text-red-500',
  emerging: 'text-indigo-500',
}

const directionBadge = {
  rising: { label: 'Rising', variant: 'success' as const },
  stable: { label: 'Stable', variant: 'default' as const },
  declining: { label: 'Declining', variant: 'danger' as const },
  emerging: { label: 'Emerging', variant: 'info' as const },
}

export default function MarketInsightsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Market Insights</h1>
        <p className="text-slate-500 text-sm">Trend signals across topics, platforms, and industries.</p>
      </div>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">
          <span className="font-semibold">Illustrative sample data.</span>{' '}
          The trends and percentage changes shown below are constructed examples for demonstration purposes. They are not derived from measured market data.
        </p>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-1">Rising Topic Interest — Sample Trend</h2>
        <p className="text-xs text-slate-500 mb-4">Illustrative interest index (0–100) for three trending topics over 6 months</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={CHART_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            <Line type="monotone" dataKey="aiTools" name="AI tools" stroke="#6366f1" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="sustainability" name="Sustainability" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="freelance" name="Freelance finance" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trend table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <h2 className="font-semibold text-slate-900">Topic Trends</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Topic</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Industry</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Direction</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SAMPLE_TRENDS.map(trend => {
                const badge = directionBadge[trend.direction]
                return (
                  <tr key={trend.topic} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{trend.topic}</td>
                    <td className="px-4 py-4"><Badge variant="info" size="sm">{trend.platform}</Badge></td>
                    <td className="px-4 py-4 text-slate-600">{trend.industry}</td>
                    <td className="px-4 py-4"><Badge variant={badge.variant} size="sm">{badge.label}</Badge></td>
                    <td className={`px-4 py-4 font-semibold ${directionColor[trend.direction]}`}>
                      {trend.direction !== 'stable' ? `+${trend.changePercent}%` : `${trend.changePercent}%`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
