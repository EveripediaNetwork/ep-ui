import { useGetTagsQuery } from '@/services/tags'
import { Box, Heading, Tag, Wrap } from '@chakra-ui/react'
import React from 'react'

const DiscoverMore = () => {
  const { data } = useGetTagsQuery(15)
  return (
    <Box bgColor="gray.100" _dark={{ bgColor: 'gray.500' }} p={8}>
      <Box maxW="1020px" mx="auto" py={8} px={4}>
        <Heading fontWeight="600" opacity={0.8} fontSize={20}>
          Discover More on everipedia
        </Heading>
        <Wrap mt={8} spacing={4}>
          {data?.map(tag => (
            <Tag size="lg" variant="outline" key={tag.id}>
              {tag.id}
            </Tag>
          ))}
        </Wrap>
      </Box>
    </Box>
  )
}

export default DiscoverMore
