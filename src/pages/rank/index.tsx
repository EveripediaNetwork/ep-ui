import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import RankCard from '@/components/Rank/RankCard'
import { BiImage } from 'react-icons/bi'
import { RiCoinsFill } from 'react-icons/ri'
import RankHero from './RankHero'

const Rank = () => {
  return (
    <Box>
      <Box
        bg="url(/rankingbg.png) center"
        _dark={{
          bg: 'url(/rankingDarkBG.png)  center',
          bgSize: 'cover',
        }}
        my={-2}
        bgSize="cover"
        bgColor="#F7FAFC"
      >
        <RankHero />
      </Box>
      <Flex
        maxW={{ base: '90%', '2xl': '1280px', md: '95%', lg: '98%' }}
        mx="auto"
        py={16}
        flexWrap="wrap"
        gap={{ base: 10, md: 0, lg: 4 }}
        justifyContent={{ lg: 'center', md: 'space-between' }}
      >
        <RankCard title="NFTs" icon={BiImage} />
        <RankCard title="Cryptocurrencies" icon={RiCoinsFill} />
      </Flex>
    </Box>
  )
}

export default Rank
