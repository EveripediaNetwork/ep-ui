import { COLLECTIONS_DISPLAY_SIZES } from '@/components/Profile/SidebarFilter/constants'
import { useProfileContext } from '@/components/Profile/utils'
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
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
          {t('selectAllItems')}
        </MenuButton>
        <MenuList>
          <MenuItem>{t('selectRecentListed')}</MenuItem>
          <MenuItem>{t('selectRecentCreated')}</MenuItem>
          <MenuItem>{t('selectRecentSold')}</MenuItem>
          <MenuItem>{t('selectRecentReceived')}</MenuItem>
          <MenuItem>{t('selectEndingSoon')}</MenuItem>
          <MenuItem>{t('selectPriceLowtoHigh')}</MenuItem>
          <MenuItem>{t('selectPriceHighttoLow')}</MenuItem>
          <MenuItem>{t('selectHightLost')}</MenuItem>
          <MenuItem>{t('selectMostView')}</MenuItem>
          <MenuItem>{t('selectMostFav')}</MenuItem>
          <MenuItem>{t('selectOldest')}</MenuItem>
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
          {t('selectRecentListed')}
        </MenuButton>
        <MenuList>
          <MenuItem>{t('selectSingleItem')}</MenuItem>
          <MenuItem>{t('Bundles')}</MenuItem>
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
