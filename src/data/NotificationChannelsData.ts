import { ProfileNotifications } from '@/types/ProfileType'

export const NotificationChannelsData: {
  isChecked: boolean
  id: keyof ProfileNotifications
  title: string
  description: string
}[] = [
  {
    id: 'EVERIPEDIA_NOTIFICATIONS',
    title: 'IQ.wiki Notifications',
    description: 'Occasional updates from the IQ.wiki team',
    isChecked: false,
  },
]
