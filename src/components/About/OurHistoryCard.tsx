import React from 'react'
import { Flex, Box, Heading, Link, Text } from '@chakra-ui/react'
import { OurHistoryType } from '@/data/OurHistory'

const Paragraph = ({ text }: { text: string }) => {
  const parts = text.split(/(<Link.*?\/Link>)/)

  return (
    <Text whiteSpace="pre-line">
      {parts.map((part, index) =>
        part.startsWith('<Link') ? (
          <Link
            color="brandLinkColor"
            key={index}
            href={part && part.match(/href="(.*?)"/)?.[1]}
            target="_blank"
          >
            {part && part.match(/>(.*?)</)?.[1]}
          </Link>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </Text>
  )
}

const OurHistoryCard = ({ year, content }: OurHistoryType) => {
  return (
    <Flex gap="4" mb="10" flexDirection={{ base: 'column', md: 'row' }}>
      <Box>
        <Heading color="brandLinkColor">{year}</Heading>
      </Box>
      <Box
        p="3"
        border="1px solid"
        borderColor="aboutFeaturesCardBorder"
        bgColor="aboutFeaturesCardBg"
        borderRadius="16px"
      >
        <Paragraph text={content} />
      </Box>
    </Flex>
  )
}

export default OurHistoryCard
