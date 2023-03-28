import React from 'react'
import { GridItem, Text } from '@chakra-ui/react'
import { Link } from 'react-scroll'

export type GlossaryAlphabetsProps = {
  shouldBeFixed: boolean
  heightOfElement: number
  item: string
}

const GlossaryAlphabets = ({
  shouldBeFixed,
  heightOfElement,
  item,
}: GlossaryAlphabetsProps) => {
  return (
    <GridItem w="100%" cursor="pointer" textAlign="center">
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
