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
        // minH="180px"
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
            <Text fontSize="xl" fontWeight="semibold">
              $136M
            </Text>
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
          w={{ base: '350px', xl: '380px' }}
          h="100px"
          border={'1px'}
          borderColor="gray.200"
          rounded="xl"
          px={2}
          fontSize="xs"
          className="iq-historical-graph"
          _dark={{ bg: 'gray.700', borderColor: 'rgba(255, 255, 255, 0.24)' }}
        >
          Historical IQ Graph
          <IQGraph
            areaGraphData={[
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
              {
                name: 1708426852451,
                amt: 0.005894301703647478,
              },
              {
                name: 1708430422186,
                amt: 0.005986576236579341,
              },
              {
                name: 1708434063325,
                amt: 0.005931728645111808,
              },
              {
                name: 1708437681738,
                amt: 0.00597107113110736,
              },
              {
                name: 1708441227929,
                amt: 0.005837421673296834,
              },
              {
                name: 1708444906020,
                amt: 0.005712148015770204,
              },
              {
                name: 1708448479800,
                amt: 0.005717041837758028,
              },
              {
                name: 1708452076248,
                amt: 0.005720764749279575,
              },
              {
                name: 1708455627274,
                amt: 0.0057505088057461665,
              },
              {
                name: 1708459310273,
                amt: 0.005826384164866935,
              },
              {
                name: 1708462802463,
                amt: 0.005835176803634217,
              },
              {
                name: 1708466514648,
                amt: 0.005858628790139214,
              },
              {
                name: 1708470123710,
                amt: 0.005906213829531254,
              },
              {
                name: 1708473661623,
                amt: 0.005953526205645309,
              },
              {
                name: 1708477314746,
                amt: 0.005840995608885002,
              },
              {
                name: 1708480805432,
                amt: 0.005864397617915674,
              },
              {
                name: 1708484451342,
                amt: 0.005868012449686662,
              },
              {
                name: 1708488104518,
                amt: 0.005888299991437924,
              },
              {
                name: 1708491663004,
                amt: 0.006071671204648999,
              },
              {
                name: 1708495315596,
                amt: 0.006068203411267908,
              },
              {
                name: 1708498845389,
                amt: 0.006003352561735225,
              },
              {
                name: 1708502512628,
                amt: 0.005937649758021083,
              },
              {
                name: 1708506095650,
                amt: 0.005953799608542498,
              },
              {
                name: 1708509671908,
                amt: 0.0057260808626430825,
              },
              {
                name: 1708513239365,
                amt: 0.00575653145431001,
              },
            ]}
          />
        </Box>
      </Flex>
    </Flex>
  )
}
