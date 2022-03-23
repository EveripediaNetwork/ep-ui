import React from 'react'
import { Heading, VStack, Box } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import { Image } from '@/components/Elements/Image/Image'

interface WikiInsightsProps {
  wiki: Wiki | undefined
}

const WikiInsights = ({ wiki }: WikiInsightsProps) => (
  <Box p={4}>
    <VStack
      minW="400px"
      p={4}
      mt={24}
      spacing={4}
      borderWidth="1px"
      borderRadius={2}
    >
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
        {wiki?.title}
      </Heading>
      <Image
        src={`https://picsum.photos/seed/${wiki?.title}/400/400`}
        w="100%"
        h="320px"
      />
    </VStack>
  </Box>
)

export default WikiInsights
