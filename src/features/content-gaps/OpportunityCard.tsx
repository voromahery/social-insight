import { Link } from 'react-router-dom'
import { Bookmark, X, ArrowRight, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react'
import type { ContentOpportunity } from '../../types'
import { ScoreBadge } from '../../components/ui/ScoreBadge'
import { Badge } from '../../components/ui/Badge'
import { Card, CardContent, CardFooter } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

interface OpportunityCardProps {
  opportunity: ContentOpportunity
  onSave?: () => void
  onDismiss?: () => void
  saved?: boolean
}

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

const coverageBadge: Record<ContentOpportunity['competitorCoverage'], { label: string; variant: 'success' | 'warning' | 'danger' | 'outline' }> = {
  weak: { label: 'Weak competition', variant: 'success' },
  moderate: { label: 'Moderate competition', variant: 'warning' },
  strong: { label: 'Strong competition', variant: 'danger' },
  unknown: { label: 'Competition unknown', variant: 'outline' },
}

const modeLabel: Record<ContentOpportunity['mode'], string> = {
  'rising-demand': 'Rising demand',
  underserved: 'Underserved',
  'audience-questions': 'Audience need',
  'market-specific': 'Market-specific',
}

export function OpportunityCard({ opportunity, onSave, onDismiss, saved }: OpportunityCardProps) {
  const TrendIcon = trendIcon[opportunity.trendDirection]
  const coverage = coverageBadge[opportunity.competitorCoverage]

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1">
        <div className="flex items-start gap-4">
          <ScoreBadge score={opportunity.score.total} confidence={opportunity.score.confidence} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-slate-900 text-sm leading-snug">{opportunity.title}</h3>
              <div className={cn('flex items-center gap-1 flex-shrink-0 text-xs font-medium', trendColor[opportunity.trendDirection])}>
                <TrendIcon className="w-3.5 h-3.5" />
                <span className="capitalize hidden sm:block">{opportunity.trendDirection}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <Badge variant="info" size="sm">{opportunity.platform}</Badge>
              <Badge variant="default" size="sm">{opportunity.market}</Badge>
              <Badge
                variant={coverage.variant}
                size="sm"
              >
                {coverage.label}
              </Badge>
              <Badge variant="outline" size="sm">{modeLabel[opportunity.mode]}</Badge>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3">
              {opportunity.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {opportunity.topics.slice(0, 4).map(topic => (
                <span key={topic} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {topic}
                </span>
              ))}
              {opportunity.topics.length > 4 && (
                <span className="text-xs text-slate-400">+{opportunity.topics.length - 4} more</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {onSave && (
            <button
              onClick={onSave}
              disabled={saved}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                saved
                  ? 'text-indigo-600 cursor-default'
                  : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
              )}
              aria-label={saved ? 'Saved' : 'Save opportunity'}
              title={saved ? 'Saved' : 'Save'}
            >
              <Bookmark className={cn('w-4 h-4', saved && 'fill-current')} />
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              aria-label="Dismiss opportunity"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Link to={`/content-gaps/${opportunity.id}`}>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            View details <ArrowRight className="w-3 h-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
