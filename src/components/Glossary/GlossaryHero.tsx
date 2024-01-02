import {
  Flex,
  Heading,
  VStack,
  chakra,
  Text,
  ChakraProps,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'next-i18next'

const GlossaryHero = React.forwardRef<HTMLParagraphElement, ChakraProps>(
  (props, ref) => {
    const { t } = useTranslation('glossary')
    return (
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
            <chakra.span color="brandLinkColor">
              {' '}
              {t('glossaryTitle1')}
            </chakra.span>{' '}
            {t('glossaryTitle2')}
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
    )
  },
)

export default GlossaryHero
