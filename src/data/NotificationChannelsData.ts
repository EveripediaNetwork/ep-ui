import { ProfileNotificationsType } from '@/types/ProfileType'

export const NotificationChannelsData: {
  isChecked: boolean
  id: keyof ProfileNotificationsType
  title: string
  description: string
}[] = [
  {
    id: 'EVERIPEDIA_NOTIFICATIONS',
    title: 'Everipedia Notifications',
    description: 'Occasional updates from the Everipedia team',
    isChecked: true,
  },
  {
    id: 'WIKI_OF_THE_DAY',
    title: 'Wiki of the Day',
    description: 'Get a wiki page recommendation everyday for you to read',
    isChecked: true,
  },
  {
    id: 'WIKI_OF_THE_MONTH',
    title: 'Wiki of the Month',
    description: 'Get a wiki page recommendation every month for you to read',
    isChecked: true,
  },
  {
    id: 'EDIT_NOTIFICATIONS',
    title: 'Edit Notifications',
    description: 'Get notified when someone edit your wiki',
    isChecked: true,
  },
]
