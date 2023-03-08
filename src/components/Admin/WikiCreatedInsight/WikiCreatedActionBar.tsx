import { WikiCreatedActionBarProps } from '@/types/admin'
import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  Checkbox,
  PopoverFooter,
  HStack,
  Text,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'

export const WikiCreatedActionBar = (props: WikiCreatedActionBarProps) => {
  const {
    setsearchKeyWord,
    sortIcon,
    handleSortChange,
    isOpen,
    onClose,
    setChecked,
    checked,
    setPaginateOffset,
    setFilterItems,
    onToggle,
  } = props

  const ApplyFilterItems = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // get all checkboxes from form
    const checkboxes = Array.from(
      e.currentTarget.querySelectorAll(
        'input[type="checkbox"]',
      ) as unknown as Array<HTMLInputElement>,
    )
    // get all the checked and unchecked checkboxes with their names
    const data: string[] = []
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) data.push(checkbox.value)
    })
    setFilterItems(data)
    onClose()
  }

  const SortArray = [
    { id: 1, value: 'Newest' },
    { id: 2, value: 'Oldest' },
    { id: 3, value: 'Alpabetical (A-Z)' },
    { id: 4, value: 'Alpabetical (Z-A)' },
  ]

  const FilterArray = [
    { id: 'promoted', value: 'Promoted' },
    { id: 'archived', value: 'Archived' },
    { id: 'normal', value: 'Normal' },
  ]

  return (
    <>
      <Flex
        borderBottomWidth="1px"
        w="100%"
        p={5}
        gap={2}
        justifyContent="flex-start"
        flexDir="column"
      >
        <Text fontSize="lg" fontWeight="semibold">
          Created Wikis
        </Text>
        <Text fontSize="sm" fontWeight="thin">
          List of created wikis in order of creation from the most recently
          created.
        </Text>
      </Flex>

      <Flex justifyContent="flex-end" p={5}>
        <Flex gap={5}>
          <InputGroup w="100%">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="metalGray" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              onChange={e => {
                setsearchKeyWord(e.target.value)
              }}
            />
          </InputGroup>
          <Menu>
            <MenuButton
              transition="all 0.2s"
              borderRadius="md"
              _expanded={{ bg: 'brand.500', color: 'white' }}
            >
              <Button
                borderColor="wikiSortBorder"
                py={2}
                px={5}
                leftIcon={sortIcon}
                variant="outline"
                fontWeight="medium"
              >
                Sort
              </Button>
            </MenuButton>
            <MenuList>
              {SortArray.map((o, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    handleSortChange(o.id)
                  }}
                  py="1"
                  px="3"
                >
                  {o.value}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Popover isLazy isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
              <Button
                transition="all 0.2s"
                borderRadius="md"
                _expanded={{ bg: 'brand.500', color: 'white' }}
                py={2}
                px={10}
                leftIcon={<MdFilterList fontSize="25px" />}
                variant="outline"
                fontWeight="medium"
                onClick={onToggle}
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
                        setFilterItems([])
                        setPaginateOffset(0)
                        onClose()
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
    </>
  )
}
