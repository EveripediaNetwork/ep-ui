import React from 'react'
import { Flex, Box, Heading, Link, Text } from '@chakra-ui/react'
import { OurHistoryType } from '@/data/OurHistory'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
interface ParagraphProps {
  text: string
}

const Paragraph: React.FC<ParagraphProps> = ({ text }) => {
  const processText = (inputText: string): React.ReactNode[] => {
    const linkRegex = /<Link href='([^']*)'>(.*?)<\/Link>/g
    const elements: React.ReactNode[] = []
    let lastIndex = 0

    inputText.replace(linkRegex, (match, href, linkText, index) => {
      elements.push(inputText.substring(lastIndex, index))
      lastIndex = index + match.length

      elements.push(
        <Link
          as={NextLink}
          color="brandLinkColor"
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </Link>,
      )

      return match
    })

    elements.push(inputText.substring(lastIndex))

    return elements
  }

  return (
    <Text
      fontSize={{ base: '14px', md: '16px', lg: '18px' }}
      whiteSpace="pre-line"
      fontWeight={500}
    >
      {processText(text)}
    </Text>
  )
}

const OurHistoryCard = ({ year, content }: OurHistoryType) => {
  const { t } = useTranslation('about')

  return (
    <Flex
      gap={{ base: '4', lg: '12' }}
      mb={{ base: 8, md: '10' }}
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Heading fontSize={{ base: '30px', lg: '48px' }} color="brandLinkColor">
        {year}
      </Heading>
      <Box
        px="5"
        py="10"
        border="1px solid"
        borderColor="aboutFeaturesCardBorder"
        bgColor="aboutFeaturesCardBg"
        borderRadius="16px"
      >
        <Paragraph text={t(content)} />
      </Box>
    </Flex>
  )
}

export default OurHistoryCard
