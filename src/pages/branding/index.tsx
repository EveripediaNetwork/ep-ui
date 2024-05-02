import { BrandingAssets } from '@/components/Branding/BrandingAssets'
import {
  Box,
  Flex,
  Heading,
  Text,
  List,
  ListItem,
  VStack,
  Icon,
  Grid,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import {
  alternateLogoAssets,
  iqLogoAsset,
  braindaoAltLogoAssets,
  braindaoLogoAssets,
  iqgptLogoAssets,
} from '../../components/Branding/brandassets'
import BrandWrapper from '@/components/Branding/BrandWrapper'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const BrandingListItem = ({ content }: { content: string }) => {
  return (
    <ListItem display={'flex'} alignItems={'center'} gap={3}>
      <Flex
        shrink={0}
        justify={'center'}
        justifyItems={'center'}
        align={'center'}
        bgColor={'brand.200'}
        w={'24px'}
        h={'24px'}
        rounded={'full'}
      >
        <Icon as={AiOutlineClose} fontSize={'16px'} color="primaryPink" />
      </Flex>
      <Text fontSize={{ lg: 20 }}>{content}</Text>
    </ListItem>
  )
}

const BrandingPage = () => {
  const [currentViewedAsset, setCurrentViewedAsset] = useState<string>('')
  const { t } = useTranslation('branding')

  return (
    <Box
      _dark={{
        bgColor: '#1A202C',
      }}
    >
      <NextSeo
        title={t('brandingSEOTitle')}
        description={t('brandingSEODescription')}
        openGraph={{
          title: t('brandingSEOTitle'),
          description: t('brandingSEODescription'),
        }}
      />
      <Box>
        <Flex
          justify={'center'}
          align={'center'}
          objectFit="cover"
          textAlign={'center'}
          bgColor={'gray.50'}
          px={5}
          backgroundImage="/images/backgrounds/ranking-bg-light.png"
          backgroundSize="cover"
          borderBottom="1px solid #E2E8F0"
          _dark={{
            bgColor: 'whiteAlpha.50',
            backgroundImage: '/images/backgrounds/careers-background-dark.png',
            borderBottom: 'none',
          }}
          pb={{ base: '50px', lg: '100px', xl: 180 }}
        >
          <Box pt={{ base: '40px', md: '60px', lg: '89px' }} mx={'auto'}>
            <Text color="brandLinkColor">{t('brandingText')}</Text>
            <Heading
              color="careersTextColor"
              fontWeight={'600'}
              fontSize={{ base: '20px', md: '28px', lg: '36px', xl: '48px' }}
            >
              {t('brandingHeading')}
            </Heading>
            <Text
              maxW={{ sm: '70%', xl: '828px' }}
              fontSize={{ lg: '20px', base: 'md', xl: 24 }}
              mt={'8px'}
              mb={'75px'}
              mx={'auto'}
            >
              {t('brandingIntroduction')}
            </Text>
          </Box>
        </Flex>

        <Box
          position={'relative'}
          maxW={{ base: '90%', sm: '70%', lg: '80%', xl: '1140px' }}
          bgColor={'red.100'}
          mx="auto"
        >
          <VStack
            position={'absolute'}
            top={{ base: '-100px', xl: '-150px', '2xl': '-180px' }}
            justify={'center'}
            align={'center'}
            bgColor="brand.50"
            rounded={'12px'}
            textAlign={'center'}
            h={{ xl: '356px' }}
            py={{ base: 5, lg: '50px' }}
            px={{ base: 5, xl: '80px' }}
            mx={'auto'}
            _dark={{ bgColor: 'brand.200' }}
          >
            <Text fontSize={{ lg: '20px', xl: 24 }} color={'gray.800'}>
              {t('brandingParagraph1')}
            </Text>
            <Text fontSize={{ lg: '20px', xl: 24 }} color={'gray.800'}>
              {t('brandingParagraph2')}
            </Text>
          </VStack>
        </Box>

        <Box
          mt={{ base: '230px', sm: '150px', lg: '230px', xl: '266px' }}
          mb={24}
          maxW={{ base: '90%', '2xl': '1280px' }}
          mx="auto"
        >
          <Flex flexDir="column">
            <Heading fontWeight={'600'} fontSize={{ base: '24px', lg: '36px' }}>
              {t('iqLogo')}
            </Heading>
            <Text
              mt={4}
              fontSize={{ lg: '20px', base: 'sm' }}
              whiteSpace="pre-line"
            >
              {t('aboutIQLogoBranding')}
            </Text>
          </Flex>
          <Grid
            mt={10}
            gridTemplateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              xl: 'repeat(3, 1fr)',
            }}
            gap="2rem"
          >
            {alternateLogoAssets.map((item, index) => {
              return (
                <BrandingAssets
                  key={index}
                  bg={item}
                  currentlyViewed={currentViewedAsset}
                  updateSelectedAsset={() => {
                    setCurrentViewedAsset(item.bg)
                  }}
                  dark={item.dark}
                  isBraindao
                />
              )
            })}
          </Grid>
        </Box>

        <BrandWrapper title={t('iqWikiLogo')} brandAsset={iqLogoAsset} />
        <BrandWrapper
          title="BrainDAO"
          brandAsset={braindaoAltLogoAssets}
          isBrainDao
        />
        <BrandWrapper
          title={t('braindaoAlternate')}
          brandAsset={braindaoLogoAssets}
        />
        <BrandWrapper title="IQ GPT" brandAsset={iqgptLogoAssets} />

        <Box bgColor={'bodyBg'}>
          <Box py={24} maxW={{ base: '90%', '2xl': '1280px' }} mx="auto">
            <Flex flexDir="column" gap={5}>
              <Heading fontSize="3xl">{t('brandingRulesHeading')}</Heading>
            </Flex>
            <Flex mt={10}>
              <List display="flex" flexDir="column" gap="10">
                <BrandingListItem content={t('brandingRule1')} />
                <BrandingListItem content={t('brandingRule2')} />
                <BrandingListItem content={t('brandingRule3')} />
                <BrandingListItem content={t('brandingRule4')} />
              </List>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['branding', 'common'])),
    },
  }
}

export default BrandingPage
