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
import { RANKDATA } from '@/data/RankData'

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

const RankingTableHead = () => {
  return (
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
  )
}

const RankingItemNotAvailable = ({ index }: { index: number }) => {
  return (
    <Tr>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Text color="rankingListText">{index + 1}</Text>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="2.5" alignItems="center">
          <Box flexShrink="0" w="40px" h="40px">
            <Icon as={BiImage} w="full" h="full" color="gray.500" />
          </Box>
          <Box>Coming Soon</Box>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Text color="rankingListText">Coming Soon</Text>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="1">
          <Text color="rankingListText">NA</Text>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="1">
          <Text color="rankingListText">Coming Soon</Text>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
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

const RankingTableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
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
        {children}
      </Table>
    </TableContainer>
  )
}

const RankingItem = ({
  index,
  item,
}: {
  index: number
  item: RankCardType
}) => {
  return (
    <Tr>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Text color="rankingListText">{index + 1}</Text>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="2.5" alignItems="center">
          <Box flexShrink="0" w="40px" h="40px">
            <Image
              src={
                item.nftMarketData
                  ? item.nftMarketData.image
                  : item.tokenMarketData.image
              }
              alt={item.title}
              w="40px"
              h="40px"
              borderRadius="50%"
              objectFit="cover"
            />
          </Box>
          <Box>
            <Link href={`wiki/${item.id}`} color="brandLinkColor">
              {item.title}
            </Link>
            <Text color="rankingListText">
              {item.nftMarketData
                ? item.nftMarketData.alias
                : item.tokenMarketData.alias}
            </Text>
          </Box>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Text color="rankingListText">
          $
          {item.nftMarketData
            ? item.nftMarketData.floor_price_usd.toLocaleString()
            : item.tokenMarketData.current_price?.toLocaleString()}
        </Text>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="1">
          <Text color="rankingListText">NA</Text>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="1">
          <Text color="rankingListText">
            $
            {item.nftMarketData
              ? item.nftMarketData.market_cap_usd.toLocaleString()
              : item.tokenMarketData.market_cap?.toLocaleString()}
          </Text>
          {item.nftMarketData ? (
            <Text
              alignSelf="flex-start"
              fontSize="10px"
              lineHeight="15px"
              color={
                item.nftMarketData.floor_price_in_usd_24h_percentage_change < 0
                  ? 'red.500'
                  : 'green.500'
              }
            >
              {Math.abs(
                item.nftMarketData.floor_price_in_usd_24h_percentage_change,
              ).toFixed(2)}
              %
            </Text>
          ) : (
            <Text
              alignSelf="flex-start"
              fontSize="10px"
              lineHeight="15px"
              color={
                item.tokenMarketData.price_change_24h < 0
                  ? 'red.500'
                  : 'green.500'
              }
            >
              {Math.abs(item.tokenMarketData.price_change_24h).toFixed(2)}%
            </Text>
          )}
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        {item.linkedWikis && item.linkedWikis.founders ? (
          <Flex flexWrap="wrap" maxW="160px">
            {item.linkedWikis?.founders.map(founder => (
              <Link href={`wiki/${founder}`} color="brandLinkColor">
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
        {RANKDATA[index].DateCreated}
      </Td>
    </Tr>
  )
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
              <RankingTableWrapper>
                <RankingTableHead />
                <Tbody>
                  {rankings.TokensListing.map((token, index) => {
                    if (!token) {
                      return <RankingItemNotAvailable index={index} />
                    }
                    return <RankingItem index={index} item={token} />
                  })}
                </Tbody>
              </RankingTableWrapper>
            </TabPanel>
            <TabPanel>
              <RankingTableWrapper>
                <RankingTableHead />
                <Tbody>
                  {rankings.NFTsListing.map((nft, index) => {
                    if (!nft) {
                      return <RankingItemNotAvailable index={index} />
                    }
                    return <RankingItem index={index} item={nft} />
                  })}
                </Tbody>
              </RankingTableWrapper>
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
