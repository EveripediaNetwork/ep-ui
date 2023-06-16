import {
  Text,
  Box,
  Container,
  Image,
  Divider,
  HStack,
  Center,
  chakra,
  Icon,
  List,
  ListItem,
  ListIcon,
  Grid,
  GridItem,
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableCaption,
  Button,
  Spacer,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { LinkButton } from '@/components/Elements'
import { MintEmptyState } from '@/components/Elements/icons/MintEmptyState'
import { SubscriptionEmptyState } from '@/components/Elements/icons/SubscriptionEmptyState'
import useBrainPass from '@/hooks/useBrainPass'
// import { useAccount } from 'wagmi'
import { shortenAccount } from '@/utils/textUtils'
import { padNumber } from '@/utils/ProfileUtils/padNumber'
import BrainPassIcon from '@/components/Icons/brainPassIcon'
import { useRouter } from 'next/router'
import { dateDetails } from '@/utils/DataTransform/passUtils'
// import { useGetSubscriptionHistoryQuery } from '@/services/nftpass'

const DATA = [
  {
    id: 1,
    name: 'General Pass',
    price: '0.1 IQ',
    date: '2021-09-01',
    hash: '0x1234567890',
  },
  {
    id: 1,
    name: 'General Pass',
    price: '0.1 IQ',
    date: '2021-09-01',
    hash: '0x1234567890',
  },
  {
    id: 1,
    name: 'General Pass',
    price: '0.1 IQ',
    date: '2021-09-01',
    hash: '0x1234567890',
  },
]

const UserPass = () => {
  const router = useRouter()
  // const { address } = useAccount()
  const { userPass, isUserPassActive } = useBrainPass()
  const [dateData, setDateData] = useState<{
    text: string
    formattedDate: string
  }>()
  // const { data: subscriptionHistory } =
  //   useGetSubscriptionHistoryQuery(address)

  useEffect(() => {
    const info = dateDetails(userPass?.endTimeStamp || 0)
    setDateData(info)
  }, [])

  return (
    <Container
      w="min(90%, 1200px)"
      maxW={{ base: '7xl', xl: '6xl', '2xl': '80%' }}
      my={{ base: '10', lg: '16' }}
    >
      {userPass?.tokenId !== 0 ? (
        <>
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={8}
          >
            <GridItem>
              <Box
                rounded="lg"
                border="1px solid"
                borderColor="walletDrawerBorderColor"
              >
                <Center py={5} bgColor="careersBackground">
                  <Image maxH="378px" src="/images/nft-pass/brainPass.png" />
                </Center>
                <Divider orientation="horizontal" />
                <HStack px={4} py={2} columnGap={4}>
                  <Text>Subscription Status:</Text>
                  <Center
                    px={4}
                    py={1}
                    rounded="md"
                    bgColor={isUserPassActive ? 'green.50' : 'red.50'}
                    _dark={{
                      bgColor: isUserPassActive ? 'green.200' : 'red.200',
                      color: isUserPassActive ? 'green.800' : 'red.800',
                    }}
                    color={isUserPassActive ? 'green.500' : 'red.500'}
                  >
                    <Text fontWeight="semibold">
                      {isUserPassActive ? 'Active' : 'Inactive'}
                    </Text>
                  </Center>
                  <Spacer />
                  <Button
                    onClick={() => router.push('/mint-pass')}
                    fontSize="xs"
                    size="sm"
                    px={4}
                  >
                    Subscribe
                  </Button>
                </HStack>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Text
                  color="wikiSummaryLabel"
                  fontSize="3xl"
                  fontWeight="bold"
                  mt={-2}
                >
                  BRAINPASS
                </Text>
                <Text
                  mt={2}
                  color="wikiSummaryLabel"
                  fontSize="2xl"
                  fontWeight="bold"
                >
                  #{padNumber(userPass?.tokenId)}
                </Text>
                <Box
                  bgColor="brand.50"
                  _dark={{ bgColor: 'rgba(49, 4, 25, 0.7);' }}
                  p={2}
                  maxW="418px"
                  my={5}
                >
                  <HStack gap={2}>
                    <Icon
                      as={BrainPassIcon}
                      boxSize={6}
                      color="paginationButtonActive"
                    />
                    <Text fontSize="xs" fontWeight="semibold">
                      {dateData?.text} ({dateData?.formattedDate})
                    </Text>
                  </HStack>
                </Box>
                <List mt={7} spacing={7} textAlign="start">
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Exclusive support from the engineering team.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    AI Insight for creating wikis.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Market Updates via Email.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Exclusive access to IQ GPT.
                  </ListItem>
                </List>
              </Box>
            </GridItem>
          </Grid>
          <chakra.div
            overflowX="auto"
            border="solid 1px"
            borderColor="walletDrawerBorderColor"
            rounded="lg"
            my="16"
            fontSize="sm"
            mb={{ base: '24', md: '0' }}
          >
            <Flex
              py={4}
              justify="space-between"
              display="flex"
              direction={{ base: 'column', lg: 'row' }}
              align={{ lg: 'center' }}
            >
              <Text
                color="wikiSummaryLabel"
                fontSize="lg"
                px={4}
                mb={{ base: 4, lg: 0 }}
                fontWeight="medium"
              >
                Subscription History
              </Text>
            </Flex>
            <Divider />
            <Table fontWeight="semibold">
              <Thead border="none" bg="aboutFeaturesCardBg">
                <Tr>
                  {['Date', 'Details', 'Amount paid', 'View on etherscan'].map(
                    column => (
                      <Th
                        border="none"
                        whiteSpace="nowrap"
                        py="5"
                        textTransform="none"
                        fontSize={{ base: 'xs', md: 'sx' }}
                        color="tagColor"
                        textAlign={column.includes('Date') ? 'left' : 'center'}
                      >
                        {column}
                      </Th>
                    ),
                  )}
                </Tr>
              </Thead>
              <Tbody>
                {DATA.map(history => (
                  <>
                    <Tr
                      whiteSpace="nowrap"
                      border="1px solid"
                      borderColor="divider"
                      borderBottom="none"
                    >
                      <Td fontSize="sm" color="tagColor">
                        {history.date}
                      </Td>
                      <Td fontSize="sm" color="tagColor" textAlign="center">
                        {history.name}
                      </Td>
                      <Td fontSize="sm" textAlign="center" color="tagColor">
                        {history.price}
                      </Td>
                      <Td fontSize="sm" color="tagColor" textAlign="center">
                        <chakra.span
                          color="paginationButtonActive"
                          fontSize="sm"
                        >
                          {' '}
                          {shortenAccount(history.hash?.toString() || '')}{' '}
                          <ExternalLinkIcon mx="2px" mt={-3} />
                        </chakra.span>
                      </Td>
                    </Tr>
                  </>
                ))}
              </Tbody>
              <TableCaption mt={0}>
                <Flex>
                  <Box>
                    <Button
                      variant="outline"
                      leftIcon={<FaArrowLeft />}
                      rounded="md"
                    >
                      <Text fontSize="sm">Previous</Text>
                    </Button>
                  </Box>
                  <Spacer />
                  <Box>
                    <Button
                      variant="outline"
                      rightIcon={<FaArrowRight />}
                      rounded="md"
                    >
                      <Text fontSize="sm">Next</Text>
                    </Button>
                  </Box>
                </Flex>
              </TableCaption>
            </Table>
          </chakra.div>
        </>
      ) : (
        <>
          <Center py={20}>
            <Flex flexDir="column" textAlign="center" align="center" gap={6}>
              <MintEmptyState maxBlockSize="20vw" />
              <Text color="fadedText2" maxW="350px">
                No BrainPass yet. You can mint one and become an editor on iq
                wiki.
              </Text>
              <LinkButton href="/mint-pass" px="16" w="fit-content">
                Mint
              </LinkButton>
            </Flex>
          </Center>
          <chakra.div
            overflowX="auto"
            border="solid 1px"
            borderColor="walletDrawerBorderColor"
            rounded="lg"
            my="16"
            fontSize="sm"
            mb={{ base: '24', md: '0' }}
          >
            <Flex
              py={4}
              justify="space-between"
              display="flex"
              direction={{ base: 'column', lg: 'row' }}
              align={{ lg: 'center' }}
            >
              <Text
                color="wikiSummaryLabel"
                fontSize="lg"
                px={4}
                mb={{ base: 4, lg: 0 }}
                fontWeight="medium"
              >
                Subscription History
              </Text>
            </Flex>
            <Divider />
            <Center>
              <SubscriptionEmptyState maxBlockSize="40vw" />
            </Center>
            <Text
              mb={6}
              ml={4}
              fontSize="xl"
              textAlign="center"
              color="insertMediaDialogText"
            >
              No subscription history yet.
            </Text>
          </chakra.div>
        </>
      )}
    </Container>
  )
}

export default UserPass
