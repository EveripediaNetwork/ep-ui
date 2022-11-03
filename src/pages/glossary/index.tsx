import {
  Heading,
  Stack,
  Input,
  Text,
  Box,
  Flex,
  chakra,
  VStack,
  HStack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import {
  glossaryAlphabetsData,
  commonSearchedWikis,
} from '@/data/GlossaryAlphabetsData'
import { Search2Icon } from '@chakra-ui/icons'
import GlossaryItem from '@/components/Glossary/GlossaryItems'

const Glossary: NextPage = () => {
  const BrainDaoLogo = dynamic(
    () => import('@/components/Elements/Logo/Braindao-logo'),
  )
  return (
    <Stack direction="column" w="full" pt={{ base: 6, lg: 20 }}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="space-between"
        w={{ base: 'full', lg: '90vw', xl: 'min(90%, 1150px)' }}
        mx={{ base: 5, lg: 10 }}
        px={{ base: 3, lg: 10 }}
        mt={{ base: 4, lg: 0 }}
      >
        <VStack
          alignItems={{ base: 'center', lg: 'start' }}
          textAlign={{ base: 'center', lg: 'start' }}
          spacing={4}
          mb={10}
          mt={5}
        >
          <Heading
            w={{ base: '90%', md: '100%' }}
            fontSize={{ base: '35', sm: '42', lg: '54' }}
          >
            <chakra.span color="brandLinkColor"> IQ.WIKI</chakra.span> Glossary
          </Heading>
          <Text
            w={{ base: '70%', md: '75%', xl: '80%' }}
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            pb={10}
          >
            Crypto terminology can be difficult to figure out, especially if
            you're new to the blockchain. Here's a guide to help you navigate
            the exciting frontier of Web3.
          </Text>
        </VStack>
        <BrainDaoLogo
          mx={{ base: 'auto', lg: '5' }}
          h={{ base: '72px', lg: '9rem', xl: '14.688rem' }}
          w={{ base: '72px', lg: '11rem', xl: '17.875rem' }}
        />
      </Flex>
      <VStack
        w="full"
        alignItems="center"
        borderTop="1px"
        mx="auto"
        borderTopColor="GrayText"
      >
        <Flex
          direction="column"
          mx="auto"
          w="full"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack py="7" w="fit-content" justifyContent="center">
            {glossaryAlphabetsData.map(item => (
              <Text
                px="3"
                fontWeight="semibold"
                fontSize={{ base: 'md', lg: 'md' }}
              >
                {item}
              </Text>
            ))}
          </HStack>
          <Box w="full" px={{ base: '9', lg: '24' }} py="3">
            <InputGroup
              size="lg"
              w="full"
              display={{ base: 'none', md: 'block' }}
            >
              <InputLeftElement
                ml={{ base: '15px', xl: 'unset' }}
                pointerEvents="none"
                h="full"
              >
                <Search2Icon color="gray.300" />
              </InputLeftElement>
              <Input type="tel" placeholder="search for words" />
            </InputGroup>
          </Box>
          <HStack py="3" w="fit-content">
            {commonSearchedWikis.map((item, i) => (
              <Box
                key={i}
                px="3"
                py="1"
                cursor="pointer"
                rounded="lg"
                border="1px"
                borderColor="GrayText"
                fontWeight="semibold"
                fontSize={{ base: 'md', lg: 'md' }}
              >
                {item}
              </Box>
            ))}
          </HStack>
        </Flex>
      </VStack>
      <GlossaryItem glossaryAlphabets={glossaryAlphabetsData} />
    </Stack>
  )
}
export default Glossary
