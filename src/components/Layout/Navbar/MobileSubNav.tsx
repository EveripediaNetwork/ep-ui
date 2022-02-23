import React from 'react'
import { Flex, Stack, Text, Icon, HStack, Link, Box } from '@chakra-ui/react'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { NavItem } from '@/types/NavItemType'
import NextLink from 'next/link'

const MobileSubNav = ({
  activeMenu,
  handleClick,
  setHamburger,
}: {
  activeMenu: NavItem | null
  handleClick: (status: boolean) => void
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
}) => (
  <Stack
    direction="column"
    pb={6}
    display={{ lg: 'flex', xl: 'none' }}
    bg="subMenuBg"
    spacing={4}
    height="xl"
  >
    <Flex
      py={4}
      justify="flex-start"
      align="center"
      _hover={{
        textDecoration: 'none',
      }}
      fontSize="lg"
      onClick={() => handleClick(false)}
      bg="pageBg"
      px={2}
      borderBottomColor="gray.200"
      borderBottomWidth="thin"
    >
      <RiArrowLeftSLine size="30" />
      <Text fontWeight={600} color="color">
        {activeMenu?.label}
      </Text>
    </Flex>
    <Box h="calc(100vh - 300px)" overflowY="scroll">
      {activeMenu?.subItem?.map((item, key) => (
        <NextLink href={item.href} key={key} passHref>
          <Link
            href="passRef"
            py={3}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            _hover={{
              textDecoration: 'none',
            }}
            fontSize="lg"
            px={6}
            onClick={() => setHamburger(false)}
          >
            <HStack>
              {item.hasImage && (
                <Icon
                  cursor="pointer"
                  fontSize="3xl"
                  color="linkColor"
                  fontWeight={600}
                  as={item.icon}
                  pr={3}
                />
              )}

              <Text fontWeight={600} color="linkColor">
                {item.label}
              </Text>
            </HStack>
          </Link>
        </NextLink>
      ))}
    </Box>
  </Stack>
)

export default MobileSubNav
