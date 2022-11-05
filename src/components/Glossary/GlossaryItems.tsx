import React from 'react'
import { Stack, Box, Text, Flex, chakra } from '@chakra-ui/react'
import GlossaryWikiCard from './GlossaryWikiCard'
import { GlossaryTagWiki } from '@/services/glossary'

interface GlossaryItemProps {
  wikis: GlossaryTagWiki[] | undefined
  glossaryAlphabets: string[]
}

const GlossaryItem = ({ wikis, glossaryAlphabets }: GlossaryItemProps) => {
  return (
    <Stack w="full" my="7">
      {glossaryAlphabets.map((item, i) => (
        <chakra.div key={i} id={item} pt="50px">
          <Box
            w="full"
            py="1"
            bg="gray.50"
            _dark={{ bg: 'whiteAlpha.50' }}
            my="4"
            px="10"
          >
            <Text fontSize={{ base: 'xl', lg: '4xl' }} fontWeight="bold">
              {item}
            </Text>
          </Box>
          <Flex justifyContent="center" mb="-50px">
            <GlossaryWikiCard
              title="Lorem"
              brief="Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed 
              do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi 
              ut aliquip ex ea commodo consequat. Duis aute irure dolor 
              in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
              non proident, sunt in culpa qui officia deserunt mollit 
              anim id est laborum."
              wikiId="ipsum"
            />
          </Flex>
        </chakra.div>
      ))}
    </Stack>
  )
}

export default GlossaryItem
