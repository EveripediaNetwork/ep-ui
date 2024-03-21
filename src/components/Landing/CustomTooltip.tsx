import React from 'react'
import { Dict } from '@chakra-ui/utils'
import { Box } from '@chakra-ui/layout'

const CustomTooltip = ({ active, payload }: Dict) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="tooltipBg" p={2} rounded="lg">
        <>
          <b>Price:</b> {`$${payload[0].value.toFixed(6)}`}
        </>
      </Box>
    )
  }

  return null
}

export default CustomTooltip
