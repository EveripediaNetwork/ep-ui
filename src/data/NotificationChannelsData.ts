import { ProfileNotificationsType } from '@/types/SettingsType'

export const NotificationChannelsData: {
  id: keyof ProfileNotificationsType
  title: string
  description: string
}[] = [
  {
    id: 'EVERIPEDIA_NOTIFICATIONS',
    title: 'Everipedia Notifications',
    description: 'Occasional updates from the Everipedia team',
  },
  {
    id: 'WIKI_OF_THE_DAY',
    title: 'Wiki of the Day',
    description: 'Get a wiki page recommendation everyday for you to read',
  },
  {
    id: 'EVERIPEDIA_NOTIFICATIONS',
    title: 'Edit Notifications',
    description: 'Get notified when someone edit your wiki',
  },
]
