import { Image } from '@/components/Elements/Image/Image'
import { FilterLayout } from '@/components/Profile/FilterLayout'
import { chakra, Divider, Flex, Icon, SimpleGrid, Wrap } from '@chakra-ui/react'
import React from 'react'
import { FaEthereum } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'

const COLLECTION = {
  image:
    'https://lh3.googleusercontent.com/rRFcgtEdcqEs9dPVJBdofZYu7jlyiO9tbN2S1wqTRnpEo9FUzEq0it_n6DLjxLTd_SWjD1chgImLw4tEvyVrpbRuVa_dfMgUU263=w316',
}

export const Collected = () => (
  <FilterLayout>
    <SimpleGrid minChildWidth="320px" w="full" spacing="4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Flex
          key={i}
          shadow="base"
          _hover={{ shadow: 'lg' }}
          direction="column"
          rounded="2xl"
          overflow="hidden"
          _dark={{ bg: '#303339' }}
        >
          <Image src={COLLECTION.image} h="80" />
          <Flex
            direction="column"
            px="3"
            fontSize="xs"
            fontWeight="semibold"
            py="2"
            mb="3"
          >
            <Flex align="center">
              <chakra.span color="gray.500">Flowtys</chakra.span>
              <chakra.span ml="auto" color="gray.500" fontWeight="normal">
                Last
              </chakra.span>
              <FaEthereum />
              <chakra.span>0.039</chakra.span>
            </Flex>
            <chakra.span>kesar.eth</chakra.span>
          </Flex>
          <Divider />
          <Flex px="3" align="center" py="2">
            <FaEthereum />
            <Icon as={RiHeartLine} ml="auto" />
            <chakra.span ml="2">0</chakra.span>
          </Flex>
        </Flex>
      ))}
    </SimpleGrid>
  </FilterLayout>
)
