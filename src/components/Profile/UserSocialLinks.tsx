import { UserSocialLinksData as dt } from '@/data/UserSocialLinksData'
import { ProfileLinks } from '@/types/ProfileType'
import { HStack, Icon, Link, Tooltip } from '@chakra-ui/react'
import React from 'react'
import EtherscanIcon from '../Icons/etherscan'

interface ProfileLinksProps {
  links?: ProfileLinks
  address: string
}

type Social = keyof typeof dt

const UserSocialLinks = ({ links, address }: ProfileLinksProps) => {
  const socialsWithURl = Object.entries(links || {}).filter(e =>
    Boolean(e[1]),
  ) as Array<[Social, string?]>

  return (
    <HStack justify="center" align="center" spacing={4}>
      {links &&
        socialsWithURl.map(social => {
          return (
            <Link
              position="relative"
              isExternal
              target="_blank"
              href={dt[social[0]].urlPrefix(social[1] || '')}
            >
              <Tooltip hasArrow label={dt[social[0]].label}>
                <span>
                  <Icon
                    aria-label={dt[social[0]].label}
                    as={dt[social[0]].icon}
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

      {address && (
        <Link
          position="relative"
          isExternal
          target="_blank"
          href={`https://etherscan.io/address/${address}`}
        >
          <Tooltip hasArrow label="etherscan">
            <span>
              <Icon
                aria-label="etherscan"
                as={EtherscanIcon}
                boxSize="22px"
                _dark={{
                  filter: 'invert(100%) hue-rotate(180deg)',
                }}
                mt="-9px"
                _hover={{
                  opacity: 0.7,
                }}
              />
            </span>
          </Tooltip>
        </Link>
      )}
    </HStack>
  )
}

export default UserSocialLinks
