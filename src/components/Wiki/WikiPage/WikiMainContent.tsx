import { CommonMetaIds, Wiki } from '@/types/Wiki'
import { Box, Heading, useColorMode } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { store } from '@/store/store'
import { addToTOC } from '@/utils/customHeadingRender'
import { customLinkRenderer } from '@/utils/customLinkRender'
import { customTableRenderer } from '@/utils/customTableRender'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import styles from '../../../styles/markdown.module.css'

interface WikiMainContentProps {
  wiki: Wiki
}
const MarkdownRender = React.memo(({ wiki }: { wiki: Wiki }) => {
  store.dispatch({
    type: 'citeMarks/reset',
  })
  store.dispatch({
    type: 'toc/reset',
  })

  const referencesString = useMemo(
    () => getWikiMetadataById(wiki, CommonMetaIds.REFERENCES)?.value,
    [wiki],
  )

  if (!wiki.content) return null

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: addToTOC,
        h2: addToTOC,
        h3: addToTOC,
        h4: addToTOC,
        h5: addToTOC,
        h6: addToTOC,
        a: props =>
          customLinkRenderer({
            ...props,
            referencesString,
          }),
        table: customTableRenderer,
      }}
    >
      {wiki.content}
    </ReactMarkdown>
  )
})

const WikiMainContent = ({ wiki }: WikiMainContentProps) => {
  const { colorMode } = useColorMode()

  let content = wiki?.content || ''

  const matchRegex = /\$\$widget\d(.*?\))\$\$/
  content.match(new RegExp(matchRegex, 'g'))?.forEach(match => {
    const widgetContent = match.match(matchRegex)?.[1]
    if (widgetContent) {
      content = content.replaceAll(match, widgetContent)
    }
  })

  return (
    <Box
      py={4}
      px={{ base: 4, lg: 12 }}
      maxW="900px"
      mx="auto"
      minH={{ base: 'unset', md: 'calc(100vh - 70px)' }}
      borderColor="borderColor"
      mb={{ md: '3rem' }}
    >
      <Heading my={8}>{wiki?.title}</Heading>
      <Box
        className={`${styles.markdownBody} ${
          colorMode === 'dark' && styles.markdownBodyDark
        }`}
      >
        <MarkdownRender wiki={wiki} />
      </Box>
    </Box>
  )
}

export default React.memo(WikiMainContent)
