import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { OpportunityScore } from '../../types'

interface OpportunityScoreBreakdownProps {
  score: OpportunityScore
}

export function OpportunityScoreBreakdown({ score }: OpportunityScoreBreakdownProps) {
  const data = [
    { subject: 'Demand', value: score.demand, fullMark: 100 },
    { subject: 'Trend', value: score.trendMomentum, fullMark: 100 },
    { subject: 'Scarcity', value: score.contentScarcity, fullMark: 100 },
    { subject: 'Relevance', value: score.audienceRelevance, fullMark: 100 },
    { subject: 'Monetization', value: score.monetizationPotential, fullMark: 100 },
  ]

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <Tooltip
            formatter={(value) => [`${value}`, 'Score']}
            contentStyle={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.18}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
        {data.map((d) => (
          <div key={d.subject} className="flex items-center justify-between">
            <span className="text-slate-600 text-xs">{d.subject}</span>
            <span className="font-semibold text-slate-900 text-xs">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
