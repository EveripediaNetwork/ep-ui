import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { skipToken } from '@reduxjs/toolkit/query'
import { NextSeo } from 'next-seo'
import { getRunningOperationPromises } from '@/services/wikis'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import {
  ComponentPropsWithoutRef,
  HeadingProps,
  ReactMarkdownProps,
} from 'react-markdown/lib/ast-to-react'
import { HStack, Flex, Spinner, Text, Button, Box } from '@chakra-ui/react'
import WikiActionBar from '@/components/Wiki/WikiPage/WikiActionBar'
import WikiMainContent from '@/components/Wiki/WikiPage/WikiMainContent'
import WikiInsights from '@/components/Wiki/WikiPage/WikiInsights'
import WikiTableOfContents from '@/components/Wiki/WikiPage/WikiTableOfContents'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { getWikiSummary } from '@/utils/getWikiSummary'
import WikiPreviewHover from '@/components/Wiki/WikiPage/WikiPreviewHover'
import WikiNotFound from '@/components/Wiki/WIkiNotFound/WikiNotFound'
import {
  getActivityById,
  getLatestIPFSByWiki,
  useGetActivityByIdQuery,
  useGetLatestIPFSByWikiQuery,
} from '@/services/activities'
import Link from 'next/link'

const Wiki = () => {
  const router = useRouter()

  const { id: ActivityId } = router.query
  const {
    isLoading,
    error,
    data: wiki,
  } = useGetActivityByIdQuery(
    typeof ActivityId === 'string' ? ActivityId : skipToken,
    {
      skip: router.isFallback,
    },
  )
  const [isTocEmpty, setIsTocEmpty] = React.useState<boolean>(true)
  const [isLatest, setIsLatest] = React.useState<boolean>(true)

  const { data: latestIPFS } = useGetLatestIPFSByWikiQuery(
    typeof ActivityId === 'string' ? ActivityId : skipToken,
    {
      skip: router.isFallback,
    },
  )

  // get the link id if available to scroll to the correct position
  useEffect(() => {
    if (!isTocEmpty) {
      const linkId = window.location.hash.replace('#', '')
      if (linkId) {
        router.push(`/wiki/${ActivityId}#${linkId}`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTocEmpty])

  useEffect(() => {
    if (latestIPFS === wiki?.ipfs) {
      setIsLatest(true)
    }
  }, [latestIPFS, wiki?.ipfs])

  // here toc is not state variable since there seems to be some issue
  // with in react-markdown that is causing infinite loop if toc is state variable
  // (so using useEffect to update toc length for now)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toc: {
    level: number
    id: string
    title: string
  }[] = []

  React.useEffect(() => {
    setIsTocEmpty(toc.length === 0)
  }, [toc])

  // listen to changes in toc variable and update the length of the toc
  /* eslint-disable react/prop-types */
  const addToTOC = ({
    children,
    ...props
  }: React.PropsWithChildren<HeadingProps>) => {
    const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1))
    if (level && children && typeof children[0] === 'string') {
      // id for each heading to be used in table of contents
      const id = `${children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${
        toc.length
      }`

      // TODO: Find out why this is happening
      // if the last item in toc is same as current item, remove the last item
      // to avoid duplicate items
      if (toc[toc.length - 1]?.title === children[0]) {
        toc.pop()
      }
      toc.push({
        level,
        id,
        title: children[0],
      })
      return React.createElement(props.node.tagName, { id }, children)
    }
    return React.createElement(props.node.tagName, props, children)
  }

  const addWikiPreview = ({
    children,
    ...props
  }: React.PropsWithChildren<
    ComponentPropsWithoutRef<'a'> & ReactMarkdownProps
  >) => {
    // TODO: Make more specific regex
    const wikiLinkRecognizer = /.*\/wiki\/(.*)/
    const wikiSlug = props?.href?.match(wikiLinkRecognizer)?.[1]

    // Checks if the link is a wiki link
    const isChildrenPresent =
      children && typeof children[0] === 'string' && children[0].length > 0
    const isWikiSlugPresent = wikiSlug && wikiSlug.length > 0

    // render special hover component if the link is a wiki link
    if (isChildrenPresent && isWikiSlugPresent && props.href) {
      return (
        <WikiPreviewHover
          text={children[0] as string}
          href={props.href}
          slug={wikiSlug}
        />
      )
    }
    return React.createElement(props.node.tagName, props, children)
  }
  /* eslint-enable react/prop-types */

  return (
    <>
      {wiki && (
        <NextSeo
          title={wiki.content[0].title}
          openGraph={{
            title: wiki.content[0].title,
            description: getWikiSummary(wiki.content[0]),
            images: [
              {
                url: getWikiImageUrl(wiki.content[0]),
              },
            ],
          }}
        />
      )}

      <main>
        {!error && (router.isFallback || isLoading) ? (
          <Flex justify="center" align="center" h="50vh">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <Box mt={-2}>
            {!isLatest && (
              <Flex
                flexDir={{ base: 'column', lg: 'row' }}
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
            <HStack m="0 !important" align="stretch" justify="stretch">
              <Flex
                w="100%"
                justify="space-between"
                direction={{ base: 'column', md: 'row' }}
              >
                <WikiActionBar wiki={wiki?.content[0]} />
                {wiki ? (
                  <>
                    <WikiMainContent
                      wiki={wiki.content[0]}
                      addToTOC={addToTOC}
                      addWikiPreview={addWikiPreview}
                      editedTimestamp={wiki.datetime}
                    />
                    <WikiInsights wiki={wiki.content[0]} ipfs={wiki.ipfs} />
                  </>
                ) : (
                  <WikiNotFound />
                )}
              </Flex>
              {!isTocEmpty && <WikiTableOfContents toc={toc} isAlertAtTop />}
            </HStack>
          </Box>
        )}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.id
  if (typeof id === 'string') {
    store.dispatch(getActivityById.initiate(id))
    store.dispatch(getLatestIPFSByWiki.initiate(id))
  }
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default Wiki
