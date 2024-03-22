import React from 'react'
import { Stack, Box, Text, Flex, chakra } from '@chakra-ui/react'
import { Element } from 'react-scroll'
import GlossaryWikiCard from './GlossaryWikiCard'
import { GlossaryItemType } from '@/types/GlossaryType'

const GlossaryItem = ({
  highlightText,
  glossary,
  glossaryAlphabets,
}: GlossaryItemType) => {
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

  return (
    <Stack w="full">
      {glossaryAlphabets.map((item, i) => (
        <chakra.div
          key={i}
          id={item}
          display="flex"
          flexDirection={{ base: 'column', lg: 'row' }}
          borderBottom="1px"
          borderBottomColor="carouselArrowBorderColor"
          gap={{ base: '4', lg: '32' }}
          pb={{ base: '4', lg: '10' }}
          pt={{ base: '4', lg: '10' }}
        >
          <Element name={item}>
            <Box w="fit-content" py="1">
              <Text
                fontSize={{ base: 'xl', lg: '4xl' }}
                fontWeight="bold"
                fontFamily="sans-serif"
                style={{
                  WebkitTextStroke: '1px black',
                  color: '#FFFFFFEB',
                }}
              >
                {item}
              </Text>
            </Box>
          </Element>

          <Flex
            direction="column"
            gap={{ base: '8', lg: '10' }}
            px={{ base: '0', lg: '4' }}
            w="full"
          >
            {glossary
              .sort((a, b) => {
                const aTitle = a.title.toLowerCase()
                const bTitle = b.title.toLowerCase()

                if (aTitle < bTitle) {
                  return -1
                }
                if (aTitle > bTitle) {
                  return 1
                }
                return 0
              })
              ?.map((ob) => (
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
