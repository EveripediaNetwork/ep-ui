import React, { useState } from 'react'
import {
  Flex,
  VStack,
  Heading,
  Box,
  Text,
  Select,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  CartesianGrid,
} from 'recharts'
import { MdArrowDropDown } from 'react-icons/md'
import {
  useGetWikisCreatedCountQuery,
  useGetWikisEditedCountQuery,
} from '@/services/admin'

export const WikiDataGraph = () => {
  const piedata = [
    { name: 'Editors', value: 400 },
    { name: 'Visitors', value: 300 },
  ]
  const colors = ['rosePink', 'brand.200']

  const [graphFilter, setGraphFilter] = useState<string>('day')

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

  const graphDataObj: Array<{
    name: string | undefined
    'Wikis Created': number | undefined
    'Wikis Edited': number
  }> = []

  if (graphFilter === 'day') {
    DayTunedgraphWikisEditedCountData?.map((item, index) => {
      const editedCount = DayTunedgraphWikisEditedCountData[index].amount
      const createdCount =
        DayTunedgraphWikisCreatedCountData &&
        DayTunedgraphWikisCreatedCountData[index]?.amount
      const createCountStart =
        DayTunedgraphWikisCreatedCountData &&
        DayTunedgraphWikisCreatedCountData[index]?.startOn

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
    GraphWikisEditedCountData?.map((item, index) => {
      const editedCount = GraphWikisEditedCountData[index].amount
      const createdCount =
        GraphWikisCreatedCountData && GraphWikisCreatedCountData[index]?.amount
      const createCountStart =
        GraphWikisCreatedCountData && GraphWikisCreatedCountData[index]?.startOn
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
  const editedStroke = useColorModeValue('brand.400', 'brand.200')
  const editedFill = useColorModeValue('#FFF5F9', '#FFF5FA')
  const createdStroke = useColorModeValue('brand.500', 'brand.800')
  const createdFill = useColorModeValue('#FFB8DA', '#FFB8DA')
  const toolTipBg = useColorModeValue('white', 'tetiaryDark')
  const handleGraphFilterChange = (e: string) => {
    return setGraphFilter(e)
  }

  return (
    <Flex gap={4} py="4" w="100%" flexDir={{ base: 'column', lg: 'row' }}>
      <Box rounded="xl" borderWidth="1px" p={4} w={{ lg: '68%', base: '100%' }}>
        <Flex justifyContent="space-between" pt="2" pb="10">
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
        <Box p={5}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart width={730} height={250} data={graphDataObj}>
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
      <Box rounded="xl" borderWidth="1px" p={6} w={{ lg: '31%', base: '100%' }}>
        <Heading as="h2" fontSize="21" fontWeight="bold" w="full">
          User Data
        </Heading>
        <Flex alignItems="center" justifyContent="center" w="full">
          <PieChart width={350} height={400}>
            <Pie
              data={piedata}
              cx={170}
              cy={200}
              innerRadius={50}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
            >
              {graphDataObj.map((ent, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Legend
              payload={piedata.map((item, index) => ({
                id: item.name,
                type: 'circle',
                value: item.name,
                color: colors[index % colors.length],
              }))}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </Flex>
      </Box>
    </Flex>
  )
}
