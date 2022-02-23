import React, { useEffect, useState } from 'react'
import { useConnect, useAccount, useBalance } from 'wagmi'
import {
  Box,
  Divider,
  Flex,
  Text,
  Center,
  useColorModeValue,
  Spinner,
  Tooltip,
} from '@chakra-ui/react'
import ConnectorDetails from '@/components/Layout/WalletDrawer/ConnectorDetails'
import { walletsLogos } from '@/data/WalletData'
import shortenBalance from '@/utils/shortenBallance'
import {
  fetchWalletBalance,
  fetchRateAndCalculateTotalBalance,
  calculateTotalBalance,
} from '@/utils/fetchWalletBalance'
import {
  BalanceType,
  ErrorType,
  TokenDetailsType,
} from '@/types/WalletBalanceType'
import config from '@/config'
import WalletDetails from './WalletDetails'

const Connectors = () => {
  const [{ data }, connect] = useConnect()

  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })
  const address = accountData ? accountData.address : null
  const [, getBalance] = useBalance()

  const [walletDetails, setWalletDetails] = useState<
    (BalanceType | ErrorType)[] | null
  >(null)

  const [totalBalance, setTotalBalance] = useState<number | null | undefined>(
    null,
  )
  const dollarUSLocale = Intl.NumberFormat('en-US')

  const [totalBalanceIsLoading, setTotalBalanceIsLoading] =
    useState<boolean>(true)

  const [balanceBreakdown, setBalanceBreakDown] = useState<
    TokenDetailsType[] | null
  >(null)

  useEffect(() => {
    if (address) {
      fetchWalletBalance(getBalance, [
        {
          addressOrName: address,
          token: config.iqAddress,
        },
        {
          addressOrName: address,
        },
      ]).then(response => {
        setWalletDetails(response)
      })
    }
  }, [address, getBalance])

  useEffect(() => {
    if (walletDetails) {
      fetchRateAndCalculateTotalBalance(walletDetails).then(result => {
        setTotalBalance(calculateTotalBalance(result))
        setBalanceBreakDown(result)
        setTotalBalanceIsLoading(false)
      })
    }
  }, [walletDetails])

  const bg = useColorModeValue('primary', 'brand.900')
  const tooltipText =
    'A crypto wallet is an application or hardware device that allows individuals to store and retrieve digital items.'

  return (
    <>
      {!accountData && (
        <Text mb="6" mt="3" color="gray.500" fontWeight="bold" fontSize="sm">
          Connect with one of our available&nbsp;
          <Tooltip
            hasArrow
            borderRadius={8}
            placement="bottom-end"
            textAlign="center"
            p={3}
            fontWeight="bold"
            color="white"
            bg="toolTipBg"
            label={tooltipText}
          >
            <Text d="inline" fontWeight="bold" color="primary">
              Wallet&nbsp;
            </Text>
          </Tooltip>
          providers or create a new one.
        </Text>
      )}
      <Box justifyContent="center" alignItems="center">
        {accountData ? (
          <>
            <Flex
              border="1px"
              borderColor="gray.200"
              borderRadius="lg"
              direction="column"
              mb={5}
              justifyContent="center"
              w="full"
            >
              <Flex direction="column" align="center" py={4}>
                <Text fontWeight="bold" color="gray.500" fontSize="small">
                  Total balance
                </Text>
                {totalBalanceIsLoading ? (
                  <Spinner color="color" mt="1" />
                ) : (
                  <Text fontWeight="extrabold" fontSize="xl">
                    $
                    {totalBalance &&
                      dollarUSLocale.format(
                        Number(shortenBalance(totalBalance)),
                      )}{' '}
                    USD
                  </Text>
                )}
              </Flex>
              <Center
                borderBottomRadius="lg"
                color="white"
                height="50"
                bg={bg}
                mt={2}
                cursor="pointer"
              >
                <Text fontWeight="extrabold" fontSize="medium">
                  Add Funds
                </Text>
              </Center>
            </Flex>
            {balanceBreakdown && walletDetails && walletDetails.length > 0 && (
              <Box border="1px" borderColor="gray.200" borderRadius="lg">
                {walletDetails.map((details, key) => (
                  <React.Fragment key={key}>
                    <WalletDetails
                      symbol={details?.data?.symbol}
                      balance={shortenBalance(Number(details?.data?.formatted))}
                      tokensArray={balanceBreakdown}
                    />
                    <Divider />
                  </React.Fragment>
                ))}
              </Box>
            )}
          </>
        ) : (
          <Box
            border="1px"
            borderColor="walletDrawerBorderColor"
            borderRadius="lg"
            overflow="hidden"
          >
            {data.connectors.map((w, index) => (
              <Box key={w.name} w="full">
                <ConnectorDetails
                  connect={connect}
                  w={w}
                  imageLink={`/images/${walletsLogos[index]}`}
                />
                {index < walletsLogos.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  )
}

export default Connectors
