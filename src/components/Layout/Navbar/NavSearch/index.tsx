import React, { useRef } from 'react'
import {
  Center,
  Flex,
  InputGroup,
  InputLeftElement,
  Spinner,
  chakra,
  HTMLChakraProps,
  Text,
  useEventListener,
  Wrap,
  Avatar,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { getWikiSummary, WikiSummarySize } from '@/utils/getWikiSummary'
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteGroupTitle,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteListProps,
} from '@choc-ui/chakra-autocomplete'
import {
  fillType,
  SearchItem,
  SEARCH_TYPES,
  useNavSearch,
} from '@/services/search/utils'
import { useRouter } from 'next/router'
import config from '@/config'
import { LinkButton } from '@/components/Elements'
import SearchSEO from '@/components/SEO/Search'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { WikiImage } from '@/components/WikiImage'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { logEvent } from '@/utils/googleAnalytics'

export type NavSearchProps = {
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
  inputGroupProps?: HTMLChakraProps<'div'>
  inputProps?: HTMLChakraProps<'div'>
  listProps?: AutoCompleteListProps
}

const ItemPaths = {
  [SEARCH_TYPES.WIKI]: '/wiki/',
  [SEARCH_TYPES.CATEGORY]: '/categories/',
  [SEARCH_TYPES.ACCOUNT]: '/account/',
}

const WIKIS_LIMIT = 5
const CATEGORIES_LIMIT = 2
const ACCOUNTS_LIMIT = 4

const NavSearch = (props: NavSearchProps) => {
  const { inputGroupProps, inputProps, listProps, setHamburger } = props
  const { query, setQuery, isLoading, results } = useNavSearch()
  const router = useRouter()

  const unrenderedWikis = results.wikis.length - WIKIS_LIMIT
  const unrenderedCategories = results.categories.length - CATEGORIES_LIMIT
  const unrenderedAccounts = results.accounts.length - ACCOUNTS_LIMIT
  const noResults =
    results.wikis.length === 0 &&
    results.categories.length === 0 &&
    results.accounts.length === 0

  const resolvedUnrenderedWikis = unrenderedWikis > 0 ? unrenderedWikis : 0
  const resolvedUnrenderedCategories =
    unrenderedCategories > 0 ? unrenderedCategories : 0
  const resolvedUnrenderedAccounts =
    unrenderedAccounts > 0 ? unrenderedAccounts : 0
  const totalUnrendered =
    resolvedUnrenderedWikis +
    resolvedUnrenderedCategories +
    resolvedUnrenderedAccounts

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

  const emptyState = (
    <Flex direction="column" gap="6" align="center" justify="center" py="16">
      <chakra.span fontWeight="semibold">No search Results</chakra.span>
      <LinkButton
        variant="outline"
        px="10"
        w="fit-content"
        fontWeight="semibold"
        fontSize="xs"
        href="/create-wiki"
      >
        Create New Wiki
      </LinkButton>
    </Flex>
  )

  const loadingView = (
    <Center py="9">
      <Spinner color="#63B3ED" />
    </Center>
  )

  const titleStyles: HTMLChakraProps<'div'> = {
    fontWeight: 'normal',
    fontSize: 'md',
    textTransform: 'capitalize',
    borderBottomWidth: 1,
    p: 4,
    m: 0,
  }

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

  const wikisSearchList = (
    <>
      {results.wikis?.slice(0, WIKIS_LIMIT).map(wiki => {
        const wikiImage = `${config.pinataBaseUrl}${
          wiki.images && wiki.images[0].id
        }`
        const value = fillType(wiki, SEARCH_TYPES.WIKI)
        // This negates the bug that is caused by two wikis with the same title.
        // value.title = `${article.title}${article.id}`
        return (
          <AutoCompleteItem
            key={wiki.id}
            value={value}
            getValue={art => art.title}
            label={wiki.title}
            onClick={() => setHamburger(false)}
            {...generalItemStyles}
          >
            <WikiImage
              src={wikiImage}
              alt={wiki.title}
              imgBoxSize={WIKI_IMAGE_ASPECT_RATIO * 40}
              flexShrink={0}
              borderRadius={5}
              overflow="hidden"
            />
            <Flex direction="column" w={{ lg: '100%' }}>
              <chakra.span fontWeight="semibold" fontSize="sm">
                {wiki.title}
              </chakra.span>
              <Text noOfLines={{ base: 2, lg: 1 }} maxW="full" fontSize="xs">
                {getWikiSummary(wiki, WikiSummarySize.Huge)}
              </Text>
            </Flex>
            <Wrap
              w="full"
              justify="end"
              gap="1"
              ml="auto"
              maxWidth="fit-content"
              display={wiki.tags.length > 0 ? 'flex' : 'none'}
            >
              {wiki.tags?.map(tag => (
                <chakra.div
                  key={`${wiki.id}-${tag.id}`}
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

  const accountsSearchList = (
    <>
      {results.accounts?.slice(0, ACCOUNTS_LIMIT).map(account => {
        const value = fillType(account, SEARCH_TYPES.ACCOUNT)
        return (
          <AutoCompleteItem
            key={account.id}
            value={value}
            getValue={acc => acc.username}
            label={account.bio}
            onClick={() => setHamburger(false)}
            {...generalItemStyles}
          >
            <DisplayAvatar
              alt={account.username}
              address={account.id}
              avatarIPFS={account.avatar}
            />
            <Flex direction="column">
              <chakra.span fontWeight="semibold" fontSize="sm">
                {account.username}
              </chakra.span>
              <Text noOfLines={1} maxW="full" fontSize="xs">
                {account.bio}
              </Text>
            </Flex>
          </AutoCompleteItem>
        )
      })}
    </>
  )

  const categoriesSearchList = (
    <>
      {results.categories?.slice(0, CATEGORIES_LIMIT).map(category => {
        const value = fillType(category, SEARCH_TYPES.CATEGORY)
        return (
          <AutoCompleteItem
            key={category.id}
            value={value}
            getValue={art => art.title}
            label={category.title}
            onClick={() => setHamburger(false)}
            {...generalItemStyles}
            alignItems="center"
          >
            <Avatar src={category.cardImage} name={category.title} size="xs" />
            <chakra.span fontWeight="semibold" fontSize="sm">
              {category.title}
            </chakra.span>
          </AutoCompleteItem>
        )
      })}
    </>
  )

  const searchList = (
    <>
      <AutoCompleteGroup>
        <AutoCompleteGroupTitle {...titleStyles}>Wikis</AutoCompleteGroupTitle>
        {wikisSearchList}
      </AutoCompleteGroup>
      <AutoCompleteGroup>
        <AutoCompleteGroupTitle {...titleStyles}>
          Categories
        </AutoCompleteGroupTitle>
        {categoriesSearchList}
      </AutoCompleteGroup>
      <AutoCompleteGroup>
        <AutoCompleteGroupTitle {...titleStyles}>
          Accounts
        </AutoCompleteGroupTitle>
        {accountsSearchList}
      </AutoCompleteGroup>
    </>
  )

  return (
    <>
      <SearchSEO />
      <AutoComplete
        closeOnSelect={false}
        disableFilter
        suggestWhenEmpty
        emptyState={!isLoading && noResults && emptyState}
        shouldRenderSuggestions={q => q.length >= 3}
        openOnFocus={query.length >= 3}
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
        <InputGroup
          size="lg"
          maxW="800px"
          display={{ base: 'none', md: 'block' }}
          {...inputGroupProps}
        >
          <InputLeftElement
            ml={{ base: '15px', xl: 'unset' }}
            pointerEvents="none"
            h="full"
          >
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <AutoCompleteInput
            ml={{ base: '15px', xl: 'unset' }}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search wikis, categories, tags and users"
            _placeholderShown={{
              textOverflow: 'ellipsis',
            }}
            fontSize="16"
            ref={inputRef}
            {...inputProps}
          />
        </InputGroup>

        <AutoCompleteList
          mx={{ base: '15px', xl: 'unset' }}
          p="0"
          maxH="auto"
          shadow="lg"
          {...listProps}
        >
          {isLoading ? loadingView : searchList}
          {totalUnrendered > 0 && !isLoading && (
            <Flex _dark={{ color: 'whiteAlpha.600' }} py="5" justify="center">
              <LinkButton
                href={`/search/${query}`}
                variant="outline"
                onClick={() => setHamburger(false)}
              >
                +View {totalUnrendered} more Results
              </LinkButton>
            </Flex>
          )}
        </AutoCompleteList>
      </AutoComplete>
    </>
  )
}

export default NavSearch
