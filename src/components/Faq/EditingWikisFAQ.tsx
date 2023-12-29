import React from 'react'
import { Text, Flex, Icon } from '@chakra-ui/react'
import { RiEdit2Fill } from 'react-icons/ri'
import AccordionFAQItem from './AccordionFAQItem'
import { useTranslation } from 'next-i18next'

const EditingWikisFAQ = () => {
  const { t } = useTranslation('faq')

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
          Editing Wikis on IQ.wiki
        </Text>
      </Flex>
      <AccordionFAQItem
        title={t('faqGettingStarted')}
        content={t('faqEditingGettingStartedContent')}
      />
      <AccordionFAQItem
        title={t('faqEditingMode')}
        content={t('faqEditingModeContent')}
      />
      <AccordionFAQItem
        title={t('faqHeaderSection')}
        content={t('faqHeaderSectionContent')}
      />
      <AccordionFAQItem
        title={t('faqEditingQuotes')}
        content={t('faqEditingQuotesContent')}
      />
      <AccordionFAQItem
        title={t('faqAddingMedia')}
        content={t('faqAddingMediaContent')}
      />
      <AccordionFAQItem
        title={t('faqEmbeddingVideos')}
        content={t('faqEmbeddingVideosContent')}
      />
      <AccordionFAQItem
        title={t('faqCategoriesAndTags')}
        content={t('faqCategoriesAndTagsContent')}
      />
      <AccordionFAQItem
        title={t('faqInternalLinks')}
        content={t('faqInternalLinksContent')}
      />
      <AccordionFAQItem
        title={t('faqEditHistory')}
        content={t('faqEditHistoryContent')}
      />
    </Flex>
  )
}

export default EditingWikisFAQ
