import type { ConfidenceLevel } from '../../types'
import { cn } from '../../lib/cn'

interface ConfidenceIndicatorProps {
  level: ConfidenceLevel
  showLabel?: boolean
  className?: string
}

const config: Record<ConfidenceLevel, { color: string; label: string; dots: number }> = {
  high: { color: 'bg-emerald-500', label: 'High confidence', dots: 3 },
  medium: { color: 'bg-amber-400', label: 'Medium confidence', dots: 2 },
  low: { color: 'bg-orange-400', label: 'Low confidence', dots: 1 },
  insufficient: { color: 'bg-slate-300', label: 'Insufficient data', dots: 0 },
}

export function ConfidenceIndicator({ level, showLabel = true, className }: ConfidenceIndicatorProps) {
  const { color, label, dots } = config[level]

  return (
    <div className={cn('flex items-center gap-2', className)} title={label}>
      <div className="flex gap-0.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn('w-2 h-2 rounded-full', i < dots ? color : 'bg-slate-200')}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-slate-500">{label}</span>
      )}
    </div>
  )
}
