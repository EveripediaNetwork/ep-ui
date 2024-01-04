import React from 'react'
import AccordionFAQItem from '../AccordionFAQItem'
import { useTranslation } from 'next-i18next'
import { transformTextContent } from '@/utils/transformTextContent'

const WhatIsIQWiki = () => {
  const { t } = useTranslation('faq')
  const content = t('faqWhatIsIQWikiContent')
  const transformedContent = transformTextContent(content)

  return (
    <AccordionFAQItem
      title={t('faqWhatIsIQWiki')}
      content={transformedContent}
    />
  )
}

export default WhatIsIQWiki
