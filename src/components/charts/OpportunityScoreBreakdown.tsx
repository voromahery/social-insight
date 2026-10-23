import ReactECharts from 'echarts-for-react'
import type { OpportunityScore } from '../../types'

interface OpportunityScoreBreakdownProps {
  score: OpportunityScore
}

export function OpportunityScoreBreakdown({ score }: OpportunityScoreBreakdownProps) {
  const data = [
    { name: 'Demand', value: score.demand },
    { name: 'Trend', value: score.trendMomentum },
    { name: 'Scarcity', value: score.contentScarcity },
    { name: 'Relevance', value: score.audienceRelevance },
    { name: 'Monetization', value: score.monetizationPotential },
  ]

  const option = {
    radar: {
      indicator: data.map(d => ({ name: d.name, max: 100 })),
      splitLine: { lineStyle: { color: '#e2e8f0' } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisName: { color: '#64748b', fontSize: 12 },
    },
    series: [
      {
        type: 'radar',
        data: [{ value: data.map(d => d.value), name: 'Score' }],
        lineStyle: { color: '#6366f1', width: 2 },
        areaStyle: { color: '#6366f1', opacity: 0.18 },
        itemStyle: { color: '#6366f1' },
        symbol: 'none',
      },
    ],
    tooltip: {
      trigger: 'item',
      formatter: (params: { value: number[] }) => {
        return data
          .map((d, i) => `${d.name}: <b>${params.value[i]}</b>`)
          .join('<br/>')
      },
      textStyle: { fontSize: 12 },
      borderColor: '#e2e8f0',
      borderRadius: 8,
    },
  }

  return (
    <div className="w-full">
      <ReactECharts option={option} style={{ height: 260 }} />
      <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
        {data.map(d => (
          <div key={d.name} className="flex items-center justify-between">
            <span className="text-slate-600 text-xs">{d.name}</span>
            <span className="font-semibold text-slate-900 text-xs">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
