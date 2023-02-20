import React, { useState } from 'react'
import { VStack, Text, Flex, Button, Box } from '@chakra-ui/react'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { VscSmiley } from 'react-icons/vsc'
import WikiAccordion from '../../WikiAccordion'

const ContentFeedback = ({ feedback }: { feedback: boolean }) => {
  const [feedbackVal, setFeedbackVal] = useState<boolean>(feedback)
  const sendFeedback = () => {
    setFeedbackVal(false)
  }
  return (
    <VStack w="100%" spacing={4} borderRadius={2}>
      <WikiAccordion
        display="flex"
        withNoDarkBg
        flexDir="column"
        gap={2}
        title="Feedback"
      >
        <VStack bgColor="wikiCardItemBg" borderRadius={4} gap="2" p={3}>
          {feedbackVal ? (
            <Box w="full" alignItems="start" px={1}>
              <Text fontSize="14px">
                Did you find this article interesting?
              </Text>
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
                  onClick={() => sendFeedback()}
                >
                  Yes
                </Button>
                <Button
                  w="48%"
                  rounded="lg"
                  fontSize="16px"
                  size="md"
                  fontWeight="normal"
                  leftIcon={<FiThumbsDown fontSize="20px" />}
                  onClick={() => sendFeedback()}
                >
                  No
                </Button>
              </Flex>
            </Box>
          ) : (
            <Flex alignItems="center" gap={1} w="full">
              <Text fontWeight="light" fontSize="14px">
                Thank you for the honest Feedback!
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
