import { HStack, Icon, Link } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { FaUserCog } from 'react-icons/fa'

const AdminLink = ({ isInMobileMenu }: { isInMobileMenu?: boolean }) => {
  const { t } = useTranslation('common')
  return (
    <HStack
      px={isInMobileMenu ? 0 : 3}
      minH={'48px'}
      sx={{
        '&:hover, &:focus, &:active': {
          bgColor: 'subMenuHoverBg',
        },
      }}
      width={'full'}
    >
      <Icon
        fontSize={{ base: 28, md: 24 }}
        color="linkColor"
        fontWeight={600}
        as={FaUserCog}
      />
      <Link
        fontSize={{ base: 'lg', md: 'md' }}
        fontWeight={'semibold'}
        href={'/admin'}
        color="linkColor"
        pl={isInMobileMenu ? 3 : 1}
      >
        <span>{t('Admin')}</span>
      </Link>
    </HStack>
  )
}

export default AdminLink
