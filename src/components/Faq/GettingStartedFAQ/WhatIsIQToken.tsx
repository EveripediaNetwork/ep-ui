import React from 'react'
import AccordionFAQItem from '../AccordionFAQItem'
import { useTranslation } from 'next-i18next'
import { transformTextContent } from '@/utils/transformTextContent'

const WhatIsIQToken = () => {
  const { t } = useTranslation('faq')
  const content = t('faqWhatIsIQTokenContent')
  const transformedContent = transformTextContent(content)

  return (
    <AccordionFAQItem
      title={t('faqWhatIsIQToken')}
      content={transformedContent}
    />
  )
}

export default WhatIsIQToken
