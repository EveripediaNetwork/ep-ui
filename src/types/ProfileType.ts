export type ProfileNotifications = {
  EVERIPEDIA_NOTIFICATIONS: boolean
  WIKI_OF_THE_DAY: boolean
  WIKI_OF_THE_MONTH: boolean
  EDIT_NOTIFICATIONS: boolean
}

export type ProfileLinks = {
  twitter: string | null
  website: string | null
  instagram: string | null
}

export type AdvancedSettings = {
  SIGN_EDITS_WITH_RELAYER: boolean
}

export type ProfileSettingsData = {
  id: string
  username: string
  bio: string | null
  email: string | null
  banner: string | null
  avatar: string | null
  links: ProfileLinks[]
  notifications: ProfileNotifications[]
  advancedSettings: AdvancedSettings[]
}

export type ProfileData = {
  id: string
  username: string
  bio: string | null
  links: ProfileLinks[]
  banner: string | null
  avatar: string | null
}
