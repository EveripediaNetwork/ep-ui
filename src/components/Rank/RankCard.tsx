import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { IconType } from 'react-icons/lib'

interface RankCardProps {
  title: string
  icon: IconType
}
const dummyData = [
  {
    name: 'Bored Ape Yatch Club',
    alias: 'Bape',
    capital: '87,932,562',
    marketCap: '82,932,562',
  },
  {
    name: 'Axie',
    alias: 'Axs',
    capital: '22,032,322',
    marketCap: '62,032,322',
  },
  {
    name: 'Pudgy',
    alias: 'PPG',
    capital: '322,321',
    marketCap: '124,321',
  },
  {
    name: 'Hashmasks',
    alias: 'HM',
    capital: '322,422,435',
    marketCap: '432,434,676',
  },
  {
    name: 'Ragnar',
    alias: 'RG',
    capital: '322,422,435',
    marketCap: '432,434,676',
  },
  {
    name: 'Hashmasks',
    alias: 'HM',
    capital: '322,422,435',
    marketCap: '432,434,676',
  },
  {
    name: 'Desperate Ape',
    alias: 'DAW',
    capital: '321,539,234',
    marketCap: '221,839,434',
  },
  {
    name: 'Punks Comics',
    alias: 'PC',
    capital: '1,432,532',
    marketCap: '2,432,532',
  },
  {
    name: 'Yaka Maza',
    alias: 'YM',
    capital: '434,234',
    marketCap: '234,234',
  },
  {
    name: 'CryptoGoonz',
    alias: 'CG',
    capital: '223,432,422',
    marketCap: '123,432,422',
  },
]
const RankCard = ({ title, icon }: RankCardProps) => {
  const downIndicationIconColor = useColorModeValue('#E53E3E', '#FC8181')
  const upIndicationIconColor = useColorModeValue('#25855A', '#68D391')

  return (
    <Flex
      w={{ lg: '32%' }}
      border="1px solid"
      borderColor="rankCardBorder"
      p={4}
      borderRadius="lg"
      flexDirection="column"
    >
      <Flex gap="1" mb="4">
        <Icon as={icon} w="24px" h="24px" color="primaryPinkIcon" />
        <Text>{title}</Text>
      </Flex>
      <Flex gap={12} flexDir="column">
        {dummyData.map((item, index) => {
          return (
            <Flex gap={4} alignItems="center">
              <Text fontSize="lg">{index + 1}</Text>
              <Flex gap={2} w="100%">
                <Box
                  w="60px"
                  h="auto"
                  bg="url(https://cryptopotato.com/wp-content/uploads/2022/01/img1_bayc.jpg)"
                  bgPos="center"
                  bgSize="cover"
                  borderRadius="md"
                />
                <Flex w="100%">
                  <Flex flexDir="column" w="70%">
                    <Text color="primaryPinkIcon">{item.name}</Text>
                    <Text color="inactiveText" fontSize="md">
                      {item.alias}
                    </Text>
                  </Flex>
                  <Flex
                    flexDir="column"
                    gap={2}
                    w="30%"
                    alignItems="flex-start"
                  >
                    <Text fontSize="sm">${item.capital}</Text>
                    <Flex alignItems="center" gap={2}>
                      {Math.floor(Math.random() * 10) % 2 === 1 ? (
                        <AiFillCaretDown color={downIndicationIconColor} />
                      ) : (
                        <AiFillCaretUp color={upIndicationIconColor} />
                      )}
                      <Text color="inactiveText" fontSize="sm">
                        0.89%
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default RankCard
