import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { skipToken } from '@reduxjs/toolkit/query'
import { store } from '@/store/store'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Flex, Text, Button, Box } from '@chakra-ui/react'
import {
  getActivityById,
  useGetLatestIPFSByWikiQuery,
  getRunningOperationPromises,
} from '@/services/activities'
import Link from 'next/link'
import { useAppSelector } from '@/store/hook'
import { WikiHeader } from '@/components/SEO/Wiki'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { WikiMarkup } from '@/components/Wiki/WikiPage/WikiMarkup'
import { incrementWikiViewCount } from '@/services/wikis/utils'
import { Activity } from '@/types/ActivityDataType'

interface RevisionPageProps {
  wiki: Activity
}
const Revision = ({ wiki }: RevisionPageProps) => {
  const router = useRouter()

  const { id: ActivityId } = router.query
  const [isTocEmpty, setIsTocEmpty] = React.useState<boolean>(true)
  const [isLatest, setIsLatest] = React.useState<boolean>(true)
  const toc = useAppSelector(state => state.toc)

  const wikiId = wiki?.content[0].id
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
    if (latestIPFS && wiki && latestIPFS !== wiki?.ipfs) {
      setIsLatest(false)
    } else {
      setIsLatest(true)
    }
  }, [latestIPFS, wiki, wiki?.ipfs])

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
    if (wiki) incrementWikiViewCount(wiki.content[0].id)
  }, [wiki])

  return (
    <>
      {wiki && (
        <WikiHeader
          slug={wiki.content[0].id as string}
          author={
            wiki.content[0].author.profile?.username ||
            wiki.content[0].author.id ||
            ''
          }
          dateModified={wiki.content[0].updated}
          datePublished={wiki.content[0].created}
          title={wiki.content[0].title}
          description={getWikiSummary(wiki.content[0])}
          mainImage={getWikiImageUrl(wiki.content[0])}
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
            <Link href={`/wiki/${wiki?.content[0].id}`} passHref>
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
        <WikiMarkup wiki={wiki?.content[0]} ipfs={wiki?.ipfs} />
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
  const { data, error } = await store.dispatch(getActivityById.initiate(id))
  await Promise.all(getRunningOperationPromises())

  if (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      wiki: data || [],
    },
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export default Revision
