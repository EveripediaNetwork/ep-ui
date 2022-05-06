import { LinkButton } from '@/components/Elements'
import { Flex, Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@/types/Wiki'

export const NoHistoryView = ({ wiki }: NoHistoryViewProps) => {
  return (
    <Flex
      w={{ base: '100%' }}
      alignItems={{ base: 'center' }}
      justifyContent={{ base: 'center' }}
      direction={{ base: 'column' }}
      mt={{ base: '22' }}
      mb={{ base: '96' }}
    >
      <Flex
        w={{ lg: '45%', base: '40%' }}
        alignItems={{ base: 'center' }}
        justifyContent={{ base: 'center' }}
      >
        <Image
          flex={1}
          marginInlineStart="0 !important"
          src="/images/noWikiHistory.png"
          w={{ base: '100%', sm: '80%', md: '60%', lg: '15%' }}
        />
      </Flex>

      <Box mt={{ lg: '32', base: '12' }} textAlign="center">
        <Text fontWeight="bold" fontSize="2xl" color="linkColor">
          {' '}
          Looks like this wiki doesn’t have any history yet.{' '}
        </Text>
        <LinkButton href={`/wiki/${wiki?.id}`} mt={{ lg: '7', base: '6' }}>
          Go back to Wiki
        </LinkButton>
      </Box>
    </Flex>
  )
}

interface NoHistoryViewProps {
  wiki: Wiki | undefined
}
