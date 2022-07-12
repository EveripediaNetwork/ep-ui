import React from 'react'
import WikiAccordion from '@/components/Wiki/WikiAccordion'
import {
  Center,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { CommonMetaIds, Wiki } from '@/types/Wiki'
import { LINK_OPTIONS } from '@/components/Layout/Editor/Highlights/HighlightsModal/HighlightsModal'
import { FiExternalLink } from 'react-icons/fi'

type ProfileSummaryProps = {
  wiki: Wiki
}

const parseLink = (link: string) =>
  link.startsWith('http') ? link : `https://${link}`

interface SocialMetaDataInterface {
  id: string
  value: string
}

const SocialProfiles = ({
  socialMetaData,
}: {
  socialMetaData: SocialMetaDataInterface[]
}) => {
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
          <HStack spacing={2}>
            <Text fontSize="14px" fontWeight="bold" color="linkColor">
              Social Profiles:
            </Text>
          </HStack>
          <Center>
            <HStack flexWrap="wrap">
              {socialMetaData
                .filter((item: { id: string }) => {
                  return item.id !== 'website' && item.id !== 'contract_url'
                })
                .map((social: { value: string; id: string }, i: any) => {
                  const ico = LINK_OPTIONS.find(li => li.id === social.id)?.icon
                  return (
                    <Link
                      target="_blank"
                      href={parseLink(social.value)}
                      key={i}
                      rel="nofollow"
                    >
                      <IconButton
                        key={i}
                        aria-label="open social"
                        minW={3}
                        icon={ico}
                        variant="link"
                        fontSize="20px"
                      />
                    </Link>
                  )
                })}
            </HStack>
          </Center>
        </HStack>
      )}
    </>
  )
}

const OfficialSite = ({
  socialMetaData,
}: {
  socialMetaData: SocialMetaDataInterface[]
}) => {
  if (
    socialMetaData.filter((item: { id: string }) => {
      return item.id === 'website'
    }).length === 0
  ) {
    return null
  }
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
          <HStack spacing={2}>
            <Text fontSize="14px" fontWeight="bold" color="linkColor">
              Official site:
            </Text>
          </HStack>
          <Center>
            <HStack flexWrap="wrap" justifyContent="space-between">
              {socialMetaData
                .filter((item: { id: string }) => {
                  return item.id === 'website'
                })
                .map((social: { value: string }) => {
                  return (
                    <Link
                      rel="nofollow"
                      target="_blank"
                      href={parseLink(social.value)}
                      color="brand.500"
                    >
                      <Text>{social.value}</Text>
                    </Link>
                  )
                })}
            </HStack>
          </Center>
        </HStack>
      )}
    </>
  )
}

const ContractLink = ({
  socialMetaData,
}: {
  socialMetaData: SocialMetaDataInterface[]
}) => {
  if (
    socialMetaData.filter((item: { id: string }) => {
      return item.id === 'contract_url'
    }).length === 0
  ) {
    return null
  }
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
          <HStack spacing={2}>
            <Text fontSize="14px" fontWeight="bold" color="linkColor">
              Contract:
            </Text>
          </HStack>
          <Center>
            <HStack flexWrap="wrap" justifyContent="space-between">
              {socialMetaData
                .filter((item: { id: string }) => {
                  return item.id === 'contract_url'
                })
                .map((social: { value: string }) => {
                  return (
                    <Link
                      rel="nofollow"
                      target="_blank"
                      href={parseLink(social.value)}
                      color="brand.500"
                    >
                      <Flex align="center" gap="2">
                        <Text>
                          {social.value.slice(0, 6)}...
                          {social.value.substring(
                            social.value.length - 4,
                            social.value.length,
                          )}
                        </Text>
                        <FiExternalLink color="#ff5caa" fontSize="18px" />
                      </Flex>
                    </Link>
                  )
                })}
            </HStack>
          </Center>
        </HStack>
      )}
    </>
  )
}

const ProfileSummary = (props: ProfileSummaryProps) => {
  const { wiki } = props
  const linkIds = LINK_OPTIONS.map(link => link.id)
  const socialMetaData = wiki.metadata.filter(
    meta => !!meta.value && linkIds.includes(meta.id as CommonMetaIds),
  )
  return (
    <VStack w="100%" spacing={4} borderRadius={2}>
      <WikiAccordion
        display="flex"
        withNoDarkBg
        flexDir="column"
        gap={2}
        title="Profile Summary"
      >
        {/* {sampleProfileSummary.map((item, index) => (
          <AccordionWidget key={index} {...item} />
        ))} */}
        <ContractLink socialMetaData={socialMetaData} />
        <OfficialSite socialMetaData={socialMetaData} />
        <SocialProfiles socialMetaData={socialMetaData} />
      </WikiAccordion>
    </VStack>
  )
}

export default ProfileSummary
