import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SearchSkeleton } from '@/components/Search/SearchSkeleton'
import { fetchWikisList } from '@/services/search/utils'
import { WikiPreview } from '@/types/Wiki'
import { Flex, Box } from '@chakra-ui/react'
import NotificationCard from '@/components/Notification/NotificationCard'

const SearchWikiNotificationsResult = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [results, setResults] = useState<{
    articles: WikiPreview[]
  }>({
    articles: [],
  })
  const route = useRouter()
  const q = route.query?.q as string

  useEffect(() => {
    setIsLoading(true)

    Promise.all([fetchWikisList(q)]).then(res => {
      const [articles = []] = res
      if (articles.length) {
        setResults({ articles })
        setIsLoading(false)
      }
    })
  }, [q])

  const { articles } = results

  const articleList = articles.map(article => {
    return (
      <NotificationCard
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

  return (
    <>
      {!isLoading && articles.length !== 0 && (
        <Box>
          <Flex direction="column" gap="4">
            {articleList}
          </Flex>
        </Box>
      )}
      {isLoading && <SearchSkeleton />}
    </>
  )
}

export default SearchWikiNotificationsResult
