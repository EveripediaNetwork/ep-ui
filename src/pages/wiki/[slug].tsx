import React from 'react'
import { useRouter } from 'next/router'
import { skipToken } from '@reduxjs/toolkit/query'
import {
  getRunningOperationPromises,
  getWiki,
  getWikisByCategory,
  useGetWikiQuery,
} from '@/services/wikis'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'
import { HStack, Flex, Box, Spinner } from '@chakra-ui/react'
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

  const toc: {
    level: number
    id: string
    title: string
  }[] = []

  /* eslint-disable react/prop-types */
  const addToTOC = ({
    children,
    ...props
  }: React.PropsWithChildren<HeadingProps>) => {
    const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1))
    if (level && children && typeof children[0] === 'string') {
      const id = children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')
      if (!toc.find(item => item.id === id)) {
        toc.push({
          level,
          id,
          title: children[0],
        })
      }
      return React.createElement(props.node.tagName, { id }, children)
    }
    return React.createElement(props.node.tagName, props, children)
  }
  /* eslint-enable react/prop-types */

  return (
    <main>
      {error && <>Oh no, there was an error</>}
      {!error && (router.isFallback || isLoading) ? (
        <Flex justify="center" align="center" h="50vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <HStack mt={-2} align="stretch" justify="stretch">
          <Flex w="100%" direction={{ base: 'column', md: 'row' }}>
            <WikiActionBar />
            <WikiMainContent wiki={wiki} addToTOC={addToTOC} />
            <WikiInsights wiki={wiki} />
          </Flex>
          <Box display={{ base: 'none', md: 'block' }}>
            <WikiTableOfContents toc={toc} />
          </Box>
        </HStack>
      )}
    </main>
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
