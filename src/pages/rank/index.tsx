import React from 'react'
import { Box, Flex, TabList, Tabs } from '@chakra-ui/react'
import { BiImage } from 'react-icons/bi'
import { RiCoinsFill } from 'react-icons/ri'
import { RankingListButton } from '@/components/Landing/RankingList'
import RankHeader from '@/components/SEO/Rank'
import RankHero from './RankHero'

const Rank = () => {
  return (
    <Box>
      <RankHeader />
      <Box
        bg="url(/rankingbg.png)"
        _dark={{
          bg: 'url(/rankingDarkBG.png)',
        }}
        bgPos="center"
        my={-2}
        bgSize="cover !important"
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
        <Tabs>
          <Flex justifyContent="center">
            <TabList border="none" display="flex" gap="8">
              <RankingListButton label="Cryptocurrencies" icon={RiCoinsFill} />
              <RankingListButton label="NFTs" icon={BiImage} />
            </TabList>
          </Flex>
        </Tabs>
        {/* <RankCard title="NFTs" icon={BiImage} />
        <RankCard title="Cryptocurrencies" icon={RiCoinsFill} /> */}
      </Flex>
    </Box>
  )
}

export default Rank
