import { VStack, IconButton, Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { RiMenu3Fill } from 'react-icons/ri'

const WikiTableOfContentsSkeleton = () => {
  return (
    <VStack
      display={{ base: 'none', md: 'block' }}
      borderLeftWidth="1px"
      minW="240px"
      maxW="20vw"
      px={6}
      py="30px"
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
          />
        </Flex>
        <VStack
          as="nav"
          spacing={4}
          h="calc(100vh - (70px + 90px))"
          w="100%"
          overflowY="scroll"
          pr={4}
          align="start"
        >
          {Array.from(Array(20).keys()).map(() => (
            <Skeleton height="20px" />
          ))}
        </VStack>
      </VStack>
    </VStack>
  )
}

export default WikiTableOfContentsSkeleton
