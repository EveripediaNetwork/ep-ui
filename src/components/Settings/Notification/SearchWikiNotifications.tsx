import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import {
  Center,
  Flex,
  InputGroup,
  Spinner,
  chakra,
  Button,
  Text,
  useEventListener,
  Wrap,
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

const ARTICLES_LIMIT = 5
const CATEGORIES_LIMIT = 2
const ACCOUNTS_LIMIT = 4

const SearchWikiNotifications = () => {
  const { query, setQuery, isLoading, results } = useNavSearch()
  const router = useRouter()

  const allWikis = [
    ...results.accounts,
    ...results.articles,
    ...results.categories,
  ]

  console.log(allWikis)

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
            <Flex direction="column" w={{ lg: '100%' }}>
              <chakra.span fontWeight="semibold" fontSize="sm">
                {article.title}
              </chakra.span>
              <Text noOfLines={{ base: 2, lg: 1 }} maxW="full" fontSize="xs">
                {getWikiSummary(article, WikiSummarySize.Big)}
              </Text>
            </Flex>
            <Wrap
              w="full"
              justify="end"
              gap="1"
              ml="auto"
              maxWidth="fit-content"
              display={article.tags.length > 0 ? 'flex' : 'none'}
            >
              {article.tags?.map(tag => (
                <chakra.div
                  key={`${article.id}-${tag.id}`}
                  fontWeight="medium"
                  fontSize="xs"
                  alignSelf="center"
                  px="2"
                  borderBottomWidth={1}
                  bg="gray.100"
                  rounded="md"
                  _dark={{
                    bg: 'gray.800',
                  }}
                  ml="auto"
                >
                  {tag.id}
                </chakra.div>
              ))}
            </Wrap>
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

  return (
    <>
      <Flex maxW="3xl" pos="relative">
        <AutoComplete
          closeOnSelect={false}
          disableFilter
          suggestWhenEmpty
          emptyState={isLoading}
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
                fontSize={{ base: '13', xl: '16' }}
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
              </AutoCompleteList>
            </Flex>
            <Button
              fontSize={{ base: '13', xl: '16' }}
              colorScheme="brandLinkColor"
              size="lg"
              borderLeftRadius="0"
              borderRightRadius="8"
            >
              Search
            </Button>
          </InputGroup>
        </AutoComplete>
      </Flex>
    </>
  )
}

export default SearchWikiNotifications
