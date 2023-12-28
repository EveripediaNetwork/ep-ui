import {
  Flex,
  Heading,
  VStack,
  chakra,
  Text,
  ChakraProps,
} from '@chakra-ui/react'
import React from 'react'
import { TFunction } from 'i18next'

interface GlossaryHeroProps extends ChakraProps {
  t: TFunction<'glossary', undefined>
}

const GlossaryHero = React.forwardRef<HTMLParagraphElement, GlossaryHeroProps>(
  ({ t, ...props }, ref) => (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      justify="space-between"
      px={{ base: 3, lg: 10 }}
      {...props}
    >
      <VStack
        w="full"
        alignItems="center"
        textAlign="center"
        spacing={3}
        my={14}
      >
        <Heading w="full" fontSize={{ base: '32', md: '42', lg: '4xl' }}>
          <chakra.span color="brandLinkColor"> IQ.wiki</chakra.span> Glossary
        </Heading>
        <Text
          w={{ base: '90%', md: '80%', lg: '90%', xl: '80%', '2xl': '60%' }}
          fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }}
          ref={ref}
        >
          {t('glossaryHero')}
        </Text>
      </VStack>
    </Flex>
  ),
)

export default GlossaryHero
