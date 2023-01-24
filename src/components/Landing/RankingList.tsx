import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Link,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiImage } from 'react-icons/bi'
import { RiCoinsFill } from 'react-icons/ri'
import { RankCardType } from '@/types/RankDataTypes'
import RankingListButton from '../Rank/RankButton'
import { RankTable, RankTableHead } from '../Rank/RankTable'
import { InvalidRankCardItem } from '../Rank/InvalidRankCardItem'
import RankingItem from '../Rank/RankCardItem'

export type RankingListProps = {
  rankings: {
    NFTsListing: RankCardType[]
    TokensListing: RankCardType[]
  }
}

const RankingList = ({ rankings }: RankingListProps) => {
  const { t } = useTranslation()

  return (
    <Box
      mt={10}
      px={{ base: 3, md: 8 }}
      py={{ base: 5, md: 20 }}
      textAlign="center"
    >
      <Heading
        textAlign="center"
        mb={4}
        fontWeight="700"
        fontSize={{ base: '3xl', lg: 46 }}
      >
        {`${t('rankingListHeading')}`}
      </Heading>
      <Text
        color="homeDescriptionColor"
        fontSize={{ base: 'lg', lg: 22 }}
        mx="auto"
        mb={9}
        px={4}
        maxW="750"
      >{`${t('rankingListDescription')}`}</Text>
      <Box maxW="1160px" mx="auto">
        <Tabs mt={10} defaultIndex={0}>
          <Flex justifyContent="center">
            <TabList border="none" display="flex" gap="8">
              <RankingListButton
                label="Cryptocurrencies"
                icon={RiCoinsFill}
                fontSize={{ lg: 'md' }}
              />
              <RankingListButton
                label="NFTs"
                icon={BiImage}
                fontSize={{ lg: 'md' }}
              />
            </TabList>
          </Flex>
          <TabPanels mt="10">
            <TabPanel>
              <RankTable hasPagination={false}>
                <RankTableHead />
                <Tbody>
                  {rankings.TokensListing.map((token, index) =>
                    token ? (
                      <RankingItem index={index} item={token} />
                    ) : (
                      <InvalidRankCardItem index={index} />
                    ),
                  )}
                </Tbody>
              </RankTable>
            </TabPanel>
            <TabPanel>
              <RankTable hasPagination={false}>
                <RankTableHead />
                <Tbody>
                  {rankings.NFTsListing.map((nft, index) =>
                    nft ? (
                      <RankingItem index={index} item={nft} />
                    ) : (
                      <InvalidRankCardItem index={index} />
                    ),
                  )}
                </Tbody>
              </RankTable>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex justifyContent="center" mt="10">
          <Link
            variant="unstyled"
            href="/rank"
            py="4"
            px="10"
            borderRadius="6px"
            border="1px solid"
            borderColor="ranklistBtnBorder"
          >
            View More
          </Link>
        </Flex>
      </Box>
    </Box>
  )
}

export default RankingList
