import React from 'react'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'

const ActivityHeader = () => {
  const { t } = useTranslation('common')

  return (
    <NextSeo
      title={t('recentActivity')}
      description={t('checkOutRecentActivity')}
      canonical="https://iq.wiki/static/activity"
      openGraph={{
        title: t('recentActivity'),
        description: t('checkOutRecentActivity'),
      }}
      twitter={{
        cardType: 'summary_large_image',
        handle: '@IQWIKI',
        site: 'IQWiki',
      }}
    />
  )
}

export default ActivityHeader
