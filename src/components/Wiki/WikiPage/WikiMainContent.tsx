import { Wiki } from '@/types/Wiki'
import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'

interface WikiMainContentProps {
  wiki: Wiki | undefined
  addToTOC: (props: React.PropsWithChildren<HeadingProps>) => JSX.Element
}

const WikiMainContent = ({ wiki, addToTOC }: WikiMainContentProps) => (
  <Box
    p={4}
    w="100%"
    minH="calc(100vh - 70px)"
    borderRightWidth="1px"
    borderColor="borderColor"
  >
    <Heading mt={22} pt={2}>
      {wiki?.title}
    </Heading>
    <Text mt={8}>
      <ReactMarkdown
        components={{
          h1: addToTOC,
          h2: addToTOC,
          h3: addToTOC,
          h4: addToTOC,
          h5: addToTOC,
          h6: addToTOC,
        }}
        className="markdown-body"
      >
        {wiki?.content || ''}
      </ReactMarkdown>
    </Text>
  </Box>
)

export default WikiMainContent
