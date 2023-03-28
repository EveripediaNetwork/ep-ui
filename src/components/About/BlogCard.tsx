import React from 'react'
import { IMAGE_BOX_SIZE, WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { Box, Center, Text, Stack } from '@chakra-ui/react'
import { Image } from '../Elements/Image/Image'

const BlogCard = ({
  image,
  date,
  title,
  body,
}: {
  image: string
  date: string
  title: string
  body: string
}) => {
  return (
    <Center onClick={() => window.open('/blog')} cursor="pointer" py={6}>
      <Box
        maxW="445px"
        h="445px"
        w="full"
        boxShadow="2xl"
        rounded="md"
        p={6}
        overflow="hidden"
      >
        <Box h="210px" mt={-6} mx={-6} mb={6} pos="relative">
          <Image
            w="full"
            src={image}
            alt={title}
            layout="fill"
            imgH={IMAGE_BOX_SIZE}
            imgW={IMAGE_BOX_SIZE * WIKI_IMAGE_ASPECT_RATIO}
          />
        </Box>
        <Stack>
          <Text color="gray.400" fontSize="sm">
            {date}
          </Text>
          <Text fontWeight={600}>{title}</Text>
          <Text color="gray.600" fontSize="md">
            {body}
          </Text>
        </Stack>
      </Box>
    </Center>
  )
}

export default BlogCard
