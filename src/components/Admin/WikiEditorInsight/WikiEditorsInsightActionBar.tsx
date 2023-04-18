import { WikiEditorsInsightActionBarProps } from '@/types/admin'
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
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'

const WikiEditorsInsightActionBar = ({
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
  setPaginateOffset,
  handleSearchKeyword,
}: WikiEditorsInsightActionBarProps) => {
  return (
    <Flex justifyContent="flex-end" p={5}>
      <Flex gap={5}>
        <InputGroup w="100%">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="#667085" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            onChange={e => {
              handleSearchKeyword(e)
            }}
          />
        </InputGroup>
        <Button
          onClick={handleSortChange}
          borderColor="tetiaryGray"
          _dark={{ borderColor: '#2c323d' }}
          rightIcon={sortIcon}
          py={2}
          px={{ md: '10' }}
          pr={{ base: '2' }}
          variant="outline"
          fontWeight="medium"
        >
          <Text display={{ base: 'none', md: 'block' }}>Sort</Text>
        </Button>
        <Popover isLazy isOpen={isOpenFilter} onClose={onCloseFilter}>
          <PopoverTrigger>
            <Button
              transition="all 0.2s"
              borderRadius="md"
              _expanded={{ bg: 'brand.500', color: 'white' }}
              py={2}
              px={{ md: '10' }}
              pl={{ base: '2' }}
              leftIcon={<MdFilterList fontSize="25px" />}
              variant="outline"
              onClick={onToggleFilter}
              fontWeight="medium"
            >
              <Text display={{ base: 'none', md: 'block' }}>Filters</Text>
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
                      setFilterEditors([])
                      setPaginateOffset(0)
                      onCloseFilter()
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
