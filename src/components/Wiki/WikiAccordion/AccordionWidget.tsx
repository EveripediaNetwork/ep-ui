import React from 'react'
import { WikiInsights } from '@/types/WikiInsightsDataType'
import {
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
} from '@chakra-ui/react'
import { RiCheckboxCircleLine, RiFileCopyLine } from 'react-icons/ri'

const AccordionCard = ({
  type,
  title,
  titleTag,
  content,
  change,
  changeDirection,
}: WikiInsights) => {
  const { hasCopied, onCopy } = useClipboard(content || '')

  const contentTemplate = () => {
    if (type === 'url') {
      return (
        <Link color="blue.600" fontSize="14px" href={content}>
          {content?.replace(/(^\w+:|^)\/\//, '')}
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
    if (type === 'statistic') {
      return (
        <Stat>
          <StatNumber float="right" fontSize={14}>
            {content}
          </StatNumber>
          <div>
            <StatHelpText float="right" m={0}>
              <StatArrow type={changeDirection} />
              {change}
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

export default AccordionCard
