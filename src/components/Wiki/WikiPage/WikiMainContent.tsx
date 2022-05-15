import { Wiki } from '@/types/Wiki'
import { getReadableDate } from '@/utils/getFormattedDate'
import { Box, Flex, Heading, Tag, useColorMode } from '@chakra-ui/react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { store } from '@/store/store'
import { addToTOC } from '@/utils/customHeadingRender'
import { wikiLinkRenderer } from '@/utils/customLinkRender'

interface WikiMainContentProps {
  wiki: Wiki | undefined
  editedTimestamp?: string
}
const MarkdownRender = React.memo(
  ({ wikiContent }: { wikiContent?: string }) => {
    store.dispatch({
      type: 'citeMarks/reset',
    })
    store.dispatch({
      type: 'toc/reset',
    })
    if (!wikiContent) return null
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
          a: wikiLinkRenderer,
        }}
      >
        {wikiContent}
      </ReactMarkdown>
    )
  },
)

const WikiMainContent = ({ wiki, editedTimestamp }: WikiMainContentProps) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      p={4}
      w="100%"
      maxW="7xl"
      minH={{ base: 'unset', md: 'calc(100vh - 70px)' }}
      borderColor="borderColor"
    >
      <Flex
        mt={22}
        flexDir={{ base: 'column', md: 'row' }}
        gap={2}
        align="center"
      >
        <Heading>{wiki?.title}</Heading>
        {editedTimestamp && (
          <Tag whiteSpace="nowrap">
            Edited {getReadableDate(editedTimestamp)}
          </Tag>
        )}
      </Flex>
      <Box
        mt={8}
        className={`markdown-body ${
          colorMode === 'dark' ? 'markdown-body-dark' : ''
        }`}
      >
        <MarkdownRender wikiContent={wiki?.content} />
      </Box>
    </Box>
  )
}

export default React.memo(WikiMainContent)
