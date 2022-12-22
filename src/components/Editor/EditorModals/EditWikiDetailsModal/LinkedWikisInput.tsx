import React, { useEffect } from 'react'

import { useAppDispatch } from '@/store/hook'
import { LinkedWikiKey, Wiki, WikiPreview } from '@everipedia/iq-utils'
import {
  Box,
  Button,
  Flex,
  Select,
  Stack,
  Text,
  chakra,
} from '@chakra-ui/react'
import { getWikisByTitle } from '@/services/search'
import { store } from '@/store/store'
import { debounce } from 'debounce'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'

const LinkedWikisInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = React.useState('')
  const [results, setResults] = React.useState<WikiPreview[]>([])
  const [loading, setLoading] = React.useState(false)
  const [selectedWiki, setSelectedWiki] = React.useState<string | null>(null)
  const [linkType, setLinkType] = React.useState<LinkedWikiKey>()

  console.log(`STATE IN COMPONENT: `, wiki.linkedWikis)

  const autoCompleteRef = React.useRef(null)

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
    if (search !== '') setSelectedWiki(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleAddWiki = () => {
    if (selectedWiki)
      dispatch({
        type: 'wiki/addLinkedWiki',
        payload: {
          linkType,
          wikiId: selectedWiki,
        },
      })
    setSearch('')
    setSelectedWiki(null)
  }

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
          <chakra.option value="founders">founders</chakra.option>
        </Select>
        <Box flex="8">
          <AutoComplete
            ref={autoCompleteRef}
            openOnFocus
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
              <AutoCompleteList maxH={32} overflowY="auto" p={2} px={0}>
                {results.map(result => (
                  <AutoCompleteItem
                    px={2}
                    py={1}
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
      <Box>
        {wiki.linkedWikis &&
          wiki.linkedWikis.founder?.map(linkedWiki => (
            <Box
              key={linkedWiki}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={2}
              rounded="md"
              borderColor="gray.200"
              _dark={{ borderColor: 'whiteAlpha.200' }}
              borderWidth="1px"
              mb={2}
            >
              <Text>{linkedWiki}</Text>
              <Button
                size="sm"
                rounded="md"
                onClick={() =>
                  dispatch({
                    type: 'wiki/removeLinkedWiki',
                    payload: linkedWiki,
                  })
                }
              >
                Remove
              </Button>
            </Box>
          ))}
      </Box>
    </Stack>
  )
}

export default LinkedWikisInput
