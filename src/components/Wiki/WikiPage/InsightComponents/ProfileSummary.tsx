import React from 'react'
import WikiAccordion from '@/components/Wiki/WikiAccordion'
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Tag,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import {
  CommonMetaIds,
  Wiki,
  WikiPossibleSocialsList,
} from '@everipedia/iq-utils'
import { FiExternalLink } from 'react-icons/fi'
import { shortenText } from '@/utils/textUtils'
import { LinkType, LINK_OPTIONS } from '@/data/WikiLinks'
import { RiExternalLinkLine } from 'react-icons/ri'

const MAX_FOUNDERS_LIST = 3

type ProfileSummaryProps = {
  wiki: Wiki
}

const parseLink = (link: string) =>
  link.startsWith('http') ? link : `https://${link}`

interface ProfileListItemProps {
  title: string
  children: React.ReactNode
}
const ProfileListItem = ({ title, children }: ProfileListItemProps) => (
  <HStack
    bgColor="wikiCardItemBg"
    borderRadius={4}
    justify="space-between"
    align="center"
    p={4}
  >
    <Text fontSize="14px" fontWeight="bold" color="linkColor">
      {title}:
    </Text>
    <Box>{children}</Box>
  </HStack>
)

const ProfileSummary = ({ wiki }: ProfileSummaryProps) => {
  const socialMetaData = wiki.metadata.filter(meta =>
    WikiPossibleSocialsList.includes(meta.id as CommonMetaIds),
  )

  if (!socialMetaData.length) return null

  const socialLinksData = socialMetaData.filter(
    item =>
      LINK_OPTIONS.find(option => option.id === item.id)?.type ===
      LinkType.SOCIAL,
  )
  const explorerLinksData = socialMetaData.filter(
    item =>
      LINK_OPTIONS.find(option => option.id === item.id)?.type ===
      LinkType.EXPLORER,
  )

  const contractURL = socialMetaData.find(
    item => item.id === CommonMetaIds.CONTRACT_URL,
  )?.value

  const websiteLink = socialMetaData.find(
    item => item.id === CommonMetaIds.WEBSITE,
  )?.value

  const getFounderName = (text: string) => {
    const names = text
      .split('-')
      .map(slug => slug.charAt(0).toUpperCase() + slug.slice(1))
      .join(' ')
    return `${names}`
  }

  return (
    <VStack w="100%" spacing={4} borderRadius={2}>
      <WikiAccordion
        display="flex"
        withNoDarkBg
        flexDir="column"
        gap={2}
        title="Profile Summary"
      >
        {contractURL && (
          <ProfileListItem title="Contract">
            <Link
              isExternal
              rel="noopener nofollow"
              href={parseLink(contractURL)}
              color="brandLinkColor"
            >
              <Flex align="center" gap="2">
                <Text fontSize="14px">{shortenText(contractURL, 20)}</Text>
                <FiExternalLink color="#ff5caa" fontSize="18px" />
              </Flex>
            </Link>
          </ProfileListItem>
        )}
        {websiteLink && (
          <ProfileListItem title="Official Website">
            <Link
              isExternal
              rel="noopener nofollow"
              href={parseLink(websiteLink)}
              color="brandLinkColor"
            >
              <Flex align="center" gap="2">
                <Text fontSize="14px">{shortenText(websiteLink, 20)}</Text>
                <FiExternalLink color="#ff5caa" fontSize="18px" />
              </Flex>
            </Link>
          </ProfileListItem>
        )}
        {socialLinksData.length > 0 && (
          <ProfileListItem title="Social Profiles">
            <Wrap spacing={2}>
              {socialLinksData
                .filter(
                  item =>
                    LINK_OPTIONS.find(option => option.id === item.id)?.type ===
                    LinkType.SOCIAL,
                )
                .map((social, i: number) => {
                  const Ico = LINK_OPTIONS.find(li => li.id === social.id)?.icon
                  return (
                    <Link
                      target="_blank"
                      href={parseLink(social.value)}
                      key={i}
                      rel="noopener nofollow"
                      isExternal
                      display="flex"
                    >
                      <IconButton
                        color="secondaryDark"
                        _hover={{ color: 'brandLinkColor' }}
                        _dark={{
                          color: 'darkGrey',
                          _hover: { color: 'brandLinkColor' },
                        }}
                        key={i}
                        aria-label={`Open ${social.id}`}
                        minW={3}
                        icon={<Icon as={Ico} />}
                        variant="link"
                        fontSize="20px"
                      />
                    </Link>
                  )
                })}
            </Wrap>
          </ProfileListItem>
        )}
        {explorerLinksData.length > 0 && (
          <ProfileListItem title="Explorers">
            {explorerLinksData.map(item => (
              <HStack>
                <Link
                  color="brandLinkColor"
                  fontSize="14px"
                  key={item.id}
                  href={parseLink(item.value)}
                  rel="noopener nofollow"
                  isExternal
                  _hover={{
                    color: 'linkColorHover',
                    textDecoration: 'underline',
                  }}
                >
                  {LINK_OPTIONS.find(option => option.id === item.id)?.label}
                </Link>
                <Icon color="brandLinkColor" as={RiExternalLinkLine} />
              </HStack>
            ))}
          </ProfileListItem>
        )}
        {wiki.linkedWikis?.founders && (
          <ProfileListItem title="Founders">
            <Flex
              alignItems="start"
              flexWrap="wrap"
              gap="1"
              flexDirection={
                wiki.linkedWikis?.founders.length > MAX_FOUNDERS_LIST
                  ? 'row'
                  : 'column'
              }
            >
              {wiki.linkedWikis?.founders.map((founder, i) => (
                <Link
                  w="max-content"
                  key={i}
                  href={`/wiki/${founder}`}
                  rel="noopener nofollow"
                >
                  <Tag fontSize="12px" py="1">
                    {getFounderName(founder)}
                  </Tag>
                </Link>
              ))}
            </Flex>
          </ProfileListItem>
        )}
        {wiki.linkedWikis?.blockchains && (
          <ProfileListItem title="Blockchains">
            <HStack spacing={2} wrap="wrap">
              {wiki.linkedWikis?.blockchains.map((item, i) => (
                <Link key={i} href={`/wiki/${item}`} py={1}>
                  <Tag py="1">{item}</Tag>
                </Link>
              ))}
            </HStack>
          </ProfileListItem>
        )}
      </WikiAccordion>
    </VStack>
  )
}

export default ProfileSummary
