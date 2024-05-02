import { shortenBalance } from '@/utils/textUtils'
import {
  Box,
  Center,
  Divider,
  Flex,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { Link } from '@/components/Elements/'
import React, { useEffect, useState } from 'react'
import WalletDetails from './WalletDetails'
import { useFetchWalletBalance } from '@/hooks/UseFetchWallet'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '@/store/store'
import { useTranslation } from 'next-i18next'
import {
  fetchRateAndCalculateTotalBalance,
  calculateTotalBalance,
} from '@/utils/WalletUtils/fetchWalletBalance'
import {
  updateBalanceBreakdown,
  updateTotalBalance,
  updateWalletDetails,
} from '@/store/slices/user-slice'
import { useRouter } from 'next/router'
import { ColorModeToggle } from '../Navbar/ColorModeToggle'
import { LogOutBtn } from '../Navbar/Logout'
import { useAddress } from '@/hooks/useAddress'
import { ProfileLink } from '../Navbar/ProfileLink'
import SettingsLink from '../Navbar/SettingsLink'
import AdminLink from '../Navbar/AdminLink'
import { adminApiClient, checkIsAdmin } from '@/services/admin'

export const WalletDrawerBody = () => {
  const { t } = useTranslation('common')
  const { address } = useAddress()
  const [isAdmin, setIsAdmin] = React.useState(false)
  const token = useSelector((state: RootState) => state.user.token)
  const { userBalance, isLoading } = useFetchWalletBalance()
  const { walletDetails, totalBalance, balanceBreakdown, hiiq } = useSelector(
    (state: RootState) => state.user,
  )
  const dispatch = useDispatch()
  const router = useRouter()
  const [totalBalanceIsLoading, setTotalBalanceIsLoading] = useState(true)
  const hiIQData = {
    formatted: `${hiiq?.hiiqBalance}`,
    symbol: `${hiiq?.symbol}`,
    tokensArray: { price: hiiq?.totalUsdBalance ?? 0, token: 'HiIQ' },
  }

  useEffect(() => {
    if (userBalance && !walletDetails) {
      dispatch(updateWalletDetails(userBalance))
    }
  }, [walletDetails, userBalance])

  useEffect(() => {
    if (walletDetails) {
      fetchRateAndCalculateTotalBalance(walletDetails).then((result) => {
        dispatch(updateTotalBalance(calculateTotalBalance(result)))
        dispatch(updateBalanceBreakdown(result))
        setTotalBalanceIsLoading(false)
      })
    }
  }, [walletDetails])

  useEffect(() => {
    async function fetchAuth() {
      if (address && token) {
        adminApiClient.setHeader('authorization', token)
        const { data } = await store.dispatch(checkIsAdmin?.initiate(undefined))
        if (data) {
          setIsAdmin(true)
        }
      }
    }
    fetchAuth()
  }, [address])

  return (
    <>
      {address ? (
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
                {t('loginConnectorTotalBal')}
              </Text>
              {totalBalanceIsLoading ? (
                <Spinner color="color" mt="1" />
              ) : (
                <Text fontWeight="bold" fontSize="xl">
                  ${totalBalance && shortenBalance(totalBalance)} USD
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
          {(isLoading || totalBalanceIsLoading || !userBalance) && (
            <Flex justifyContent="center">
              <Spinner color="color" mt="4" />
            </Flex>
          )}
          {!isLoading &&
            !totalBalanceIsLoading &&
            balanceBreakdown &&
            walletDetails &&
            walletDetails.length > 0 && (
              <>
                <Box borderWidth="1px" borderRadius="md">
                  {walletDetails.map((details, key) => (
                    <React.Fragment key={key}>
                      <WalletDetails
                        symbol={details?.data?.symbol}
                        balance={shortenBalance(
                          Number(details?.data?.formatted),
                        )}
                        tokensArray={balanceBreakdown}
                      />
                      <Divider />
                    </React.Fragment>
                  ))}
                  {!isLoading &&
                    !totalBalanceIsLoading &&
                    hiiq &&
                    walletDetails &&
                    walletDetails.length > 0 &&
                    hiIQData && (
                      <>
                        <WalletDetails
                          symbol={hiIQData?.symbol}
                          tokensArray={[hiIQData?.tokensArray]}
                          balance={shortenBalance(hiiq?.hiiqBalance)}
                        />
                        <Divider />
                      </>
                    )}
                </Box>
              </>
            )}
          <>
            <Divider py={2} />
            <VStack
              alignItems="flex-start"
              display={{ base: 'none', md: 'block' }}
            >
              {isAdmin && <AdminLink />}
              <ProfileLink />
              <SettingsLink />
              <ColorModeToggle isInMobileMenu={false} />
              {address && <LogOutBtn isInMobileMenu={false} />}
            </VStack>
          </>
        </>
      ) : (
        <Box>
          <Text
            mb="4"
            mt={2}
            color="fadedText2"
            fontWeight="bold"
            fontSize="sm"
          >
            {t('loginConnectorText1')}
            <Tooltip
              hasArrow
              borderRadius={8}
              placement="bottom-end"
              textAlign="center"
              p={3}
              fontWeight="bold"
              color="white"
              bg="toolTipBg"
              label={t('loginToolTip')}
            >
              <Text
                display="inline"
                cursor="help"
                fontWeight="bold"
                color="brandLinkColor"
              >
                {t('loginConnectorText2')}
              </Text>
            </Tooltip>
            {t('loginConnectorText3')}
          </Text>
          <Box height="10" bg="brandLinkColor" mt={2} rounded="md">
            <Link
              h="full"
              w="full"
              textDecoration="none"
              _hover={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
              href={`/login?from=${
                router.asPath === '/login' ? '/' : router.asPath
              }`}
              variant="unstyled"
              display="block"
            >
              <Center h="full">
                <Text fontWeight="bold" textColor="white" fontSize="medium">
                  Login
                </Text>
              </Center>
            </Link>
          </Box>
        </Box>
      )}
    </>
  )
}
