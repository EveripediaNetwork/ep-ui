import { Box, useColorMode, Flex, Link, Icon, Text } from '@chakra-ui/react'
// import { useTranslation } from 'next-i18next'
// import Logo from '@/components/Elements/Logo/Logo'
import OneinchIcon from '../Icons/oneInch'
import BinanceIcon from '../Icons/binance'
import UpbitIcon from '../Icons/upbit'
import FraxIcon from '../Icons/frax'

import { logEvent } from '@/utils/googleAnalytics'

export const IQBar = () => {
  //   const { t } = useTranslation('home')
  const { colorMode } = useColorMode()

  return (
    <Box
      position="relative"
      top={{ base: '-20px', md: '-30px', lg: '-60px' }}
      px={{ base: 3, md: 8, lg: 12 }}
      //   pb={{ base: 16, md: 20, lg: 24 }}
      //   pt={0}
      bg={colorMode === 'light' ? 'white' : 'brandDarkBackground'}
      w={{ base: '403px', md: 'fit-content', lg: '1296px' }}
      mx="auto"
      rounded="2xl"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        mx="auto"
        flexWrap="wrap"
        gap={4}
        py={4}
        // minH="180px"
      >
        <Box
          w="267px"
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          p={3}
          fontSize="sm"
          textColor="gray.600"
        >
          IQ Price
        </Box>
        <Box
          w="267px"
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          p={3}
          fontSize="sm"
          textColor="gray.600"
        >
          Market Cap
        </Box>
        <Box
          w="267px"
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          p={3}
          fontSize="sm"
          textColor="gray.600"
        >
          <Text>Get IQ</Text>
          <Flex align="center" mt={2} gap={2}>
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
              <Icon boxSize="8" as={BinanceIcon} aria-label="binance" />
            </Link>
            <Box
              borderLeft="1px solid"
              borderColor="gray.200"
              height="24px"
              mx={2}
            />
            <Link
              href="https://app.1inch.io/#/1/simple/swap/USDT/IQ"
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
              <Icon boxSize="8" as={OneinchIcon} aria-label="binance" />
            </Link>
            <Box
              borderLeft="1px solid"
              borderColor="gray.200"
              height="24px"
              mx={2}
            />
            <Link
              isExternal
              href="https://upbit.com/exchange?code=CRIX.UPBIT.KRW-IQ"
              onClick={() =>
                logEvent({
                  category: 'Home',
                  action: 'Click',
                  label: 'Binance',
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
          w="267px"
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          p={3}
          fontSize="sm"
          textColor="gray.600"
        >
          Historical IQ Graph
        </Box>
      </Flex>
    </Box>
  )
}
