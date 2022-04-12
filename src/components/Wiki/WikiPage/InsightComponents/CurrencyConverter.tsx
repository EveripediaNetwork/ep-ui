import React, { useEffect, useState, useCallback } from 'react'
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
import { fetchTokenRate } from '@/utils/fetchTokenRate'

const CurrencyBox = ({
  currency,
  value,
  setValue,
}: {
  currency: string
  value: number
  setValue: (value: string) => void
}) => {
  return (
    <HStack justify="space-between" align="center" flex="1">
      <HStack align="center">
        <Avatar h="18px" w="18px" />
        <Text fontSize="14px">{currency}</Text>
      </HStack>
      <Input
        placeholder="0"
        value={value}
        opacity={value ? '1' : '0.4'}
        onChange={e => setValue(e.target.value)}
        textAlign="right"
        variant="unstyled"
        w="50%"
      />
    </HStack>
  )
}

interface CurrencyConverterProps {
  token: string
}

const CurrencyConverter = ({ token }: CurrencyConverterProps) => {
  const [conversionRate, setConversionRate] = useState<number>(0.0)
  const [fromCurrency, setFromCurrency] = useState<number>(0)
  const [toCurrency, setToCurrency] = useState<number>(0)

  // function for updating the from currency
  const updateValues = useCallback(
    (value: string, isEditedFrom: boolean) => {
      // sanitize the input value
      let v = parseFloat(value)
      if (Number.isNaN(v)) v = 0

      // update the state
      if (isEditedFrom) setFromCurrency(v)
      else setToCurrency(v)

      // calculate the comparing currency
      let c = 0
      if (isEditedFrom) c = v * conversionRate
      else c = v / conversionRate

      // trim the value to 2 decimal places
      c = Math.round(c * 100) / 100

      // update the state
      if (isEditedFrom) setToCurrency(c)
      else setFromCurrency(c)
    },
    [conversionRate],
  )

  useEffect(() => {
    const fetchConversion = async () => {
      const rate = await fetchTokenRate(token)
      setConversionRate(parseFloat(rate))
    }
    fetchConversion()
    // update from currency
    updateValues('1', true)
  }, [token, setConversionRate, updateValues])

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
            <CurrencyBox
              currency="IQ"
              value={fromCurrency}
              setValue={e => updateValues(e, true)}
            />
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
            <CurrencyBox
              currency="USD"
              value={toCurrency}
              setValue={e => updateValues(e, false)}
            />
          </HStack>
        </Box>
      </Box>
    </VStack>
  )
}

export default CurrencyConverter
