import {
  Flex,
  Heading,
  VStack,
  chakra,
  Text,
  ChakraProps,
} from '@chakra-ui/react'
import React from 'react'

const GlossaryHero = React.forwardRef<HTMLParagraphElement, ChakraProps>(
  (props, ref) => (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      justify="space-between"
      px={{ base: 3, lg: 10 }}
      {...props}
    >
      <VStack
        w="full"
        alignItems="center"
        textAlign="center"
        spacing={3}
        my={14}
      >
        <Heading w="full" fontSize={{ base: '32', md: '42', lg: '4xl' }}>
          <chakra.span color="brandLinkColor"> IQ.WIKI</chakra.span> Glossary
        </Heading>
        <Text
          w={{ base: '90%', md: '80%', xl: '90%' }}
          fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }}
          ref={ref}
        >
          Crypto terminology can be difficult to figure out, especially if
          you&lsquo;re new to the blockchain. <br />
          Here&lsquo;s a guide to help you navigate the exciting frontier of
          Web3.
        </Text>
      </VStack>
    </Flex>
  ),
)

export default GlossaryHero
