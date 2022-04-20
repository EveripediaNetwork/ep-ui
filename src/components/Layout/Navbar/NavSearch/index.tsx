import React from 'react'
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
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteGroupTitle,
  AutoCompleteListProps,
} from '@choc-ui/chakra-autocomplete'
import {
  fillType,
  SearchItem,
  SEARCH_TYPES,
  useNavSearch,
} from '@/services/nav-search/utils'

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

  const emptyState = (
    <Flex direction="column" gap="6" align="center" justify="center" py="16">
      <chakra.span fontWeight="semibold">No search Results</chakra.span>
      <Button
        variant="outline"
        px="10"
        w="fit-content"
        fontWeight="semibold"
        fontSize="xs"
      >
        Create New Wiki
      </Button>
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
    <AutoCompleteGroup>
      <AutoCompleteGroupTitle {...titleStyles}>Articles</AutoCompleteGroupTitle>
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
    </AutoCompleteGroup>
  )

  const categoriesSearchList = (
    <AutoCompleteGroup>
      <AutoCompleteGroupTitle {...titleStyles}>
        Categories
      </AutoCompleteGroupTitle>
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
    </AutoCompleteGroup>
  )

  const searchList = (
    <>
      {articlesSearchList}
      {categoriesSearchList}
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
          placeholder="Search items, collections and accounts"
          _placeholderShown={{
            textOverflow: 'ellipsis',
            width: '96%',
          }}
          {...inputProps}
        />
      </InputGroup>

      <AutoCompleteList
        p="0"
        mx={{ base: 4, md: 0 }}
        shadow="lg"
        maxH="auto"
        {...listProps}
      >
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
        <Flex
          color="gray.600"
          _dark={{ color: 'whiteAlpha.600' }}
          fontSize="xs"
          pl="3.5"
          py="5"
          borderTopWidth={1}
        >
          Press ‘Enter’ to reveal search results
        </Flex>
      </AutoCompleteList>
    </AutoComplete>
  )
}
