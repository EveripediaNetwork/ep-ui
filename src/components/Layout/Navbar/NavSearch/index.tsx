import React, { useRef } from 'react'
import {
  Center,
  Flex,
  InputGroup,
  InputLeftElement,
  Spinner,
  chakra,
  Button,
  HTMLChakraProps,
  Avatar,
  Text,
  useEventListener,
  InputRightElement,
  HStack,
  VisuallyHidden,
  Kbd,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
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
import Link from 'next/link'

export type NavSearchProps = {
  inputGroupProps?: HTMLChakraProps<'div'>
  inputProps?: HTMLChakraProps<'div'>
  listProps?: AutoCompleteListProps
}

const ItemPaths = {
  [SEARCH_TYPES.ARTICLE]: '/wiki/',
  [SEARCH_TYPES.CATEGORY]: '/categories/',
}

const ARTICLES_LIMIT = 5
const CATEGORIES_LIMIT = 2
const ACTION_KEY_DEFAULT = ['Ctrl', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']

export const NavSearch = (props: NavSearchProps) => {
  const { inputGroupProps, inputProps, listProps } = props
  const { query, setQuery, isLoading, results } = useNavSearch()
  const router = useRouter()

  const unrenderedArticles = results.articles.length - ARTICLES_LIMIT
  const unrenderedCategories = results.categories.length - CATEGORIES_LIMIT
  const noResults =
    results.articles.length === 0 && results.categories.length === 0

  const resolvedUnrenderedArticles =
    unrenderedArticles > 0 ? unrenderedArticles : 0
  const resolvedUnrenderedCategories =
    unrenderedCategories > 0 ? unrenderedCategories : 0
  const totalUnrendered =
    resolvedUnrenderedArticles + resolvedUnrenderedCategories

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [actionKey, setActionKey] = React.useState(ACTION_KEY_APPLE)
  React.useEffect(() => {
    if (typeof navigator === 'undefined') return
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent)
    if (!isMac) {
      setActionKey(ACTION_KEY_DEFAULT)
    }
  }, [])

  useEventListener('keydown', event => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.userAgent)
    const hotkey = isMac ? 'metaKey' : 'ctrlKey'
    if (
      (event.key.toLowerCase() === 'k' && event[hotkey]) ||
      event.key === '/'
    ) {
      event.preventDefault()
      inputRef.current?.focus()
    }
  })

  const emptyState = (
    <Flex direction="column" gap="6" align="center" justify="center" py="16">
      <chakra.span fontWeight="semibold">No search Results</chakra.span>
      <Link passHref href="/create-wiki">
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

  const loadingView = (
    <Center py="9">
      <Spinner color="#63B3ED" />
    </Center>
  )

  const titleStyles: HTMLChakraProps<'div'> = {
    fontWeight: 'normal',
    fontSize: 'md',
    textTransform: 'capitalize',
    p: 4,
    m: 0,
  }

  const generalItemStyles: HTMLChakraProps<'div'> = {
    m: 0,
    rounded: 'none',
    px: 4,
    py: 2,
    gap: '2.5',
    borderY: '1px',
    borderColor: 'inherit',
  }

  const articlesSearchList = (
    <>
      {results.articles?.slice(0, ARTICLES_LIMIT).map(article => {
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
            <Avatar src={articleImage} name={article.title} size="xs" />
            <Flex direction="column">
              <chakra.span fontWeight="semibold" fontSize="sm">
                {article.title}
              </chakra.span>
              <Text noOfLines={1} maxW="full" fontSize="xs">
                {article.content}
              </Text>
            </Flex>
            <Flex gap="1" ml="auto">
              {article.tags?.map(tag => (
                <chakra.div
                  key={`${article.id}-${tag.id}`}
                  fontWeight="medium"
                  fontSize="xs"
                  alignSelf="center"
                  px="2"
                  borderWidth={1}
                  rounded="md"
                  _dark={{
                    bg: 'gray.800',
                  }}
                  ml="auto"
                >
                  {tag.id}
                </chakra.div>
              ))}
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
        <AutoCompleteGroupTitle {...titleStyles}>
          Articles
        </AutoCompleteGroupTitle>
        {articlesSearchList}
      </AutoCompleteGroup>
      <AutoCompleteGroup>
        <AutoCompleteGroupTitle {...titleStyles}>
          Categories
        </AutoCompleteGroupTitle>
        {categoriesSearchList}
      </AutoCompleteGroup>
    </>
  )

  return (
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
      }}
    >
      <InputGroup
        size="lg"
        maxW="800px"
        display={{ base: 'none', sm: 'none', md: 'block' }}
        {...inputGroupProps}
      >
        <InputLeftElement ml={4} pointerEvents="none" h="full">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <AutoCompleteInput
          ml={4}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search wikis, categories and tags"
          _placeholderShown={{
            textOverflow: 'ellipsis',
            // width: '96%',
          }}
          ref={inputRef}
          {...inputProps}
        />
        <InputRightElement pointerEvents="none">
          <HStack>
            <VisuallyHidden>Press </VisuallyHidden>
            <Kbd color="gray.500" rounded="2px">
              <chakra.div
                as="abbr"
                title={actionKey[1]}
                textDecoration="none !important"
              >
                {actionKey[0]}
              </chakra.div>
            </Kbd>
            <VisuallyHidden> and </VisuallyHidden>
            <Kbd color="gray.500" rounded="2px">
              K
            </Kbd>
            <VisuallyHidden> to search</VisuallyHidden>
          </HStack>
        </InputRightElement>
      </InputGroup>

      <AutoCompleteList p="0" mx={4} shadow="lg" maxH="auto" {...listProps}>
        {isLoading ? loadingView : searchList}

        {totalUnrendered > 0 && !isLoading && (
          <Flex _dark={{ color: 'whiteAlpha.600' }} py="5" justify="center">
            <Link href={`/search/${query}`} passHref>
              <Button variant="outline" as="a">
                +View {totalUnrendered} more Results
              </Button>
            </Link>
          </Flex>
        )}
      </AutoCompleteList>
    </AutoComplete>
  )
}
