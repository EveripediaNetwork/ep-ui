import { Wiki } from '@/types/Wiki'
import { getReadableDate } from '@/utils/getFormattedDate'
import { Box, Flex, Heading, Tag, useColorMode } from '@chakra-ui/react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import {
  ComponentPropsWithoutRef,
  HeadingProps,
  ReactMarkdownProps,
} from 'react-markdown/lib/ast-to-react'
import { store } from '@/store/store'

interface WikiMainContentProps {
  wiki: Wiki | undefined
  addToTOC: (props: React.PropsWithChildren<HeadingProps>) => JSX.Element
  addWikiPreview: (
    props: React.PropsWithChildren<
      ComponentPropsWithoutRef<'a'> & ReactMarkdownProps
    >,
  ) => JSX.Element
  editedTimestamp?: string
}

const WikiMainContent = ({
  wiki,
  addToTOC,
  addWikiPreview,
  editedTimestamp,
}: WikiMainContentProps) => {
  const { colorMode } = useColorMode()

  // Remove the existing cite marks to fill the state with
  // upcoming wiki data when the wiki is still loading
  if (!wiki) {
    store.dispatch({
      type: 'citeMarks/reset',
    })
  }
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
      <Box mt={8}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: addToTOC,
            h2: addToTOC,
            h3: addToTOC,
            h4: addToTOC,
            h5: addToTOC,
            h6: addToTOC,
            a: addWikiPreview,
          }}
          className={`markdown-body ${
            colorMode === 'dark' ? 'markdown-body-dark' : ''
          }`}
        >
          {wiki?.content || ''}
        </ReactMarkdown>
      </Box>
    </Box>
  )
}

export default WikiMainContent
