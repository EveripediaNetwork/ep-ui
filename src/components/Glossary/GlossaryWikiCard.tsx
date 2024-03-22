import React from 'react'
import {
  VStack,
  Heading,
  Text,
  Box,
  LinkBox,
  Highlight,
} from '@chakra-ui/react'
import { WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import LinkOverlay from '@/components/Elements/LinkElements/LinkOverlay'
import { GlossaryWikiCardProps } from '@/types/GlossaryType'

const GlossaryWikiCard = ({
  highlightText,
  title,
  summary,
  wikiId,
}: GlossaryWikiCardProps) => {
  return (
    <LinkBox
      as="article"
      overflow="hidden"
      borderRadius="12px"
      w={{ base: 'full', md: '90%' }}
      p="3"
      _hover={{
        bgColor: 'tagHoverColor',
      }}
    >
      <Box cursor="pointer" w="full">
        <VStack w="full" px="3">
          <LinkOverlay href={`/wiki/${wikiId}`} w="full">
            <Heading size={{ base: 'sm', lg: 'md' }} my="10px" fontSize="36px">
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
                bg: 'brand.300',
                color: 'black',
                _dark: { bg: 'brand.800', color: 'white' },
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
