import React from 'react'
import { LinkButton } from '@/components/Elements'
import { Flex, Box, Image, Text } from '@chakra-ui/react'

const WikiNotFound = () => {
  return (
    <Flex
      w={{ base: '100%' }}
      alignItems={{ base: 'center' }}
      justifyContent={{ base: 'center' }}
      direction={{ base: 'column' }}
      mt={{ base: '9' }}
      mb={{ base: '96' }}
    >
      <Flex
        w={{ lg: '15%', base: '40%' }}
        alignItems={{ base: 'center' }}
        justifyContent={{ base: 'center' }}
      >
        <Image
          flex={1}
          marginInlineStart="0 !important"
          src="/images/defaults/wiki-error-img.png"
          w={{ base: '100%', sm: '80%', md: '60%', lg: '15%' }}
        />
      </Flex>
      <Box mt={{ lg: '32', base: '12' }} textAlign="center">
        <Text fontWeight="bold" fontSize="2xl">
          {' '}
          Opps! Wiki not found{' '}
        </Text>
        <LinkButton href="/create-wiki" mt={{ lg: '7', base: '6' }}>
          Create Wiki
        </LinkButton>
      </Box>
    </Flex>
  )
}

export default WikiNotFound
