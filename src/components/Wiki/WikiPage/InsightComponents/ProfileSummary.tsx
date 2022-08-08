import React from 'react'
import WikiAccordion from '@/components/Wiki/WikiAccordion'
import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { CommonMetaIds, Wiki, WikiPossibleSocialsList } from '@/types/Wiki'
import { FiExternalLink } from 'react-icons/fi'
import { shortenText } from '@/utils/shortenText'
import { LinkType, LINK_OPTIONS } from '@/data/WikiLinks'
import { RiExternalLinkLine } from 'react-icons/ri'

type ProfileSummaryProps = {
  wiki: Wiki
}

const parseLink = (link: string) =>
  link.startsWith('http') ? link : `https://${link}`

interface SocialMetaDataInterface {
  id: string
  value: string
}

interface SocialMetaDataDisplayProps {
  socialMetaData: SocialMetaDataInterface[]
}

const ExplorerProfiles = ({ socialMetaData }: SocialMetaDataDisplayProps) => {
  return (
    <HStack
      bgColor="wikiCardItemBg"
      borderRadius={4}
      justify="space-between"
      align="start"
      p={4}
    >
      <Text fontSize="14px" fontWeight="bold" color="linkColor">
        Explorers
      </Text>
      <Box>
        {socialMetaData.map(item => (
          <HStack>
            <Link
              color="brand.500"
              fontSize="14px"
              key={item.id}
              href={parseLink(item.value)}
              isExternal
              _hover={{
                color: 'linkColorHover',
                textDecoration: 'underline',
              }}
            >
              {LINK_OPTIONS.find(option => option.id === item.id)?.label}
            </Link>
            <Icon color="brand.500" as={RiExternalLinkLine} />
          </HStack>
        ))}
      </Box>
    </HStack>
  )
}

const SocialProfiles = ({ socialMetaData }: SocialMetaDataDisplayProps) => {
  return (
    <>
      {socialMetaData.length !== 0 && (
        <HStack
          bgColor="wikiCardItemBg"
          borderRadius={4}
          justify="space-between"
          align="center"
          p={4}
        >
          <HStack>
            <Text fontSize="14px" fontWeight="bold" color="linkColor">
              Social Profiles:
            </Text>
          </HStack>
          <Center>
            <Wrap>
              {socialMetaData
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
                      rel="nofollow"
                      display="flex"
                    >
                      <IconButton
                        color="secondaryDark"
                        _hover={{ color: 'brand.500' }}
                        _dark={{
                          color: 'darkGrey',
                          _hover: { color: 'brand.500' },
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
          </Center>
        </HStack>
      )}
    </>
  )
}

const ProfileListItem = ({ text, link }: { text: string; link: string }) => (
  <HStack
    bgColor="wikiCardItemBg"
    borderRadius={4}
    justify="space-between"
    align="center"
    p={4}
  >
    <HStack spacing={2}>
      <Text fontSize="14px" fontWeight="bold" color="linkColor">
        {text}
      </Text>
    </HStack>
    <Center>
      <HStack flexWrap="wrap" justifyContent="space-between">
        <Link
          rel="nofollow"
          target="_blank"
          href={parseLink(link)}
          color="brand.500"
        >
          <Flex align="center" gap="2">
            <Text fontSize="14px">{shortenText(link, 20)}</Text>
            <FiExternalLink color="#ff5caa" fontSize="18px" />
          </Flex>
        </Link>
      </HStack>
    </Center>
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

  return (
    <VStack w="100%" spacing={4} borderRadius={2}>
      <WikiAccordion
        display="flex"
        withNoDarkBg
        flexDir="column"
        gap={2}
        title="Profile Summary"
        collapsed={{ base: true, xl: false }}
      >
        {contractURL && <ProfileListItem text="Contract" link={contractURL} />}
        {websiteLink && (
          <ProfileListItem text="Official Website" link={websiteLink} />
        )}
        <SocialProfiles socialMetaData={socialLinksData} />
        <ExplorerProfiles socialMetaData={explorerLinksData} />
      </WikiAccordion>
    </VStack>
  )
}

export default ProfileSummary
