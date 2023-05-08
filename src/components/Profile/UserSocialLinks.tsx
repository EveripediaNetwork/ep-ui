import { UserSocialLinksData as dt } from '@/data/UserSocialLinksData'
import { ProfileLinks } from '@/types/ProfileType'
import { Flex, Icon, Link, Tooltip } from '@chakra-ui/react'
import React from 'react'
import EtherscanIcon from '../Icons/etherscan'

interface ProfileLinksProps {
  links?: ProfileLinks
  address: string
}

type Social = keyof typeof dt

const UserSocialLinks = ({ links, address }: ProfileLinksProps) => {
  const socialsWithURl = Object.entries(links || {}).filter((e) =>
    Boolean(e[1]),
  ) as [Social, string?][]

  return (
    <Flex justify="center" align="center" gap={4}>
      {links &&
        socialsWithURl.map((social, index) => {
          return (
            <Link
              key={index}
              position="relative"
              height="25px"
              isExternal
              rel="noopener nofollow"
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
          rel="noopener nofollow"
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
                _hover={{
                  opacity: 0.7,
                }}
              />
            </span>
          </Tooltip>
        </Link>
      )}
    </Flex>
  )
}

export default UserSocialLinks
