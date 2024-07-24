import React from 'react'
import { useTranslation } from 'next-i18next'

const CustomTooltip = ({ active, payload }: any) => {
  const { t } = useTranslation('home')
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-700 p-4 rounded-xl text-xs shadow-lg">
        <>
          <b>{t('priceTooltip')}:</b> {`$${payload[0].value.toFixed(4)}`}
        </>
      </div>
    )
  }

  return null
}

export default CustomTooltip
