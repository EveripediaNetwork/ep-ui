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
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
  Label,
  PieChart,
  Pie,
  Cell,
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
  const labelColor = useColorModeValue('#718096', '#6c7079')
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
            <LineChart width={500} data={data}>
              <Legend iconType="circle" verticalAlign="top" align="right" />
              <XAxis
                padding={{ left: 30 }}
                axisLine={false}
                tickLine={false}
                minTickGap={20}
                tickMargin={60}
                dataKey="name"
                dy={-45}
              >
                <Label position="insideBottom" style={{ fill: labelColor }} />
              </XAxis>
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                dx={40}
                dy={-20}
              >
                <Label
                  angle={270}
                  position="center"
                  style={{ fill: labelColor }}
                  value="No. of wikis"
                />
              </YAxis>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Wikis Created"
                stroke="#FF5CAA"
                activeDot={{ r: 8 }}
                strokeWidth={2.2}
              />
              <Line
                type="monotone"
                dataKey="Wikis Edited"
                stroke="#FFb3d7"
                strokeWidth={2.2}
              />
            </LineChart>
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
