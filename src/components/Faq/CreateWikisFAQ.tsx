import React from 'react'
import { Text, Flex, Icon } from '@chakra-ui/react'
import { RiSettings3Fill } from 'react-icons/ri'
import AccordionFAQItem from './AccordionFAQItem'
import { useTranslation } from 'next-i18next'
import { transformTextContent } from '@/utils/transformTextContent'

const CreateWikisFAQ = () => {
  const { t } = useTranslation('faq')

  const getTransformedContent = (contentKey: string) => {
    const content = t(contentKey)
    return transformTextContent(content)
  }

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
        content={getTransformedContent('faqCreateWikiGettingStartedContent')}
      />
      <AccordionFAQItem
        title={t('faqAddingFeaturedImage')}
        content={getTransformedContent('faqAddingFeaturedImageContent')}
      />
      <AccordionFAQItem
        title={t('faqFillingArticles')}
        content={getTransformedContent('faqFillingArticlesContent')}
      />
      <AccordionFAQItem
        title={t('faqAddingCitation')}
        content={getTransformedContent('faqAddingCitationContent')}
      />
      <AccordionFAQItem
        title={t('faqSubmittingWiki')}
        content={getTransformedContent('faqSubmittingWikiContent')}
      />
    </Flex>
  )
}

export default CreateWikisFAQ
