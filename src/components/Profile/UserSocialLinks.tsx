import { UserSocialLinksData as dt } from '@/data/UserSocialLinksData'
import { ProfileLinks } from '@/types/ProfileType'
import { HStack, Icon, Link, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { RiQrCodeLine } from 'react-icons/ri'

interface ProfileLinksProps {
  links?: ProfileLinks
  address: string
}
const UserSocialLinks = ({ links, address }: ProfileLinksProps) => {
  const socials = Object.keys(links || {}) as Array<keyof ProfileLinks>
  return (
    <HStack justify="center" spacing={4}>
      {links &&
        socials.map(key => {
          return (
            <Link
              position="relative"
              rel="nofollow"
              href={dt[key].urlPrefix(links[key] || '')}
            >
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

      <Link
        position="relative"
        rel="nofollow"
        href={`https://etherscan.io/address/${address}`}
      >
        <Tooltip hasArrow label="etherscan">
          <span>
            <Icon
              aria-label="etherscan"
              as={RiQrCodeLine}
              boxSize="25px"
              _hover={{
                opacity: 0.7,
              }}
            />
          </span>
        </Tooltip>
      </Link>
    </HStack>
  )
}

export default UserSocialLinks
