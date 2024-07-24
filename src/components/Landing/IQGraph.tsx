import { Dict } from '@chakra-ui/utils'
import React from 'react'
import { Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import CustomTooltip from './CustomTooltip'

const IQGraph = ({
  areaGraphData,
  height = 55,
}: { areaGraphData?: Dict<number>[] | undefined; height?: number }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={areaGraphData}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF1A88" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#FF1A88" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Tooltip content={<CustomTooltip />} />
        <Area
          className="area"
          type="monotone"
          dataKey="amt"
          stroke="#FF1A88"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default IQGraph
