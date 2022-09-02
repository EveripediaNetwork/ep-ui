import { Wiki } from '@/types/Wiki'
import { Box, Heading, useColorMode } from '@chakra-ui/react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { store } from '@/store/store'
import { addToTOC } from '@/utils/customHeadingRender'
import { customLinkRenderer } from '@/utils/customLinkRender'
import { customTableRenderer } from '@/utils/customTableRender'

interface WikiMainContentProps {
  wiki: Wiki | undefined
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
          a: customLinkRenderer,
          // eslint-disable-next-line
          img: ({ node, ...props }) => {
            // eslint-disable-next-line
            const ytRegex =
              // eslint-disable-next-line
              /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
            const isVideo = node?.properties?.src
            if (isVideo) {
              if (
                ytRegex.test(isVideo.toString().split('watch').join('embed'))
              ) {
                const ytId = isVideo.toString().match(ytRegex)
                if (ytId) {
                  return (
                    <iframe
                      height="500px"
                      src={`https://www.youtube.com/embed/${ytId[1]}`}
                      width="100%"
                      title="Iframe Example"
                    />
                  )
                }
              }
            }
            return <img {...props} alt="meta media" />
          },
          table: customTableRenderer,
        }}
      >
        {wikiContent}
      </ReactMarkdown>
    )
  },
)

const WikiMainContent = ({ wiki }: WikiMainContentProps) => {
  const { colorMode } = useColorMode()

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
