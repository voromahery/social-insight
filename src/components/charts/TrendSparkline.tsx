import ReactECharts from 'echarts-for-react'

interface TrendSparklineProps {
  data: Array<{ date: string; value: number }>
  direction: 'rising' | 'stable' | 'declining' | 'emerging'
}

const colorMap = {
  rising: '#10b981',
  emerging: '#6366f1',
  stable: '#64748b',
  declining: '#ef4444',
}

export function TrendSparkline({ data, direction }: TrendSparklineProps) {
  const color = colorMap[direction]

  const option = {
    grid: { top: 2, right: 2, bottom: 2, left: 2, containLabel: false },
    xAxis: { type: 'category', data: data.map(d => d.date), show: false },
    yAxis: { type: 'value', show: false },
    series: [
      {
        type: 'line',
        data: data.map(d => d.value),
        smooth: true,
        symbol: 'none',
        lineStyle: { color, width: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: color + '4d' },
              { offset: 1, color: color + '00' },
            ],
          },
        },
        animation: false,
      },
    ],
    tooltip: { show: false },
  }

  return <ReactECharts option={option} style={{ height: 48, width: '100%' }} />
}
