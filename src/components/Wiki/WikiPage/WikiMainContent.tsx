import { CommonMetaIds, Wiki } from '@everipedia/iq-utils'
import { Box, Heading, useColorMode, Button } from '@chakra-ui/react'
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

const getSectionStop = (allSections: string[], lastStop: number) => {
  /**
   * If the content has 4 or less sections,
   * we render the entire thing, else we
   * render in chunks to improve performance
   */
  const noOfSections = allSections.length
  console.log('length: ', noOfSections)
  if (allSections.length <= 4) return noOfSections + 1

  if (noOfSections - (lastStop - 1) > 4) return lastStop + 5
  else return noOfSections + 1
}

const MarkdownRender = React.memo(({ wiki }: { wiki: Wiki }) => {
  const contentSections = splitMarkdownSections(wiki.content)
  const [sectionStop, setSectionStop] = useState(
    getSectionStop(contentSections, 0),
  )
  console.log('First stop: ', sectionStop)
  const renderedContent = contentSections.splice(0, sectionStop)
  const hasMoreContent = sectionStop < contentSections.length + 1

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

  const handleLoadContentBtnClick = () => {
    console.log('Stop: ', getSectionStop)
    setSectionStop(getSectionStop(contentSections, sectionStop))
  }

  return (
    <>
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
        <Button onClick={() => handleLoadContentBtnClick()}>
          Load more content
        </Button>
      )}
    </>
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
