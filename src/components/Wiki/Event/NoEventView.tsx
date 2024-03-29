import { Image } from '@/components/Elements/Image/Image'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { LinkButton } from '@/components/Elements'
import {
  AspectRatio,
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'

const WIKI_PATH_REGEX = /^(.*\/wiki\/.*)\/events$/

const NoEventView = () => {
  const router = useRouter()
  const wikiPath = router.asPath.match(WIKI_PATH_REGEX)?.[1]

  const imageSrc = useColorModeValue(
    'event-timeline-light.png',
    'event-timeline-dark.png',
  )

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
          <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO} w="300px" h="300px">
            <Image
              imgBoxSize={300}
              alt="No Events "
              src={`/images/GIFs/${imageSrc}`}
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
        {wikiPath && (
          <LinkButton href={wikiPath} mt={{ lg: '7', base: '6' }}>
            Back to wiki
          </LinkButton>
        )}
      </Box>
    </Flex>
  )
}

export default NoEventView
