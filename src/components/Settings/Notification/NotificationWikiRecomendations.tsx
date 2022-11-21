import React from 'react'
import NotificationCard from '@/components/Notification/NotificationCard'
import { useWikiSubRecommendations } from '@/services/wikis/utils'
import { Divider, Heading, Text, VStack } from '@chakra-ui/react'

export const WikiNotificationsRecommendations = ({
  address,
}: {
  address?: string
}) => {
  const { recommendations, loading: recommendationsLoading } =
    useWikiSubRecommendations(address)

  return (
    <>
      {recommendationsLoading ? (
        <>
          <Divider />
          <Text color="gray.400" align="center">
            Brewing some Recommendations...
          </Text>
          <Divider />
        </>
      ) : (
        recommendations.length > 0 && (
          <>
            <VStack align="left" spacing={2}>
              <Heading size="md">
                Recommendations for wikis to add to your List
              </Heading>
              <Text size="sm">
                Adding a wiki to your list subscribes you to updates for the
                wiki.
              </Text>
            </VStack>
            <Divider />
            <VStack spacing={4}>
              {recommendations?.length &&
                recommendations.map(r => {
                  const article = r.content[0]
                  return (
                    <NotificationCard
                      key={article.id}
                      title={article.title}
                      brief={article.summary}
                      editor={article.user}
                      wikiId={article.id}
                      lastModTimeStamp={article.updated}
                      categories={article.categories}
                      tags={article.tags}
                      WikiImgObj={article.images}
                    />
                  )
                })}
            </VStack>
          </>
        )
      )}
    </>
  )
}
