import React from 'react'
import { Box, Container, VStack } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import WikiCard from '@/components/Wiki/WikiCard/WikiCard'

interface WikiListCardProps {
  wikis: Wiki[] | undefined
}

const WikiListCard = ({ wikis }: WikiListCardProps) => (
  <Container maxW="7xl" p="12">
    <VStack>
      {wikis &&
        wikis.map((wiki: Wiki) => (
          <Box key={wiki.id}>
            <WikiCard wiki={wiki} />
          </Box>
        ))}
    </VStack>
  </Container>
)

export default WikiListCard
