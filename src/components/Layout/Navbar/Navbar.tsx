import React, { useRef, useState } from 'react'
import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  useDisclosure,
  HStack,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon, Search2Icon } from '@chakra-ui/icons'
import { RiWallet2Line, RiAccountCircleLine } from 'react-icons/ri'
import { useAccount } from 'wagmi'
import Link from '@/components/Elements/Link/Link'
import { Logo } from '@/components/Elements/'
import { NAV_ICON } from '@/data/NavItemData'
import NavMenu from '@/components/Layout/Navbar/NavMenu'
import { ColorModeToggle } from '@/components/Layout/Navbar/ColorModeToggle'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import WalletDrawer from '../WalletDrawer/WalletDrawer'

const Navbar = () => {
  const { isOpen, onClose, onToggle } = useDisclosure()

  const loginButtonRef = useRef<HTMLButtonElement>(null)

  const [visibleMenu, setVisibleMenu] = useState<number | null>(null)

  const [isHamburgerOpen, setHamburger] = useState<boolean>(false)

  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })

  const handleWalletIconAction = () => {
    if (isHamburgerOpen) {
      setHamburger(false)
    }
    onToggle()
  }

  return (
    <Box
      boxShadow="sm"
      position="fixed"
      zIndex={1500}
      w="full"
      h={isHamburgerOpen ? '100%' : 'unset'}
      bg="subMenuBg"
      px={{ base: 4, md: 8 }}
      borderBottomWidth={1}
    >
      <Flex mx="auto" align="center">
        <Box flex={1}>
          <Flex
            gap={{ base: 8, lg: 40, xl: 8 }}
            h="70px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Link
              href="/"
              mr={{ base: 0, xl: '9vw' }}
              _hover={{ textDecoration: 'none' }}
            >
              <HStack width="150px">
                <Logo />
                <Heading size="md" color="gray.900" _dark={{ color: 'white' }}>
                  Everipedia
                </Heading>
              </HStack>
            </Link>
            <InputGroup
              size="lg"
              maxW="800px"
              display={{ base: 'none', sm: 'none', md: 'block' }}
            >
              <InputLeftElement pointerEvents="none">
                <Search2Icon color="gray.300" />
              </InputLeftElement>
              <Input
                _focus={{ boxShadow: 'lg' }}
                type="text"
                placeholder="Search items, collections and accounts"
                _placeholder={{
                  fontSize: 'md',
                  transform: 'translateY(-1px)',
                }}
              />
            </InputGroup>
            <HStack
              ml={4}
              spacing={4}
              onMouseLeave={() => setVisibleMenu(null)}
              display={{
                base: 'none',
                xl: 'flex',
              }}
            >
              <DesktopNav />
              <NavMenu
                navItem={NAV_ICON}
                setVisibleMenu={setVisibleMenu}
                visibleMenu={visibleMenu}
                labelIsIcon
                label={
                  accountData ? (
                    <DisplayAvatar accountData={accountData} />
                  ) : (
                    <Icon
                      cursor="pointer"
                      fontSize="3xl"
                      color="gray.600"
                      _dark={{ color: 'gray.200' }}
                      fontWeight={600}
                      as={RiAccountCircleLine}
                      mt={2}
                      _hover={{
                        textDecoration: 'none',
                        color: 'linkHoverColor',
                      }}
                    />
                  )
                }
              >
                <ColorModeToggle isInMobileMenu={false} />
              </NavMenu>
              <Icon
                color="linkColor"
                cursor="pointer"
                fontSize="3xl"
                onClick={handleWalletIconAction}
                fontWeight={600}
                as={RiWallet2Line}
                onMouseEnter={() => setVisibleMenu(null)}
                _hover={{
                  textDecoration: 'none',
                  color: 'linkHoverColor',
                }}
              />
            </HStack>
            <Box
              display={{
                base: 'block',
                xl: 'none',
              }}
            >
              <IconButton
                onClick={() => setHamburger(!isHamburgerOpen)}
                icon={
                  isHamburgerOpen ? (
                    <CloseIcon w={4} h={4} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant="ghost"
                aria-label="Toggle Navigation"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>

      <WalletDrawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={loginButtonRef}
        setHamburger={setHamburger}
      />

      <Collapse
        in={isHamburgerOpen}
        animateOpacity
        style={{ margin: '0 -15px' }}
      >
        <MobileNav setHamburger={setHamburger} toggleWalletDrawer={onToggle} />
      </Collapse>
    </Box>
  )
}

export default Navbar
