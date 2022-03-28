import React from 'react'
import {
  VStack,
  Text,
  Link,
  useDisclosure,
  IconButton,
  Flex,
  Box,
  useColorMode,
  useBreakpointValue,
} from '@chakra-ui/react'
import { RiMenu3Fill } from 'react-icons/ri'

interface WikiTableOfContentsProps {
  toc: {
    level: number
    id: string
    title: string
  }[]
}

const WikiTableOfContents = ({ toc }: WikiTableOfContentsProps) => {
  const { colorMode } = useColorMode()
  const { isOpen, onToggle } = useDisclosure()
  const isDefaultOpen = useBreakpointValue({ base: true, xl: false })

  if (isOpen === isDefaultOpen) {
    return (
      <VStack
        display={{ base: 'none', md: 'block' }}
        borderLeftWidth="1px"
        minW="210px"
        px={6}
        py="30px"
        borderColor="borderColor"
      >
        <VStack
          w="100%"
          spacing={4}
          align="start"
          position="sticky"
          top="calc(70px + 30px + 2px)"
        >
          <Flex w="100%" justify="end">
            <IconButton
              aria-label="Toggle Table of Contents"
              icon={<RiMenu3Fill />}
              onClick={onToggle}
            />
          </Flex>
          <VStack
            as="nav"
            spacing={4}
            h="calc(100vh - (70px + 90px))"
            overflowY="scroll"
            pr={4}
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: colorMode === 'light' ? '#0000002a' : '#cccccc2a',
                borderRadius: '24px',
              },
            }}
          >
            {toc.map(({ level, id, title }) => (
              <Text key={id} pl={`calc(${(level - 1) * 20}px)`}>
                <Link href={`#${id}`}>{title}</Link>
              </Text>
            ))}
          </VStack>
        </VStack>
      </VStack>
    )
  }
  return (
    <Box
      display={{ base: 'none', md: 'block' }}
      pos="absolute"
      right="24px"
      top="calc(70px + 32px)"
    >
      <IconButton
        aria-label="Toggle Table of Contents"
        icon={<RiMenu3Fill />}
        onClick={onToggle}
      />
    </Box>
  )
}

export default WikiTableOfContents
