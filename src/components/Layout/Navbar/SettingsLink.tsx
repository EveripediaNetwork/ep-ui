import { Button, Flex, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { RiSettings5Fill } from 'react-icons/ri'
import { useTranslation } from 'next-i18next'

export const SettingsLink = () => {
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <>
      <Button
        minH="48px"
        px={3}
        bgColor={'transparent'}
        sx={{ '&:hover, &:focus, &:active': { bgColor: 'subMenuHoverBg' } }}
        onClick={() => router.push('/settings/account')}
        w="full"
      >
        <Icon
          fontSize="4xl"
          color="linkColor"
          fontWeight={600}
          as={RiSettings5Fill}
          pr={3}
        />
        <Flex fontSize="md" fontWeight="semibold" color="linkColor" flex="auto">
          <span>{t('Settings')}</span>
        </Flex>
      </Button>
    </>
  )
}
