import React from 'react'
import Image from 'next/image'
import { Box, Center, Text, Stack } from '@chakra-ui/react'
import { Content } from '@/types/Wiki'

const SubCategoryCard = ({ wiki }: { wiki: Content }) => {
  const { updated, title } = wiki

  return (
    <Center py={6}>
      <Box boxShadow="2xl" rounded="md" p={6} overflow="hidden">
        <Box h={200} mb={3} pos="relative">
          <Image src="/images/sub-category-image.png" layout="fill" />
        </Box>
        <Stack spacing={3}>
          <Text fontSize="2xl" fontWeight="bold">
            {title}
          </Text>
          <Text color="gray.600" fontSize="md">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy ...
          </Text>
          <Text color="gray.400" fontSize="sm">
            {updated}
          </Text>
        </Stack>
      </Box>
    </Center>
  )
}

export default SubCategoryCard
