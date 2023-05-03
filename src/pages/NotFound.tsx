import React from 'react'
import { LinkButton } from '@/components/Elements'
import { Flex, Box, Image, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const WikiNotFound = () => {
  const router = useRouter()
  const isWiki = router.query.tags ? false : true
  return (
    <Flex
      w={{ base: '100%' }}
      alignItems={{ base: 'center' }}
      justifyContent={{ base: 'center' }}
      direction={{ base: 'column' }}
      mt={{ base: '9' }}
      pb={{ base: '96' }}
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
        {isWiki ? (
          <>
            <Text fontWeight="bold" fontSize="2xl">
              Opps! Wiki not found
            </Text>
            <LinkButton href="/create-wiki" mt={{ lg: '7', base: '6' }}>
              Create Wiki
            </LinkButton>{' '}
          </>
        ) : (
          <>
            <Text fontWeight="bold" fontSize="2xl">
              Oops, No Wiki Found with this Tag
            </Text>
            <Button
              mt={{ lg: '5', base: '3' }}
              colorScheme="primary"
              color="white"
              variant="solid"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default WikiNotFound
