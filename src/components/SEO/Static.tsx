import { NextSeo } from 'next-seo'
import React from 'react'
import { useTranslation } from 'next-i18next'

export const AboutHeader = () => {
  const { t } = useTranslation('about')

  return (
    <NextSeo
      title={t('AboutSEOTitle')}
      description={t('AboutSEODescription')}
      canonical="https://iq.wiki/static/about"
      openGraph={{
        title: t('AboutSEOTitle'),
        description: t('AboutSEODescription'),
      }}
      twitter={{
        cardType: 'summary_large_image',
        handle: '@IQWiki',
        site: 'IQWiki',
      }}
    />
  )
}

export const FaqSEO = () => (
  <NextSeo
    title="FAQ"
    description="Frequently Asked Questions about IQ.wiki"
    titleTemplate="%s | IQ.wiki"
    canonical="https://iq.wiki/static/faq"
    openGraph={{
      title: 'FAQ',
      description: 'Frequently Asked Questions about IQ.wiki',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@IQWiki',
      site: 'IQWiki',
    }}
  />
)

export const PrivacyPolicySEO = () => (
  <NextSeo
    title="Our Policy"
    description="IQ.wiki Security center: Your Personal Information is our primary responsibility at IQ.wiki"
    titleTemplate="%s | IQ.wiki"
    canonical="https://iq.wiki/static/privacy"
    openGraph={{
      title: 'Our Policy',
      description:
        'IQ.wiki Security center: Your Personal Information is our primary responsibility at IQ.wiki',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@IQWiki',
      site: 'IQWiki',
    }}
  />
)

export const CareersHeader = () => (
  <NextSeo
    title="Jobs"
    description="Join us to spread the knowledge of blockchain | Search Job Openings across IQ.wiki Network"
    titleTemplate="%s | IQ.wiki"
    canonical="https://iq.wiki/careers"
    openGraph={{
      title: 'Jobs',
      description:
        'Join us to spread the knowledge of blockchain | Search Job Openings across IQ.wiki Network',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@IQWiki',
      site: 'IQWiki',
    }}
  />
)

export const CaPrivacyRightsHeader = () => (
  <NextSeo
    title="CA Privacy Rights"
    description="Get Started, Explore and make the most of IQ.wiki"
    titleTemplate="%s | IQ.wiki"
    canonical="https://iq.wiki/static/CaPrivacyRights"
    openGraph={{
      title: 'CA Privacy Rights',
      description: 'Get Started, Explore and make the most of IQ.wiki',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@IQWiki',
      site: 'IQWiki',
    }}
  />
)

export const TermsHeader = () => (
  <NextSeo
    title="Terms of Service  "
    description="Get Started, Explore and make the most of IQ.wiki"
    titleTemplate="%s | IQ.wiki"
    canonical="https://iq.wiki/static/terms"
    openGraph={{
      title: 'Terms of Service',
      description: 'Get Started, Explore and make the most of IQ.wiki',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@IQWiki',
      site: 'IQWiki',
    }}
  />
)

export const GuidelinesHeader = () => {
  const { t } = useTranslation('guidelines')

  return (
    <NextSeo
      title={t('guidelinesSEOTitle')}
      description={t('guidelinesSEODescription')}
      titleTemplate="%s | IQ.wiki"
      canonical="https://iq.wiki/static/guidelines"
      openGraph={{
        title: t('guidelinesSEOTitle'),
        description: t('guidelinesSEODescription'),
      }}
      twitter={{
        cardType: 'summary_large_image',
        handle: '@IQWiki',
        site: 'IQWiki',
      }}
    />
  )
}
