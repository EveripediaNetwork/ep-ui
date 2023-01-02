import React, { useEffect } from 'react'

import { useAppDispatch } from '@/store/hook'
import { LinkedWikiKey, Wiki, WikiPreview } from '@everipedia/iq-utils'
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Select,
  Stack,
  Text,
  Wrap,
  chakra,
} from '@chakra-ui/react'
import { getWikisByTitle } from '@/services/search'
import { debounce } from 'debounce'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import { store } from '@/store/store'
import { RiArrowRightDownLine, RiCloseLine } from 'react-icons/ri'

const LinkedWikisInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = React.useState('')
  const [results, setResults] = React.useState<WikiPreview[]>([])
  const [loading, setLoading] = React.useState(false)
  const [selectedWiki, setSelectedWiki] = React.useState('')
  const [linkType, setLinkType] = React.useState<LinkedWikiKey>()

  const fetchWikisList = async (
    query: string,
    cb: (data: WikiPreview[]) => void,
  ) => {
    const { data } = await store.dispatch(getWikisByTitle.initiate(query))
    cb(data || [])
  }

  const debouncedFetchWikis = debounce(
    (query: string, cb: (data: WikiPreview[]) => void) => {
      fetchWikisList(query, cb)
    },
    500,
  )

  useEffect(() => {
    if (search.length >= 3) {
      setLoading(true)
      debouncedFetchWikis(search, data => {
        setResults(data.slice(0, 6))
        setLoading(false)
      })
    } else setResults([])
    if (search !== '') setSelectedWiki('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleAddWiki = () => {
    dispatch({
      type: 'wiki/addLinkedWiki',
      payload: {
        linkType,
        wikiId: selectedWiki,
      },
    })
    setSearch('')
    setSelectedWiki('')
  }

  const handleRemoveWiki = (wikiId: string, WikiLinkType: LinkedWikiKey) => {
    store.dispatch({
      type: 'wiki/removeLinkedWiki',
      payload: {
        linkType: WikiLinkType,
        wikiId,
      },
    })
  }

  const containsLinkedWikis =
    wiki.linkedWikis &&
    Object.values(wiki.linkedWikis).some(wikis => wikis.length > 0)

  return (
    <Stack rounded="md" _dark={{ borderColor: 'whiteAlpha.300' }} spacing="2">
      <Text fontWeight="semibold">Link Wikis</Text>
      <Flex
        borderColor="gray.200"
        _dark={{ borderColor: 'whiteAlpha.200' }}
        gap="2"
        direction={{ base: 'column', sm: 'row' }}
      >
        <Select
          value={linkType}
          onChange={e => setLinkType(e.target.value as LinkedWikiKey)}
          size="sm"
          rounded="md"
          flex="5"
          placeholder="Select option"
        >
          {Object.values(LinkedWikiKey).map(key => (
            <chakra.option key={key} value={key}>
              {key}
            </chakra.option>
          ))}
        </Select>
        <Box flex="8">
          <AutoComplete
            onChange={val => {
              setSelectedWiki(val)
              setSearch('')
            }}
          >
            <AutoCompleteInput
              size="sm"
              flex="8"
              rounded="md"
              disabled={!linkType}
              placeholder="Search a wiki"
              value={(search || selectedWiki) ?? ''}
              onChange={e => setSearch(e.target.value)}
              type="url"
            />
            {results.length !== 0 && (
              <AutoCompleteList
                maxH={32}
                mt={0}
                overflowY="auto"
                borderTopRadius={0}
                p={2}
                px={0}
              >
                {results.map(result => (
                  <AutoCompleteItem
                    px={2}
                    py={1}
                    rounded="none"
                    m={0}
                    fontSize="xs"
                    key={`option-${result.id}`}
                    value={result}
                    textTransform="capitalize"
                  >
                    {result.title}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            )}
          </AutoComplete>
        </Box>
        <Button
          isLoading={loading}
          disabled={!linkType}
          flex="1"
          size="sm"
          rounded="md"
          mx="auto"
          onClick={handleAddWiki}
        >
          Add
        </Button>
      </Flex>
      <Box
        borderWidth={containsLinkedWikis ? 1 : 0}
        p={containsLinkedWikis ? 2 : 0}
        borderRadius="md"
      >
        {wiki.linkedWikis &&
          Object.entries(wiki.linkedWikis).map(([key, value], i) =>
            value.length ? (
              <HStack
                key={key}
                borderTopWidth={i !== 0 ? 1 : 0}
                paddingTop={i !== 0 ? 2 : 0}
                marginTop={i !== 0 ? 2 : 0}
                borderStyle="dashed"
                align="start"
              >
                <HStack p={0.3}>
                  <Icon as={RiArrowRightDownLine} />
                  <Text fontSize="sm">{key}</Text>
                </HStack>
                <Wrap>
                  {value.map(wikiId => (
                    <Button
                      key={`${wikiId}-${key}`}
                      display="flex"
                      gap={2}
                      bg="gray.100"
                      color="black"
                      _hover={{
                        bg: 'gray.100',
                      }}
                      _dark={{
                        color: 'white',
                        bg: 'whiteAlpha.100',
                      }}
                      rounded="md"
                      size="xs"
                      px={2}
                    >
                      <HStack>
                        <Text fontWeight="normal" fontSize="xs">
                          {wikiId}
                        </Text>
                      </HStack>
                      <Center
                        boxSize={4}
                        fontSize="xs"
                        fontWeight="bold"
                        lineHeight="none"
                        color="red.100"
                        bg="red.400"
                        _hover={{ bg: 'red.500' }}
                        rounded="full"
                        onClick={() =>
                          handleRemoveWiki(wikiId, key as LinkedWikiKey)
                        }
                      >
                        <Icon as={RiCloseLine} />
                      </Center>
                    </Button>
                  ))}
                </Wrap>
              </HStack>
            ) : null,
          )}
      </Box>
    </Stack>
  )
}

export default LinkedWikisInput
