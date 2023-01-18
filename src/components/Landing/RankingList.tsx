import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
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

export type RankingListButtonProps = {
  label: string
  icon: IconType
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

const RankingList = () => {
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
              <RankingListButton label="NFTs" icon={BiImage} />
              <RankingListButton label="Cryptocurrencies" icon={RiCoinsFill} />
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
                  <Tbody>&nbsp;</Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>Cryptocurrencies</TabPanel>
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
