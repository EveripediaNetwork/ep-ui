import { MarketCap } from '@/data/MarketCapData'
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { IconType } from 'react-icons/lib'

interface RankCardProps {
  title: string
  icon: IconType
}
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
        {MarketCap.map((item, index) => {
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
