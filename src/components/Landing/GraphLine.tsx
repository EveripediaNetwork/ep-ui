import React from 'react'

const GraphLine = () => {
  return (
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop
        className="gradientStart"
        offset="5%"
        stopColor="currentColor"
        stopOpacity={0.3}
      />
      <stop
        offset="60%"
        className="gradientStop"
        stopColor="currentColor"
        stopOpacity={0}
      />
    </linearGradient>
  )
}

export default GraphLine
