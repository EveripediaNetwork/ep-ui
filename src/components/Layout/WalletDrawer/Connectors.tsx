import React, { useEffect, useState } from 'react'
import { useConnect, useAccount } from 'wagmi'
import {
  Box,
  Divider,
  Flex,
  Text,
  Center,
  Spinner,
  Tooltip,
} from '@chakra-ui/react'
import ConnectorDetails from '@/components/Layout/WalletDrawer/ConnectorDetails'
import { walletsLogos } from '@/data/WalletData'
import shortenBalance from '@/utils/shortenBallance'
import {
  fetchRateAndCalculateTotalBalance,
  calculateTotalBalance,
} from '@/utils/fetchWalletBalance'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateBalanceBreakdown,
  updateTotalBalance,
  updateWalletDetails,
} from '@/store/slices/user-slice'
import WalletDetails from '@/components/Layout/WalletDrawer/WalletDetails'
import { RootState } from '@/store/store'
import { useFetchWalletBalance } from '@/hooks/UseFetchWallet'
import { logEvent } from '@/utils/googleAnalytics'
import { useRouter } from 'next/router'

interface ConnectorsProps {
  openWalletDrawer?: () => void
}

const Connectors = ({ openWalletDrawer }: ConnectorsProps) => {
  const router = useRouter()
  const { connectors, connect } = useConnect({
    onError(error) {
      logEvent({
        action: 'LOGIN_ERROR',
        params: { reason: error.message },
      })
    },
    onSuccess(data) {
      logEvent({
        action: 'LOGIN_SUCCESS',
        params: { address: data.account },
      })
      router.push(router.asPath).then(openWalletDrawer)
    },
  })

  const {
    address: userAddress,
    isConnected: isUserConnected,
    isConnecting: isUserConnecting,
  } = useAccount()
  const { userBalance } = useFetchWalletBalance(userAddress)
  const { walletDetails, totalBalance, balanceBreakdown, hiiq } = useSelector(
    (state: RootState) => state.user,
  )
  const dispatch = useDispatch()
  const dollarUSLocale = Intl.NumberFormat('en-US')
  const [totalBalanceIsLoading, setTotalBalanceIsLoading] =
    useState<boolean>(true)
  const hiIQData = {
    formatted: `${hiiq?.hiiqBalance}`,
    symbol: `${hiiq?.symbol}`,
    tokensArray: { price: hiiq?.totalUsdBalance ?? 0, token: 'HiIQ' },
  }

  useEffect(() => {
    if (userBalance && !walletDetails) {
      dispatch(updateWalletDetails(userBalance))
    }
  }, [dispatch, walletDetails, userBalance])

  useEffect(() => {
    if (walletDetails) {
      fetchRateAndCalculateTotalBalance(walletDetails).then(result => {
        dispatch(updateTotalBalance(calculateTotalBalance(result)))
        dispatch(updateBalanceBreakdown(result))

        setTotalBalanceIsLoading(false)
      })
    }
  }, [walletDetails, dispatch])

  const tooltipText =
    'A crypto wallet is an application or hardware device that allows individuals to store and retrieve digital items.'

  return (
    <>
      {!isUserConnected && (
        <Text mb="4" mt={2} color="gray.500" fontWeight="bold" fontSize="sm">
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
            <Text
              display="inline"
              cursor="help"
              fontWeight="bold"
              color="brandLinkColor"
            >
              Wallet&nbsp;
            </Text>
          </Tooltip>
          providers or create a new one.
        </Text>
      )}
      <Box justifyContent="center" alignItems="center">
        {isUserConnected ? (
          <>
            <Flex
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              direction="column"
              mt={4}
              mb={6}
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
                  <Text fontWeight="bold" fontSize="xl">
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
                color="white"
                height="16"
                bg="brandLinkColor"
                mt={2}
                cursor="pointer"
              >
                <Text fontWeight="bold" fontSize="medium">
                  Add Funds
                </Text>
              </Center>
            </Flex>
            {balanceBreakdown && walletDetails && walletDetails.length > 0 && (
              <Box borderWidth="1px" borderRadius="md">
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
                {hiiq && walletDetails && walletDetails.length > 0 && hiIQData && (
                  <>
                    <WalletDetails
                      symbol={hiIQData?.symbol}
                      balance={shortenBalance(Number(hiiq?.hiiqBalance))}
                      tokensArray={[hiIQData?.tokensArray]}
                    />
                    <Divider />
                  </>
                )}
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
            {connectors.map((connector, index) => (
              <Box key={connector.name} w="full">
                <ConnectorDetails
                  connect={connect}
                  connector={connector}
                  imageLink={`/images/${walletsLogos[index]}`}
                  loading={isUserConnecting}
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
