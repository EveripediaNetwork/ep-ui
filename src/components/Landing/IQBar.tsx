import { Box, Flex, Link, Icon, Text, HStack, Spinner } from '@chakra-ui/react'
import OneinchIcon from '../Icons/oneInch'
import BinanceIcon from '../Icons/binance'
import UpbitIcon from '../Icons/upbit'
import FraxIcon from '../Icons/frax'
import { RiArrowUpLine, RiGlobalLine } from 'react-icons/ri'
import { logEvent } from '@/utils/googleAnalytics'
import { Logo } from '../Elements'
import IQGraph from './IQGraph'
import { useGetCgTokenDataQuery } from '@/services/cgTokenDetails'
import * as Humanize from 'humanize-plus'

export const IQBar = () => {
  const { data, isLoading, isError } = useGetCgTokenDataQuery()

  const price = Humanize.formatNumber(data?.last_price ?? 0, 4)
  const mcap = Humanize.compactInteger(data?.last_market_cap ?? 0, 2)
  const areaGraphData = data?.prices

  return (
    <Flex
      position="relative"
      top={{ base: '-60px', md: '-80px', xl: '-60px' }}
      px={2}
      bg="white"
      textColor="gray.600"
      w={{ base: '390px', md: '688px', xl: '1220px' }}
      mx="auto"
      rounded="lg"
      _dark={{ bg: 'gray.700', textColor: 'rgba(255, 255, 255, 0.92)' }}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        mx="auto"
        flexWrap="wrap"
        gap={4}
        py={4}
      >
        <HStack
          w={{ base: '350px', md: '320px', xl: '250px' }}
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
                bg={'#E7F6EC'}
                rounded="xl"
                px={1}
                color="green.500"
                _dark={{ color: 'green.700' }}
              >
                <Icon as={RiArrowUpLine} boxSize={3} />
                <Text fontSize="xs">49.00%</Text>
              </Flex>
              <Text fontSize="xs" pl="8px">
                high today
              </Text>
            </Flex>
          </Box>
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
        </HStack>
        <HStack
          w={{ base: '350px', md: '320px', xl: '250px' }}
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
                {`$ ${mcap}`}
              </Text>
            )}
            <Flex align="center" mt={1}>
              <Flex
                alignItems="center"
                gap={1}
                px={1}
                bg={'#E7F6EC'}
                rounded="xl"
                color="green.500"
                _dark={{ color: 'green.700' }}
              >
                <Icon as={RiArrowUpLine} boxSize={3} />
                <Text fontSize="xs">5.00%</Text>
              </Flex>
              <Text fontSize="xs" pl="8px">
                high today
              </Text>
            </Flex>
          </Box>
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
        </HStack>
        <Box
          w={{ base: '350px', md: '320px', xl: '250px' }}
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
          w={{ base: '350px', md: '320px', xl: '380px' }}
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          px={2}
          fontSize="xs"
          className="iq-historical-graph"
          _dark={{ bg: 'gray.700', borderColor: 'rgba(255, 255, 255, 0.24)' }}
        >
          IQ Price Graph
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
