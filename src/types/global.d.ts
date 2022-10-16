export {}

export type GTagParams = {
  event_category: string
  event_label: string
  value: number
}

declare global {
  interface Window {
    gtag: (a: string, b: string, c: GTagParams) => void
  }
}
