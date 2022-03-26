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

const AccordionWidget = ({ type, title, titleTag, content }: WikiInsights) => {
  const { hasCopied, onCopy } = useClipboard(content as string)

  const contentTemplate = () => {
    if (type === 'url') {
      const contentURL = content as string
      return (
        <Link color="blue.600" fontSize="14px" href={contentURL}>
          {new URL(contentURL).hostname}
        </Link>
      )
    }
    if (type === 'address') {
      return (
        <HStack>
          <Link href={`https://etherscan.io/address/${content}`}>
            {content}
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
    if (type === 'socials' && content instanceof Array) {
      return (
        <HStack spacing={2}>
          {content.map((social, i) => {
            return (
              <Link target="_blank" href={social.url}>
                <IconButton
                  key={i}
                  aria-label="open social"
                  minW={3}
                  /* eslint-disable */
                  icon={<Icon as={require(`react-icons/ri`)[social.icon]} />}
                  /* eslint-enable */
                  variant="link"
                />
              </Link>
            )
          })}
        </HStack>
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
              <StatArrow type={content.changeDirection} />
              {content.change}
            </StatHelpText>
          </div>
        </Stat>
      )
    }
    return <Text>{content}</Text>
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
