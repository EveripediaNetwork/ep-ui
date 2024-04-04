import {
  Box,
  Flex,
  Link,
  Icon,
  Text,
  HStack,
  Spinner,
  Button,
  IconButton,
} from '@chakra-ui/react'
import OneinchIcon from '../Icons/oneInch'
import BinanceIcon from '../Icons/binance'
import UpbitIcon from '../Icons/upbit'
import FraxIcon from '../Icons/frax'
import { RiArrowDownLine, RiArrowUpLine, RiGlobalLine } from 'react-icons/ri'
import { logEvent } from '@/utils/googleAnalytics'
import { Logo } from '../Elements'
import IQGraph from './IQGraph'
import { useGetCgTokenDataQuery } from '@/services/cgTokenDetails'
import { useGetCmcTokenDataQuery } from '@/services/cmcTokenDetails'
import * as Humanize from 'humanize-plus'

export const IQBar = () => {
  const { data: iqData, isLoading, isError } = useGetCgTokenDataQuery()
  const {
    data: cmcData,
    isLoading: cmcLoading,
    isError: cmcError,
  } = useGetCmcTokenDataQuery('IQ')
  const price = Humanize.formatNumber(cmcData?.IQ?.quote.USD.price ?? 0, 4)
  const mcap = Humanize.compactInteger(
    cmcData?.IQ?.quote?.USD?.market_cap ?? 0,
    2,
  )
  const areaGraphData = iqData?.prices
  const iqChange = cmcData?.IQ?.quote?.USD?.percent_change_24h

  return (
    <Flex
      position="relative"
      top={{ base: '-140px', md: '-80px', xl: '-60px' }}
      px={-2}
      bg="white"
      textColor="gray.600"
      maxW={{ base: 'min(90vw, 400px)', md: '670px', xl: '1210px' }}
      minW={{ base: 'min(90vw, 400px)', md: '650px', xl: '1210px' }}
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
          minW={{ base: 'min(80vw, 360px)', md: '280px', xl: '255px' }}
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
            {cmcLoading ? (
              <Spinner size="sm" />
            ) : cmcError ? (
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
                color={iqChange && iqChange <= 0 ? 'red.500' : 'green.600'}
              >
                <Icon
                  as={
                    iqChange && iqChange > 0 ? RiArrowUpLine : RiArrowDownLine
                  }
                  boxSize={3}
                />
                <Text fontSize="xs">
                  {Humanize.formatNumber(iqChange ?? 0, 2)}%
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
            <Button
              variant="outline"
              aria-label="IQ"
              border="1px"
              borderColor="gray.200"
              rounded="full"
              p={1}
              _dark={{ borderColor: 'rgba(255, 255, 255, 0.24)' }}
            >
              <Logo boxSize="2em" />
            </Button>
          </Link>
        </HStack>
        <HStack
          minW={{ base: 'min(80vw, 360px)', md: '320px', xl: '255px' }}
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
                color={iqChange && iqChange <= 0 ? 'red.500' : 'green.600'}
              >
                <Icon
                  as={
                    iqChange && iqChange > 0 ? RiArrowUpLine : RiArrowDownLine
                  }
                  boxSize={3}
                />
                <Text fontSize="xs">
                  {Humanize.formatNumber(iqChange ?? 0, 2)}%
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
            <Button
              variant="outline"
              rounded="full"
              border="1px"
              p="1"
              borderColor="gray.200"
              _dark={{ borderColor: 'rgba(255, 255, 255, 0.24)' }}
            >
              <RiGlobalLine size="2em" color="#FF5CAA" />
            </Button>
          </Link>
        </HStack>
        <Box
          minW={{ base: 'min(80vw, 360px)', md: '280px', xl: '255px' }}
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          display="flex"
          flexDirection="column"
          p={3}
          fontSize="sm"
          className="iq-get-iq"
          _dark={{ bg: 'gray.700', borderColor: 'rgba(255, 255, 255, 0.24)' }}
        >
          <Text fontSize="xs">Exchanges</Text>
          <Flex alignItems="center" justifyContent="center" mt={2}>
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
              <IconButton
                variant="outline"
                fontSize="xx-large"
                isRound
                border="none"
                icon={<BinanceIcon />}
                aria-label="binance"
              />
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
              <IconButton
                variant="outline"
                fontSize="xx-large"
                isRound
                border="none"
                icon={<OneinchIcon />}
                aria-label="One Inch"
              />
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
              <IconButton
                variant="outline"
                fontSize="xx-large"
                isRound
                border="none"
                icon={<UpbitIcon />}
                aria-label="Upbit"
              />
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
              <IconButton
                variant="outline"
                fontSize="xx-large"
                isRound
                border="none"
                icon={<FraxIcon />}
                aria-label="Frax"
              />
            </Link>
          </Flex>
        </Box>
        <Box
          minW={{ base: 'min(80vw, 360px)', md: '320px', xl: '390px' }}
          maxW={{ base: 'min(80vw, 360px)', md: '298px', xl: '390px' }}
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
            <Text fontSize="xs"> IQ Historical Graph (1 Month)</Text>
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
