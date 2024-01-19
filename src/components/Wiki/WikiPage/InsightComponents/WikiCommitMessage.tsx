import React from 'react'
import WikiAccordion from '@/components/Wiki/WikiAccordion'
import AccordionWidget from '@/components/Wiki/WikiAccordion/AccordionWidget'
import { Text, VStack } from '@chakra-ui/react'
import { User } from '@everipedia/iq-utils'
import { useTranslation } from 'next-i18next'

const WikiCommitMessage = ({
  user,
  lastUpdated,
  commitMessage,
}: {
  user: User
  lastUpdated: string | undefined
  commitMessage: string | undefined
}) => {
  const { t } = useTranslation('wiki')
  const lastEdited = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '-'
  return (
    <VStack w="100%" spacing={4} borderRadius={8}>
      <WikiAccordion
        display="flex"
        withNoDarkBg
        flexDir="column"
        gap={2}
        title={t('commitInfo')}
      >
        <AccordionWidget title={t('editedBy')} type="account" content={user} />
        <AccordionWidget
          title={t('editedOn')}
          type="text"
          content={lastEdited}
        />
        {commitMessage && (
          <VStack
            bgColor="wikiCardItemBg"
            borderRadius={8}
            align="left"
            p={4}
            spacing={2}
          >
            <Text fontSize="sm" fontWeight="bold" color="linkColor">
              {t('Reason for edit:')}
            </Text>
            <Text fontSize="xs" color="linkColor">
              {commitMessage}
            </Text>
          </VStack>
        )}
      </WikiAccordion>
    </VStack>
  )
}

export default WikiCommitMessage
