import { HStack, Icon, Link } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RiSettings5Fill } from 'react-icons/ri'

const SettingsLink = ({ isInMobileMenu }: { isInMobileMenu?: boolean }) => {
  const { t } = useTranslation('common')
  return (
    <HStack
      px={isInMobileMenu ? 0 : 3}
      minH={{ base: '48px', md: '48px' }}
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
        as={RiSettings5Fill}
      />
      <Link
        fontSize={{ base: 'lg', md: 'md' }}
        fontWeight={'semibold'}
        href={'/settings/account'}
        color="linkColor"
        pl={isInMobileMenu ? 3 : 1}
      >
        {t('Settings')}
      </Link>
    </HStack>
  )
}

export default SettingsLink
