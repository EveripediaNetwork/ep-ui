import React from 'react'
import AccordionFAQItem from '../AccordionFAQItem'
import { transformTextContent } from '@/utils/transformTextContent'
import { useTranslation } from 'next-i18next'

const EditingIQWiki = () => {
  const { t } = useTranslation('faq')
  const content = t('faqEditingWikiContent')
  const transformedContent = transformTextContent(content)

  return (
    <AccordionFAQItem
      title={t('faqEditingWiki')}
      content={transformedContent}
    />
  )
}

export default EditingIQWiki
