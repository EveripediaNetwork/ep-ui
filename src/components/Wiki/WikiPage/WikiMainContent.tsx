import { Wiki } from '@/types/Wiki'
import { Box, Heading, useColorMode } from '@chakra-ui/react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  ComponentPropsWithoutRef,
  HeadingProps,
  ReactMarkdownProps,
} from 'react-markdown/lib/ast-to-react'

interface WikiMainContentProps {
  wiki: Wiki | undefined
  addToTOC: (props: React.PropsWithChildren<HeadingProps>) => JSX.Element
  addWikiPreview: (
    props: React.PropsWithChildren<
      ComponentPropsWithoutRef<'a'> & ReactMarkdownProps
    >,
  ) => JSX.Element
}

const WikiMainContent = ({
  wiki,
  addToTOC,
  addWikiPreview,
}: WikiMainContentProps) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      p={4}
      w="100%"
      maxW="7xl"
      minH={{ base: 'unset', md: 'calc(100vh - 70px)' }}
      borderColor="borderColor"
    >
      <Heading mt={22} pt={2}>
        {wiki?.title}
      </Heading>
      <Box mt={8}>
        <ReactMarkdown
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
          {wiki?.content.replace(/\n/gm, '  \n') || ''}
        </ReactMarkdown>
      </Box>
    </Box>
  )
}

export default WikiMainContent
