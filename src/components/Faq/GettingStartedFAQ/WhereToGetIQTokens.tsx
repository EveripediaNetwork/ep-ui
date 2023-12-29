import React from 'react'
import AccordionFAQItem from '../AccordionFAQItem'
import { useTranslation } from 'react-i18next'
import { transformTextContent } from '@/utils/transformTextContent'

const WhereToGetIQTokens = () => {
  const { t } = useTranslation('faq')
  const content = t('faqWhereToGetIQTokensContent')
  const transformedContent = transformTextContent(content)

  return (
    <AccordionFAQItem
      title={t('faqWhereToGetIQTokens')}
      content={transformedContent}
    />
  )
}

export default WhereToGetIQTokens
