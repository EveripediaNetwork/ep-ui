import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import RankCard from '@/components/Rank/RankCard'
import { BiImage } from 'react-icons/bi'
import { RiCoinsFill, RiMoneyDollarBoxFill } from 'react-icons/ri'
import RankHero from './RankHero'

const Rank = () => {
  return (
    <Box>
      <Box
        bg="url(/rankingbg.png)"
        _dark={{ backgroundColor: 'tetiaryDark' }}
        pb={20}
        my={-2}
        bgPos="center"
        backgroundSize="contain"
      >
        <RankHero />
      </Box>
      <Flex
        justifyContent="space-between"
        maxW={{ base: '90%', '2xl': '1280px' }}
        mx="auto"
        py={16}
      >
        <RankCard title="NFTs" icon={BiImage} />
        <RankCard title="Cryptocyrrencies" icon={RiCoinsFill} />
        <RankCard title="Defi" icon={RiMoneyDollarBoxFill} />
      </Flex>
    </Box>
  )
}

export default Rank
