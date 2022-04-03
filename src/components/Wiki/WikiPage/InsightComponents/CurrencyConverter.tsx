import React from 'react'
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { RiArrowLeftRightLine } from 'react-icons/ri'

const CurrencyBox = ({ currency }: { currency: string }) => {
  return (
    <HStack justify="space-between" align="center" flex="1">
      <HStack align="center">
        <Avatar h="18px" w="18px" />
        <Text fontSize="14px">{currency}</Text>
      </HStack>
      <Input placeholder="0" textAlign="right" variant="unstyled" w="50%" />
    </HStack>
  )
}

const CurrencyConverter = () => {
  return (
    <VStack w="100%" p={4} spacing={4} borderWidth="1px" borderRadius={2}>
      <Box w="100%" bgColor="wikiCardBg" p={3} borderRadius={4}>
        <Text
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          fontSize="14px"
          color="linkColor"
        >
          Converter
        </Text>
        <Box p={2} mt={1}>
          <HStack
            p={2}
            borderRadius={4}
            spacing={2}
            justify="space-between"
            bgColor="wikiCardItemBg"
          >
            <CurrencyBox currency="IQ" />
            <IconButton
              bgColor="dimColor"
              borderWidth="1px"
              borderColor="borderColor"
              aria-label="convert"
              cursor="pointer"
              _hover={{ bgColor: '#0000003a' }}
              _focus={{ bgColor: '#0000003a' }}
              _active={{ bgColor: '#0000003a' }}
              as={RiArrowLeftRightLine}
              borderRadius="50%"
              p={2}
              size="sm"
            />
            <CurrencyBox currency="USD" />
          </HStack>
        </Box>
      </Box>
    </VStack>
  )
}

export default CurrencyConverter
