import React from 'react'
import {
  Box,
  HStack,
  Link,
  Text,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  Center,
  Tag,
  IconButton,
  useClipboard,
  Icon,
} from '@chakra-ui/react'
import {
  RiCheckboxCircleLine,
  RiFileCopyLine,
  RiShareBoxLine,
} from 'react-icons/ri'
import { shortenAccount } from '@/utils/textUtils'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { useENSData } from '@/hooks/useENSData'
import { WikiInsights } from '@/types/WikiInsightsDataType'
import { getUsername } from '@/utils/DataTransform/getUsername'
import NextLink from 'next/link'

const AccordionURLTemplate = ({ contentURL }: { contentURL: string }) => (
  <Link
    target="_blank"
    color="brandLinkColor"
    fontSize="14px"
    href={contentURL}
  >
    {new URL(contentURL).hostname}
  </Link>
)

const AccordionAddressTemplate = ({
  content,
  onCopy,
  hasCopied,
}: {
  content: string
  onCopy: () => void
  hasCopied: boolean
}) => (
  <HStack>
    <Link as={NextLink} target="_blank" href={`https://etherscan.io/address/${content}`}>
      {shortenAccount(content)}
    </Link>
    <IconButton
      onClick={onCopy}
      aria-label="copy address"
      minW={3}
      icon={hasCopied ? <RiCheckboxCircleLine /> : <RiFileCopyLine />}
      variant="link"
    />
  </HStack>
)

const AccordionWidget = ({ type, title, titleTag, content }: WikiInsights) => {
  const { hasCopied, onCopy } = useClipboard(content as string)
  const [, userENSDomain] = useENSData(type === 'account' ? content.id : '')
  const contentTemplate = () => {
    if (type === 'url') {
      const contentURL = content as string
      return <AccordionURLTemplate contentURL={contentURL} />
    }

    if (type === 'address') {
      return (
        <AccordionAddressTemplate
          onCopy={onCopy}
          hasCopied={hasCopied}
          content={content}
        />
      )
    }

    if (type === 'account') {
      return (
        <HStack>
          <DisplayAvatar
            alt={content.profile?.username}
            size={16}
            address={content.id}
            avatarIPFS={content.profile?.avatar}
          />
          <Link
            as={NextLink}
            fontSize="xs"
            href={`/account/${content.id}`}
            color="brandLinkColor"
          >
            {getUsername(content, userENSDomain)}
          </Link>
        </HStack>
      )
    }
    if (type === 'explorers' && content instanceof Array) {
      return (
        <Box>
          {content.map((explorer, i) => (
            <HStack key={i}>
              <Link
                as={NextLink}
                target="_blank"
                display="block"
                fontSize="14px"
                key={explorer}
                href={explorer}
              >
                {new URL(explorer).hostname}
              </Link>
              <Icon minW={3} as={RiShareBoxLine} />
            </HStack>
          ))}
        </Box>
      )
    }

    if (type === 'statistic') {
      return (
        <Stat>
          <StatNumber float="right" fontSize={14}>
            {content.value}
          </StatNumber>
          <div>
            <StatHelpText float="right" m={0}>
              {content.changeDirection && (
                <StatArrow type={content.changeDirection} />
              )}
              {content.change}
            </StatHelpText>
          </div>
        </Stat>
      )
    }

    if (type === 'market-statistics') {
      return (
        <Stat>
          <StatNumber float="right" fontSize={14}>
            {content.value}
          </StatNumber>
        </Stat>
      )
    }

    return <Text fontSize="xs">{content.toString()}</Text>
  }
  return (
    <HStack
      bgColor="wikiCardItemBg"
      borderRadius={8}
      justify="space-between"
      align="center"
      p={4}
      spacing={4}
    >
      <HStack>
        <Text fontSize="14px" fontWeight="bold" color="linkColor">
          {title}
        </Text>
        {titleTag && (
          <Tag size="sm" fontSize={10} variant="solid">
            {titleTag}
          </Tag>
        )}
      </HStack>
      <Center>{contentTemplate()}</Center>
    </HStack>
  )
}

export default AccordionWidget
