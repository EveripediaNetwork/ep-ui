import React from 'react'
import AccordionFAQItem from '../AccordionFAQItem'
import { transformFAQContent } from '@/utils/transformFAQContent'
import { useTranslation } from 'next-i18next'

const EditingIQWiki = () => {
  const { t } = useTranslation('faq')
  const content = t('faqEditingWikiContent')
  const transformedContent = transformFAQContent(content)

  return (
    <AccordionFAQItem
      title="How do I join Brainlist and start editing IQ.wiki?"
      content={transformedContent}
    />
  )
}

export default EditingIQWiki
