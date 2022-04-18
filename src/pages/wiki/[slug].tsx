import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { skipToken } from '@reduxjs/toolkit/query'
import { NextSeo } from 'next-seo'
import {
  getRunningOperationPromises,
  getWiki,
  getWikisByCategory,
  useGetWikiQuery,
} from '@/services/wikis'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import {
  ComponentPropsWithoutRef,
  HeadingProps,
  ReactMarkdownProps,
} from 'react-markdown/lib/ast-to-react'
import { HStack, Flex, Spinner } from '@chakra-ui/react'
import WikiActionBar from '@/components/Wiki/WikiPage/WikiActionBar'
import WikiMainContent from '@/components/Wiki/WikiPage/WikiMainContent'
import WikiInsights from '@/components/Wiki/WikiPage/WikiInsights'
import WikiTableOfContents from '@/components/Wiki/WikiPage/WikiTableOfContents'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { getWikiSummary } from '@/utils/getWikiSummary'
import WikiPreviewHover from '@/components/Wiki/WikiPage/WikiPreviewHover'
import WikiNotFound from '@/components/Wiki/WIkiNotFound/WikiNotFound'

const Wiki = () => {
  const router = useRouter()

  const { slug } = router.query
  const result = useGetWikiQuery(typeof slug === 'string' ? slug : skipToken, {
    skip: router.isFallback,
  })
  const { isLoading, error, data: wiki } = result
  const [isTocEmpty, setIsTocEmpty] = React.useState<boolean>(true)

  // get the link id if available to scroll to the correct position
  useEffect(() => {
    if (!isTocEmpty) {
      const linkId = window.location.hash.replace('#', '')
      if (linkId) {
        router.push(`/wiki/${slug}#${linkId}`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTocEmpty])

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
          title={wiki.title}
          openGraph={{
            title: wiki.title,
            description: getWikiSummary(wiki),
            images: [
              {
                url: getWikiImageUrl(wiki),
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
          <HStack mt={-2} align="stretch" justify="stretch">
            <Flex
              w="100%"
              justify="space-between"
              direction={{ base: 'column', md: 'row' }}
            >
              <WikiActionBar wiki={wiki} />
              {wiki ? (
                <>
                  <WikiMainContent
                    wiki={wiki}
                    addToTOC={addToTOC}
                    addWikiPreview={addWikiPreview}
                  />
                  <WikiInsights wiki={wiki} />
                </>
              ) : (
                <WikiNotFound />
              )}
            </Flex>
            {!isTocEmpty && <WikiTableOfContents toc={toc} />}
          </HStack>
        )}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const slug = context.params?.slug
  if (typeof slug === 'string') {
    store.dispatch(getWiki.initiate(slug)).then(res => {
      res?.data?.categories.map(category =>
        getWikisByCategory.initiate(category.id),
      )
    })
  }
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default Wiki
