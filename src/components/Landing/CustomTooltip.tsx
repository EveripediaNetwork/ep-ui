import React from 'react'
import { Dict } from '@chakra-ui/utils'
import { Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const CustomTooltip = ({ active, payload }: Dict) => {
  const { t } = useTranslation('home')
  if (active && payload && payload.length) {
    return (
      <Box bg="tooltipBg" p={2} rounded="lg">
        <>
          <b>{t('priceTooltip')}:</b> {`$${payload[0].value.toFixed(6)}`}
        </>
      </Box>
    )
  }

  return null
}

export default CustomTooltip
