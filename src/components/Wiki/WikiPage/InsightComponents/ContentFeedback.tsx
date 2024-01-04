import React, { useState } from 'react'
import { VStack, Text, Flex, Button, Box } from '@chakra-ui/react'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { VscSmiley } from 'react-icons/vsc'
import { useContentFeedbackMutation } from '@/services/admin'
import { ContentFeedbackType } from '@/types/admin'
import WikiAccordion from '../../WikiAccordion'
import { useTranslation } from 'next-i18next'

const ContentFeedback = ({
  choice,
  contentId,
  userId,
}: {
  choice: boolean
  contentId: string
  userId?: string
}) => {
  const [feedbackVal, setFeedbackVal] = useState<boolean>(choice)
  const [contentFeedback] = useContentFeedbackMutation()
  const sendFeedback = async (feedback: ContentFeedbackType) => {
    setFeedbackVal(false)
    await contentFeedback({ contentId, userId, feedback })
  }
  const { t } = useTranslation('wiki')

  return (
    <VStack w="100%" spacing={4} borderRadius={2}>
      <WikiAccordion
        display="flex"
        withNoDarkBg
        flexDir="column"
        gap={2}
        title={t('feedback')}
        defaultOpen
      >
        <VStack bgColor="wikiCardItemBg" borderRadius={4} gap="2" p={3}>
          {feedbackVal ? (
            <Box w="full" alignItems="start" px={1}>
              <Text fontSize="14px">{t('didYouFindThisInteresting')}</Text>
              <Flex
                mt="3"
                w="full"
                justifyContent="space-between"
                fontSize="14px"
              >
                <Button
                  w="48%"
                  rounded="lg"
                  fontSize="16px"
                  size="md"
                  fontWeight="normal"
                  leftIcon={<FiThumbsUp fontSize="20px" />}
                  onClick={() => sendFeedback(ContentFeedbackType.positive)}
                >
                  {t('yes')}
                </Button>
                <Button
                  w="48%"
                  rounded="lg"
                  fontSize="16px"
                  size="md"
                  fontWeight="normal"
                  leftIcon={<FiThumbsDown fontSize="20px" />}
                  onClick={() => sendFeedback(ContentFeedbackType.negative)}
                >
                  {t('no')}
                </Button>
              </Flex>
            </Box>
          ) : (
            <Flex alignItems="center" gap={1} w="full">
              <Text fontWeight="light" fontSize="14px">
                {t('feedbackThanks')}
              </Text>
              <VscSmiley color="#ff1a88" />
            </Flex>
          )}
        </VStack>
      </WikiAccordion>
    </VStack>
  )
}
export default ContentFeedback
