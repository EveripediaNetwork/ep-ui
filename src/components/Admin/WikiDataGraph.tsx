import React, { useState } from 'react'
import {
  Flex,
  VStack,
  Heading,
  Box,
  Text,
  Select,
  useColorModeValue,
  HStack,
  Circle,
  useBreakpointValue,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
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
import { MdArrowDropDown } from 'react-icons/md'
import {
  useGetWikiVisitsQuery,
  useGetWikisCreatedCountQuery,
  useGetWikisEditedCountQuery,
} from '@/services/admin'

export const WikiDataGraph = () => {
  const [graphFilter, setGraphFilter] = useState<string>('day')
  const [wikiVisitFilter, setWikiVisitFilter] = useState<string>('WEEK')

  const { data: GraphWikisCreatedCountData } = useGetWikisCreatedCountQuery({
    interval: graphFilter,
    startDate: 0,
  })

  const { data: GraphWikisEditedCountData } = useGetWikisEditedCountQuery({
    interval: graphFilter,
    startDate: 0,
  })

  const { data: DayTunedgraphWikisCreatedCountData } =
    useGetWikisCreatedCountQuery({
      interval: graphFilter,
    })
  const { data: DayTunedgraphWikisEditedCountData } =
    useGetWikisEditedCountQuery({
      interval: graphFilter,
    })

  const { data: wikisPerVisitData } = useGetWikiVisitsQuery({
    amount: 20,
    interval: wikiVisitFilter,
  })

  const graphDataObj: {
    name: string | undefined
    'Wikis Created': number | undefined
    'Wikis Edited': number
  }[] = []

  if (graphFilter === 'day') {
    DayTunedgraphWikisEditedCountData?.map((item, index) => {
      const editedCount = DayTunedgraphWikisEditedCountData[index].amount
      const createdCount = DayTunedgraphWikisCreatedCountData?.[index]?.amount
      const createCountStart =
        DayTunedgraphWikisCreatedCountData?.[index]?.startOn

      graphDataObj.push({
        name:
          // eslint-disable-next-line
          graphFilter !== 'day'
            ? graphFilter === 'year'
              ? createCountStart?.split('-')[0]
              : createCountStart?.split('T')[0].split('-').slice(0, 2).join('-')
            : `${new Date(item.endOn).toDateString().split(' ')[0]} `,
        'Wikis Created': createdCount,
        'Wikis Edited': editedCount,
      })
      return null
    })
  } else {
    GraphWikisEditedCountData?.map((item, index: number) => {
      const editedCount = GraphWikisEditedCountData[index].amount
      const createdCount = GraphWikisCreatedCountData?.[index]?.amount
      const createCountStart = GraphWikisCreatedCountData?.[index]?.startOn
      const getXaxis = () => {
        if (graphFilter === 'week') {
          return `Wk ${index + 1}`
        }
        if (graphFilter === 'year') {
          return createCountStart?.split('-')[0]
        }
        if (graphFilter === 'month') {
          return `${new Date(item.endOn).toDateString().split(' ')[1]} `
        }
        if (graphFilter === 'day') {
          return `${new Date(item.endOn).toDateString().split(' ')[0]}`
        }
        return ''
      }
      graphDataObj.push({
        name: getXaxis(),
        'Wikis Created': createdCount,
        'Wikis Edited': editedCount,
      })
      return null
    })
  }

  const currentYear = new Date().getFullYear()
  const editedStroke = useColorModeValue('#FF80BD', '#FFB3D7')
  const editedFill = useColorModeValue('#FFF5F9', '#FFF5FA')
  const createdStroke = useColorModeValue('#FF5CAA', '#ff1a88')
  const createdFill = useColorModeValue('#FFB8DA', '#FFB8DA')
  const toolTipBg = useColorModeValue('#ffffff', '#1A202C')
  const leftMargin = useBreakpointValue({ base: -30, md: 0 })

  const handleGraphFilterChange = (e: string) => {
    return setGraphFilter(e)
  }

  const handleWikiVisitFilterChange = (e: string) => {
    console.log(e)
    return setWikiVisitFilter(e)
  }

  return (
    <Flex gap={4} py="4" w="100%" flexDir={{ base: 'column', lg: 'row' }}>
      <Box rounded="xl" borderWidth="1px" p={4} w={{ lg: '68%', base: '100%' }}>
        <Flex justifyContent="space-between" pt="2" pb="6">
          <VStack spacing={2} w="full">
            <Heading as="h2" fontSize="21" fontWeight="bold" w="full">
              Wiki Data
            </Heading>
            <Text fontSize="sm" w="full">
              Track wikis created and wikis edited
            </Text>
          </VStack>
          <Select
            w={{ lg: '27%', md: '39%', base: '50%' }}
            icon={<MdArrowDropDown />}
            onChange={e => {
              handleGraphFilterChange(e.target.value)
            }}
          >
            <option value="day">{`Daily (${currentYear})`}</option>
            <option value="week">{`Weekly (${currentYear})`}</option>
            <option value="month">{`Monthly (${currentYear})`}</option>
            <option value="year">{`Yearly (${currentYear})`}</option>
          </Select>
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
              <Circle size="10px" bg={createdStroke} /> wikis created
            </Flex>
            <Flex alignItems="center" gap="2">
              <Circle size="10px" bg={editedStroke} /> wikis edited
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
                  <stop offset="5%" stopColor={createdFill} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={createdFill} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={editedFill} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={editedFill} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" vertical={false} />
              <Area
                type="monotone"
                dataKey="Wikis Edited"
                strokeWidth="2"
                stroke={editedStroke}
                fill="url(#colorUv)"
                opacity="0.8"
                fillOpacity={1}
              />
              <Area
                type="monotone"
                dataKey="Wikis Created"
                strokeWidth="2"
                opacity="1"
                stroke={createdStroke}
                fill="url(#colorUv)"
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
      <Box rounded="xl" borderWidth="1px" w={{ lg: '31%', base: '100%' }}>
        <Flex
          px={3}
          py={1}
          borderBottomWidth="1px"
          w="full"
          justifyContent="space-between"
          alignItems={'center'}
        >
          <Text pl={2} fontSize="18" fontWeight="normal" w="full">
            Wiki visits
          </Text>
          <Select
            w={{ lg: '80%', md: '60%', base: '54%' }}
            icon={<MdArrowDropDown />}
            onChange={e => {
              handleWikiVisitFilterChange(e.target.value)
            }}
          >
            <option value="WEEK">{`Weekly (${currentYear})`}</option>
            <option value="DAY">{`Daily (${currentYear})`}</option>
            <option value="MONTH">{`Monthly (${currentYear})`}</option>
            <option value="NINETY_DAYS">{`Quarterly (${currentYear})`}</option>
            <option value="YEAR">{`Yearly (${currentYear})`}</option>
          </Select>
        </Flex>
        <Box h="430px" overflowY="scroll">
          <TableContainer w="100%">
            <Table size="md">
              <Thead bg="wikiTitleBg">
                <Tr>
                  <Th
                    color="gray.500"
                    _dark={{ color: 'white' }}
                    textTransform="capitalize"
                    fontWeight="semibold"
                    fontSize={14}
                  >
                    Wiki Title
                  </Th>
                  <Th
                    color="gray.500"
                    _dark={{ color: 'white' }}
                    textTransform="capitalize"
                    fontWeight="semibold"
                    fontSize={14}
                  >
                    No of visits
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {wikisPerVisitData?.map((element, i) => (
                  <Tr key={i}>
                    <Td>{element.title}</Td>
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
