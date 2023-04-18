import React, { useState } from 'react'
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
import { useGetWikisEditedCountQuery } from '@/services/admin'

export const WikiViewsData = () => {
  const [graphFilter] = useState<string>('day')

  const { data: DayTunedgraphWikisEditedCountData } =
    useGetWikisEditedCountQuery({
      interval: graphFilter,
    })

  const graphDataObj: {
    name: string | undefined
    'Wikis Edited': number
  }[] = []

  DayTunedgraphWikisEditedCountData?.map((item, index) => {
    const editedCount = DayTunedgraphWikisEditedCountData[index].amount

    graphDataObj.push({
      name: `${new Date(item.endOn)
        .toISOString()
        .split('T')[0]
        .split('-')
        .slice(0, 4)
        .join('-')}`,
      'Wikis Edited': editedCount,
    })
    return null
  })

  const viewsColor = useColorModeValue('#FF5CAA', '#FF1A88')
  const toolTipBg = useColorModeValue('#ffffff', '#1A202C')

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
              <Circle size="10px" bg={viewsColor} /> wikis views
            </Flex>
          </HStack>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart width={730} height={250} data={graphDataObj}>
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
                dataKey="Wikis Edited"
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
                <Tr>
                  <Td>01-02-2023</Td>
                  <Td>123,345,345</Td>
                </Tr>
                <Tr>
                  <Td>01-02-2023</Td>
                  <Td>123,345,345</Td>
                </Tr>
                <Tr>
                  <Td>01-02-2023</Td>
                  <Td>123,345,345</Td>
                </Tr>
                <Tr>
                  <Td>01-02-2023</Td>
                  <Td>123,345,345</Td>
                </Tr>
                <Tr>
                  <Td>01-02-2023</Td>
                  <Td>123,345,345</Td>
                </Tr>
                <Tr>
                  <Td>01-02-2023</Td>
                  <Td>123,345,345</Td>
                </Tr>
                <Tr>
                  <Td>01-02-2023</Td>
                  <Td>123,345,345</Td>
                </Tr>
                <Tr>
                  <Td>01-02-2023</Td>
                  <Td>123,345,345</Td>
                </Tr>
                <Tr>
                  <Td>01-02-2023</Td>
                  <Td>123,566,345,345</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Flex>
  )
}
