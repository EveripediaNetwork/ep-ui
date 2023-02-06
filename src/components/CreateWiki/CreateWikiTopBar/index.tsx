import { HStack } from '@chakra-ui/react'
import React from 'react'
import { WikiTitleInput } from './WikiTitleInput'
import WikiScoreIndicator from './WikiScoreIndicator'
import { WikiPublishButton } from './WikiPublish/WikiPublishButton'

export const CreateWikiTopBar = () => {
  return (
    <HStack
      boxShadow="sm"
      borderRadius={4}
      borderWidth="1px"
      p={3}
      justifyContent="space-between"
      mx="auto"
      mb={3}
      mt={2}
      w="96%"
    >
      <WikiTitleInput />
      <HStack gap={5}>
        <WikiScoreIndicator />
        <WikiPublishButton />
      </HStack>
    </HStack>
  )
}
