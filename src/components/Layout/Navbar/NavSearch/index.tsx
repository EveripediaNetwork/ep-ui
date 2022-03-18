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
import { useNavSearch } from '@/services/nav-search/utils'

export type NavSearchProps = {
  inputGroupProps?: HTMLChakraProps<'div'>
  inputProps?: HTMLChakraProps<'div'>
  listProps?: AutoCompleteListProps
}

export const NavSearch = (props: NavSearchProps) => {
  const { inputGroupProps, inputProps, listProps } = props
  const { query, setQuery, isLoading, results } = useNavSearch()

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
      {results.articles?.map(article => {
        const articleImage = `https://gateway.pinata.cloud/ipfs/${
          article.images && article.images[0].id
        }`
        return (
          <AutoCompleteItem
            key={article.id}
            value={article}
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
            <Flex gap="1">
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
      {results.categories?.map(category => (
        <AutoCompleteItem
          key={category.id}
          value={category}
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
      ))}
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
      suggestWhenEmpty
      emptyState={!isLoading && emptyState}
      shouldRenderSuggestions={q => q.length >= 3}
      openOnFocus={query.length >= 3}
    >
      <InputGroup
        size="lg"
        maxW="800px"
        display={{ base: 'none', sm: 'none', md: 'block' }}
        {...inputGroupProps}
      >
        <InputLeftElement pointerEvents="none" h="full">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <AutoCompleteInput
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search items, collections and accounts"
          {...inputProps}
        />
      </InputGroup>

      <AutoCompleteList p="0" shadow="lg" maxH="auto" {...listProps}>
        {isLoading ? loadingView : searchList}

        <Flex
          color="whiteAlpha.600"
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
