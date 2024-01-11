import React from 'react'
import {
  Container,
  Stack,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const ErrorPage = () => {
  const router = useRouter()
  const { t } = useTranslation('404')
  return (
    <Container maxW="6xl">
      <Stack
        align="center"
        spacing={{ base: 8, md: 20 }}
        direction={{ base: 'column-reverse', lg: 'row' }}
      >
        <Stack
          mb="20"
          flex={1}
          maxW={{ base: 'md', md: 'xl' }}
          align={{ base: 'center', lg: 'flex-start' }}
          spacing={{ base: 5, md: 8 }}
        >
          <Heading
            display="inline-block"
            fontWeight="bold"
            fontSize={{ base: 'xl', md: '4xl' }}
          >
            {t('404Title')}
          </Heading>
          <Text
            textAlign={{ base: 'center', lg: 'left' }}
            fontSize={{ base: 'md', md: '2xl', lg: 'xl' }}
          >
            {t('404Description')}
          </Text>
          <Button onClick={() => router.push('/')} variant="solid">
            {t('404CTA')}
          </Button>
        </Stack>
        <Box
          position="relative"
          flex="1"
          py={{ base: 16, md: 20 }}
          px={{ base: 10, lg: 2 }}
        >
          <Image
            alt="Astronaut"
            src="/images/svg-images/astronaut.svg"
            h="90%"
            w="90%"
          />
        </Box>
      </Stack>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['404', 'common'])),
    },
  }
}

export default ErrorPage
