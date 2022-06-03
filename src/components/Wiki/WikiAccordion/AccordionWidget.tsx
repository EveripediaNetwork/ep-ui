import React from 'react'
import { WikiInsights } from '@/types/WikiInsightsDataType'
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
import shortenAccount from '@/utils/shortenAccount'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { useENSData } from '@/hooks/useENSData'

const AccordionWidget = ({ type, title, titleTag, content }: WikiInsights) => {
  const { hasCopied, onCopy } = useClipboard(content as string)
  const [, username] = useENSData((type === 'address' && typeof content === 'string') ?  content : '')
  const contentTemplate = () => {
    if (type === 'url') {
      const contentURL = content as string
      return (
        <Link
          target="_blank"
          color="brand.500"
          fontSize="14px"
          href={contentURL}
        >
          {new URL(contentURL).hostname}
        </Link>
      )
    }
    if (type === 'address') {
      return (
        <HStack>
          <Link
            target="_blank"
            href={`https://etherscan.io/address/${content}`}
          >
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
    }
    if (type === 'account' && typeof content === 'string') {
      return (
        <HStack>
        <DisplayAvatar size="16" address={content} />
        <Link fontSize="xs" href={`/account/${content}`} color="brand.500">
          {username || shortenAccount(content || '')}
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
    return <Text fontSize="xs">{content.toString()}</Text>
  }
  return (
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
