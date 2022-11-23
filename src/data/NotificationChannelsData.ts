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
]
