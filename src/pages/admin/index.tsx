import React from 'react'
import {
  Box,
  Heading,
  Text,
  Stack,
  HStack,
  VStack,
  Icon,
  CircularProgress,
  CircularProgressLabel,
  Flex,
} from '@chakra-ui/react'
import {
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Line,
  LineChart,
  Legend,
} from 'recharts'
import {
  RiNewspaperFill,
  RiEditFill,
  RiUser3Fill,
  RiUserSearchFill,
} from 'react-icons/ri'

interface WikidetailsProps {
  detailHeader: string
  icon: any
  currentValue: string
  weeklyValue: string
  percent: number
  color: string
}


const Wikidetails = ({
    detailHeader,
    icon,
    currentValue,
    weeklyValue,
    percent,
    color,
  }: WikidetailsProps) => {
    return (
      <Box
        w="90%"
        px="5"
        py="4"
        cursor="pointer"
        borderWidth="1px"
        rounded="xl"
        alignItems="center"
        justifyContent="flex-start"
      >
        <VStack cursor="pointer" mx="auto" justifyContent="flex-start" w="full">
          <Icon
            as={icon}
            width="40px"
            height="40px"
            padding={2}
            w="full"
            alignSelf="flex-start"
          />

          <Text w="full" fontSize="15" fontWeight="bold" my={2}>
            {detailHeader}
          </Text>

          <Flex alignItems="center" justifyContent="space-between" w="full">
            <VStack spacing={0}>
              <Heading as="h3" fontSize="25" w="full">
                {currentValue}
              </Heading>
              <Text fontSize="xs">{weeklyValue} this week</Text>
            </VStack>
            <CircularProgress value={percent} color={color} size="45px">
              <CircularProgressLabel fontSize="xs">
                {percent}%
              </CircularProgressLabel>
            </CircularProgress>
          </Flex>
        </VStack>
      </Box>
    )
  }

const Admin = () => {
  const data = [
    {
      name: 'Mon',
      uv: 40,
      pv: 24,
    },
    {
      name: 'Tue',
      uv: 30,
      pv: 13,
    },
    {
      name: 'Wed',
      uv: 20,
      pv: 18,
    },
    {
      name: 'Thur',
      uv: 27,
      pv: 14,
    },
    {
      name: 'Fri',
      uv: 18,
      pv: 48,
    },
    {
      name: 'Sat',
      uv: 23,
      pv: 38,
    },
    {
      name: 'Sun',
      uv: 34,
      pv: 43,
    },
  ]
  const piedata = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
  ]
  const COLORS = ['#FF69B4', '#FFC0CB']

  return (
    <Stack direction="column" justify="center" mx="auto" w="full" px="20">
      <Heading
        as="h4"
        mt="4"
        py="2"
        fontWeight="black"
        w="80%"
        fontSize={{ base: '29', md: '37' }}
        lineHeight="normal"
        letterSpacing="wider"
      >
        Admin Dashboard
      </Heading>

      <Text w="80%" fontSize="sm" fontWeight="light">
        Welcome to the admin dashboard
      </Text>

      <Stack spacing={8} py={7} direction={{ base: 'column', md: 'row' }}>
        <Wikidetails
          detailHeader="Total no of Created Wikis"
          icon={RiNewspaperFill}
          currentValue="500"
          weeklyValue="250"
          percent={40}
          color="pink.400"
        />
        <Wikidetails
          detailHeader="Total no of Edited Wikis"
          icon={RiEditFill}
          currentValue="500"
          weeklyValue="1K"
          percent={40}
          color="pink.400"
        />
        <Wikidetails
          detailHeader="Total no of Editors"
          icon={RiUser3Fill}
          currentValue="500"
          weeklyValue="2K"
          percent={40}
          color="pink.400"
        />
        <Wikidetails
          detailHeader="Total no of Visitors"
          icon={RiUserSearchFill}
          currentValue="500"
          weeklyValue="12K"
          percent={40}
          color="pink.400"
        />
      </Stack>
      <HStack spacing={4} py="4" w="full">
        <Box rounded="xl" borderWidth="1px" p={4} w="65%">
          <Flex justifyContent="space-between" pt="2" pb="10">
            <VStack spacing={2} w="full">
              <Heading as="h2" fontSize="21" fontWeight="bold" w="full">
                Wiki Data
              </Heading>
              <Text fontSize="sm" fontWeight="light" w="full">
                Track wikis created and wikis edited
              </Text>
            </VStack>
            {/* dropdown here */}
          </Flex>
          <Box p={5}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#FF69B4"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#FFC0CB" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Box rounded="xl" borderWidth="1px" p={6} w="35%">
          <Heading as="h2" fontSize="21" fontWeight="bold" w="full">
            User Data
          </Heading>
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
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </Box>
      </HStack>
    </Stack>
  )
}
export default Admin
