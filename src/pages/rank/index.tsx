import React from 'react'
import {
  Text,
  Box,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { BiImage } from 'react-icons/bi'
import { RiCoinsFill } from 'react-icons/ri'
import RankHeader from '@/components/SEO/Rank'
import RankingListButton from '@/components/Rank/RankButton'
import { RankTable } from '@/components/Rank/RankTable'
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
        maxW={{ base: '90%', '2xl': '1280px', md: '95%' }}
        mx="auto"
        py={16}
        flexWrap="wrap"
        gap={{ base: 10, md: 0, lg: 4 }}
        justifyContent={{ lg: 'center', md: 'space-between' }}
      >
        <Tabs w="full">
          <Flex justifyContent="center">
            <TabList border="none" display="flex" gap="8">
              <RankingListButton
                label="Cryptocurrencies"
                icon={RiCoinsFill}
                fontSize={{ lg: '20px' }}
              />
              <RankingListButton
                label="NFTs"
                icon={BiImage}
                fontSize={{ lg: '20px' }}
              />
            </TabList>
          </Flex>
          <TabPanels mt="6">
            <TabPanel>
              <Text
                color="homeDescriptionColor"
                fontSize={{ base: 'lg', lg: 22 }}
                mx="auto"
                mb={9}
                px={4}
                textAlign="center"
                maxW="750"
              >
                Cryptocurrency wikis ranked by Market Cap Prices
              </Text>
              <RankTable hasPagination></RankTable>
            </TabPanel>
            <TabPanel>
              <Text
                color="homeDescriptionColor"
                fontSize={{ base: 'lg', lg: 22 }}
                mx="auto"
                mb={9}
                px={4}
                textAlign="center"
                maxW="750"
              >
                NFT wikis ranked by Market Cap Prices
              </Text>
              <RankTable hasPagination>&nbsp;</RankTable>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  )
}

export default Rank
