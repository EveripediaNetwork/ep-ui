import { UserSocialLinksData as dt } from '@/data/UserSocialLinksData'
import { ProfileLinks } from '@/types/ProfileType'
import { HStack, Icon, Link, Tooltip } from '@chakra-ui/react'
import React from 'react'

interface ProfileLinksProps {
  links: ProfileLinks
}
const UserSocialLinks = ({ links }: ProfileLinksProps) => {
  const socials = Object.keys(links) as Array<keyof ProfileLinks>
  return (
    <HStack justify="center" spacing={4}>
      {socials.map(key => {
        return (
          <Link position="relative" href={dt[key].urlPrefix(links[key] || '')}>
            <Tooltip hasArrow label={dt[key].label}>
              <span>
                <Icon
                  aria-label={dt[key].label}
                  as={dt[key].icon}
                  boxSize="25px"
                  _hover={{
                    opacity: 0.7,
                  }}
                />
              </span>
            </Tooltip>
          </Link>
        )
      })}
    </HStack>
  )
}

export default UserSocialLinks
