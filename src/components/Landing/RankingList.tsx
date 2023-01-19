import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiImage } from 'react-icons/bi'
import { RiCoinsFill } from 'react-icons/ri'
import { IconType } from 'react-icons/lib'
import { RankingListHead } from '@/data/RankingListData'
import { RankCardType } from '@/types/RankDataTypes'

export type RankingListButtonProps = {
  label: string
  icon: IconType
}

export type RankingListProps = {
  rankings: {
    NFTsListing: RankCardType[]
    TokensListing: RankCardType[]
  }
}

const RankingListButton = ({ label, icon }: RankingListButtonProps) => {
  return (
    <Tab
      display="flex"
      alignItems="center"
      color="homeDescriptionColor"
      gap="3"
      _selected={{
        color: 'brandLinkColor',
        borderBottom: '2px solid',
        borderBottomColor: 'brandLinkColor',
      }}
    >
      <Icon
        as={icon}
        w={{ lg: '32px', md: '24px' }}
        h={{ lg: '32px', md: '24px' }}
        color="primaryPinkIcon"
      />
      <Text color="inherit" fontWeight={600} fontSize={{ lg: 'md' }}>
        {label}
      </Text>
    </Tab>
  )
}

const getFounderName = (text: string) => {
  const names = text
    .split('-')
    .map(slug => slug.charAt(0).toUpperCase() + slug.slice(1))
  return `${names[0]} ${names[1][0]}.`
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
              <RankingListButton label="Cryptocurrencies" icon={RiCoinsFill} />
              <RankingListButton label="NFTs" icon={BiImage} />
            </TabList>
          </Flex>
          <TabPanels mt="10">
            <TabPanel>
              <TableContainer
                boxShadow="md"
                borderRadius="8px"
                bg="#FFFFFF"
                _dark={{ bg: '#2D3748' }}
              >
                <Table
                  variant="simple"
                  border="1px solid"
                  borderColor="rankingListBorder"
                >
                  <Thead h="45px" bg="rankingListTableHead" overflow="hidden">
                    <Tr>
                      {RankingListHead.map(item => (
                        <Th
                          fontWeight={500}
                          fontSize="12px"
                          textTransform="capitalize"
                          color="rankingListTableHeading"
                        >
                          {item.label}
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {rankings.TokensListing.map((token, index) => {
                      if (!token) {
                        return (
                          <Tr>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              <Text color="rankingListText">{index + 1}</Text>
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              <Flex gap="2.5" alignItems="center">
                                <Box flexShrink="0" w="40px" h="40px">
                                  <Icon
                                    as={BiImage}
                                    w="full"
                                    h="full"
                                    color="gray.500"
                                  />
                                </Box>
                                <Box>Coming Soon</Box>
                              </Flex>
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              <Text color="rankingListText">Coming Soon</Text>
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              <Flex gap="1">
                                <Text color="rankingListText">NA</Text>
                              </Flex>
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              <Flex gap="1">
                                <Text color="rankingListText">Coming Soon</Text>
                              </Flex>
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              NA
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              color="rankingListText"
                              fontSize="14px"
                            >
                              Coming soon
                            </Td>
                          </Tr>
                        )
                      }
                      return (
                        <Tr>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            <Text color="rankingListText">{index + 1}</Text>
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            <Flex gap="2.5" alignItems="center">
                              <Box flexShrink="0" w="40px" h="40px">
                                <Image
                                  src={token.tokenMarketData.image}
                                  alt={token.title}
                                  w="40px"
                                  h="40px"
                                />
                              </Box>
                              <Box>
                                <Link
                                  href={`wiki/${token.id}`}
                                  color="brandLinkColor"
                                >
                                  {token.title}
                                </Link>
                                <Text color="rankingListText">
                                  {token.tokenMarketData.alias}
                                </Text>
                              </Box>
                            </Flex>
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            <Text color="rankingListText">
                              ${token.tokenMarketData.current_price}
                            </Text>
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            <Flex gap="1">
                              <Text color="rankingListText">NA</Text>
                            </Flex>
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            <Flex gap="1">
                              <Text color="rankingListText">
                                $
                                {token.tokenMarketData.market_cap.toLocaleString()}
                              </Text>
                              <Text
                                alignSelf="flex-start"
                                fontSize="10px"
                                lineHeight="15px"
                                color={
                                  token.tokenMarketData.price_change_24h < 0
                                    ? 'red.500'
                                    : 'green.500'
                                }
                              >
                                {Math.abs(
                                  token.tokenMarketData.price_change_24h,
                                ).toFixed(2)}
                                %
                              </Text>
                            </Flex>
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            {token.linkedWikis && token.linkedWikis.founders ? (
                              <Flex flexWrap="wrap" maxW="160px">
                                {token.linkedWikis?.founders.map(founder => (
                                  <Link
                                    href={`wiki/${founder}`}
                                    color="brandLinkColor"
                                  >
                                    {getFounderName(founder)}
                                  </Link>
                                ))}
                              </Flex>
                            ) : (
                              'NA'
                            )}
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            color="rankingListText"
                            fontSize="14px"
                          >
                            NA
                          </Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer
                boxShadow="md"
                borderRadius="8px"
                bg="#FFFFFF"
                _dark={{ bg: '#2D3748' }}
              >
                <Table
                  variant="simple"
                  border="1px solid"
                  borderColor="rankingListBorder"
                >
                  <Thead h="45px" bg="rankingListTableHead">
                    <Tr>
                      {RankingListHead.map(item => (
                        <Th
                          fontWeight={500}
                          fontSize="12px"
                          textTransform="capitalize"
                          color="rankingListTableHeading"
                        >
                          {item.label}
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {rankings.NFTsListing.map((nft, index) => {
                      if (nft) {
                        return (
                          <Tr>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              <Text color="rankingListText">{index + 1}</Text>
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              <Flex gap="2.5" alignItems="center">
                                <Box flexShrink="0" w="40px" h="40px">
                                  <Image
                                    src={
                                      nft.nftMarketData &&
                                      nft.nftMarketData.image
                                        ? nft.nftMarketData.image
                                        : ''
                                    }
                                    alt={nft.title}
                                    w="40px"
                                    h="40px"
                                  />
                                </Box>
                                <Box>
                                  <Link
                                    href={`wiki/${nft.id}`}
                                    color="brandLinkColor"
                                  >
                                    {nft.title}
                                  </Link>
                                  <Text color="rankingListText">
                                    {nft.nftMarketData.alias}
                                  </Text>
                                </Box>
                              </Flex>
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              <Text color="rankingListText">
                                ${nft.nftMarketData.floor_price_usd}
                              </Text>
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              <Flex gap="1">
                                <Text color="rankingListText">NA</Text>
                              </Flex>
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              <Flex gap="1">
                                <Text color="rankingListText">
                                  $
                                  {nft.nftMarketData.market_cap_usd.toLocaleString()}
                                </Text>
                                <Text
                                  alignSelf="flex-start"
                                  fontSize="10px"
                                  lineHeight="15px"
                                  color={
                                    nft.nftMarketData
                                      .floor_price_in_usd_24h_percentage_change <
                                    0
                                      ? 'red.500'
                                      : 'green.500'
                                  }
                                >
                                  {Math.abs(
                                    nft.nftMarketData
                                      .floor_price_in_usd_24h_percentage_change,
                                  ).toFixed(2)}
                                  %
                                </Text>
                              </Flex>
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              fontSize="14px"
                            >
                              {nft.linkedWikis && nft.linkedWikis.founders ? (
                                <Flex flexWrap="wrap" maxW="160px">
                                  {nft.linkedWikis?.founders.map(founder => (
                                    <Link
                                      href={`wiki/${founder}`}
                                      color="brandLinkColor"
                                    >
                                      {getFounderName(founder)}
                                    </Link>
                                  ))}
                                </Flex>
                              ) : (
                                'NA'
                              )}
                            </Td>
                            <Td
                              borderColor="rankingListBorder"
                              fontWeight={500}
                              color="rankingListText"
                              fontSize="14px"
                            >
                              NA
                            </Td>
                          </Tr>
                        )
                      }
                      return (
                        <Tr>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            <Text color="rankingListText">{index + 1}</Text>
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            <Flex gap="2.5" alignItems="center">
                              <Box flexShrink="0" w="40px" h="40px">
                                <Icon
                                  as={BiImage}
                                  w="full"
                                  h="full"
                                  color="gray.500"
                                />
                              </Box>
                              <Box>Coming Soon</Box>
                            </Flex>
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            <Text color="rankingListText">Coming Soon</Text>
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            <Flex gap="1">
                              <Text color="rankingListText">NA</Text>
                            </Flex>
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            <Flex gap="1">
                              <Text color="rankingListText">Coming Soon</Text>
                            </Flex>
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            fontSize="14px"
                          >
                            NA
                          </Td>
                          <Td
                            borderColor="rankingListBorder"
                            fontWeight={500}
                            color="rankingListText"
                            fontSize="14px"
                          >
                            Coming soon
                          </Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
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
