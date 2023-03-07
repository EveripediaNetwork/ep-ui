import { LinkButton } from '@/components/Elements'
import { Image } from '@/components/Elements/Image/Image'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { AspectRatio, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const NoEventView = () => {
  return (
    <Flex
      w="100%"
      align="center"
      justify="center"
      direction="column"
      pb={{ base: '10', lg: '16' }}
    >
      <Box textAlign="center" pb={8}>
        <Flex justifyContent="center">
          <AspectRatio
            ratio={WIKI_IMAGE_ASPECT_RATIO}
            w={{ base: '399px', md: '500px' }}
            h={{ base: '399px', md: '500px' }}
          >
            <Image
              imgBoxSize={300}
              alt="No Events "
              src="/images/GIFs/event-timeline.png"
              w="full"
              objectFit="contain"
            />
          </AspectRatio>
        </Flex>
        <Text
          fontWeight={500}
          fontSize={{ base: '16px', md: '18px' }}
          color="linkColor"
          mt="2"
        >
          There are no records of events created for this wiki yet.
        </Text>
        <LinkButton href="/create-wiki" mt={{ lg: '7', base: '6' }}>
          Add Event
        </LinkButton>
      </Box>
    </Flex>
  )
}

export default NoEventView
