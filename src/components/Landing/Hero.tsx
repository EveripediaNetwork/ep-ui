import React from 'react'
import {
  HStack,
  Heading,
  Icon,
  Link,
  Text,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Logo from '@/components/Elements/Logo/Logo'
import OneInch from '../Icons/1Inch'
import Binance from '../Icons/binance'
import Upbit from '../Icons/upbit'
import { logEvent } from '@/utils/googleAnalytics'

export const Hero = () => {
  const { t } = useTranslation('home')
  return (
    <VStack>
      <Heading
        w={{
          base: '100%',
          md: '80%',
          xl: '65%',
        }}
        textAlign="center"
        px={{ base: '8', md: '0' }}
        fontSize={{ base: '36', md: '48', xl: '60' }}
        fontWeight={{ base: 'semibold', md: 'bold', xl: 'bold' }}
      >
        {t('hero_heading1')}{' '}
        <chakra.span color="brandLinkColor"> {t('hero_heading2')} </chakra.span>{' '}
        {t('hero_heading3')}
      </Heading>
      <VStack>
        <HStack my={3} px={{ base: '5', md: '0' }} mx={'auto'} maxW={'590px'}>
          <Text
            textAlign="center"
            color={'eventTextColor'}
            fontSize={{ base: 'md', lg: '20px' }}
          >
            {t('iq_description')}
          </Text>
          <Link
            border="1px"
            rounded="md"
            borderColor="gray.200"
            _hover={{ bgColor: 'gray.100' }}
            _dark={{
              bgColor: 'rgba(255, 255, 255, 0.08)',
              border: '0',
            }}
            onClick={() =>
              logEvent({
                category: 'Home',
                action: 'Click',
                label: 'IQ Dashboard',
                value: 1,
              })
            }
            href="https://iq.braindao.org/dashboard"
            isExternal
          >
            <Logo boxSize="24px" mx={2} />
            <Text
              px="1"
              as="span"
              textAlign="center"
              color={'eventTextColor'}
              fontSize="md"
            >
              IQ
            </Text>
          </Link>
        </HStack>
        <HStack
          mt={4}
          px={{ base: '5', md: '0' }}
          mx={'auto'}
          maxW={'590px'}
          gap="2"
        >
          <Text
            as="span"
            textAlign="center"
            color={'eventTextColor'}
            fontSize={{ base: 'md', lg: '20px' }}
          >
            Get on
          </Text>
          <Link
            href="https://app.1inch.io/#/1/simple/swap/USDT/IQ"
            isExternal
            onClick={() => {
              logEvent({
                category: 'Home',
                action: 'Click',
                label: '1inch',
                value: 1,
              })
            }}
          >
            <Icon boxSize="8" as={OneInch} aria-label="1 inch" />
          </Link>
          <Link
            href="https://www.binance.com/en/trade/IQ_USDT?theme=dark&type=spot"
            isExternal
            onClick={() =>
              logEvent({
                category: 'Home',
                action: 'Click',
                label: 'Binance',
                value: 1,
              })
            }
          >
            <Icon boxSize="8" as={Binance} aria-label="binance" />
          </Link>
          <Link
            href="https://upbit.com/exchange?code=CRIX.UPBIT.KRW-IQ"
            isExternal
            onClick={() =>
              logEvent({
                category: 'Home',
                action: 'Click',
                label: 'Upbit',
                value: 1,
              })
            }
          >
            <Icon boxSize="8" as={Upbit} aria-label="upbit" />
          </Link>
        </HStack>
      </VStack>
    </VStack>
  )
}
