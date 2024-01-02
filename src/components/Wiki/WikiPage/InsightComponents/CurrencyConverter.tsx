import React, { useState, useCallback } from 'react'
import { Box, HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import { RiArrowLeftRightLine } from 'react-icons/ri'
import { TokenStats } from '@/services/token-stats'
import { Image } from '@/components/Elements/Image/Image'
import { useTranslation } from 'next-i18next'

const CURRENCY_BOX_SIZE = 18

const CurrencyBox = ({
  token,
  tokenImage,
  tokenSymbol,
  value,
  setValue,
}: {
  token?: string
  tokenSymbol: string
  tokenImage?: string
  value: number
  setValue: (value: string) => void
}) => {
  const tokenImageSrc = tokenImage
    ? tokenImage
    : `https://icons.iq.wiki/128/${token}.png`
  return (
    <HStack
      zIndex={2}
      m="0px !important"
      justify="space-between"
      align="center"
      flex="1"
    >
      <HStack align="center">
        {token ? (
          <Image
            src={tokenImageSrc}
            imgBoxSize={CURRENCY_BOX_SIZE}
            alt={token}
            borderRadius="100px"
          />
        ) : (
          <Image
            src="/images/logos/usd-logo.svg"
            imgBoxSize={CURRENCY_BOX_SIZE}
            alt={tokenSymbol}
          />
        )}
        <Text fontSize="14px">{tokenSymbol}</Text>
      </HStack>
      <Input
        placeholder="0"
        value={value}
        opacity={value ? '1' : '0.4'}
        onChange={(e) => setValue(e.target.value)}
        textAlign="right"
        fontSize="14px"
        variant="unstyled"
        w="50%"
      />
    </HStack>
  )
}

interface CurrencyConverterProps {
  token: string
  tokenStats: TokenStats
  tokenImage?: string
}

const CurrencyConverter = ({
  token,
  tokenStats,
  tokenImage,
}: CurrencyConverterProps) => {
  const conversionRate = tokenStats?.token_price_in_usd
  const tokenSymbol = tokenStats.symbol
  const [fromCurrency, setFromCurrency] = useState<number>(0)
  const [toCurrency, setToCurrency] = useState<number>(0)
  const [isTokenLeft, setIsTokenLeft] = useState(true)
  const { t } = useTranslation('wiki')
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

  return (
    <VStack w="100%" spacing={4} borderWidth={1} borderRadius={8}>
      <Box w="100%" bgColor="wikiCardBg" p={3} borderRadius={8}>
        <Text
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          fontSize="14px"
          color="linkColor"
        >
          {t('Converter')}
        </Text>
        <Box p={2} mt={1}>
          <HStack
            flexDirection={isTokenLeft ? 'row' : 'row-reverse'}
            px={3}
            borderRadius={6}
            justify="space-between"
            bgColor="wikiCardItemBg"
            position="relative"
            overflow="hidden"
          >
            <Box
              pos="absolute"
              top={0}
              right={0}
              w="50%"
              bgColor="gray.50"
              _dark={{
                bgColor: 'gray.600',
              }}
              h="100%"
              zIndex={1}
            />
            <CurrencyBox
              token={token}
              tokenSymbol={tokenSymbol}
              tokenImage={tokenImage}
              value={fromCurrency}
              setValue={(e) => updateValues(e, true)}
            />
            <IconButton
              bgColor="gray.100"
              borderWidth="1px"
              color="fadedText2"
              aria-label="convert"
              cursor="pointer"
              _dark={{ bgColor: 'gray.800' }}
              variant="ghost"
              sx={{
                '&:hover, &:focus, &:active': {
                  filter: 'brightness(95%)',
                },
              }}
              as={RiArrowLeftRightLine}
              borderRadius="50%"
              p={2}
              zIndex={2}
              m="2px 7px !important"
              onClick={() => setIsTokenLeft(!isTokenLeft)}
              transform="scale(0.8)"
            />
            <CurrencyBox
              tokenSymbol="USD"
              value={toCurrency}
              setValue={(e) => updateValues(e, false)}
            />
          </HStack>
        </Box>
      </Box>
    </VStack>
  )
}

export default CurrencyConverter
