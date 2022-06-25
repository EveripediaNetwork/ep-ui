import { ProfileEmptyState } from '@/components/Elements/icons/ProfileEmptyState'
import { Button, Flex, Text, Box } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export const EmptyState = () => {
  return (
    <Flex flexDir="column" textAlign="center" align="center">
      <ProfileEmptyState />
      <Text fontWeight="bold" fontSize="3xl" mt="8">
        Create your first Wiki
      </Text>
      <Text color="gray.500">
        Start creating your own wiki . When you do, they will appear here!
      </Text>

      <Link href="/create-wiki" passHref>
        <Button px="16" w="fit-content" mt="16" as="a">
          Create Wiki
        </Button>
      </Link>
    </Flex>
  )
}
