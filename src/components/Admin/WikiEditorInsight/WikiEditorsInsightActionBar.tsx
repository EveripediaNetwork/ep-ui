import {
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'

type WikiEditorsInsightActionBarProps = {
  setsearchKeyWord: (searchKeyword: string) => void
  setInitiateFetchSearchEditors: (intitateSearchEditors: boolean) => void
  handleSortChange: () => void
  isOpenFilter: boolean
  onCloseFilter: () => void
  ApplyFilterItems: (e: React.FormEvent<HTMLFormElement>) => void
  onToggleFilter: () => void
  FilterArray: {
    id: string
    value: string
  }[]
  sortIcon: JSX.Element
  setChecked: (checked: number) => void
  checked: number
  setFilterEditors: (editors: string) => void
}

const WikiEditorsInsightActionBar = ({
  setsearchKeyWord,
  setInitiateFetchSearchEditors,
  handleSortChange,
  onCloseFilter,
  isOpenFilter,
  ApplyFilterItems,
  onToggleFilter,
  FilterArray,
  sortIcon,
  setChecked,
  checked,
  setFilterEditors,
}: WikiEditorsInsightActionBarProps) => {
  return (
    <Flex justifyContent={{ base: 'center', lg: 'flex-end' }} p={5}>
      <Flex gap={5} flexDir={{ base: 'column', md: 'row' }}>
        <InputGroup w="100%">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="#667085" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            onChange={e => {
              setsearchKeyWord(e.target.value)
              if (e.target.value.length > 2) {
                setInitiateFetchSearchEditors(false)
              }
            }}
          />
        </InputGroup>
        <Button
          onClick={() => {
            handleSortChange()
          }}
          borderColor="#E2E8F0"
          _dark={{ borderColor: '#2c323d' }}
          py={2}
          px={10}
          rightIcon={sortIcon}
          variant="outline"
          fontWeight="medium"
        >
          Sort
        </Button>
        <Popover isLazy isOpen={isOpenFilter} onClose={onCloseFilter}>
          <PopoverTrigger>
            <Button
              transition="all 0.2s"
              borderRadius="md"
              _expanded={{ bg: 'brand.500', color: 'white' }}
              py={2}
              px={10}
              leftIcon={<MdFilterList fontSize="25px" />}
              variant="outline"
              onClick={onToggleFilter}
              fontWeight="medium"
            >
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent w="fit-content">
            <form onSubmit={e => ApplyFilterItems(e)}>
              <PopoverBody py={3}>
                <VStack
                  spacing={1}
                  w="fit-content"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  {FilterArray.map((item, i) => (
                    <Checkbox
                      onChange={() => setChecked(i + 1)}
                      key={i}
                      colorScheme="pink"
                      isChecked={checked === i + 1}
                      py={1}
                      value={item.id}
                    >
                      {item.value}
                    </Checkbox>
                  ))}
                </VStack>
              </PopoverBody>
              <PopoverFooter>
                <HStack gap={4} w="fit-content" px={2}>
                  <Button
                    type="button"
                    px={6}
                    py={1}
                    variant="ghost"
                    borderWidth="1px"
                    onClick={() => {
                      setChecked(0)
                      onCloseFilter()
                      setFilterEditors('')
                    }}
                    rounded="lg"
                    fontWeight="semibold"
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    rounded="lg"
                    px={6}
                    py={1}
                    fontWeight="semibold"
                  >
                    Apply
                  </Button>
                </HStack>
              </PopoverFooter>
            </form>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  )
}

export default WikiEditorsInsightActionBar
