import type { DataStatus } from '../../types'
import { cn } from '../../lib/cn'

interface DataStatusTagProps {
  status: DataStatus
  className?: string
}

const config: Record<DataStatus, { label: string; className: string }> = {
  verified: {
    label: 'Verified',
    className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  'published-estimate': {
    label: 'Published estimate',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  'user-provided': {
    label: 'User-provided',
    className: 'bg-violet-100 text-violet-700 border-violet-200',
  },
  derived: {
    label: 'Derived',
    className: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  illustrative: {
    label: 'Illustrative sample',
    className: 'bg-orange-100 text-orange-700 border-orange-200',
  },
  unknown: {
    label: 'Unknown',
    className: 'bg-slate-100 text-slate-500 border-slate-200',
  },
}

export function DataStatusTag({ status, className }: DataStatusTagProps) {
  const { label, className: statusClass } = config[status]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        statusClass,
        className
      )}
    >
      {label}
    </span>
  )
}
