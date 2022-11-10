import React from 'react'
import { Box } from '@chakra-ui/react'
import { RankHero } from './RankHero'

const Rank = () => {
  return (
    <Box
      bg="url(/rankingbg.png)"
      m="0"
      _dark={{ backgroundColor: 'tetiaryDark' }}
      pb={20}
      my={-2}
      bgPos="center"
      backgroundSize="contain"
    >
      <Box maxW={{ base: '90%', '2xl': '1280px' }} mx="auto">
        <RankHero />
      </Box>
    </Box>
  )
}

export default Rank
