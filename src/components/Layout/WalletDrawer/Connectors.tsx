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
import { Link } from '@/components/Elements/'
import ConnectorDetails from '@/components/Layout/WalletDrawer/ConnectorDetails'
import { walletsLogos } from '@/data/WalletData'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateBalanceBreakdown,
  updateTotalBalance,
  updateUserAddress,
  updateWalletDetails,
} from '@/store/slices/user-slice'
import WalletDetails from '@/components/Layout/WalletDrawer/WalletDetails'
import { RootState } from '@/store/store'
import { useFetchWalletBalance } from '@/hooks/UseFetchWallet'
import { logEvent } from '@/utils/googleAnalytics'
import { useRouter } from 'next/router'
import {
  fetchRateAndCalculateTotalBalance,
  calculateTotalBalance,
} from '@/utils/WalletUtils/fetchWalletBalance'
import { shortenBalance, shortenBigBalance } from '@/utils/textUtils'
// import { shortenBalance, shortenBigBalance } from '@/utils/textUtils'
// import BigNumber from 'bignumber.js'

interface ConnectorsProps {
  openWalletDrawer?: () => void
}

const Connectors = ({ openWalletDrawer }: ConnectorsProps) => {
  const router = useRouter()
  const {
    address: userAddress,
    isConnected: isUserConnected,
    isConnecting: isUserConnecting,
  } = useAccount()
  const { userBalance } = useFetchWalletBalance(userAddress)
  const { walletDetails, totalBalance, balanceBreakdown, hiiq } = useSelector(
    (state: RootState) => state.user,
  )

  // const bigNumber = new BigNumber('23893287347847832789378943279387932973283')
  // const bigNum = BigInt('23666799263789467256737654567789')
  // const formatted = formatNumber(Number(bigNum))

  const dispatch = useDispatch()

  const { connectors, connect } = useConnect({
    onError(error) {
      logEvent({
        action: 'LOGIN_ERROR',
        label: error.message,
        value: 0,
        category: 'login_status',
      })
    },
    onSuccess(data) {
      logEvent({
        action: 'LOGIN_SUCCESS',
        label: data.account,
        value: 1,
        category: 'login_status',
      })
      dispatch(updateUserAddress(data.account))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any
      w.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        user_id: data.account,
      })
      router.push(router.asPath).then(openWalletDrawer)
    },
  })

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
      console.log(hiiq?.hiiqBalance)
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
        <Text mb="4" mt={2} color="fadedText2" fontWeight="bold" fontSize="sm">
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
                <Text fontWeight="bold" color="fadedText2" fontSize="small">
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
                <Link
                  target="_blank"
                  h="100%"
                  w="full"
                  textDecoration="none"
                  _hover={{ textDecoration: 'none' }}
                  _focus={{ boxShadow: 'none' }}
                  href="https://iq.braindao.org"
                  variant="unstyled"
                >
                  <Center height="16">
                    <Text fontWeight="bold" fontSize="medium">
                      IQ Dashboard
                    </Text>
                  </Center>
                </Link>
              </Center>
            </Flex>
            {balanceBreakdown && walletDetails && walletDetails.length > 0 && (
              <Box borderWidth="1px" borderRadius="md">
                {walletDetails.map((details, key) => (
                  <React.Fragment key={key}>
                    {/* {typeof details.data.formatted} */}
                    <WalletDetails
                      symbol={details?.data?.symbol}
                      balance={shortenBalance(Number(details?.data?.formatted))}
                      // balance={shortenBigBalance(
                      //   Number(BigInt(String(details?.data?.formatted))),
                      // )}
                      tokensArray={balanceBreakdown}
                    />
                    <Divider />
                  </React.Fragment>
                ))}
                {hiiq && walletDetails && walletDetails.length > 0 && hiIQData && (
                  <>
                    <WalletDetails
                      symbol={hiIQData?.symbol}
                      tokensArray={[hiIQData?.tokensArray]}
                      balance={shortenBigBalance(
                        Number(BigInt(String(hiiq?.hiiqBalance))),
                      )}
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
                  imageLink={`/images/logos/${walletsLogos[index]}`}
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
