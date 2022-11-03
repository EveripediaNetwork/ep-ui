import {
  Heading,
  Stack,
  Input,
  Text,
  Box,
  Flex,
  chakra,
  VStack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'
import {
  glossaryAlphabetsData,
  commonSearchedWikis,
} from '@/data/GlossaryAlphabetsData'
import { Search2Icon } from '@chakra-ui/icons'
import GlossaryItem from '@/components/Glossary/GlossaryItems'

const Glossary: NextPage = () => {
  return (
    <Stack direction="column" w="full" pt="3">
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="space-between"
        w="full"
        px={{ base: 3, lg: 10 }}
        mt={{ base: 4, lg: 0 }}
      >
        <VStack
          w="full"
          alignItems="center"
          textAlign="center"
          spacing={4}
          mb={10}
          mt={5}
        >
          <Heading w="full" fontSize={{ base: '35', sm: '42', lg: '54' }}>
            <chakra.span color="brandLinkColor"> IQ.WIKI</chakra.span> Glossary
          </Heading>
          <Text
            w={{ base: '70%', md: '60%', xl: '50%' }}
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            pb={4}
          >
            Crypto terminology can be difficult to figure out, especially if
            you&lsquo;re new to the blockchain. Here&lsquo;s a guide to help you
            navigate the exciting frontier of Web3.
          </Text>
        </VStack>
      </Flex>
      <VStack
        w="full"
        alignItems="center"
        borderTop="1px"
        mx="auto"
        borderTopColor="GrayText"
      >
        <Box mx="auto" w="full" justifyContent="center" alignItems="center">
          <Flex
            py="7"
            w="full"
            justifyContent="center"
            alignItems="center"
            wrap="wrap"
          >
            {glossaryAlphabetsData.map(item => (
              <Text
                px="3"
                fontWeight="semibold"
                fontSize={{ base: 'md', lg: 'md' }}
              >
                {item}
              </Text>
            ))}
          </Flex>
          <Box w="full" px={{ base: '9', lg: '24' }} py="3">
            <InputGroup size="lg" w="full">
              <InputLeftElement
                ml={{ base: '15px', xl: 'unset' }}
                pointerEvents="none"
                h="full"
              >
                <Search2Icon
                  color="gray.300"
                  fontSize={{ base: 'sm', lg: 'auto' }}
                  ml={{ base: '-8', md: '0' }}
                />
              </InputLeftElement>
              <Input type="tel" placeholder="search for words" />
            </InputGroup>
          </Box>
          <Flex
            py="3"
            w="full"
            wrap="wrap"
            alignItems="center"
            justifyContent="center"
            gap="3"
          >
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
          </Flex>
        </Box>
      </VStack>
      <GlossaryItem glossaryAlphabets={glossaryAlphabetsData} />
    </Stack>
  )
}
export default Glossary
