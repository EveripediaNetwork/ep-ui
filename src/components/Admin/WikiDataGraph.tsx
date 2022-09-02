import React from 'react'
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

export const WikiDataGraph = ({
  piedata,
  data,
  colors,
  handleGraphFilterChange,
}: {
  piedata: Array<{ name: string | undefined; value: number | undefined }>
  data: Array<{
    name: string | undefined
    'Wikis Created': number | undefined
    'Wikis Edited': number | undefined
  }>
  colors: Array<string>
  handleGraphFilterChange: any
}) => {
  const currentYear = new Date().getFullYear()
  const editedStroke = useColorModeValue('#FF80BD', '#FFB3D7')
  const editedFill = useColorModeValue('#FFF5F9', '#FFF5FA')
  const createdStroke = useColorModeValue('#FF5CAA', '#FF1A88')
  const createdFill = useColorModeValue('#FFB8DA', '#FFB8DA')

  return (
    <Flex gap={4} py="4" w="100%" flexDir={{ base: 'column', lg: 'row' }}>
      <Box rounded="xl" borderWidth="1px" p={4} w={{ lg: '68%', base: '100%' }}>
        <Flex justifyContent="space-between" pt="2" pb="10">
          <VStack spacing={2} w="full">
            <Heading as="h2" fontSize="21" fontWeight="bold" w="full">
              Wiki Data
            </Heading>
            <Text fontSize="sm" fontWeight="light" w="full">
              Track wikis created and wikis edited
            </Text>
          </VStack>
          <Select
            w="30%"
            icon={<MdArrowDropDown />}
            onChange={e => {
              handleGraphFilterChange(e.target.value)
            }}
          >
            <option value="week">{`Weekly (${currentYear})`}</option>
            <option value="month">{`Monthly (${currentYear})`}</option>
            <option value="year">{`Yearly (${currentYear})`}</option>
          </Select>
        </Flex>
        <Box p={5}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart width={730} height={250} data={data}>
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
              <Tooltip />
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
              {data.map((entry: any, index: any) => (
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
