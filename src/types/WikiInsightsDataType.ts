export type WikiInsights =
  | {
      type: 'statistic'
      title: string
      titleTag?: string
      content: {
        value: string
        change: string
        changeDirection: 'increase' | 'decrease'
      }
    }
  | {
      type: 'url' | 'address' | 'text'
      title: string
      titleTag?: string
      content: string
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

export type RelatedMedia = {
  type: 'image' | 'video' | 'youtube' | 'vimeo' | 'iframe' | 'audio'
  link: string
  caption?: string
}
