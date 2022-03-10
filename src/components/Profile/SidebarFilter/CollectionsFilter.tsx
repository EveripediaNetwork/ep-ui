import {
  AccordionButton,
  AccordionPanel,
} from '@/components/Profile/SidebarFilter/FilterArcoddion'
import { CheckIcon } from '@chakra-ui/icons'
import {
  AccordionItem,
  Avatar,
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
  { name: 'CrypotoLove', image: 'https://picsum.photos/200', count: 3 },
  { name: 'Kesariosto', image: 'https://picsum.photos/200', count: 5 },
  { name: 'Damilarka', image: 'https://picsum.photos/200', count: 1 },
  { name: 'Anuolosti', image: 'https://picsum.photos/200', count: 1 },
  { name: 'Donkeebits', image: 'https://picsum.photos/200', count: 2 },
  { name: 'Wrapped Matic', image: 'https://picsum.photos/200', count: 4 },
  {
    name: 'Catchy Girls Limited',
    image: 'https://picsum.photos/200',
    count: 1,
  },
  { name: 'Flowtys', image: 'https://picsum.photos/200', count: 2 },
  { name: 'Devs for revolution', image: 'https://picsum.photos/200', count: 3 },
  { name: 'THE CryptoBullies', image: 'https://picsum.photos/200', count: 3 },
]

type CollectionFilterItemProps = UseCheckboxProps

const CollectionFilterItem = (props: CollectionFilterItemProps) => {
  const { value } = props
  const { state, getInputProps, getLabelProps, htmlProps } = useCheckbox(props)

  const collection = COLLECTIONS.find(col => col.name === value)

  const checkIcon = (
    <Circle size={7} borderWidth={1}>
      <CheckIcon color="blue" />
    </Circle>
  )

  return (
    <chakra.label
      {...htmlProps}
      cursor="pointer"
      px="2"
      py="1"
      display="flex"
      alignItems="center"
    >
      <chakra.input {...getInputProps()} />
      {state.isChecked ? (
        checkIcon
      ) : (
        <Avatar src={collection?.image} boxSize="7" name={collection?.name} />
      )}
      <chakra.span ml="2" {...getLabelProps()}>
        {collection?.name}
      </chakra.span>
      <chakra.span ml="auto">{collection?.count}</chakra.span>
    </chakra.label>
  )
}

export const CollectionsFilter = () => {
  const [query, setQuery] = useState('')

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  })

  const valueCollections = COLLECTIONS.filter(col => value.includes(col.name))

  let filteredCollections = COLLECTIONS

  // sort search query; we use matchSorter because it handles large lists well.
  filteredCollections = matchSorter(filteredCollections, query, {
    keys: ['name'],
    threshold: matchSorter.rankings.ACRONYM,
  })

  // Prevent filtering out chosen collections
  const valuesNotInFilter = valueCollections.filter(
    col => !filteredCollections.some(fCol => fCol.name === col.name),
  )
  filteredCollections = [...filteredCollections, ...valuesNotInFilter]

  // sort checked collections to bw above
  filteredCollections = filteredCollections.sort(a =>
    value.includes(a.name) ? -1 : 1,
  )

  // Useless; it's just here to satisfy the compiler till we handle actual data
  const hide = (a: StringOrNumber[]) => a
  hide(value)

  return (
    <AccordionItem>
      <AccordionButton>Collections</AccordionButton>
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
          {filteredCollections.map((collection, cid) => (
            <CollectionFilterItem
              key={cid}
              {...getCheckboxProps({ value: collection.name })}
            />
          ))}
        </List>
      </AccordionPanel>
    </AccordionItem>
  )
}
