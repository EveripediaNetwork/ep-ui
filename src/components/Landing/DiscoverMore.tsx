import { getTags } from '@/services/tags'
import { store } from '@/store/store'
import { Tag } from '@/types/Wiki'
import { Box, Heading, Wrap } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from '../Elements'

const DiscoverMore = () => {
  const [data, setData] = useState<Tag[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data: tagsData } = await store.dispatch(
        getTags.initiate({
          startDate: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
          endDate: Math.floor(Date.now() / 1000),
        }),
      )
      if (tagsData) setData(tagsData)
    }
    fetchData()
  }, [])

  if (!data) return null

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
                  bgColor: 'gray.100',
                  textDecoration: 'none',
                  boxShadow: 'none',
                  _dark: {
                    bgColor: 'whiteAlpha.100',
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
