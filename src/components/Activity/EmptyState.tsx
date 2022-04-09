import { ActivityEmptyStateIcon } from '@/components/Elements/icons/ActivityEmptyStateIcon'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const ActivityEmptyState = () => {
  return (
    <Flex flexDir="column" textAlign="center" align="center" mt="16">
      <ActivityEmptyStateIcon />
      <Text fontWeight="bold" fontSize="3xl" mt="8">
        Oops! It’s Empty in here!{' '}
      </Text>
      <Text color="gray.500">
        Get access to new wikis as they are created here.
      </Text>
    </Flex>
  )
}
