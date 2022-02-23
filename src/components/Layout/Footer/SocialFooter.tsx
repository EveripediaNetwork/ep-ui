import React from 'react'
import { SimpleGrid, Stack, Heading, Icon } from '@chakra-ui/react'
import { SocialIcon } from '@/components/Elements'
import { Socials } from '@/data/SocialsData'

const SocialFooter = () => (
  <Stack align={{ base: 'center', lg: 'flex-start' }}>
    <Heading size="lg" py={2}>
      Join the community
    </Heading>
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

export default SocialFooter
