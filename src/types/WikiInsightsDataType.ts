import { User } from './Wiki'

export type WikiInsights =
  | {
      type: 'statistic'
      title: string
      titleTag?: string
      content: {
        value: string
        change: string
        changeDirection?: 'increase' | 'decrease'
      }
    }
  | {
      type: 'url' | 'address' | 'text'
      title: string
      titleTag?: string
      content: string
    }
  | {
      type: 'account'
      title: string
      titleTag?: string
      content: User
    }
  | {
      type: 'explorers'
      title: string
      titleTag?: string
      content: Array<string>
    }
  | {
      type: 'socials'
      title: string
      titleTag?: string
      content: Array<{
        icon: string
        url: string
      }>
    }
  | {
      type: 'market-statistics'
      title: string
      titleTag?: string
      content: {
        value: string
      }
    }

export type RelatedMedia =
  | {
      type: 'image' | 'youtube' | 'vimeo' | 'iframe' | 'audio'
      link: string
      caption?: string
    }
  | {
      type: 'video'
      thumbnail: string
      link: string
      caption?: string
    }
