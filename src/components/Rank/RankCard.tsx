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
      w={{ lg: '32%', md: 'auto', base: '100%' }}
      border="1px solid"
      borderColor="rankCardBorder"
      p={4}
      borderRadius="lg"
      flexDirection="column"
    >
      <Flex gap="1" mb="4" alignItems="center">
        <Icon
          as={icon}
          w={{ lg: '24px', md: '18px' }}
          h={{ lg: '24px', md: '18px' }}
          color="primaryPinkIcon"
        />
        <Text fontSize={{ lg: 'xl', md: 'sm' }}>{title}</Text>
      </Flex>
      <Flex gap={12} flexDir="column">
        {MarketCap.map((item, index) => {
          return (
            <Flex gap={4} alignItems="center">
              <Text fontSize="lg">{index + 1}</Text>
              <Flex gap={2} w="100%" alignItems="center">
                <Box
                  w={{ lg: '60px', md: '40px', base: '40px' }}
                  h={{ lg: '35px', md: '30px', base: '30px' }}
                  bg="url(https://cryptopotato.com/wp-content/uploads/2022/01/img1_bayc.jpg)"
                  bgPos="center"
                  bgSize="cover"
                  borderRadius="md"
                />
                <Flex w="100%">
                  <Flex flexDir="column" w="70%">
                    <Text
                      color="primaryPinkIcon"
                      fontSize={{ md: 'sm', lg: 'md', base: 'sm' }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      color="inactiveText"
                      fontSize={{ md: 'sm', lg: 'md', base: 'sm' }}
                    >
                      {item.alias}
                    </Text>
                  </Flex>
                  <Flex
                    flexDir="column"
                    gap={2}
                    w="30%"
                    alignItems="flex-start"
                  >
                    <Text fontSize={{ lg: 'sm', md: 'xs', base: 'sm' }}>
                      ${item.capital}
                    </Text>
                    <Flex alignItems="center" gap={2}>
                      {Math.floor(Math.random() * 10) % 2 === 1 ? (
                        <AiFillCaretDown color={downIndicationIconColor} />
                      ) : (
                        <AiFillCaretUp color={upIndicationIconColor} />
                      )}
                      <Text
                        color="inactiveText"
                        fontSize={{ lg: 'sm', base: 'xs' }}
                      >
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
