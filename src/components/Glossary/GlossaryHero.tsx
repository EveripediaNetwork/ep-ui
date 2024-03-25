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
        borderBottom="1px"
        borderBottomColor="carouselArrowBorderColor"
        {...props}
      >
        <VStack
          w="full"
          alignItems="start"
          textAlign="start"
          spacing={3}
          my={{ base: '4', lg: '8' }}
        >
          <Heading w="full" fontSize={{ base: '16', md: '42', lg: '4xl' }}>
            <chakra.span color="brandLinkColor">
              {' '}
              {t('glossaryTitle1')}
            </chakra.span>{' '}
            {t('glossaryTitle2')}
          </Heading>
          <Text fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }} ref={ref}>
            {t('glossaryHero')}
          </Text>
        </VStack>
      </Flex>
    )
  },
)

export default GlossaryHero
