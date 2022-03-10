import { CURRENCIES } from '@/components/Profile/SidebarFilter/constants'
import {
  AccordionButton,
  AccordionPanel,
} from '@/components/Profile/SidebarFilter/FilterArcoddion'
import { TypeValue } from '@/components/Profile/utils'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  AccordionItem,
  Button,
  chakra,
  Circle,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaDollarSign, FaEthereum } from 'react-icons/fa'

type Currency = TypeValue<typeof CURRENCIES>

const CURRENCY_ICONS = {
  [CURRENCIES.DOLLAR]: FaDollarSign,
  [CURRENCIES.ETHER]: FaEthereum,
}

export const PriceFilter = () => {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(
    CURRENCIES.DOLLAR,
  )

  const renderCurrencyIcon = (currency: Currency) => (
    <Circle borderWidth={1} size="6">
      <Icon as={CURRENCY_ICONS[currency]} fontSize="sm" />
    </Circle>
  )
  return (
    <AccordionItem>
      <AccordionButton>Price</AccordionButton>
      <AccordionPanel display="flex" flexDir="column" gap="4">
        <Menu matchWidth>
          <MenuButton
            as={Button}
            variant="outline"
            h="12"
            rounded="lg"
            fontWeight="normal"
            textAlign="start"
            rightIcon={<ChevronDownIcon />}
            leftIcon={renderCurrencyIcon(currentCurrency)}
          >
            {currentCurrency}
          </MenuButton>
          <MenuList>
            {Object.values(CURRENCIES).map(currency => (
              <MenuItem
                key={currency}
                h="12"
                icon={renderCurrencyIcon(currency)}
                onClick={() => setCurrentCurrency(currency)}
              >
                {currency}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Flex align="center">
          <Input placeholder="Min" />
          <chakra.span mx="2">to</chakra.span>
          <Input placeholder="Max" />
        </Flex>
        <Button
          variant="outline"
          size="lg"
          fontWeight="semibold"
          fontSize="md"
          w="fit-content"
          px="10"
          py="3"
        >
          Apply
        </Button>
      </AccordionPanel>
    </AccordionItem>
  )
}
