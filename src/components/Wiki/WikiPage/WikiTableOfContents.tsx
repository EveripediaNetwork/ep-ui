import React from 'react'
import {
  VStack,
  Text,
  Link,
  useDisclosure,
  IconButton,
  Flex,
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
  const { isOpen, onToggle } = useDisclosure()
  return (
    <div>
      {!isOpen ? (
        <VStack
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
            {toc.map(({ level, id, title }) => (
              <Text key={id} pl={`calc(${(level - 1) * 20}px)`}>
                <Link href={`#${id}`}>{title}</Link>
              </Text>
            ))}
          </VStack>
        </VStack>
      ) : (
        <IconButton
          pos="absolute"
          right="24px"
          top="calc(70px + 32px)"
          aria-label="Toggle Table of Contents"
          icon={<RiMenu3Fill />}
          onClick={onToggle}
        />
      )}
    </div>
  )
}

export default WikiTableOfContents
