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

const RankingList = ({ rankings }: RankingListProps) => {
  const { t } = useTranslation()

  console.log(rankings)

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
                <Table variant="simple">
                  <Thead h="45px" bg="rankingListTableHead">
                    <Tr>
                      {RankingListHead.map(item => (
                        <Th
                          fontWeight={500}
                          fontSize="12px"
                          textTransform="capitalize"
                        >
                          {item.label}
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td fontWeight={500} fontSize="14px">
                        <Text color="gray.600">1</Text>
                      </Td>
                      <Td fontWeight={500} fontSize="14px">
                        <Flex gap="2.5" alignItems="center">
                          <Box flexShrink="0" w="40px" h="40px">
                            <Image
                              src="/images/bitcoin.png"
                              alt="Bitcoin"
                              w="40px"
                              h="40px"
                            />
                          </Box>
                          <Box>
                            <Link href="wiki/bitcoin" color="brandLinkColor">
                              Bitcoin
                            </Link>
                            <Text color="gray.500">BTC</Text>
                          </Box>
                        </Flex>
                      </Td>
                      <Td fontWeight={500} fontSize="14px">
                        <Text color="gray.600">21000</Text>
                      </Td>
                      <Td fontWeight={500} fontSize="14px">
                        <Flex gap="1">
                          <Text color="gray.600">1357</Text>
                          <Text
                            alignSelf="flex-start"
                            fontSize="10px"
                            lineHeight="15px"
                          >
                            0.07%
                          </Text>
                        </Flex>
                      </Td>
                      <Td fontWeight={500} fontSize="14px">
                        <Flex gap="1">
                          <Text color="gray.600">$87,668,965</Text>
                          <Text
                            alignSelf="flex-start"
                            fontSize="10px"
                            lineHeight="15px"
                          >
                            0.07%
                          </Text>
                        </Flex>
                      </Td>
                      <Td fontWeight={500} fontSize="14px">
                        <Flex flexWrap="wrap" maxW="160px">
                          <Link
                            href="/wiki/pudgy-penguins"
                            color="brandLinkColor"
                          >
                            Wylie A.
                          </Link>
                          ,
                          <Link
                            href="/wiki/pudgy-penguins"
                            color="brandLinkColor"
                          >
                            Wylie A.
                          </Link>
                          ,
                          <Link
                            href="/wiki/pudgy-penguins"
                            color="brandLinkColor"
                          >
                            Wylie A.
                          </Link>
                          ,
                          <Link
                            href="/wiki/pudgy-penguins"
                            color="brandLinkColor"
                          >
                            Wylie A.
                          </Link>
                          ,
                          <Link
                            href="/wiki/pudgy-penguins"
                            color="brandLinkColor"
                          >
                            Wylie A.
                          </Link>
                          ,
                          <Link
                            href="/wiki/pudgy-penguins"
                            color="brandLinkColor"
                          >
                            Wylie A.
                          </Link>
                        </Flex>
                      </Td>
                      <Td fontWeight={500} fontSize="14px">
                        April 30, 2021
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>NFTs</TabPanel>
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
