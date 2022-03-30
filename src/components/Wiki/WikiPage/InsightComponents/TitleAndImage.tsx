import React from 'react'
import { Heading, VStack } from '@chakra-ui/react'
import { WikiTitle } from '@/services/nav-search'
import { WikiImage } from '@/components/WikiImage'

export const TitleAndImage = ({ wiki }: { wiki: WikiTitle }) => {
  const { title } = wiki
  return (
    <VStack minW="400px" p={4} spacing={4} borderWidth="1px" borderRadius={2}>
      <Heading
        bgColor="wikiCardBg"
        as="h3"
        fontSize="18px"
        p={3}
        borderRadius={4}
        fontWeight="600"
        w="100%"
        textAlign="center"
      >
        {title}
      </Heading>
      <WikiImage wiki={wiki} w="100%" h="320px" />
    </VStack>
  )
}
