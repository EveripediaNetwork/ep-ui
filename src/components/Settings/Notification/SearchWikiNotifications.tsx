import React, { useRef, FormEvent } from 'react'
import { useRouter } from 'next/router'
import {
  Center,
  Flex,
  InputGroup,
  Link,
  Spinner,
  chakra,
  Button,
  HTMLChakraProps,
  Text,
  useEventListener,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import {
  fillType,
  SearchItem,
  SEARCH_TYPES,
  useNavSearch,
} from '@/services/search/utils'
import { LinkButton } from '@/components/Elements'
import { logEvent } from '@/utils/googleAnalytics'
import config from '@/config'
import { getWikiSummary, WikiSummarySize } from '@/utils/getWikiSummary'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { WikiImage } from '@/components/WikiImage'

const ItemPaths = {
  [SEARCH_TYPES.ARTICLE]: '/wiki/',
  [SEARCH_TYPES.CATEGORY]: '/categories/',
  [SEARCH_TYPES.ACCOUNT]: '/account/',
}

const ARTICLES_LIMIT = 6

const SearchWikiNotifications = () => {
  const { query, setQuery, isLoading, results } = useNavSearch()
  const router = useRouter()

  const noResults =
    results.articles.length === 0 &&
    results.categories.length === 0 &&
    results.accounts.length === 0

  const unrenderedWikis = results.articles.length - ARTICLES_LIMIT

  const totalUnrenderedWikis = unrenderedWikis > 0 ? unrenderedWikis : 0

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEventListener('keydown', event => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.userAgent)
    const hotkey = isMac ? 'metaKey' : 'ctrlKey'
    const el = event.target as Element | undefined
    const interactiveElementIsFocused =
      el?.closest('input, [contenteditable=true], [role="dialog"]') !== null
    if (
      ((event.key && event.key.toLowerCase() === 'k' && event[hotkey]) ||
        event.key === '/') &&
      !interactiveElementIsFocused
    ) {
      event.preventDefault()
      inputRef.current?.focus()
    }
  })

  const loadingView = (
    <Center py="9">
      <Spinner color="#63B3ED" />
    </Center>
  )

  const emptyState = (
    <Flex direction="column" gap="6" align="center" justify="center" py="16">
      <chakra.span fontWeight="semibold">No search Results</chakra.span>
      <Link href="/create-wiki">
        <Button
          as="a"
          variant="outline"
          px="10"
          w="fit-content"
          fontWeight="semibold"
          fontSize="xs"
        >
          Create New Wiki
        </Button>
      </Link>
    </Flex>
  )

  const generalItemStyles: HTMLChakraProps<'div'> = {
    m: 0,
    rounded: 'none',
    px: 4,
    py: 2,
    gap: '2.5',
    borderBottomWidth: 1,
    _last: {
      borderBottomWidth: 0,
    },
  }

  const articlesSearchList = (
    <>
      {results.articles.slice(0, ARTICLES_LIMIT).map(article => {
        const articleImage = `${config.pinataBaseUrl}${
          article.images && article.images[0].id
        }`

        const value = fillType(article, SEARCH_TYPES.ARTICLE)
        return (
          <AutoCompleteItem
            key={article.id}
            value={value}
            getValue={art => art.title}
            label={article.title}
            {...generalItemStyles}
          >
            <WikiImage
              src={articleImage}
              alt={article.title}
              imgH="40px"
              imgW={`${WIKI_IMAGE_ASPECT_RATIO * 40}px`}
              flexShrink={0}
              borderRadius={5}
              overflow="hidden"
            />
            <Flex w={{ lg: '100%' }} justifyContent="space-between">
              <Flex direction="column">
                <Text noOfLines={1} fontWeight="semibold" fontSize="sm">
                  {article.title}
                </Text>
                <Text noOfLines={{ base: 2, lg: 1 }} maxW="full" fontSize="xs">
                  {getWikiSummary(article, WikiSummarySize.Big)}
                </Text>
              </Flex>
              <Flex ml="2">
                <Button
                  variant="outline"
                  fontSize="sm"
                  fontWeight={500}
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  Add
                </Button>
              </Flex>
            </Flex>
          </AutoCompleteItem>
        )
      })}
    </>
  )

  const searchList = (
    <>
      <AutoCompleteGroup>{articlesSearchList}</AutoCompleteGroup>
    </>
  )

  const searchQueryHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.location.href = `/account/settings?tab=notifications&query=${query}`
  }

  return (
    <>
      <Flex maxW="3xl" pos="relative">
        <AutoComplete
          closeOnSelect={false}
          disableFilter
          suggestWhenEmpty
          emptyState={!isLoading && noResults && emptyState}
          openOnFocus={query.length >= 3}
          shouldRenderSuggestions={q => q.length >= 3}
          onSelectOption={option => {
            const { id, type } = option.item.originalValue
            router.push(ItemPaths[type as SearchItem] + id)
            logEvent({
              action: 'CLICK_BY_SEARCH',
              label: ItemPaths[type as SearchItem] + id,
              value: 1,
              category: 'search_tags',
            })
          }}
        >
          <form action="" onSubmit={searchQueryHandler}>
            <InputGroup>
              <Flex
                borderWidth="1px"
                borderLeftRadius="8"
                borderColor="searchBorder"
                w="full"
                borderRight="none"
                pos="relative"
              >
                <Flex alignItems="center" justifyContent="center" pl="4">
                  <Search2Icon color="gray.300" />
                </Flex>
                <AutoCompleteInput
                  pl="2.5"
                  placeholder="Search to add wikis to your list"
                  variant="unstyled"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  _placeholderShown={{
                    textOverflow: 'ellipsis',
                  }}
                  ref={inputRef}
                  fontSize={{ base: '12', md: '16' }}
                />
                <AutoCompleteList
                  p="0"
                  maxH="auto"
                  borderWidth="1px"
                  borderColor="searchBorder"
                  shadow="lg"
                  borderStyle="solid"
                  w="full"
                  left="0"
                  top="12"
                >
                  {isLoading ? loadingView : searchList}
                  {totalUnrenderedWikis > 0 && !isLoading && (
                    <Flex
                      _dark={{ color: 'whiteAlpha.600' }}
                      py="5"
                      justify="center"
                    >
                      <LinkButton
                        href={`/account/settings?tab=notifications&query=${query}`}
                        variant="outline"
                      >
                        +View {totalUnrenderedWikis} more Results
                      </LinkButton>
                    </Flex>
                  )}
                </AutoCompleteList>
              </Flex>
              <Button
                type="submit"
                fontSize={{ base: '12', md: '14' }}
                fontWeight={600}
                colorScheme="brandLinkColor"
                size="lg"
                borderLeftRadius="0"
                borderRightRadius="8"
              >
                Search
              </Button>
            </InputGroup>
          </form>
        </AutoComplete>
      </Flex>
    </>
  )
}

export default SearchWikiNotifications
