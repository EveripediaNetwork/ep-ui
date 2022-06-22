import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@/types/Wiki'
import WikiPreviewCard from '../Wiki/WikiPreviewCard/WikiPreviewCard'

const Collected = ({wikis}: {wikis: Wiki[]}) => {
  return (
      <SimpleGrid
        maxW="1200px"
        w="100%"
        mx="auto"
        columns={{ base: 1, md: 2, lg: 3 }}
        spacingX={3}
        spacingY={12}
      >
        {wikis.map((item, i) => (
          <WikiPreviewCard wiki={item} key={i} />
        ))}
      </SimpleGrid>
  )
}

export default Collected
