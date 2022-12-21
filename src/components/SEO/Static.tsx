import { NextSeo } from 'next-seo'
import React from 'react'

export const AboutHeader = () => (
  <NextSeo
    title="About"
    description="World's largest crypto knowledge base whose mission is to bring the world's knowledge on-chain through the IQ token."
    canonical="https://iq.wiki/static/about"
    openGraph={{
      title: 'About',
      description:
        "World's largest crypto knowledge base whose mission is to bring the world's knowledge on-chain through the IQ token.",
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export const FaqSEO = () => (
  <NextSeo
    title="FAQ"
    description="Frequently Asked Questions about IQ.Wiki"
    titleTemplate="%s | IQ.Wiki"
    canonical="https://iq.wiki/static/faq"
    openGraph={{
      title: 'FAQ',
      description: 'Frequently Asked Questions about IQ.Wiki',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export const PrivacyPolicySEO = () => (
  <NextSeo
    title="Our Policy"
    description="IQ.Wiki Security center: Your Personal Information is our primary responsibility at IQ.Wiki"
    titleTemplate="%s | IQ.Wiki"
    canonical="https://iq.wiki/static/privacy"
    openGraph={{
      title: 'Our Policy',
      description:
        'IQ.Wiki Security center: Your Personal Information is our primary responsibility at IQ.Wiki',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export const CareersHeader = () => (
  <NextSeo
    title="Jobs"
    description="Join us to spread the knowledge of blockchain | Search Job Openings across Everipedia Network"
    titleTemplate="%s | IQ.Wiki"
    canonical="https://iq.wiki/static/careers"
    openGraph={{
      title: 'Jobs',
      description:
        'Join us to spread the knowledge of blockchain | Search Job Openings across Everipedia Network',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export const CaPrivacyRightsHeader = () => (
  <NextSeo
    title="CA Privacy Rights"
    description="Get Started, Explore and make the most of IQ.Wiki"
    titleTemplate="%s | IQ.Wiki"
    canonical="https://iq.wiki/static/CaPrivacyRights"
    openGraph={{
      title: 'CA Privacy Rights',
      description: 'Get Started, Explore and make the most of IQ.Wiki',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export const TermsHeader = () => (
  <NextSeo
    title="Terms of Service  "
    description="Get Started, Explore and make the most of IQ.Wiki"
    titleTemplate="%s | IQ.Wiki"
    canonical="https://iq.wiki/static/terms"
    openGraph={{
      title: 'Terms of Service',
      description: 'Get Started, Explore and make the most of IQ.Wiki',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export const GuidelinesHeader = () => (
  <NextSeo
    title="Our Guidelines"
    description="IQ.Wiki guidelines for the community and network"
    titleTemplate="%s | IQ.Wiki"
    canonical="https://iq.wiki/static/guidelines"
    openGraph={{
      title: 'Our Guidelines',
      description: 'IQ.Wiki guidelines for the community and network',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)
