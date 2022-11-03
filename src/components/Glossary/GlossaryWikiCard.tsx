import React from 'react'
import {
  VStack,
  Heading,
  Text,
  Box,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { WIKI_SUMMARY_LIMIT } from '@/data/Constants'

interface GlossaryWikiCardProps {
  wikiId: string
  title: string
  brief: string
}

const GlossaryWikiCard = ({ title, brief, wikiId }: GlossaryWikiCardProps) => {
  return (
    <LinkBox
      as="article"
      borderWidth="1px"
      borderColor="borderColorHover"
      overflow="hidden"
      borderRadius="12px"
      w={{ base: '20%', lg: '60%' }}
    >
      <Box cursor="pointer" w="full">
        <VStack pb="2" w="full" px="3">
          <LinkOverlay href={`/wikis/${wikiId}`} w="full">
            <Heading size="lg" my="10px" color="brand.500">
              {title}
            </Heading>
          </LinkOverlay>
          <Text fontSize="md" opacity="0.6" w="full">
            {brief.length > WIKI_SUMMARY_LIMIT
              ? brief.slice(0, WIKI_SUMMARY_LIMIT).concat('...')
              : brief}
          </Text>
        </VStack>
      </Box>
    </LinkBox>
  )
}

export default GlossaryWikiCard
