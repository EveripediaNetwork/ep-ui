import React from 'react'
import { ListItem, UnorderedList } from '@chakra-ui/react'
import AccordionFAQItem from '../AccordionFAQItem'
import { useTranslation } from 'next-i18next'

const IQRules = () => {
  const { t } = useTranslation('faq')

  return (
    <AccordionFAQItem
      title={t('faqRules')}
      content={
        <>
          <b>{t('faqStandards')}</b>
          <br />
          <UnorderedList>
            <ListItem>{t('faqRules1')}</ListItem>
            <ListItem>{t('faqRules2')}</ListItem>
            <ListItem>{t('faqRules3')}</ListItem>
            <ListItem>{t('faqRules4')}</ListItem>
            <ListItem>{t('faqRules5')}</ListItem>
            <ListItem>{t('faqRules6')}</ListItem>
            <ListItem>{t('faqRules7')}</ListItem>
            <ListItem>{t('faqRules8')}</ListItem>
            <ListItem>{t('faqRules9')}</ListItem>
          </UnorderedList>
          <br />
          <b>{t('faqDonts')}</b>
          <br />
          <UnorderedList>
            <ListItem>{t('faqRules10')}</ListItem>
            <ListItem>{t('faqRules11')}</ListItem>
            <ListItem>{t('faqRules12')}</ListItem>
          </UnorderedList>
        </>
      }
    />
  )
}

export default IQRules
