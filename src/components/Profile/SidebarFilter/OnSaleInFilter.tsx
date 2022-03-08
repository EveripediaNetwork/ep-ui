import {
  AccordionButton,
  AccordionPanel,
} from '@/components/Profile/SidebarFilter/FilterArcoddion'
import { CheckIcon } from '@chakra-ui/icons'
import {
  AccordionItem,
  chakra,
  Circle,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  useCheckbox,
  useCheckboxGroup,
  UseCheckboxProps,
} from '@chakra-ui/react'
import { StringOrNumber } from '@chakra-ui/utils'
import { matchSorter } from 'match-sorter'
import React, { useState } from 'react'

import { FaSearch } from 'react-icons/fa'

const COLLECTIONS = [
  'ETH',
  'WETH',
  '$BASED',
  '$DG',
  '0xBTC',
  '1337',
  '1MT',
  '2XDN',
  'ABST',
  'AC',
]

type OnSaleInFilterItemProps = UseCheckboxProps

const OnSaleInFilterItem = (props: OnSaleInFilterItemProps) => {
  const { value } = props
  const { state, getInputProps, getLabelProps, getCheckboxProps, htmlProps } =
    useCheckbox(props)

  return (
    <chakra.label
      {...htmlProps}
      cursor="pointer"
      px="2"
      h="10"
      display="flex"
      alignItems="center"
    >
      <chakra.input {...getInputProps()} />

      <Circle
        size="6"
        borderWidth={2}
        borderColor={state.isChecked ? 'blue' : 'inherit'}
        _hover={{ shadow: 'lg' }}
        {...getCheckboxProps()}
      >
        {state.isChecked && <CheckIcon color="blue" />}
      </Circle>
      <chakra.span ml="2" {...getLabelProps()}>
        {value}
      </chakra.span>
    </chakra.label>
  )
}

export const OnSaleInFilter = () => {
  const [query, setQuery] = useState('')

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  })

  const valueCollections = COLLECTIONS.filter(col => value.includes(col))

  let filteredCollections = COLLECTIONS

  // sort search query; we use matchSorter because it handles large lists well.
  filteredCollections = matchSorter(filteredCollections, query, {
    threshold: matchSorter.rankings.ACRONYM,
  })

  // Prevent filtering out chosen collections
  const valuesNotInFilter = valueCollections.filter(
    col => !filteredCollections.some(fCol => fCol === col),
  )
  filteredCollections = [...filteredCollections, ...valuesNotInFilter]

  // Useless; it's just here to satisfy the compiler till we handle actual data
  const hide = (a: StringOrNumber[]) => a
  hide(value)

  return (
    <AccordionItem>
      <AccordionButton>On Sale In</AccordionButton>
      <AccordionPanel>
        <InputGroup>
          <InputLeftElement h="full">
            <Icon
              fontSize="md"
              as={FaSearch}
              strokeWidth="5"
              pointerEvents="none"
            />
          </InputLeftElement>
          <Input
            placeholder="Filter"
            value={query}
            onChange={ev => setQuery(ev.target.value)}
          />
        </InputGroup>
        <List mt="4" h="72" overflowY="scroll">
          {filteredCollections.map((item, cid) => (
            <OnSaleInFilterItem
              key={cid}
              {...getCheckboxProps({ value: item })}
            />
          ))}
        </List>
      </AccordionPanel>
    </AccordionItem>
  )
}
