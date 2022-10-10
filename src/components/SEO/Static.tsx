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
      type: 'website',
      site_name: 'IQ.Wiki',
      images: [
        {
          url: 'https://iq.wiki/android-chrome-512x512.png',
          width: 512,
          height: 512,
          alt: 'IQ.Wiki | Crypto Encyclopedia',
        },
      ],
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
    title="FAQ  "
    description="Frequently Asked Questions about IQ.Wiki"
    titleTemplate="%s | IQ.Wiki"
    canonical="https://iq.wiki/static/faq"
    openGraph={{
      title: 'FAQ  ',
      description: 'Frequently Asked Questions about IQ.Wiki',
      type: 'website',
      site_name: 'IQ.Wiki',
      images: [
        {
          url: 'https://iq.wiki/android-chrome-512x512.png',
          width: 512,
          height: 512,
          alt: 'IQ.Wiki | Crypto Encyclopedia',
        },
      ],
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
      type: 'website',
      site_name: 'IQ.Wiki',
      images: [
        {
          url: 'https://iq.wiki/android-chrome-512x512.png',
          width: 512,
          height: 512,
          alt: 'IQ.Wiki | Crypto Encyclopedia',
        },
      ],
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
    title="Jobs | Opportunities at"
    description="Join us to spread the knowledge of blockchain | Search Job Openings across Everipedia Network"
    titleTemplate="%s | IQ.Wiki"
    canonical="https://iq.wiki/static/careers"
    openGraph={{
      title: 'Jobs | Opportunities at',
      description:
        'Join us to spread the knowledge of blockchain | Search Job Openings across Everipedia Network',
      type: 'website',
      site_name: 'IQ.Wiki',
      images: [
        {
          url: 'https://iq.wiki/android-chrome-512x512.png',
          width: 512,
          height: 512,
          alt: 'IQ.Wiki | Crypto Encyclopedia',
        },
      ],
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
    title="IQ.Wiki Terms of Service | Largest Blockchain & Crypto Encyclopedia "
    description="Get Started, Explore and make the most of IQ.Wiki"
    titleTemplate="%s | IQ.Wiki"
    canonical="https://iq.wiki/static/terms"
    openGraph={{
      title:
        'IQ.Wiki Terms of Service | Largest Blockchain & Crypto Encyclopedia',
      description: 'Get Started, Explore and make the most of IQ.Wiki',
      type: 'website',
      site_name: 'IQ.Wiki',
      images: [
        {
          url: 'https://iq.wiki/android-chrome-512x512.png',
          width: 512,
          height: 512,
          alt: 'IQ.Wiki | Crypto Encyclopedia',
        },
      ],
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
      type: 'website',
      site_name: 'IQ.Wiki',
      images: [
        {
          url: 'https://iq.wiki/android-chrome-512x512.png',
          width: 512,
          height: 512,
          alt: 'IQ.Wiki | Crypto Encyclopedia',
        },
      ],
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)
