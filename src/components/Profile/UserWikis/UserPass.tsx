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
  Button,
  Spacer,
  Link,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { LinkButton } from '@/components/Elements'
import { MintEmptyState } from '@/components/Elements/icons/MintEmptyState'
import useBrainPass from '@/hooks/useBrainPass'
import { useAccount } from 'wagmi'
import { shortenAccount } from '@/utils/textUtils'
import { padNumber } from '@/utils/ProfileUtils/padNumber'
import BrainPassIcon from '@/components/Icons/brainPassIcon'
import { useRouter } from 'next/router'
import { dateDetails, getFormattedDate } from '@/utils/DataTransform/passUtils'
import { useGetSubscriptionHistoryQuery } from '@/services/nftpass'
import { NftPassType } from '@/types/nftPass'
import { PASS_FEATURES } from '@/data/PassData'
import config from '@/config'

const UserPass = () => {
  const router = useRouter()
  const { address } = useAccount()
  const { userPass, isUserPassActive } = useBrainPass()
  const [dateData, setDateData] = useState<{
    text: string
    formattedDate: string
  }>()

  const { data: subscriptionHistory } = useGetSubscriptionHistoryQuery(address)

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
                <Image
                  maxH="378px"
                  src="/images/nft-pass/brain-image.png"
                />
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
                {PASS_FEATURES.map((feature) => (
                  <ListItem key={feature.title}>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    {feature.title}
                  </ListItem>
                ))}
              </List>
            </Box>
          </GridItem>
        </Grid>
      ) : (
        <>
          <Center py={20}>
            <Flex flexDir="column" textAlign="center" align="center" gap={6}>
              <MintEmptyState maxBlockSize="20vw" />
              <Text color="fadedText" maxW="350px">
                No BrainPass yet. You can mint one and become an editor on iq
                wiki.
              </Text>
              <LinkButton href="/mint-pass" px="16" w="fit-content">
                Mint
              </LinkButton>
            </Flex>
          </Center>
        </>
      )}
      {subscriptionHistory && subscriptionHistory.length > 0 && (
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
                {[
                  'Date',
                  'Details',
                  'Amount paid',
                  'Transaction Type',
                  'View Trx on Polygonscan',
                ].map((column) => (
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
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {subscriptionHistory?.map((history: NftPassType) => (
                <Tr
                  whiteSpace="nowrap"
                  border="1px solid"
                  borderColor="divider"
                  borderBottom="none"
                >
                  <Td fontSize="sm" color="tagColor">
                    {getFormattedDate(history.created)}
                  </Td>
                  <Td fontSize="sm" color="tagColor" textAlign="center">
                    {history.passName || '-'}
                  </Td>
                  <Td fontSize="sm" textAlign="center" color="tagColor">
                    {history.price}
                  </Td>
                  <Td fontSize="sm" textAlign="center" color="tagColor">
                    {history.transactionType || '-'}
                  </Td>
                  <Td fontSize="sm" color="tagColor" textAlign="center">
                    <Center>
                      <Link
                        href={`${config.blockExplorerUrl}/tx/${history.transactionHash}`}
                        isExternal
                        display="flex"
                        gap={1}
                        fontSize="sm"
                        color="paginationButtonActive"
                      >
                        <chakra.span
                          color="paginationButtonActive"
                          fontSize="sm"
                        >
                          {' '}
                          {shortenAccount(
                            history.transactionHash?.toString() || '',
                          )}{' '}
                          <ExternalLinkIcon mx="2px" mt={-3} />
                        </chakra.span>
                      </Link>
                    </Center>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            {/* <TableCaption mt={0}>
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
            </TableCaption> */}
          </Table>
        </chakra.div>
      )}
    </Container>
  )
}

export default UserPass
