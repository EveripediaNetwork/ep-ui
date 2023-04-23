import React from 'react'
import { Flex, Box, Heading, Link, Text } from '@chakra-ui/react'
import { OurHistoryType } from '@/data/OurHistory'

const Paragraph = ({ text }: { text: string }) => {
  const parts = text.split(/(<Link.*?\/Link>)/)

  return (
    <Text
      fontSize={{ base: '14px', md: '16px', lg: '18px' }}
      whiteSpace="pre-line"
      fontWeight={500}
    >
      {parts.map((part, index) =>
        part.startsWith('<Link') ? (
          <Link
            color="brandLinkColor"
            key={index}
            href={part?.match(/href="(.*?)"/)?.[1]}
            target="_blank"
          >
            {part?.match(/>(.*?)</)?.[1]}
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
    <Flex
      gap={{ base: '4', lg: '12' }}
      mb={{ base: 8, md: '10' }}
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Box>
        <Heading fontSize={{ base: '30px', lg: '48px' }} color="brandLinkColor">
          {year}
        </Heading>
      </Box>
      <Box
        px="5"
        py="10"
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
