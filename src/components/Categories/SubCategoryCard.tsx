import React from 'react'
import Image from 'next/image'
import { Box, Center, Text, Stack } from '@chakra-ui/react'
import { Content } from '@/types/Wiki'
import { shortenText } from '@/utils/shortenText'
import { getReadableDate } from '@/utils/getFormattedDate'

const SubCategoryCard = ({ wiki }: { wiki: Content }) => {
  const { updated, content, title } = wiki

  return (
    <Center py={6}>
      <Box minH={390} boxShadow="2xl" rounded="md" p={6} overflow="hidden">
        <Box h={200} mb={3} pos="relative">
          <Image src="/images/sub-category-image.png" layout="fill" />
        </Box>
        <Stack spacing={3}>
          <Text fontSize="2xl" fontWeight="bold">
            {title}
          </Text>
          <Text color="gray.600" fontSize="md">
            {shortenText(content, 65)}
          </Text>
          <Text color="gray.400" fontSize="sm">
            Last Edited {updated && getReadableDate(updated)}
          </Text>
        </Stack>
      </Box>
    </Center>
  )
}

export default SubCategoryCard
