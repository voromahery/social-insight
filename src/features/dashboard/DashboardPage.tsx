import { Link } from 'react-router-dom'
import { Search, Globe, DollarSign, TrendingUp, FlaskConical, Bookmark, ArrowRight, AlertCircle, BarChart2 } from 'lucide-react'
import { MOCK_OPPORTUNITIES } from '../../mocks/opportunities'
import { OpportunityCard } from '../content-gaps/OpportunityCard'
import { useAuth } from '../auth/AuthContext'
import { Button } from '../../components/ui/Button'

const KPI_CARDS = [
  { icon: Globe, label: 'Platforms covered', value: '11', color: 'bg-indigo-50 text-indigo-600' },
  { icon: Search, label: 'Opportunities identified', value: '8', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Globe, label: 'Markets covered', value: '8', color: 'bg-blue-50 text-blue-600' },
  { icon: FlaskConical, label: 'Active experiments', value: '0', color: 'bg-violet-50 text-violet-600' },
  { icon: Bookmark, label: 'Saved insights', value: '0', color: 'bg-amber-50 text-amber-600' },
  { icon: BarChart2, label: 'Data sources', value: '1 (sample)', color: 'bg-slate-50 text-slate-600' },
]

const RISING_TOPICS = [
  { topic: 'AI tools for non-technical users', trend: '+42% interest', platform: 'LinkedIn' },
  { topic: 'Budget sustainability tips', trend: '+38% interest', platform: 'TikTok' },
  { topic: 'Freelancer tax planning', trend: '+29% interest', platform: 'YouTube' },
  { topic: 'Gaming for adults 40+', trend: '+21% interest', platform: 'YouTube' },
  { topic: 'Solo cooking meal prep', trend: '+18% interest', platform: 'Instagram' },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const topOpportunities = MOCK_OPPORTUNITIES.slice(0, 3)

  const goalLabel: Record<string, string> = {
    'grow-creator': 'Growing your creator brand',
    'market-business': 'Marketing your business',
    'research-niche': 'Researching a niche',
    'find-markets': 'Finding new markets',
    'manage-client': 'Managing client research',
    monetization: 'Discovering monetization opportunities',
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Your opportunity workspace'}
            </h1>
            <p className="text-indigo-200 text-sm">
              {user?.preferences?.primaryGoal
                ? goalLabel[user.preferences.primaryGoal] ?? 'Discovering content opportunities'
                : 'Discovering underserved content niches and market gaps'
              }
            </p>
          </div>
          <Link to="/content-gaps">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-50 gap-2 flex-shrink-0"
            >
              Discover opportunities <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Sample data notice */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">
          <span className="font-semibold">Sample data mode.</span>{' '}
          All metrics and opportunities shown are illustrative examples, not verified market research. Live data integrations are planned for future releases.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {KPI_CARDS.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="text-xl font-bold text-slate-900">{value}</div>
            <div className="text-xs text-slate-500 mt-0.5 leading-tight">{label}</div>
          </div>
        ))}
      </div>

      {/* Recommended opportunities */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recommended Opportunities</h2>
            <p className="text-sm text-slate-500">Top-scored opportunities based on sample data</p>
          </div>
          <Link to="/content-gaps" className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topOpportunities.map(opp => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </div>

      {/* Two-column: Rising topics + Quick actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Rising topics */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Rising Topics
            </h2>
            <Link to="/market-insights" className="text-xs text-indigo-600 hover:text-indigo-700">
              View trends →
            </Link>
          </div>
          <div className="space-y-3">
            {RISING_TOPICS.map(item => (
              <div key={item.topic} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.topic}</p>
                  <p className="text-xs text-slate-500">{item.platform}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {item.trend}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">Sample data — not verified market signals</p>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { to: '/content-gaps', icon: Search, title: 'Explore content gaps', desc: 'Find underserved topics across platforms' },
              { to: '/platforms', icon: Globe, title: 'Browse platforms', desc: 'Compare platform audiences and formats' },
              { to: '/monetization', icon: DollarSign, title: 'Explore monetization', desc: 'Find revenue pathways for your content' },
              { to: '/content-lab', icon: Search, title: 'Build a content brief', desc: 'Turn an opportunity into a publishing plan' },
              { to: '/experiments', icon: FlaskConical, title: 'Track an experiment', desc: 'Record a hypothesis and measure results' },
            ].map(({ to, icon: Icon, title, desc }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100 hover:border-indigo-100 group"
              >
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <Icon className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
