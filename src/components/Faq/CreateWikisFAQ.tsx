import React from 'react'
import { Text, Flex, Icon } from '@chakra-ui/react'
import { RiSettings3Fill } from 'react-icons/ri'
import AccordionFAQItem from './AccordionFAQItem'
import { useTranslation } from 'next-i18next'

const CreateWikisFAQ = () => {
  const { t } = useTranslation('faq')

  return (
    <Flex direction="column" mt={10}>
      <Flex gap={2} align="center" justify="center" w="fit-content">
        <Icon as={RiSettings3Fill} boxSize={{ base: '25px', lg: '30px' }} />
        <Text
          fontWeight="bold"
          mt={5}
          textAlign={{ base: 'center', md: 'left', lg: 'left' }}
          fontSize={{ base: 'md', md: 'md', lg: 'xl' }}
          mb={4}
        >
          {t('faqCreatingWikisIntro')}
        </Text>
      </Flex>
      <AccordionFAQItem
        title={t('faqCreateWikiGettingStarted')}
        content={t('faqCreateWikiGettingStartedContent')}
      />
      <AccordionFAQItem
        title={t('faqAddingFeaturedImage')}
        content={t('faqAddingFeaturedImageContent')}
      />
      <AccordionFAQItem
        title={t('faqFillingArticles')}
        content={t('faqFillingArticlesContent')}
      />
      <AccordionFAQItem
        title={t('faqAddingCitation')}
        content={t('faqAddingCitationContent')}
      />
      <AccordionFAQItem
        title={t('faqSubmittingWiki')}
        content={t('faqSubmittingWikiContent')}
      />
    </Flex>
  )
}

export default CreateWikisFAQ
