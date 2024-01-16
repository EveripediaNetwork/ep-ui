import { Box, Heading, Wrap } from '@chakra-ui/react'
import React from 'react'
import { Link } from '../Elements'
import { useTranslation } from 'next-i18next'

interface DiscoverMoreProps {
  tagsData: { id: string }[]
}
const DiscoverMore = ({ tagsData }: DiscoverMoreProps) => {
  if (!tagsData) return null
  const { t } = useTranslation('home')

  return (
    <Box bgColor="gray.100" _dark={{ bgColor: 'whiteAlpha.50' }} p={8} pb={20}>
      <Box maxW="1290px" mx="auto" py={8} px={4}>
        <Heading fontWeight="700" color={'rankPageButtonText'} fontSize={24}>
          {t('DiscoverMoreHeading')}
        </Heading>
        <Wrap mt={8} spacing={4}>
          {tagsData?.map((tag) => (
            <Link
              as="li"
              borderWidth="1px"
              px={4}
              py={1}
              fontSize={24}
              rounded="full"
              borderColor="gray.300"
              color="gray.600"
              fontWeight="500"
              key={tag.id}
              href={`/tags/${tag.id}`}
              sx={{
                '&:hover, &:focus, &:active': {
                  bgColor: 'gray.200',
                  textDecoration: 'none',
                  boxShadow: 'none',
                  _dark: {
                    bgColor: 'whiteAlpha.400',
                  },
                },
              }}
              _dark={{
                color: 'whiteAlpha.900',
                borderColor: 'whiteAlpha.700',
              }}
            >
              {t(tag.id)}
            </Link>
          ))}
        </Wrap>
      </Box>
    </Box>
  )
}

export default DiscoverMore
