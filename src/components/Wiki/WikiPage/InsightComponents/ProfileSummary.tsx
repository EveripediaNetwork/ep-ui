import type React from 'react'
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
import { CommonMetaIds, type Wiki } from '@everipedia/iq-utils'
import { FiExternalLink } from 'react-icons/fi'
import { shortenText } from '@/utils/textUtils'
import { LinkType, LINK_OPTIONS } from '@/data/WikiLinks'
import { RiExternalLinkLine } from 'react-icons/ri'
import { useTranslation } from 'next-i18next'

const MAX_FOUNDERS_LIST = 3

type ProfileSummaryProps = {
  wiki: Wiki
}

const parseLink = (link: string) =>
  link.startsWith('http') ? link : `https://${link}`

interface ProfileListItemProps {
  title: string
  children: React.ReactNode
  lengthyArr?: { id: string; title: string }[]
}
const ProfileListItem = ({
  title,
  children,
  lengthyArr,
}: ProfileListItemProps) => (
  <HStack
    bgColor="wikiCardItemBg"
    borderRadius={4}
    justify="space-between"
    gap="2"
    align={
      lengthyArr && lengthyArr?.length > MAX_FOUNDERS_LIST
        ? 'initial'
        : 'center'
    }
    p={4}
    flexDirection={
      lengthyArr && lengthyArr?.length > MAX_FOUNDERS_LIST ? 'column' : 'row'
    }
  >
    <Text fontSize="14px" fontWeight="bold" color="linkColor">
      {title}:
    </Text>
    <Box m="0 !important">{children}</Box>
  </HStack>
)

const ProfileSummary = ({ wiki }: ProfileSummaryProps) => {
  const socialMetaData = wiki.metadata.filter((meta) =>
    LINK_OPTIONS.find((option) => option.id === meta.id),
  )

  const { t } = useTranslation('wiki')
  if (!socialMetaData.length) return null

  const socialLinksData = socialMetaData.filter(
    (item) =>
      LINK_OPTIONS.find((option) => option.id === item.id)?.type ===
      LinkType.SOCIAL,
  )
  const explorerLinksData = socialMetaData.filter(
    (item) =>
      LINK_OPTIONS.find((option) => option.id === item.id)?.type ===
      LinkType.EXPLORER,
  )

  const contractURL = socialMetaData.find(
    (item) => item.id === CommonMetaIds.CONTRACT_URL,
  )?.value

  const websiteLink = socialMetaData.find(
    (item) => item.id === CommonMetaIds.WEBSITE,
  )?.value

  return (
    <VStack w="100%" spacing={4} borderRadius={2}>
      <WikiAccordion
        display="flex"
        withNoDarkBg
        flexDir="column"
        gap={2}
        title={t('Profile Summary')}
      >
        {contractURL && (
          <ProfileListItem title={t('Contract')}>
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
          <ProfileListItem title={t('Official Website')}>
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
          <ProfileListItem title={t('Social Profiles')}>
            <Wrap spacing={2}>
              {socialLinksData
                .filter(
                  (item) =>
                    LINK_OPTIONS.find((option) => option.id === item.id)
                      ?.type === LinkType.SOCIAL,
                )
                .map((social, i: number) => {
                  const Ico = LINK_OPTIONS.find(
                    (li) => li.id === social.id,
                  )?.icon
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
          <ProfileListItem title={t('Explorers')}>
            {explorerLinksData.map((item, i) => (
              <HStack key={i}>
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
                  {LINK_OPTIONS.find((option) => option.id === item.id)?.label}
                </Link>
                <Icon color="brandLinkColor" as={RiExternalLinkLine} />
              </HStack>
            ))}
          </ProfileListItem>
        )}
        {wiki.founderWikis && wiki.founderWikis.length > 0 && (
          <ProfileListItem title={t('Founders')} lengthyArr={wiki.founderWikis}>
            <Flex alignItems="start" flexWrap="wrap" gap="1">
              {wiki.founderWikis.map((founder) => (
                <LinkedWikiTag
                  key={founder.id}
                  wikiId={founder.id}
                  wikiTitle={founder.title}
                />
              ))}
            </Flex>
          </ProfileListItem>
        )}
        {wiki.blockchainWikis && wiki.blockchainWikis?.length > 0 && (
          <ProfileListItem
            title={t('Blockchains')}
            lengthyArr={wiki.blockchainWikis}
          >
            <Flex alignItems="start" flexWrap="wrap" gap="1">
              {wiki.blockchainWikis.map((blockchain) => (
                <LinkedWikiTag
                  key={blockchain.id}
                  wikiId={blockchain.id}
                  wikiTitle={blockchain.title}
                />
              ))}
            </Flex>
          </ProfileListItem>
        )}
      </WikiAccordion>
    </VStack>
  )
}

const LinkedWikiTag = ({
  wikiId,
  wikiTitle,
}: {
  wikiId: string
  wikiTitle: string
}) => {
  return (
    <Link w="max-content" href={`/wiki/${wikiId}`}>
      <Tag py="1">{wikiTitle}</Tag>
    </Link>
  )
}

export default ProfileSummary
