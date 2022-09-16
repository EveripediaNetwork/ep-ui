import React from 'react'
import {
  VStack,
  Icon,
  Text,
  Box,
  Flex,
  Heading,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react'
import { useCheckIsAdminQuery } from '@/services/admin'

interface WikidetailsProps {
  detailHeader: string
  icon: any
  currentValue: number
  weeklyValue: string
  color: string
}

export const WikiDetailsCards = ({
  detailHeader,
  icon,
  currentValue,
  weeklyValue,
  color,
}: WikidetailsProps) => {
  const { data: checkIsAdmin } = useCheckIsAdminQuery(undefined)
  console.log(checkIsAdmin)
  return (
    <Box
      w={{ lg: '90%', base: '100%' }}
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
            <Text fontSize="xs" color="#718096">
              {weeklyValue} this week
            </Text>
          </VStack>
          <CircularProgress
            value={Math.round((parseInt(weeklyValue, 10) / currentValue) * 100)}
            color={color}
            size="45px"
          >
            <CircularProgressLabel fontSize="xs">
              {Math.round((parseInt(weeklyValue, 10) / currentValue) * 100)}%
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
      </VStack>
    </Box>
  )
}
