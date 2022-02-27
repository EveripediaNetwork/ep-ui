import {
  COLLECTIONS_DISPLAY_SIZES,
  useProfileContext,
} from '@/components/Profile/utils'
import {
  ButtonGroup,
  Flex,
  HTMLChakraProps,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
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
    <Flex mt="4" gap="2">
      <InputGroup>
        <InputLeftElement h="full" left="2">
          <Icon
            fontSize="md"
            as={FaSearch}
            strokeWidth="5"
            pointerEvents="none"
          />
        </InputLeftElement>
        <Input h="12" placeholder="Search" ml="2" rounded="lg" />
      </InputGroup>
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
