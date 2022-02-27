import {
  COLLECTIONS_DISPLAY_SIZES,
  useProfileContext,
} from '@/components/Profile/utils'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonGroup,
  Flex,
  HTMLChakraProps,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import React from 'react'
import { BsFillGrid3X3GapFill, BsFillGridFill } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'

export const TopBarFilter = () => {
  const { displaySize, setDisplaySize } = useProfileContext()

  const activeStyles: HTMLChakraProps<'button'> = {
    bg: 'gray.100',
    _dark: {
      bg: 'whiteAlpha.200',
    },
  }
  return (
    <Flex mt="4" gap="2" wrap={{ base: 'wrap', md: 'nowrap' }}>
      <InputGroup>
        <InputLeftElement h="full" left="2">
          <Icon
            fontSize="md"
            as={FaSearch}
            strokeWidth="5"
            pointerEvents="none"
          />
        </InputLeftElement>
        <Input h="12" placeholder="Search" rounded="lg" />
      </InputGroup>

      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="outline"
          size="lg"
          w="56"
          minW="56"
          flex="auto"
          textAlign="start"
          fontWeight="normal"
          px="3"
          fontSize="md"
        >
          All items
        </MenuButton>
        <MenuList>
          <MenuItem>Recentyl Listed</MenuItem>
          <MenuItem>Recentyl Created</MenuItem>
          <MenuItem>Recentyl Sold</MenuItem>
          <MenuItem>Recentyl Received</MenuItem>
          <MenuItem>Ending Soon</MenuItem>
          <MenuItem>Price: Low to High</MenuItem>
          <MenuItem>Price: High to Low</MenuItem>
          <MenuItem>Highest Lost Sale</MenuItem>
          <MenuItem>Most Viewed</MenuItem>
          <MenuItem>Most Favorited</MenuItem>
          <MenuItem>Oldest</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          order={{ base: 5, md: 'initial' }}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="outline"
          size="lg"
          w={{ base: 'full', md: '56' }}
          minW="56"
          textAlign="start"
          fontWeight="normal"
          px="3"
          fontSize="md"
        >
          Recently Listed
        </MenuButton>
        <MenuList>
          <MenuItem>Single items</MenuItem>
          <MenuItem>Bundles</MenuItem>
        </MenuList>
      </Menu>
      <ButtonGroup size="lg" isAttached variant="outline">
        <IconButton
          aria-label="Large display"
          mr="-px"
          icon={<BsFillGridFill />}
          sx={{
            ...(displaySize === COLLECTIONS_DISPLAY_SIZES.LARGE &&
              activeStyles),
          }}
          onClick={() => setDisplaySize(COLLECTIONS_DISPLAY_SIZES.LARGE)}
        />
        <IconButton
          aria-label="Small display"
          icon={<BsFillGrid3X3GapFill />}
          sx={{
            ...(displaySize === COLLECTIONS_DISPLAY_SIZES.SMALL &&
              activeStyles),
          }}
          onClick={() => setDisplaySize(COLLECTIONS_DISPLAY_SIZES.SMALL)}
        />
      </ButtonGroup>
    </Flex>
  )
}
