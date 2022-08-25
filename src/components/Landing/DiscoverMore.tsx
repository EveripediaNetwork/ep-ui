import { useGetTagsQuery } from '@/services/tags'
import { Box, Heading, Wrap } from '@chakra-ui/react'
import React from 'react'
import { Link } from '../Elements'

const DiscoverMore = () => {
  const { data } = useGetTagsQuery(15)
  return (
    <Box bgColor="gray.50" _dark={{ bgColor: 'whiteAlpha.50' }} p={8} pb={20}>
      <Box maxW="1020px" mx="auto" py={8} px={4}>
        <Heading fontWeight="600" opacity={0.8} fontSize={20}>
          Discover More on everipedia
        </Heading>
        <Wrap mt={8} spacing={4}>
          {data?.map(tag => (
            <Link
              borderWidth="1px"
              px={4}
              py={1}
              fontSize={18}
              rounded="full"
              borderColor="gray.200"
              color="gray.500"
              fontWeight="500"
              key={tag.id}
              href={`/tags/${tag.id}`}
              sx={{
                '&:hover, &:focus, &:active': {
                  bgColor: 'gray.200',
                  textDecoration: 'none',
                  boxShadow: 'none',
                  _dark: {
                    bgColor: 'whiteAlpha.200',
                  },
                },
              }}
              _dark={{
                color: 'whiteAlpha.600',
                borderColor: 'whiteAlpha.200',
              }}
            >
              {tag.id}
            </Link>
          ))}
        </Wrap>
      </Box>
    </Box>
  )
}

export default DiscoverMore
