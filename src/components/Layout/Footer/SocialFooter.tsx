import React from 'react'
import { SimpleGrid, Stack, Icon, Text } from '@chakra-ui/react'
import { SocialIcon } from '@/components/Elements'
import { Socials } from '@/data/SocialsData'
import { useTranslation } from 'react-i18next'

const SocialFooter = () => {
  const { t } = useTranslation()
  return (
    <Stack align={{ base: 'center', lg: 'flex-start' }}>
      <Text fontSize="xl" fontWeight="bold" py={2}>
        {`${t('communityFooterHeading')}`}
      </Text>
      <SimpleGrid columns={{ base: 3, lg: 7 }}>
        {Socials.map(social => (
          <SocialIcon
            key={social.href}
            link={social.href}
            Icon={<Icon as={social.icon} w={6} h={7} />}
          />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default SocialFooter
