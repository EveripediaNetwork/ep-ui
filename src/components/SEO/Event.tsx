import { ArticleJsonLd, NextSeo } from 'next-seo'
import { WikiHeaderProps } from './Wiki'
import { env } from '@/env.mjs'
import { useTranslation } from 'next-i18next'

export const EventHeader = ({
  slug,
  title,
  description,
  mainImage,
  datePublished,
  dateModified,
  author,
  noindex = false,
}: WikiHeaderProps) => {
  return (
    <>
      <ArticleJsonLd
        url={`${env.NEXT_PUBLIC_DOMAIN}/wiki/${slug}`}
        title={title}
        images={[mainImage]}
        datePublished={datePublished || ''}
        dateModified={dateModified || ''}
        authorName={author}
        publisherName="IQWiki"
        publisherLogo={`${env.NEXT_PUBLIC_DOMAIN}/images/icons/favicon.ico`}
        description={description}
      />
      <NextSeo
        title={title}
        description={description}
        noindex={noindex}
        openGraph={{
          title,
          description,
          images: [
            {
              url: `${env.NEXT_PUBLIC_DOMAIN}/_next/image?url=${mainImage}&w=1200&q=95`,
            },
          ],
        }}
        twitter={{
          cardType: 'summary',
          handle: '@IQWIKI',
          site: 'IQWiki',
        }}
      />
    </>
  )
}

export const MainEventHeader = () => {
  const { t } = useTranslation('event')
  return (
    <NextSeo
      title={t('eventSeoTitle')}
      description={t('eventSeoDescription')}
      canonical="https://iq.wiki/event"
      openGraph={{
        title: t('eventOGTitle'),
        description: t('eventOGDescription'),
        images: [
          {
            url: 'https://iq.wiki/images/defaults/og-image-default.png',
            width: 1200,
            height: 630,
            alt: 'IQ.wiki | Crypto Encyclopedia',
          },
        ],
      }}
      twitter={{
        cardType: 'summary',
        handle: '@IQWIKI',
        site: 'IQWiki',
      }}
    />
  )
}
