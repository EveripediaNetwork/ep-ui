import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'

const EventHeader = () => {
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

export default EventHeader
