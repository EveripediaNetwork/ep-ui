import React from 'react'
import { SimpleGrid, Stack, Icon } from '@chakra-ui/react'
import { SocialIcon } from '@/components/Elements'
import { Socials } from '@/data/SocialsData'

const SocialFooter = () => {
  return (
    <Stack align={{ base: 'center', lg: 'flex-start' }}>
      <SimpleGrid mt={4} columns={{ base: 5, md: 7 }}>
        {Socials.map((social) => (
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
