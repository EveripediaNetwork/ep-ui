import React, { useEffect, useState } from 'react'
import {
  Avatar,
  chakra,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  fetchCategoriesList,
  fetchWikisList,
} from '@/services/nav-search/utils'
import { SearchSkeleton } from '@/components/Search/SearchSkeleton'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { Category, WikiTitle } from '@/services/nav-search'

const SearchQuery = () => {
  const { query: queryParam } = useRouter()
  const query = queryParam.query as string

  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<{
    articles: WikiTitle[]
    categories: Category[]
  }>({
    articles: [],
    categories: [],
  })
  useEffect(() => {
    setIsLoading(true)
    Promise.all([fetchWikisList(query), fetchCategoriesList(query)]).then(
      res => {
        const [articles = [], categories = []] = res
        if (articles.length || categories.length) {
          setResults({ articles, categories })
          setIsLoading(false)
        }
      },
    )
  }, [query])
  const { articles, categories } = results
  const totalResults = articles.length + categories.length
  console.log('articles :>> ', articles)

  const articleList = articles.map(article => {
    const cat = article?.categories?.[0]?.title
    return (
      <Flex key={article.id} bg="white" rounded="lg" shadow="lg" p="4">
        <Avatar
          src={getWikiImageUrl(article)}
          boxSize="16"
          sx={{ img: { rounded: 'none' } }}
        />
        <Flex direction="column" ml="4" gap="4" maxW="2xl">
          <chakra.span fontWeight="semibold" fontSize="sm">
            {article.title}
          </chakra.span>
          <Text noOfLines={1} maxW="full" fontSize="xs">
            {article.content}
          </Text>
          <HStack>
            {article.tags?.map(tag => (
              <chakra.div
                key={`${article.id}-${tag.id}`}
                fontWeight="medium"
                fontSize="xs"
                px="2"
                borderWidth={1}
                rounded="md"
                _dark={{
                  bg: 'gray.800',
                }}
              >
                {tag.id}
              </chakra.div>
            ))}
          </HStack>
        </Flex>
        <chakra.span
          ml="auto"
          display={{ base: 'none', md: 'block' }}
          color="brand.500"
          fontWeight="bold"
          cursor="pointer"
        >
          {cat}
        </chakra.span>
      </Flex>
    )
  })
  const categoryList = categories.map(category => {
    return (
      <Flex key={category.id} bg="white" rounded="lg" shadow="lg" p="4">
        <Avatar
          src={category.cardImage}
          name={category.title}
          boxSize="16"
          sx={{ img: { rounded: 'none' } }}
        />
        <chakra.span fontWeight="semibold" fontSize="sm" ml="4">
          {category.title}
        </chakra.span>
      </Flex>
    )
  })

  return (
    <Stack my="16" mx="30">
      <Heading>Results for {query}</Heading>

      {!isLoading && (
        <Stack spacing="12">
          <Text>Showing {totalResults} results </Text>

          <Heading fontSize="2xl">Articles</Heading>
          <Flex direction="column" gap="6">
            {articleList}
          </Flex>
          <Heading fontSize="2xl">Categories</Heading>
          <Flex direction="column" gap="6">
            {categoryList}
          </Flex>
        </Stack>
      )}
      {isLoading && <SearchSkeleton />}
    </Stack>
  )
}

export default SearchQuery
