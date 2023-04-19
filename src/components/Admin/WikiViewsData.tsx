import React from 'react'
import {
  Flex,
  VStack,
  Heading,
  Box,
  Text,
  useColorModeValue,
  Circle,
  HStack,
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td,
  Th,
  Thead,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  CartesianGrid,
} from 'recharts'
import { useGetWikisViewsCountQuery } from '@/services/admin'

export const WikiViewsData = () => {
  const { data: wikiViews } = useGetWikisViewsCountQuery(0)
  const graphDataObj: {
    name: string | undefined
    'Wiki Views': number
  }[] = []

  wikiViews?.map((_item, index) => {
    const visitCount = wikiViews[wikiViews.length - index - 1].visits

    graphDataObj.push({
      name: `${wikiViews[wikiViews.length - index - 1].day.slice(0, 10)}`,
      'Wiki Views': visitCount,
    })
    return null
  })

  const viewsColor = useColorModeValue('#FF5CAA', '#FF1A88')
  const toolTipBg = useColorModeValue('#ffffff', '#1A202C')
  const leftMargin = useBreakpointValue({ base: -30, md: 0 })

  return (
    <Flex gap={4} py="4" w="100%" flexDir={{ base: 'column', lg: 'row' }}>
      <Box rounded="xl" borderWidth="1px" p={4} w={{ lg: '68%', base: '100%' }}>
        <Flex justifyContent="space-between" pt="2" pb="10">
          <VStack spacing={2} w="full">
            <Heading as="h2" fontSize="21" fontWeight="bold" w="full">
              Wiki Views
            </Heading>
            <Text fontSize="sm" w="full">
              The no of views for wikis on iq wiki
            </Text>
          </VStack>
        </Flex>
        <Box pr={3}>
          <HStack
            w="full"
            pb="3"
            color="gray.500"
            _dark={{ color: 'whiteAlpha.900' }}
            justifyContent="flex-end"
          >
            <Flex alignItems="center" gap="2">
              <Circle size="10px" bg={viewsColor} /> wiki views
            </Flex>
          </HStack>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              margin={{ left: leftMargin }}
              width={730}
              height={250}
              data={graphDataObj}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor={viewsColor} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={viewsColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" vertical={false} />
              <Area
                type="monotone"
                dataKey="Wiki Views"
                strokeWidth="2"
                stroke={viewsColor}
                fill="url(#colorUv)"
                opacity="0.8"
                fillOpacity={1}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: '20px',
                  background: toolTipBg,
                  border: '0px',
                  boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25',
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      <Box
        rounded="xl"
        borderWidth="1px"
        py={3}
        w={{ lg: '31%', base: '100%' }}
      >
        <Text
          pl={5}
          pb={1}
          borderBottomWidth="1px"
          fontSize="18"
          fontWeight="normal"
          w="full"
        >
          Views per day
        </Text>
        <Box h="430px" overflowY="scroll">
          <TableContainer w="100%">
            <Table size="md">
              <Thead bg="wikiTitleBg">
                <Tr>
                  <Th
                    color="black"
                    _dark={{ color: 'white' }}
                    textTransform="capitalize"
                    fontWeight="semibold"
                    fontSize={14}
                  >
                    Date
                  </Th>
                  <Th
                    color="black"
                    _dark={{ color: 'white' }}
                    textTransform="capitalize"
                    fontWeight="semibold"
                    fontSize={14}
                  >
                    Views
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {wikiViews?.map((element, i) => (
                  <Tr key={i}>
                    <Td>{element.day.slice(0, 10)}</Td>
                    <Td>{element.visits}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Flex>
  )
}
