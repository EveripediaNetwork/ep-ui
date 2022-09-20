import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { skipToken } from '@reduxjs/toolkit/query'
import { store } from '@/store/store'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Flex, Text, Button, Box } from '@chakra-ui/react'
import {
  getActivityById,
  useGetLatestIPFSByWikiQuery,
  getRunningOperationPromises,
  getWikiCreatorAndEditorByActivityId,
} from '@/services/activities'
import Link from 'next/link'
import { useAppSelector } from '@/store/hook'
import { WikiHeader } from '@/components/SEO/Wiki'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { WikiMarkup } from '@/components/Wiki/WikiPage/WikiMarkup'
import { incrementWikiViewCount } from '@/services/wikis/utils'
import { Activity } from '@/types/ActivityDataType'
import { getWikiPreviewsByCategory } from '@/services/wikis'
import { Wiki } from '@/types/Wiki'

interface RevisionPageProps {
  wiki: Activity
  relatedWikis: Wiki[] | null
}
const Revision = ({ wiki, relatedWikis }: RevisionPageProps) => {
  const router = useRouter()

  const { id: ActivityId } = router.query
  const [isTocEmpty, setIsTocEmpty] = React.useState<boolean>(true)
  const [isLatest, setIsLatest] = React.useState<boolean>(true)
  const toc = useAppSelector(state => state.toc)
  const [wikiData, setWikiData] = useState(wiki)

  const wikiId = wikiData?.content[0].id
  const { data: latestIPFS } = useGetLatestIPFSByWikiQuery(
    typeof wikiId === 'string' ? wikiId : skipToken,
    {
      skip: router.isFallback,
    },
  )

  // clear cite marks if any present initially
  useEffect(() => {
    store.dispatch({
      type: 'citeMarks/reset',
    })
  }, [ActivityId])

  // check if the current revision is the latest revision
  useEffect(() => {
    if (latestIPFS && wikiData && latestIPFS !== wikiData?.ipfs) {
      setIsLatest(false)
    } else {
      setIsLatest(true)
    }
  }, [latestIPFS, wikiData, wikiData?.ipfs])

  // get the link id if available to scroll to the correct position
  useEffect(() => {
    if (!isTocEmpty) {
      const linkId = window.location.hash
      if (linkId) router.push(`/revision/${ActivityId}#${linkId}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTocEmpty])

  React.useEffect(() => {
    setIsTocEmpty(toc.length === 0)
  }, [toc])

  useEffect(() => {
    const fetchUserDataAndIncView = async () => {
      if (ActivityId && typeof ActivityId === 'string') {
        const { data } = await store.dispatch(
          getWikiCreatorAndEditorByActivityId.initiate(ActivityId),
        )
        setWikiData({ ...wiki, ...data })
        if (wiki) incrementWikiViewCount(wiki.content[0].id)
      }
    }
    fetchUserDataAndIncView()
  }, [ActivityId, wiki])

  return (
    <>
      {wikiData && (
        <WikiHeader
          slug={wikiData.content[0].id as string}
          author={
            wikiData.content[0].author.profile?.username ||
            wikiData.content[0].author.id ||
            ''
          }
          dateModified={wikiData.content[0].updated}
          datePublished={wikiData.content[0].created}
          title={wikiData.content[0].title}
          description={wikiData.content[0].summary}
          mainImage={getWikiImageUrl(wikiData.content[0])}
        />
      )}

      <Box mt={-2}>
        {!isLatest && (
          <Flex
            flexDir={{ base: 'column', md: 'row' }}
            justify="center"
            align="center"
            gap={2}
            bgColor="red.200"
            _dark={{ bgColor: 'red.500' }}
            w="100%"
            p={2}
          >
            <Text textAlign="center">
              You are seeing an older version of this wiki.
            </Text>
            <Link href={`/wiki/${wikiData?.content[0].id}`} passHref>
              <Button
                as="a"
                maxW="120px"
                variant="solid"
                bgColor="dimColor"
                sx={{
                  '&:hover, &:focus, &:active': {
                    bgColor: 'dimColor',
                    textDecoration: 'underline',
                  },
                }}
                px={4}
                size="sm"
              >
                View Latest
              </Button>
            </Link>
          </Flex>
        )}
        <WikiMarkup
          wiki={wikiData?.content[0]}
          relatedWikis={relatedWikis}
          ipfs={wikiData?.ipfs}
        />
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params?.id
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const { data: activityData, error } = await store.dispatch(
    getActivityById.initiate(id),
  )

  let relatedWikis = null
  if (activityData?.content[0].categories) {
    const { data } = await store.dispatch(
      getWikiPreviewsByCategory.initiate({
        category: activityData.content[0].categories[0].id || '',
        limit: 4,
      }),
    )
    relatedWikis = data
  }

  await Promise.all(getRunningOperationPromises())

  if (activityData && !error)
    return {
      props: {
        wiki: activityData,
        relatedWikis,
      },
    }

  return {
    notFound: true,
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export default Revision
