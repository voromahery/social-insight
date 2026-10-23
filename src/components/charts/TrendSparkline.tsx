import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

interface TrendSparklineProps {
  data: Array<{ date: string; value: number }>
  direction: 'rising' | 'stable' | 'declining' | 'emerging'
}

const colorMap = {
  rising: { stroke: '#10b981', fill: '#10b981' },
  emerging: { stroke: '#6366f1', fill: '#6366f1' },
  stable: { stroke: '#64748b', fill: '#64748b' },
  declining: { stroke: '#ef4444', fill: '#ef4444' },
}

export function TrendSparkline({ data, direction }: TrendSparklineProps) {
  const { stroke, fill } = colorMap[direction]

  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
        <defs>
          <linearGradient id={`sparkGrad-${direction}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={fill} stopOpacity={0.3} />
            <stop offset="95%" stopColor={fill} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={{ display: 'none' }}
          cursor={false}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={stroke}
          strokeWidth={2}
          fill={`url(#sparkGrad-${direction})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
