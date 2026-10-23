import { Link } from 'react-router-dom'
import { TrendingUp, Search, BarChart2, MapPin, FileText, FlaskConical, Zap, ArrowRight, CheckCircle } from 'lucide-react'

const FEATURES = [
  { icon: Search, title: 'Opportunity Intelligence', description: 'Ranked, explained content opportunities — not just popular topics. Understand what to create and why before you spend a minute producing it.' },
  { icon: CheckCircle, title: 'Evidence Behind Every Insight', description: 'Every recommendation shows its sources, data dates, methodology, confidence level, and limitations. No black-box scores.' },
  { icon: MapPin, title: 'Local & Global Discovery', description: "Discover opportunities worldwide or drill into specific countries and regions where your competitors haven't looked." },
  { icon: FileText, title: 'Research to Action', description: 'Turn a discovered opportunity into a content brief, recommended formats, and a monetization hypothesis in minutes.' },
  { icon: FlaskConical, title: 'Personal Learning Loop', description: 'Record your content experiments, compare actual results with your hypothesis, and let the platform learn from your data.' },
  { icon: BarChart2, title: 'Accessible Intelligence', description: 'Designed for independent creators and small businesses — not just enterprise marketing teams with six-figure research budgets.' },
]

const STEPS = [
  { number: '01', title: 'Set your research focus', description: 'Tell us your industry, target audience, preferred platforms, and geographic market. We personalize your experience without requiring sensitive information.' },
  { number: '02', title: 'Discover underserved opportunities', description: 'Explore the Content Gap Explorer to find topics with evidence of audience demand and relatively weak content coverage.' },
  { number: '03', title: 'Act on evidence, not instinct', description: 'Turn opportunities into content briefs, run experiments, track results, and build a data-informed content strategy over time.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg">Social Insight</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Sign in</Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-900/60 border border-indigo-500/30 rounded-full px-3 py-1.5 text-xs text-indigo-300 mb-6">
            <Zap className="w-3.5 h-3.5" /> Opportunity-first intelligence platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Discover the opportunities{' '}
            <span className="text-indigo-400">others overlook</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Find underserved content niches, understand your market, evaluate competitors, and turn evidence-backed opportunities into actionable content and business strategies.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-500 transition-colors flex items-center gap-2"
            >
              Get started free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              See the demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Built for the whole research journey</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Every insight is backed by sources, confidence levels, and honest limitations — so you can make decisions you trust.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How it works</h2>
            <p className="text-slate-500">From research to results in three steps.</p>
          </div>
          <div className="space-y-10">
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-indigo-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Start discovering opportunities</h2>
          <p className="text-indigo-200 mb-8">No credit card required. Sample data ready from day one.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
          >
            Create free account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-slate-200">Social Insight</span>
        </div>
        <p className="text-slate-500 text-xs">Development version — sample data only. Not a measured market product.</p>
      </footer>
    </div>
  )
}
