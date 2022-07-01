import React from 'react'
import WikiAccordion from '@/components/Wiki/WikiAccordion'
import {
  Center,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { CommonMetaIds, Wiki } from '@/types/Wiki'
import { SOCIAL_MEDIA_OPTIONS } from '@/components/Layout/Editor/Highlights/HighlightsModal/HighlightsModal'

type ProfileSummaryProps = {
  wiki: Wiki
}

const parseLink = (link: string) =>
  link.startsWith('http') ? link : `https://${link}`

const ProfileSummary = (props: ProfileSummaryProps) => {
  const { wiki } = props
  const linkIds = SOCIAL_MEDIA_OPTIONS.map(link => link.id)
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

        {socialMetaData.length !== 0 && (
          <HStack
            bgColor="wikiCardItemBg"
            borderRadius={4}
            justify="space-between"
            align="center"
            p={4}
            spacing={4}
          >
            <HStack>
              <Text fontSize="14px" color="linkColor">
                Social Profiles
              </Text>
            </HStack>
            <Center>
              <HStack spacing={2}>
                {socialMetaData.map((social, i) => {
                  const ico = SOCIAL_MEDIA_OPTIONS.find(
                    li => li.id === social.id,
                  )?.icon
                  return (
                    <Link
                      target="_blank"
                      href={parseLink(social.value)}
                      key={i}
                    >
                      <IconButton
                        key={i}
                        aria-label="open social"
                        minW={3}
                        icon={ico}
                        variant="link"
                      />
                    </Link>
                  )
                })}
              </HStack>
            </Center>
          </HStack>
        )}
      </WikiAccordion>
    </VStack>
  )
}

export default ProfileSummary
