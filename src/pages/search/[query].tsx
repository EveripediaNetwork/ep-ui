import React, { useEffect, useState } from 'react'
import { Avatar, chakra, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  fetchCategoriesList,
  fetchWikisList,
} from '@/services/nav-search/utils'
import { SearchSkeleton } from '@/components/Search/SearchSkeleton'
import { Category } from '@/services/nav-search'
import ActivityCard from '@/components/Activity/ActivityCard'
import { getWikiSummary } from '@/utils/getWikiSummary'
import NextLink from 'next/link'
import { WikiPreview } from '@/types/Wiki'

const SearchQuery = () => {
  const { query: queryParam } = useRouter()
  const query = queryParam.query as string

  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<{
    articles: WikiPreview[]
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

  const articleList = articles.map(article => {
    return (
      <ActivityCard
        key={article.id}
        title={article.title}
        brief={getWikiSummary({ content: article.content })}
        editor={article.user.id}
        wiki={article}
        wikiId={article.id}
      />
    )
  })
  const categoryList = categories.map(category => {
    return (
      <NextLink href={`/categories/${category.id}`} passHref>
        <Flex
          key={category.id}
          bgColor="cardBg"
          justifyContent="flex-start"
          borderWidth="1px"
          borderColor="cardBorder"
          borderRadius="lg"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.10)"
          px={{ base: 3, lg: 5 }}
          py={{ base: 3, lg: 3 }}
          w="full"
          cursor="pointer"
        >
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
      </NextLink>
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
          {categories.length !== 0 && (
            <>
              <Heading fontSize="2xl">Categories</Heading>
              <Flex direction="column" gap="6">
                {categoryList}
              </Flex>
            </>
          )}
        </Stack>
      )}
      {isLoading && <SearchSkeleton />}
    </Stack>
  )
}

export default SearchQuery
