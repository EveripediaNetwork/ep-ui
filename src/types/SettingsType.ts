export type ProfileNotificationsType = {
  EVERIPEDIA_NOTIFICATIONS: boolean
  WIKI_OF_THE_DAY: boolean
  WIKI_OF_THE_MONTH: boolean
}

export type AdvancedSettingsType = {
  SIGN_EDITS_WITH_RELAYER: boolean
}

export type ProfileDataType = {
  id: string
  username: string
  bio: string | null
  email: string | null
  banner: string | null
  avatar: string | null
  links: {
    twitter: string | null
    website: string | null
    instagram: string | null
  }
  notifications: ProfileNotificationsType
  advancedSettings: AdvancedSettingsType
}
