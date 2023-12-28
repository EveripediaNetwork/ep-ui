import React from 'react'
import AccordionFAQItem from '../AccordionFAQItem'
import { useTranslation } from 'next-i18next'
import { transformFAQContent } from '@/utils/transformFAQContent'

const WhatIsIQWiki = () => {
  const { t } = useTranslation('faq')
  const content = t('faqWhatIsIQWikiContent')
  const transformedContent = transformFAQContent(content)

  return (
    <AccordionFAQItem
      title={t('faqWhatIsIQWiki')}
      content={transformedContent}
    />
  )
}

export default WhatIsIQWiki
