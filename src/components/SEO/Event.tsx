import { NextSeo } from 'next-seo'
import { useTranslation } from 'react-i18next'

const EventHeader = () => {
  const { t } = useTranslation('event')
  return (
    <NextSeo
      title={t('event')}
      description={t('eventSEODescription')}
      canonical="https://iq.wiki/event"
      openGraph={{
        title: t('event'),
        description: t('eventSEODescription'),
      }}
      twitter={{
        cardType: 'summary_large_image',
        handle: '@IQWIKI',
        site: 'IQWiki',
      }}
    />
  )
}

export default EventHeader
