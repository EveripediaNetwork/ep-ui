import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  chakra,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { fetchCategoriesList, fetchWikisList } from '@/services/search/utils'
import { SearchSkeleton } from '@/components/Search/SearchSkeleton'
import { Category } from '@/services/search'
import ActivityCard from '@/components/Activity/ActivityCard'
import { WikiPreview } from '@/types/Wiki'
import { Link } from '@/components/Elements'

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
        brief={article.summary}
        editor={article.user}
        wiki={article}
        wikiId={article.id}
        lastModTimeStamp={article.updated}
      />
    )
  })
  const categoryList = categories.map(category => {
    return (
      <Link href={`/categories/${category.id}`} passHref>
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
      </Link>
    )
  })

  return (
    <Box bgColor="pageBg" my={-8} py={8}>
      <NextSeo
        title={`Results for ${query}`}
        openGraph={{
          title: `Results for ${query}`,
          description: `Showing ${totalResults} Wikis with ${query} query`,
        }}
      />
      <Box w="min(90%, 1100px)" mx="auto" my={{ base: '10', lg: '16' }}>
        <Heading mt={8} mb={4} as="h1" size="2xl" letterSpacing="wide">
          Results for {query}
        </Heading>

        {!isLoading && (
          <Stack spacing="4">
            <Text>Showing {totalResults} results </Text>

            <Heading fontSize="2xl">Articles</Heading>
            <Flex direction="column" gap="4">
              {articleList}
            </Flex>
            {categories.length !== 0 && (
              <>
                <Heading fontSize="2xl">Categories</Heading>
                <Flex direction="column" gap="4">
                  {categoryList}
                </Flex>
              </>
            )}
          </Stack>
        )}
        {isLoading && <SearchSkeleton />}
      </Box>
    </Box>
  )
}

export default SearchQuery
