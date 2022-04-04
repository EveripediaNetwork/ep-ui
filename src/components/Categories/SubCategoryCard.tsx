import React from 'react'
import { Box, Center, Stack, Text } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import { getReadableDate } from '@/utils/getFormattedDate'
import NextLink from 'next/link'
import { WikiImage } from '@/components/WikiImage'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'

const SubCategoryCard = ({ wiki }: { wiki: Wiki }) => {
  const { updated, title, id } = wiki
  return (
    <Center py={6} cursor="pointer">
      <NextLink href={`/wiki/${id}`} passHref>
        <Box
          w={390}
          minH={390}
          boxShadow="xl"
          rounded="md"
          p={6}
          overflow="hidden"
        >
          <WikiImage
            h={200}
            mb={3}
            imageURL={getWikiImageUrl(wiki)}
            layout="fill"
          />
          <Stack spacing={3}>
            <Text fontSize="2xl" fontWeight="bold">
              {title}
            </Text>
            <Text color="gray.600" fontSize="md">
              {getWikiSummary(wiki, 'small')}
            </Text>
            <Text color="gray.400" fontSize="sm">
              Last Edited {updated && getReadableDate(updated)}
            </Text>
          </Stack>
        </Box>
      </NextLink>
    </Center>
  )
}

export default SubCategoryCard
