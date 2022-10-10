import { ProfileEmptyState } from '@/components/Elements/icons/ProfileEmptyState'
import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from '../Elements'

export const EmptyState = ({title, body}: {title: string, body: string}) => {
  return (
    <Flex flexDir="column" textAlign="center" align="center">
      <ProfileEmptyState maxBlockSize="40vw" />
      <Text fontWeight="bold" fontSize="3xl" mt="8">
        {title}
      </Text>
      <Text color="fadedText2">
        {body}
      </Text>

      <Link href="/create-wiki" passHref>
        <Button px="16" w="fit-content" mt="16" as="a">
          Create Wiki
        </Button>
      </Link>
    </Flex>
  )
}
