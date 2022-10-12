import { NextSeo } from 'next-seo'
import React from 'react'

const SettingsPageHeader = () => (
  <NextSeo
    title="Settings"
    description="Update your profile and notification settings"
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
