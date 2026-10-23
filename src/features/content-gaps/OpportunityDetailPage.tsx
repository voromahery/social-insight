import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, TrendingUp, TrendingDown, Minus, Sparkles, Lightbulb,
  AlertCircle, BookOpen, FlaskConical
} from 'lucide-react'
import { MOCK_OPPORTUNITIES } from '../../mocks/opportunities'
import { EvidencePanel } from '../../components/ui/EvidencePanel'
import { ScoreBadge } from '../../components/ui/ScoreBadge'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader } from '../../components/ui/Card'

const trendIcon = {
  rising: TrendingUp,
  declining: TrendingDown,
  stable: Minus,
  emerging: Sparkles,
}

const trendColor = {
  rising: 'text-emerald-600',
  declining: 'text-red-500',
  stable: 'text-slate-400',
  emerging: 'text-indigo-500',
}

const componentInfo = [
  { key: 'demand', label: 'Audience Demand', weight: '30%', description: 'How strong is audience interest in this topic?' },
  { key: 'trendMomentum', label: 'Trend Momentum', weight: '20%', description: 'Is interest growing, stable, or declining?' },
  { key: 'contentScarcity', label: 'Content Scarcity', weight: '20%', description: 'How much good content already exists on this topic?' },
  { key: 'audienceRelevance', label: 'Audience Relevance', weight: '15%', description: 'How well does this match the target audience?' },
  { key: 'monetizationPotential', label: 'Monetization Potential', weight: '15%', description: 'What documented monetization pathways exist?' },
] as const

export default function OpportunityDetailPage() {
  const { opportunityId } = useParams<{ opportunityId: string }>()
  const opportunity = MOCK_OPPORTUNITIES.find(o => o.id === opportunityId)

  if (!opportunity) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Link to="/content-gaps" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Content Gaps
        </Link>
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h2 className="font-semibold text-slate-700 mb-1">Opportunity not found</h2>
          <p className="text-sm text-slate-500 mb-4">This opportunity may have been removed or the link is invalid.</p>
          <Link to="/content-gaps">
            <Button variant="outline" size="sm">Browse opportunities</Button>
          </Link>
        </div>
      </div>
    )
  }

  const TrendIcon = trendIcon[opportunity.trendDirection]

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Back */}
      <Link to="/content-gaps" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4" /> Back to Content Gaps
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-start gap-5">
          <ScoreBadge score={opportunity.score.total} confidence={opportunity.score.confidence} size="lg" />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-slate-900 mb-2">{opportunity.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="info">{opportunity.platform}</Badge>
              <Badge variant="default">{opportunity.market}</Badge>
              {opportunity.industry && <Badge variant="outline">{opportunity.industry}</Badge>}
              <div className={`flex items-center gap-1 text-sm font-medium ${trendColor[opportunity.trendDirection]}`}>
                <TrendIcon className="w-4 h-4" />
                <span className="capitalize">{opportunity.trendDirection}</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{opportunity.description}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-slate-100">
          <Link to="/content-lab">
            <Button size="sm" className="gap-2">
              <Lightbulb className="w-4 h-4" /> Turn into brief
            </Button>
          </Link>
          <Link to="/experiments">
            <Button variant="outline" size="sm" className="gap-2">
              <FlaskConical className="w-4 h-4" /> Create experiment
            </Button>
          </Link>
        </div>
      </div>

      {/* Score breakdown */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-slate-900">Why this score?</h2>
          <p className="text-xs text-slate-500 mt-0.5">{opportunity.score.explanation}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {componentInfo.map(({ key, label, weight, description }) => {
              const value = opportunity.score[key as keyof typeof opportunity.score] as number
              const included = opportunity.score.includedComponents.includes(label)
              return (
                <div key={key} className={included ? '' : 'opacity-50'}>
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                      <span className="ml-2 text-xs text-slate-400">weight: {weight}</span>
                      {!included && <Badge variant="outline" size="sm" className="ml-2">Excluded — no data</Badge>}
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{included ? `${value}/100` : '—'}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        value >= 75 ? 'bg-emerald-500' : value >= 55 ? 'bg-amber-400' : 'bg-red-400'
                      }`}
                      style={{ width: included ? `${value}%` : '0%' }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Topics and formats */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader><h2 className="font-semibold text-slate-900 text-sm">Topics</h2></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {opportunity.topics.map(t => (
                <Badge key={t} variant="info" size="sm">{t}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h2 className="font-semibold text-slate-900 text-sm">Content Formats</h2></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {opportunity.contentFormats.map(f => (
                <Badge key={f} variant="default" size="sm">{f}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monetization */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-slate-900">Monetization Pathways</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {opportunity.monetizationPathways.map(m => (
              <Badge key={m} variant="success" size="md">{m.replace(/-/g, ' ')}</Badge>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">
            These are documented monetization methods associated with this type of content. Actual earnings depend on many factors. Do not treat these as income projections.
          </p>
        </CardContent>
      </Card>

      {/* Evidence */}
      <div>
        <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-500" /> Evidence & Sources
        </h2>
        <EvidencePanel records={opportunity.evidenceRecords} />
      </div>

      {/* Last updated */}
      <p className="text-xs text-slate-400 text-center">
        Last updated: {opportunity.lastUpdated} · Discovered: {opportunity.discoveredAt}
      </p>
    </div>
  )
}
