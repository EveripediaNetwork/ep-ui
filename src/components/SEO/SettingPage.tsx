import { NextSeo } from 'next-seo'
import React from 'react'

const SettingsPageHeader = ({ username }: { username: string | undefined }) => (
  <NextSeo
    title={`Settings -${username} `}
    description={`Update your profile and notification settings -${username}`}
    canonical="https://iq.wiki/account/settings"
    openGraph={{
      title: 'Settings',
      description: 'Update your profile and notification settings',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export default SettingsPageHeader
