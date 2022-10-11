import { ProfileNotifications } from '@/types/ProfileType'

export const NotificationChannelsData: {
  isChecked: boolean
  id: keyof ProfileNotifications
  title: string
  description: string
}[] = [
  {
    id: 'EVERIPEDIA_NOTIFICATIONS',
    title: 'IQ.Wiki Notifications',
    description: 'Occasional updates from the IQ.Wiki team',
    isChecked: false,
  },
  {
    id: 'WIKI_OF_THE_DAY',
    title: 'Wiki of the Day',
    description: 'Get a wiki page recommendation everyday for you to read',
    isChecked: false,
  },
  {
    id: 'WIKI_OF_THE_MONTH',
    title: 'Wiki of the Month',
    description: 'Get a wiki page recommendation every month for you to read',
    isChecked: false,
  },
  {
    id: 'EDIT_NOTIFICATIONS',
    title: 'Edit Notifications',
    description: 'Get notified when someone edit your wiki',
    isChecked: false,
  },
]
