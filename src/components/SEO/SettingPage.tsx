import { NextSeo } from 'next-seo'
import React from 'react'
import { useTranslation } from 'next-i18next'

const SettingsPageHeader = ({ username }: { username: string | undefined }) => {
  const { t } = useTranslation('settings')

  return (
    <NextSeo
      title={t('settingsSeoTitlePart') + username}
      description={t('settingsSeoDescriptionPart') + username}
      canonical="https://iq.wiki/settings/account"
      openGraph={{
        title: t('settingsSeoTitle'),
        description: t('settingsSeoDescription'),
      }}
      twitter={{
        cardType: 'summary_large_image',
        handle: '@IQWiki',
        site: 'IQWiki',
      }}
    />
  )
}

export default SettingsPageHeader
