import { Box, Flex, Link, Icon, Text, HStack } from '@chakra-ui/react'
// import { useTranslation } from 'next-i18next'
// import Logo from '@/components/Elements/Logo/Logo'
import OneinchIcon from '../Icons/oneInch'
import BinanceIcon from '../Icons/binance'
import UpbitIcon from '../Icons/upbit'
import FraxIcon from '../Icons/frax'
import { RiArrowUpLine, RiGlobalLine } from 'react-icons/ri'
import { logEvent } from '@/utils/googleAnalytics'
import { Logo } from '../Elements'
import IQGraph from './IQGraph'

export const IQBar = () => {
  //   const { t } = useTranslation('home')
  return (
    //TODO: fix on breakpoints, reduce min width, dark mode, API data
    <Flex
      position="relative"
      // top={{ base: '-20px', md: '-30px', lg: '-60px' }}
      top="-60px"
      px={{ base: 3, md: 8, lg: 12 }}
      bg="white"
      textColor="gray.600"
      w={{ base: '403px', md: '688px', xl: '1300px' }}
      mx="auto"
      rounded="xl"
      _dark={{ bg: 'gray.700', textColor: 'rgba(255, 255, 255, 0.92)' }}
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
        <HStack
          w="267px"
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
            <Text fontSize="xl" fontWeight="semibold">
              $0.018
            </Text>
            <Flex align="center" mt={1}>
              <Flex
                alignItems="center"
                gap={1}
                bg={'#E7F6EC'}
                rounded="xl"
                px={1}
              >
                <Icon as={RiArrowUpLine} color="green.500" boxSize={3} />
                <Text fontSize="xs" color="green.500">
                  49.00%
                </Text>
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
          >
            <Logo boxSize="2em" />
          </Box>
        </HStack>
        <HStack
          w="267px"
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
            <Text fontSize="xs">Market Cap ($)</Text>
            <Text fontSize="xl" fontWeight="semibold">
              $136M
            </Text>
            <Flex align="center" mt={1}>
              <Flex alignItems="center" gap={1} bg={'#E7F6EC'} rounded="xl">
                <Icon as={RiArrowUpLine} color="green.500" boxSize={3} />
                <Text fontSize="xs" color="green.500">
                  5.00%
                </Text>
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
          >
            <RiGlobalLine size="2em" color="#FF5CAA" />
          </Box>
        </HStack>
        <Box
          w="267px"
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          p={3}
          fontSize="sm"
          className="iq-get-iq"
          _dark={{ bg: 'gray.700', borderColor: 'rgba(255, 255, 255, 0.24)' }}
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
          w={{ base: '267px', xl: '420px' }}
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          p={3}
          fontSize="sm"
          textColor="gray.600"
          className="iq-historical-graph"
          _dark={{ bg: 'gray.700', borderColor: 'rgba(255, 255, 255, 0.24)' }}
        >
          Historical IQ Graph
          <IQGraph
            graphTitle="IQ"
            areaGraphData={[
              {
                name: 1708347710865,
                amt: 0.006042533085318898,
              },
              {
                name: 1708351213359,
                amt: 0.006011993878900912,
              },
              {
                name: 1708354846063,
                amt: 0.00596461168707254,
              },
              {
                name: 1708358433383,
                amt: 0.006055872284474791,
              },
              {
                name: 1708362014292,
                amt: 0.005998388390335815,
              },
              {
                name: 1708365719675,
                amt: 0.005982415598860242,
              },
              {
                name: 1708369310151,
                amt: 0.005971668222294596,
              },
              {
                name: 1708372848041,
                amt: 0.00597048297617517,
              },
              {
                name: 1708376476096,
                amt: 0.0060258487506489695,
              },
              {
                name: 1708380072072,
                amt: 0.006009071894657905,
              },
              {
                name: 1708383641691,
                amt: 0.006097674445937468,
              },
              {
                name: 1708387209973,
                amt: 0.005995623594235086,
              },
              {
                name: 1708390929408,
                amt: 0.005865675616556039,
              },
              {
                name: 1708394541669,
                amt: 0.005849955555519478,
              },
              {
                name: 1708398131686,
                amt: 0.005922842408959035,
              },
              {
                name: 1708401634007,
                amt: 0.005817478512961185,
              },
              {
                name: 1708405284526,
                amt: 0.005830123514520738,
              },
              {
                name: 1708408829823,
                amt: 0.005860442667661533,
              },
              {
                name: 1708412453863,
                amt: 0.005885602588950025,
              },
              {
                name: 1708416051166,
                amt: 0.005854265526642774,
              },
              {
                name: 1708419661288,
                amt: 0.00582399235979356,
              },
              {
                name: 1708423313817,
                amt: 0.005778177614053079,
              },
            ]}
          />
        </Box>
      </Flex>
    </Flex>
  )
}
