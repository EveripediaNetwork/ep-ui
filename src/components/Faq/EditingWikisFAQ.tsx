import React from 'react'
import { Text, Flex, Icon } from '@chakra-ui/react'
import { RiEdit2Fill } from 'react-icons/ri'
import AccordionFAQItem from './AccordionFAQItem'
import { useTranslation } from 'next-i18next'
import { transformTextContent } from '@/utils/transformTextContent'

const EditingWikisFAQ = () => {
  const { t } = useTranslation('faq')

  const getTransformedContent = (contentKey: string) => {
    const content = t(contentKey)
    return transformTextContent(content)
  }

  return (
    <Flex direction="column" mt={10}>
      <Flex gap={2} align="center" justify="center" w="fit-content">
        <Icon as={RiEdit2Fill} boxSize={{ base: '25px', lg: '30px' }} />
        <Text
          fontWeight="bold"
          mt={5}
          textAlign={{ base: 'center', md: 'left', lg: 'left' }}
          fontSize={{ base: 'md', md: 'md', lg: 'xl' }}
          mb={4}
        >
          {t('faqEditingWikis')}
        </Text>
      </Flex>
      <AccordionFAQItem
        title={t('faqGettingStarted')}
        content={getTransformedContent('faqEditingGettingStartedContent')}
      />
      <AccordionFAQItem
        title={t('faqEditingMode')}
        content={getTransformedContent('faqEditingModeContent')}
      />
      <AccordionFAQItem
        title={t('faqHeaderSection')}
        content={getTransformedContent('faqHeaderSectionContent')}
      />
      <AccordionFAQItem
        title={t('faqEditingQuotes')}
        content={getTransformedContent('faqEditingQuotesContent')}
      />
      <AccordionFAQItem
        title={t('faqAddingMedia')}
        content={getTransformedContent('faqAddingMediaContent')}
      />
      <AccordionFAQItem
        title={t('faqEmbeddingVideos')}
        content={getTransformedContent('faqEmbeddingVideosContent')}
      />
      <AccordionFAQItem
        title={t('faqCategoriesAndTags')}
        content={getTransformedContent('faqCategoriesAndTagsContent')}
      />
      <AccordionFAQItem
        title={t('faqInternalLinks')}
        content={getTransformedContent('faqInternalLinksContent')}
      />
      <AccordionFAQItem
        title={t('faqEditHistory')}
        content={getTransformedContent('faqEditHistoryContent')}
      />
    </Flex>
  )
}

export default EditingWikisFAQ
