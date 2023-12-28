import React from 'react'
import AccordionFAQItem from '../AccordionFAQItem'
import { useTranslation } from 'react-i18next'
import { transformFAQContent } from '@/utils/transformFAQContent'

const WhereToGetIQTokens = () => {
  const { t } = useTranslation('faq')
  const content = t('faqWhereToGetIQTokensContent')
  const transformedContent = transformFAQContent(content)

  return (
    <AccordionFAQItem
      title={t('faqWhereToGetIQTokens')}
      content={transformedContent}
    />
  )
}

export default WhereToGetIQTokens
