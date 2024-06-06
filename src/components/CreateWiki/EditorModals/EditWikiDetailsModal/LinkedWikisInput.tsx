import React, { useEffect } from 'react'
import { useAppDispatch } from '@/store/hook'
import { LinkedWikiKey, Wiki, WikiPreview } from '@everipedia/iq-utils'
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Select,
  Stack,
  Text,
  Wrap,
  chakra,
  SimpleGrid,
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
import { useTranslation } from 'next-i18next'

const LinkedWikisInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = React.useState('')
  const [results, setResults] = React.useState<WikiPreview[]>([])
  const [loading, setLoading] = React.useState(false)
  const [selectedWiki, setSelectedWiki] = React.useState('')
  const [linkType, setLinkType] = React.useState<LinkedWikiKey>()
  const { t } = useTranslation('wiki')

  const fetchWikisList = async (
    query: string,
    cb: (data: WikiPreview[]) => void,
    tag?: string,
  ) => {
    const { data } = await store.dispatch(getWikisByTitle.initiate(query))
    const filteredData = data?.filter((w) =>
      w.tags.find((t) => t.id.toLocaleLowerCase() === tag),
    )
    cb(filteredData ?? [])
  }

  const debouncedFetchWikis = debounce(
    (query: string, cb: (data: WikiPreview[]) => void) => {
      fetchWikisList(query, cb, linkType)
    },
    500,
  )

  useEffect(() => {
    if (search.length >= 2) {
      setLoading(true)
      debouncedFetchWikis(search, (data) => {
        setResults(data.slice(0, 6))
        setLoading(false)
      })
    } else setResults([])
    if (search !== '') setSelectedWiki('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleAddWiki = () => {
    if (selectedWiki === '') return
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

  const onlyLastTypeHasWikis =
    wiki.linkedWikis &&
    Object.values(wiki.linkedWikis).filter((w) => w.length > 0).length === 1 &&
    Object.values(wiki.linkedWikis).reverse()[0].length > 0

  const containsLinkedWikis =
    wiki.linkedWikis &&
    Object.values(wiki.linkedWikis).some((wikis) => wikis.length > 0)

  const getWikiPreviewByTitle = (
    wikiPreviews: WikiPreview[],
    wikiTitle: string,
  ): WikiPreview | undefined =>
    wikiPreviews.find((preview) => preview.title === wikiTitle)

  return (
    <Stack rounded="md" _dark={{ borderColor: 'whiteAlpha.300' }} spacing="2">
      <Text fontWeight="semibold">{t('linkWikis')}</Text>
      <SimpleGrid
        borderColor="gray.200"
        _dark={{ borderColor: 'whiteAlpha.200' }}
        gap="2"
        gridTemplateColumns={{ base: '1fr 2fr', md: '1.2fr 2fr 0.8fr' }}
      >
        <Select
          value={linkType}
          onChange={(e) => setLinkType(e.target.value as LinkedWikiKey)}
          h="40px"
          rounded="md"
          flex="5"
          placeholder={t('selectOption')}
        >
          {Object.values(LinkedWikiKey).map((key) => (
            <chakra.option key={key} value={key}>
              {t(key)}
            </chakra.option>
          ))}
        </Select>
        <Box flex="8">
          <AutoComplete
            disableFilter
            suggestWhenEmpty
            shouldRenderSuggestions={(q) => q.length >= 2}
            openOnFocus={search.length >= 2}
            emptyState={
              <Center>
                <Text m={5} fontSize="xs" color="linkColor" textAlign="center">
                  No results found. make sure the wiki you are searching for has{' '}
                  &apos;{linkType}&apos; tag.
                </Text>
              </Center>
            }
            onSelectOption={(option) => {
              const { title } = option.item.originalValue
              const wikiPreview = getWikiPreviewByTitle(results, title)
              setSelectedWiki(wikiPreview?.id ?? '')
              setSearch('')
            }}
          >
            <AutoCompleteInput
              h="40px"
              flex="8"
              rounded="md"
              disabled={!linkType}
              placeholder={t('searchWiki')}
              value={(search || selectedWiki) ?? ''}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              type="text"
              autoFocus
            />
            {!loading && (
              <AutoCompleteList
                maxH={32}
                mt={0}
                overflowY="auto"
                borderTopRadius={0}
                p={2}
                px={0}
              >
                {results.map((result) => (
                  <AutoCompleteItem
                    px={4}
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
          gridColumn={{ base: 'span 2', md: 'unset' }}
          h="40px"
          rounded="md"
          onClick={handleAddWiki}
        >
          {t('add')}
        </Button>
      </SimpleGrid>
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
                borderTopWidth={i !== 0 && !onlyLastTypeHasWikis ? 1 : 0}
                paddingTop={i !== 0 && !onlyLastTypeHasWikis ? 2 : 0}
                marginTop={i !== 0 && !onlyLastTypeHasWikis ? 2 : 0}
                borderStyle="dashed"
                align="start"
              >
                <HStack p={0.3}>
                  <Icon as={RiArrowRightDownLine} />
                  <Text fontSize="sm">{key}</Text>
                </HStack>
                <Wrap>
                  {value.map((wikiId) => (
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
