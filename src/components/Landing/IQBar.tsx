import { Box, Flex, Link, Icon, Text, HStack, Spinner } from '@chakra-ui/react'
import OneinchIcon from '../Icons/oneInch'
import BinanceIcon from '../Icons/binance'
import UpbitIcon from '../Icons/upbit'
import FraxIcon from '../Icons/frax'
import { RiArrowDownLine, RiArrowUpLine, RiGlobalLine } from 'react-icons/ri'
import { logEvent } from '@/utils/googleAnalytics'
import { Logo } from '../Elements'
import IQGraph from './IQGraph'
import { useGetCgTokenDataQuery } from '@/services/cgTokenDetails'
import { useGetTokenStatsQuery } from '@/services/token-stats'
import { fetchIqPriceChange } from '@/lib/utils'
import * as Humanize from 'humanize-plus'
import { useEffect, useState } from 'react'

export const IQBar = () => {
  const { data: iqData, isLoading, isError } = useGetCgTokenDataQuery()
  const price = Humanize.formatNumber(iqData?.last_price ?? 0, 4)
  const mcap = Humanize.compactInteger(iqData?.last_market_cap ?? 0, 2)
  const { data: tokenStats } = useGetTokenStatsQuery({
    tokenName: 'everipedia',
  })
  const mcapchange = tokenStats?.market_cap_percentage_change
  const areaGraphData = iqData?.prices
  const [priceChange, setPriceChange] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const priceChangePercentage = await fetchIqPriceChange()
      setPriceChange(priceChangePercentage)
    }

    fetchData()
  }, [])

  return (
    <Flex
      position="relative"
      top={{ base: '-140px', md: '-80px', xl: '-60px' }}
      px={-2}
      bg="white"
      textColor="gray.600"
      maxW={{ base: 'min(78vw, 400px)', md: '670px', xl: '1210px' }}
      minW={{ base: 'min(78vw, 400px)', md: '650px', xl: '1210px' }}
      mx="auto"
      rounded="lg"
      _dark={{ bg: 'gray.700', textColor: 'rgba(255, 255, 255, 0.92)' }}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        mx="auto"
        flexWrap="wrap"
        gap={3}
        py={4}
      >
        <HStack
          minW={{ base: 'min(70vw, 360px)', md: '280px', xl: '255px' }}
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          p={3}
          fontSize="sm"
          justifyContent="space-between"
          className="iq-price"
          _dark={{ bg: 'gray.700', borderColor: 'rgba(255, 255, 255, 0.24)' }}
        >
          <Box>
            <Text fontSize="xs">IQ Price</Text>
            {isLoading ? (
              <Spinner size="sm" />
            ) : isError ? (
              <Text fontSize="sm" color="red.500">
                Error fetching price
              </Text>
            ) : (
              <Text fontSize="xl" fontWeight="semibold">
                {`$${price}`}
              </Text>
            )}
            <Flex align="center" mt={1}>
              <Flex
                alignItems="center"
                gap={1}
                rounded="xl"
                px={1}
                color={priceChange && priceChange > 0 ? 'green.600' : 'red.500'}
              >
                <Icon
                  as={
                    priceChange && priceChange > 0
                      ? RiArrowUpLine
                      : RiArrowDownLine
                  }
                  boxSize={3}
                />
                <Text fontSize="xs">
                  {Humanize.formatNumber(priceChange ?? 0, 2)}%
                </Text>
              </Flex>
            </Flex>
          </Box>
          <Link
            href="https://iq.braindao.org/dashboard"
            isExternal
            onClick={() =>
              logEvent({
                category: 'Home',
                action: 'Click',
                label: 'IQ Dashboard',
                value: 1,
              })
            }
          >
            <Box
              as="button"
              aria-label="IQ"
              border="1px"
              borderColor="gray.200"
              rounded="full"
              p={1}
              _dark={{ borderColor: 'rgba(255, 255, 255, 0.24)' }}
            >
              <Logo boxSize="2em" />
            </Box>
          </Link>
        </HStack>
        <HStack
          minW={{ base: 'min(70vw, 360px)', md: '320px', xl: '255px' }}
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          p={3}
          fontSize="sm"
          justifyContent="space-between"
          className="iq-market-cap"
          _dark={{ bg: 'gray.700', borderColor: 'rgba(255, 255, 255, 0.24)' }}
        >
          <Box>
            <Text fontSize="xs">Market Cap</Text>
            {isLoading ? (
              <Spinner size="sm" />
            ) : isError ? (
              <Text fontSize="sm" color="red.500">
                Error fetching market cap
              </Text>
            ) : (
              <Text fontSize="xl" fontWeight="semibold">
                {`$${mcap}`}
              </Text>
            )}
            <Flex align="center" mt={1}>
              <Flex
                alignItems="center"
                gap={1}
                px={1}
                rounded="xl"
                color={mcapchange && mcapchange > 0 ? 'green.600' : 'red.500'}
              >
                <Icon
                  as={
                    mcapchange && mcapchange > 0
                      ? RiArrowUpLine
                      : RiArrowDownLine
                  }
                  boxSize={3}
                />
                <Text fontSize="xs">
                  {Humanize.formatNumber(mcapchange ?? 0, 2)}%
                </Text>
              </Flex>
            </Flex>
          </Box>
          <Link
            href="https://coinmarketcap.com/currencies/iq/"
            isExternal
            onClick={() =>
              logEvent({
                category: 'Home',
                action: 'Click',
                label: 'IQ CMC',
                value: 1,
              })
            }
          >
            <Box
              as="button"
              rounded="full"
              border="1px"
              p="1"
              borderColor="gray.200"
              _dark={{ borderColor: 'rgba(255, 255, 255, 0.24)' }}
            >
              <RiGlobalLine size="2em" color="#FF5CAA" />
            </Box>
          </Link>
        </HStack>
        <Box
          minW={{ base: 'min(70vw, 360px)', md: '280px', xl: '255px' }}
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          p={3}
          fontSize="sm"
          className="iq-get-iq"
          _dark={{ bg: 'gray.700', borderColor: 'rgba(255, 255, 255, 0.24)' }}
        >
          <Text fontSize="xs">Exchanges (Get IQ)</Text>
          <Flex alignItems="center" justifyContent="space-evenly" mt={2}>
            <Link
              href="https://www.binance.com/en/trade/IQ_USDT?theme=dark&type=spot"
              isExternal
              onClick={() =>
                logEvent({
                  category: 'Home',
                  action: 'Click',
                  label: 'Binance',
                  value: 1,
                })
              }
            >
              <Icon boxSize="9" as={BinanceIcon} aria-label="binance" />
            </Link>
            <Box
              borderLeft="1px solid"
              borderColor="gray.200"
              height="24px"
              mx={2}
              _dark={{ borderColor: 'whiteAlpha.400' }}
            />
            <Link
              href="https://app.1inch.io/#/1/simple/swap/USDT/IQ"
              isExternal
              onClick={() =>
                logEvent({
                  category: 'Home',
                  action: 'Click',
                  label: '1inch',
                  value: 1,
                })
              }
            >
              <Icon boxSize="8" as={OneinchIcon} aria-label="binance" />
            </Link>
            <Box
              borderLeft="1px solid"
              borderColor="gray.200"
              height="24px"
              mx={2}
              _dark={{ borderColor: 'whiteAlpha.400' }}
            />
            <Link
              isExternal
              href="https://upbit.com/exchange?code=CRIX.UPBIT.KRW-IQ"
              onClick={() =>
                logEvent({
                  category: 'Home',
                  action: 'Click',
                  label: 'upbit',
                  value: 1,
                })
              }
            >
              <Icon boxSize="8" as={UpbitIcon} aria-label="binance" />
            </Link>
            <Box
              borderLeft="1px solid"
              borderColor="gray.200"
              height="24px"
              mx={2}
              _dark={{ borderColor: 'whiteAlpha.400' }}
            />
            <Link
              href="https://frax.finance/"
              isExternal
              onClick={() =>
                logEvent({
                  category: 'Home',
                  action: 'Click',
                  label: 'Binance',
                  value: 1,
                })
              }
            >
              <Icon boxSize="8" as={FraxIcon} aria-label="binance" />
            </Link>
          </Flex>
        </Box>
        <Box
          minW={{ base: 'min(70vw, 360px)', md: '320px', xl: '390px' }}
          maxW={{ base: 'min(70vw, 360px)', md: '298px', xl: '390px' }}
          h="100px"
          border="1px"
          borderColor="gray.200"
          rounded="xl"
          px={2}
          pt={3}
          fontSize="xs"
          className="iq-historical-graph"
          _dark={{ bg: 'gray.700', borderColor: 'rgba(255, 255, 255, 0.24)' }}
        >
          <HStack justifyContent={'space-between'}>
            <Text fontSize="xs"> IQ Historical Graph (1Month)</Text>
            <Text>{`$${price}`}</Text>
          </HStack>
          {isError ? (
            <Text fontSize="sm" color="red.500">
              Error fetching graph data
            </Text>
          ) : (
            <IQGraph areaGraphData={areaGraphData} />
          )}
        </Box>
      </Flex>
    </Flex>
  )
}
