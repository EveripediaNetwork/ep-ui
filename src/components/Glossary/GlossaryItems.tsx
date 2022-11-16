import React from 'react'
import { Stack, Box, Text, Flex, chakra } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import { Element } from 'react-scroll'
import GlossaryWikiCard from './GlossaryWikiCard'

interface GlossaryItemProps {
  highlightText: string
  wikis: Wiki[]
  glossaryAlphabets: string[]
}

const GlossaryItem = ({
  highlightText,
  wikis,
  glossaryAlphabets,
}: GlossaryItemProps) => {
  const lettersIdentifier = /^[a-zA-Z]+$/

  const cardOrder = (letter: string, alphabet: string) => {
    const trimmedLetter = letter.trim()
    if (
      lettersIdentifier.test(trimmedLetter[0]) &&
      trimmedLetter[0].toLocaleLowerCase() === alphabet.toLocaleLowerCase()
    ) {
      return 1
    }
    if (!lettersIdentifier.test(trimmedLetter[0]) && alphabet === '#') {
      return 2
    }
    return 0
  }
  const SortedWikis: Wiki[] = wikis?.slice()
  SortedWikis?.sort((a, b) => {
    const Data = a.title.trim().localeCompare(b.title.trim())
    return Data
  })
  return (
    <Stack w="full" my="7">
      {glossaryAlphabets.map((item, i) => (
        <chakra.div key={i} id={item} pt="50px" mt="-20px">
          <Element name={item}>
            <Box
              w="full"
              py="1"
              bg="gray.50"
              _dark={{ bg: 'whiteAlpha.50' }}
              my="4"
              px={{ base: 8, md: 10, lg: '32' }}
            >
              <Text fontSize={{ base: 'xl', lg: '4xl' }} fontWeight="bold">
                {item}
              </Text>
            </Box>
          </Element>

          <Flex
            justifyContent="center"
            alignItems="center"
            mb="-40px"
            mt="30px"
            direction="column"
            gap="14"
          >
            {SortedWikis.map(ob => (
              <>
                {cardOrder(ob.title, item) === 1 && (
                  <GlossaryWikiCard
                    highlightText={highlightText}
                    title={ob.title}
                    summary={ob.summary}
                    wikiId={ob.id}
                  />
                )}
                {cardOrder(ob.title, item) === 2 && (
                  <GlossaryWikiCard
                    highlightText={highlightText}
                    title={ob.title}
                    summary={ob.summary}
                    wikiId={ob.id}
                  />
                )}
              </>
            ))}
          </Flex>
        </chakra.div>
      ))}
    </Stack>
  )
}

export default GlossaryItem
