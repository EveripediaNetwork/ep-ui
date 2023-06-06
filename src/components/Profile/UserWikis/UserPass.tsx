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
  Link,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
import { RiTicket2Line } from 'react-icons/ri'
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { LinkButton } from '@/components/Elements'
import { MintEmptyState } from '@/components/Elements/icons/MintEmptyState'
import { SubscriptionEmptyState } from '@/components/Elements/icons/SubscriptionEmptyState'
import useBrainPass from '@/hooks/useBrainPass'
import { useAccount } from 'wagmi'
import { shortenAccount } from '@/utils/textUtils'

const UserPass = () => {
  //   const router = useRouter()
  //   const address = router.query.profile as string

  const { address } = useAccount()
  const { UserPass, isUserPassActive } = useBrainPass()

  const padNumber = (val: number | undefined) => {
    return val?.toString().padStart(3, '0')
  }

  const dateDetails = (endDate: number) => {
    const currentDate = Date.now()
    const endTimestamp = new Date(endDate * 1000).getTime()
    const oneDay = 24 * 60 * 60 * 1000
    const difference = Math.round(Math.abs(endTimestamp - currentDate) / oneDay)

    let daysDifference = ''
    if (endTimestamp > currentDate) {
      daysDifference = `Subscription expires in ${difference} day(s)`
    } else {
      daysDifference = 'Brain Pass Subscription has expired'
    }

    const endDateVal = new Date(endDate * 1000)
    const month = endDateVal.getMonth() + 1
    const day = endDateVal.getDate()
    const year = endDateVal.getFullYear()

    const formattedDate = `${month}.${day}.${year}`

    return { daysDifference, formattedDate }
  }

  const [dateData, setDateData] = useState<any>()

  useEffect(() => {
    const info = dateDetails(UserPass?.endTimeStamp || 0)
    setDateData(info)
  }, [])

  return (
    <Container
      w="min(90%, 1200px)"
      maxW={{ base: '7xl', xl: '6xl', '2xl': '80%' }}
      my={{ base: '10', lg: '16' }}
    >
      {UserPass?.tokenId !== 0 ? (
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
                <Box p={4}>
                  <Image src="/images/nft-pass/pass.png" />
                </Box>
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
                  {!isUserPassActive && (
                    <Link
                      href={'/mint-pass'}
                      color="brandLinkColor"
                      fontWeight="bold"
                    >
                      Renew
                    </Link>
                  )}
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
                  NFT EDITOR PASS
                </Text>
                <Text
                  mt={2}
                  color="wikiSummaryLabel"
                  fontSize="2xl"
                  fontWeight="bold"
                >
                  #{padNumber(UserPass?.tokenId)}
                </Text>
                <Text mt={3} fontSize="lg">
                  Owned by:
                  <chakra.span color="paginationButtonActive" fontSize="sm">
                    {' '}
                    {shortenAccount(address?.toString() || '')}
                    <ExternalLinkIcon mx="2px" mt={-3} />
                  </chakra.span>
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
                      as={RiTicket2Line}
                      boxSize={6}
                      color="paginationButtonActive"
                    />
                    <Text fontSize="xs" fontWeight="semibold">
                      {dateData?.daysDifference} ({dateData?.formattedDate})
                    </Text>
                  </HStack>
                </Box>
                <List mt={4} spacing={4} textAlign="start">
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
                    (column) => (
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
                <Tr
                  whiteSpace="nowrap"
                  border="1px solid"
                  borderColor="divider"
                  borderBottom="none"
                >
                  <Td fontSize="sm" color="tagColor">
                    Jan 6, 2023
                  </Td>
                  <Td fontSize="sm" color="tagColor" textAlign="center">
                    General Pass
                  </Td>
                  <Td fontSize="sm" textAlign="center" color="tagColor">
                    0.2TH
                  </Td>
                  <Td fontSize="sm" color="tagColor" textAlign="center">
                    <chakra.span color="paginationButtonActive" fontSize="sm">
                      {' '}
                      {shortenAccount(address?.toString() || '')}{' '}
                      <ExternalLinkIcon mx="2px" mt={-3} />
                    </chakra.span>
                  </Td>
                </Tr>
                <Tr
                  whiteSpace="nowrap"
                  border="1px solid"
                  borderColor="divider"
                  borderBottom="none"
                >
                  <Td fontSize="sm" color="tagColor">
                    Jan 6, 2023
                  </Td>
                  <Td fontSize="sm" color="tagColor" textAlign="center">
                    General Pass
                  </Td>
                  <Td fontSize="sm" textAlign="center" color="tagColor">
                    0.2TH
                  </Td>
                  <Td fontSize="sm" color="tagColor" textAlign="center">
                    <chakra.span color="paginationButtonActive" fontSize="sm">
                      {' '}
                      {shortenAccount(address?.toString() || '')}{' '}
                      <ExternalLinkIcon mx="2px" mt={-3} />
                    </chakra.span>
                  </Td>
                </Tr>
                <Tr
                  whiteSpace="nowrap"
                  border="1px solid"
                  borderColor="divider"
                  borderBottom="none"
                >
                  <Td fontSize="sm" color="tagColor">
                    Jan 6, 2023
                  </Td>
                  <Td fontSize="sm" color="tagColor" textAlign="center">
                    General Pass
                  </Td>
                  <Td fontSize="sm" textAlign="center" color="tagColor">
                    0.2TH
                  </Td>
                  <Td fontSize="sm" color="tagColor" textAlign="center">
                    <chakra.span color="paginationButtonActive" fontSize="sm">
                      {' '}
                      {shortenAccount(address?.toString() || '')}{' '}
                      <ExternalLinkIcon mx="2px" mt={-3} />
                    </chakra.span>
                  </Td>
                </Tr>
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
                No NFT editor pass yet. You can mint one and become an editor on
                iq wiki.
              </Text>
              <LinkButton href="/create-wiki" px="16" w="fit-content">
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
