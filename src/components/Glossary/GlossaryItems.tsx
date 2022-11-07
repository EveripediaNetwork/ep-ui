import React from 'react'
import { Stack, Box, Text, Flex, chakra } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import GlossaryWikiCard from './GlossaryWikiCard'

interface GlossaryItemProps {
  wikis: Wiki[]
  glossaryAlphabets: string[]
}

const GlossaryItem = ({ wikis, glossaryAlphabets }: GlossaryItemProps) => {
  const SortedWikis: Wiki[] = wikis?.slice()
  SortedWikis?.sort((a, b) => {
    const Data = a.title.trim().localeCompare(b.title.trim())
    return Data
  })
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
                {ob.id[0] === item.toLocaleLowerCase() && (
                  <GlossaryWikiCard
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
