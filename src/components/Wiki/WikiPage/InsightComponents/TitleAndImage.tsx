import React from 'react'
import { Heading, VStack } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'

export const TitleAndImage = ({ title }: { title: string | undefined }) => {
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
      <Image
        src={`https://picsum.photos/seed/${title}/400/400`}
        w="100%"
        h="320px"
      />
    </VStack>
  )
}
