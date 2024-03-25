import React from 'react'
import { GridItem, Text } from '@chakra-ui/react'
import { Link } from 'react-scroll'
import { GlossaryAlphabetsProps } from '@/types/GlossaryType'

const GlossaryAlphabets = (props: GlossaryAlphabetsProps) => {
  const { shouldBeFixed, heightOfElement, item } = props
  return (
    <GridItem w="100%" cursor="pointer">
      <Link
        activeClass="active"
        to={item}
        spy
        smooth
        offset={
          shouldBeFixed
            ? -(heightOfElement || 284)
            : -(heightOfElement ? heightOfElement + 228 : 512)
        }
        duration={70}
      >
        <Text
          fontWeight="semibold"
          fontSize={{ base: 'md', xl: 'lg' }}
          _hover={{ color: 'brandLinkColor' }}
        >
          {item}
        </Text>
      </Link>
    </GridItem>
  )
}

export default GlossaryAlphabets
