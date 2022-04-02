import React from 'react'
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
import { HeadingProps } from 'react-markdown/lib/ast-to-react'
import { HStack, Flex, Spinner } from '@chakra-ui/react'
import config from '@/config'
import WikiActionBar from '@/components/Wiki/WikiPage/WikiActionBar'
import WikiMainContent from '@/components/Wiki/WikiPage/WikiMainContent'
import WikiInsights from '@/components/Wiki/WikiPage/WikiInsights'
import WikiTableOfContents from '@/components/Wiki/WikiPage/WikiTableOfContents'

const Wiki = () => {
  const router = useRouter()

  const { slug } = router.query
  const result = useGetWikiQuery(typeof slug === 'string' ? slug : skipToken, {
    skip: router.isFallback,
  })
  const { isLoading, error, data: wiki } = result
  const [isTocEmpty, setIsTocEmpty] = React.useState<boolean>(true)

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
      const id = `${children[0]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')}-${Math.random()
        .toString(36)
        .substring(2, 5)}`
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
  /* eslint-enable react/prop-types */

  return (
    <>
      <NextSeo
        title={wiki?.title}
        openGraph={{
          title: wiki?.title,
          description: wiki?.content,
          images: [
            {
              url: `${config.pinataBaseUrl}${
                wiki?.images ? wiki?.images[0]?.id : ''
              }`,
            },
          ],
        }}
      />

      <main>
        {error && <>Oh no, there was an error</>}
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
              <WikiMainContent wiki={wiki} addToTOC={addToTOC} />
              {wiki && <WikiInsights wiki={wiki} />}
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
