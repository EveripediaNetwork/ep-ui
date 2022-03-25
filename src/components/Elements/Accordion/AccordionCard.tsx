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
} from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleLine, RiFileCopyLine } from 'react-icons/ri'

const AccordionCard = ({
  title,
  titleTag,
  content,
  statChanged,
  statChangedDirection,
  isAddress,
  isTimedStatistic,
  isURL,
  isTitleTagged,
}: {
  title: string
  titleTag?: string
  content?: string
  statChanged?: string
  statChangedDirection?: 'increase' | 'decrease'
  isAddress?: boolean
  isTimedStatistic?: boolean
  isURL?: boolean
  isTitleTagged?: boolean
}) => {
  const { hasCopied, onCopy } = useClipboard(content || '')
  const titleTemplate = () => {
    if (isTitleTagged) {
      return (
        <HStack>
          <Text fontSize="14px" color="linkColor">
            {title}
          </Text>
          <Tag size="sm" fontSize={10} variant="solid">
            {titleTag}
          </Tag>
        </HStack>
      )
    }
    return (
      <Text fontSize="14px" color="linkColor">
        {title}
      </Text>
    )
  }
  const contentTemplate = () => {
    if (isURL) {
      return (
        <Link color="blue.600" fontSize="14px" href={content}>
          {content?.replace(/(^\w+:|^)\/\//, '')}
        </Link>
      )
    }
    if (isAddress) {
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
    if (isTimedStatistic) {
      return (
        <Stat>
          <StatNumber float="right" fontSize={14}>
            {content}
          </StatNumber>
          <div>
            <StatHelpText float="right" m={0}>
              <StatArrow type={statChangedDirection} />
              {statChanged}
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
      <Box whiteSpace="nowrap">{titleTemplate()}</Box>
      <Center>{contentTemplate()}</Center>
    </HStack>
  )
}

export default AccordionCard
