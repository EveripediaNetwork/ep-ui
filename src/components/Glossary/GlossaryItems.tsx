import React from 'react'
import { Stack, Box, Text, Flex } from '@chakra-ui/react'
import { Wikis } from '@/types/admin'
import GlossaryWikiCard from './GlossaryWikiCard'

interface GlossaryItemProps {
  //   wikis: Wikis[]
  glossaryAlphabets: string[]
}

const GlossaryItem = ({ glossaryAlphabets }: GlossaryItemProps) => {
  return (
    <Stack w="full" mt="5">
      {glossaryAlphabets.map(item => (
        <>
          <Box
            w="full"
            py="1"
            bg="gray.50"
            _dark={{ bg: 'whiteAlpha.50' }}
            mb="2"
          >
            <Text fontSize={{ base: 'xl', lg: '4xl' }} fontWeight="bold" px="5">
              {item}
            </Text>
          </Box>
          <Flex justifyContent="center">
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
        </>
      ))}
    </Stack>
  )
}

export default GlossaryItem
