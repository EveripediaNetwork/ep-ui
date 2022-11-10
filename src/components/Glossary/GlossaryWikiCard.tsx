import React from 'react'
import {
  VStack,
  Heading,
  Text,
  Box,
  LinkBox,
  LinkOverlay,
  Highlight,
} from '@chakra-ui/react'
import { WIKI_SUMMARY_LIMIT } from '@/data/Constants'

interface GlossaryWikiCardProps {
  highlightText: string
  wikiId: string
  title: string
  summary: string
}

const GlossaryWikiCard = ({
  highlightText,
  title,
  summary,
  wikiId,
}: GlossaryWikiCardProps) => {
  return (
    <LinkBox
      id={title}
      as="article"
      borderWidth="1px"
      borderColor="borderColorHover"
      overflow="hidden"
      borderRadius="12px"
      w="60%"
      p="3"
      _hover={{
        bgColor: 'gray.100',
        _dark: {
          bgColor: 'whiteAlpha.100',
        },
      }}
    >
      <Box cursor="pointer" w="full">
        <VStack pb="2" w="full" px="3">
          <LinkOverlay href={`/wiki/${wikiId}`} w="full">
            <Heading
              size={{ base: 'sm', lg: 'lg' }}
              my="10px"
              color="brand.500"
            >
              <Highlight
                query={highlightText}
                styles={{
                  px: '1',
                  py: '1',
                  bg: 'carouselArrowBorderColor',
                }}
              >
                {title}
              </Highlight>
            </Heading>
          </LinkOverlay>
          <Text fontSize="md" w="full">
            <Highlight
              query={highlightText}
              styles={{
                px: '1',
                py: '1',
                bg: 'brand.700',
                color: 'black',
                _dark: { bg: 'brand.300', color: 'white' },
              }}
            >
              {summary.length > WIKI_SUMMARY_LIMIT
                ? summary.slice(0, WIKI_SUMMARY_LIMIT).concat('...')
                : summary}
            </Highlight>
          </Text>
        </VStack>
      </Box>
    </LinkBox>
  )
}

export default GlossaryWikiCard
