import { CommonMetaIds, Wiki } from '@everipedia/iq-utils'
import { Box, Heading, useColorMode, Button, Flex } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { store } from '@/store/store'
import { addToTOC } from '@/components/Wiki/WikiPage/CustomRenderers/customHeadingRender'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'
import { customLinkRenderer } from './CustomRenderers/customLinkRender'
import { customImageRender } from './CustomRenderers/customImageRender'
import { customTableRenderer } from './CustomRenderers/customTableRender'
import styles from '../../../styles/markdown.module.css'
import { WikiFlaggingSystem } from './WikiFlaggingSystem'

interface WikiMainContentProps {
  wiki: Wiki
}

function splitMarkdownSections(markdownString: string) {
  const headingRegex = /^#{1,6}\s+.*/gm

  const sections = markdownString.split(headingRegex)

  const filteredSections = sections.filter(
    (section: string) => section.trim() !== '',
  )

  return filteredSections
}

const MarkdownRender = React.memo(({ wiki }: { wiki: Wiki }) => {
  const contentSections = splitMarkdownSections(wiki.content)
  const SECTION_THRESHOLD = 3
  const [sectionsRendered, sectionsRenderedCount] = useState(SECTION_THRESHOLD)
  const renderedContent = contentSections.slice(0, sectionsRendered)
  const hasMoreContent = contentSections.length > sectionsRendered

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
    <Flex direction="column" alignItems="center">
      <ReactMarkdown
        className="md-container"
        remarkPlugins={[remarkGfm]}
        components={{
          h1: addToTOC,
          h2: addToTOC,
          h3: addToTOC,
          h4: addToTOC,
          h5: addToTOC,
          h6: addToTOC,
          a: (props) =>
            customLinkRenderer({
              ...props,
              referencesString,
            }),
          img: customImageRender,
          table: customTableRenderer,
        }}
      >
        {renderedContent.join('')}
      </ReactMarkdown>
      {hasMoreContent && (
        <Button
          onClick={() =>
            sectionsRenderedCount(sectionsRendered + SECTION_THRESHOLD)
          }
          variant="outline"
          bgColor="btnBgColor"
          h="50px"
          mt={8}
          w={{ base: 32, lg: 40 }}
        >
          View more
        </Button>
      )}
    </Flex>
  )
})

const WikiMainContent = ({ wiki }: WikiMainContentProps) => {
  const { colorMode } = useColorMode()

  let content = wiki?.content.replace(/<br( )*\/?>/g, '\n') || ''

  const matchRegex = /\$\$widget\d(.*?\))\$\$/
  content.match(new RegExp(matchRegex, 'g'))?.forEach((match) => {
    const widgetContent = match.match(matchRegex)?.[1]
    if (widgetContent) {
      content = content.replaceAll(match, widgetContent)
    }
  })

  const modifiedContentWiki = { ...wiki, content }

  return (
    <Box
      py={4}
      px={{ base: 4, md: 6, xl: 12 }}
      pr={{ md: 15, xl: 12 }}
      maxW={{ base: '100%', xl: '900px' }}
      mx="auto"
      minH={{ base: 'unset', xl: 'calc(100vh - 70px)' }}
      mb={{ xl: '3rem' }}
      borderColor="rankingListBorder"
    >
      <Heading my={8}>{wiki?.title}</Heading>
      <Box
        className={`${styles.markdownBody} ${
          colorMode === 'dark' && styles.markdownBodyDark
        }`}
      >
        <MarkdownRender wiki={modifiedContentWiki} />
        <WikiFlaggingSystem id={wiki.id} />
      </Box>
    </Box>
  )
}

export default React.memo(WikiMainContent)
