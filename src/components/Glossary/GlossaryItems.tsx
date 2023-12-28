import React from 'react'
import { Stack, Box, Text, Flex, chakra } from '@chakra-ui/react'
import { Element } from 'react-scroll'
import GlossaryWikiCard from './GlossaryWikiCard'
import { GlossaryItemType } from '@/types/GlossaryType'

const GlossaryItem = ({
  highlightText,
  glossary,
  glossaryAlphabets,
  t,
}: GlossaryItemType) => {
  const lettersIdentifier = /^[a-zA-Z]+$/

  const cardOrder = (letter: string, alphabet: string) => {
    console.log(letter, alphabet)
    const trimmedLetter = letter.trim()
    if (
      lettersIdentifier.test(trimmedLetter[0]) &&
      trimmedLetter[0].toLocaleLowerCase() === alphabet?.toLocaleLowerCase()
    ) {
      return 1
    }
    if (!lettersIdentifier.test(trimmedLetter[0]) && alphabet === '#') {
      return 2
    }
    return 0
  }

  return (
    <Stack w="full" my="7">
      {glossaryAlphabets.map((item, i) => (
        <chakra.div key={i} id={item.id} pt="50px" mt="-20px">
          <Element name={item.id}>
            <Box
              w="full"
              py="1"
              bg="glossaryItemBg"
              my="4"
              px={{ base: 8, md: 10, lg: '32' }}
            >
              <Text fontSize={{ base: 'xl', lg: '4xl' }} fontWeight="bold">
                {t(item.label)}
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
                  {cardOrder(ob.title, item.id) === 1 && (
                    <GlossaryWikiCard
                      highlightText={highlightText}
                      title={ob.title}
                      summary={ob.summary}
                      wikiId={ob.id}
                    />
                  )}
                  {cardOrder(ob.title, item.id) === 2 && (
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
