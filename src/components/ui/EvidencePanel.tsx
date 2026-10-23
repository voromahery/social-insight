import { AlertCircle, ExternalLink, Clock, Globe } from 'lucide-react'
import type { EvidenceRecord } from '../../types'
import { Badge } from './Badge'
import { cn } from '../../lib/cn'

interface EvidencePanelProps {
  records: EvidenceRecord[]
  className?: string
}

const statusVariant: Record<EvidenceRecord['dataStatus'], 'success' | 'info' | 'warning' | 'default' | 'outline'> = {
  verified: 'success',
  'published-estimate': 'info',
  'user-provided': 'info',
  derived: 'warning',
  illustrative: 'warning',
  unknown: 'outline',
}

const statusLabel: Record<EvidenceRecord['dataStatus'], string> = {
  verified: 'Verified source',
  'published-estimate': 'Published estimate',
  'user-provided': 'User-provided',
  derived: 'Derived calculation',
  illustrative: 'Illustrative sample',
  unknown: 'Unknown',
}

export function EvidencePanel({ records, className }: EvidencePanelProps) {
  if (records.length === 0) {
    return (
      <div className={cn('rounded-lg bg-slate-50 border border-slate-200 p-4', className)}>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>No evidence records attached to this insight.</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      {records.map((rec) => (
        <div key={rec.id} className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-slate-900 text-sm">{rec.sourceName}</span>
                <Badge variant={statusVariant[rec.dataStatus]}>{statusLabel[rec.dataStatus]}</Badge>
                <Badge
                  variant={rec.confidence === 'high' ? 'success' : rec.confidence === 'medium' ? 'info' : 'warning'}
                >
                  {rec.confidence} confidence
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">{rec.metricDefinition}</p>
            </div>
            {rec.sourceUrl && (
              <a
                href={rec.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-indigo-600 hover:text-indigo-700"
                aria-label={`Open source: ${rec.sourceName}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-400" />
              <span>{rec.geographicScope}</span>
            </div>
            {rec.sampleSize && (
              <div className="flex items-center gap-1">
                <span className="text-slate-400">n=</span>
                <span>{rec.sampleSize.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Collected {rec.collectionDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Verified {rec.lastVerified}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500">{rec.collectionMethod}</p>

          {rec.limitations.length > 0 && (
            <div className="rounded bg-amber-50 border border-amber-100 p-2">
              <p className="text-xs font-medium text-amber-700 mb-1">Limitations</p>
              <ul className="text-xs text-amber-700 space-y-0.5 list-disc list-inside">
                {rec.limitations.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
