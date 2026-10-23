import { cn } from '../../lib/cn'
import type { ConfidenceLevel } from '../../types'

interface ScoreBadgeProps {
  score: number
  confidence: ConfidenceLevel
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function scoreColor(score: number): string {
  if (score >= 75) return 'text-emerald-700 bg-emerald-50 ring-emerald-200'
  if (score >= 55) return 'text-amber-700 bg-amber-50 ring-amber-200'
  if (score >= 35) return 'text-orange-700 bg-orange-50 ring-orange-200'
  return 'text-red-700 bg-red-50 ring-red-200'
}

const confidenceLabels: Record<ConfidenceLevel, string> = {
  high: 'High confidence',
  medium: 'Medium confidence',
  low: 'Low confidence',
  insufficient: 'Insufficient data',
}

export function ScoreBadge({ score, confidence, size = 'md', className }: ScoreBadgeProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  }

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <div
        className={cn(
          'rounded-full ring-2 flex items-center justify-center font-bold',
          sizes[size],
          scoreColor(score)
        )}
        title={`Score: ${score}/100 — ${confidenceLabels[confidence]}`}
        aria-label={`Opportunity score: ${score} out of 100. ${confidenceLabels[confidence]}`}
      >
        {score}
      </div>
      {size !== 'sm' && (
        <span className="text-xs text-slate-500 capitalize">{confidence}</span>
      )}
    </div>
  )
}
