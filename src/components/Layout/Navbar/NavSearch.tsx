import React from 'react'
import { InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'

export const NavSearch = () => {
  const countries = [
    'nigeria',
    'japan',
    'india',
    'united states',
    'south korea',
  ]

  return (
    <AutoComplete openOnFocus emptyState={null}>
      <InputGroup
        size="lg"
        maxW="800px"
        display={{ base: 'none', sm: 'none', md: 'block' }}
      >
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <AutoCompleteInput placeholder="Search items, collections and accounts" />
      </InputGroup>

      <AutoCompleteList pb="0">
        {countries.map((country, cid) => (
          <AutoCompleteItem
            key={`option-${cid}`}
            value={country}
            textTransform="capitalize"
          >
            {country}
          </AutoCompleteItem>
        ))}

        <span>dwd</span>
      </AutoCompleteList>
    </AutoComplete>
  )
}
