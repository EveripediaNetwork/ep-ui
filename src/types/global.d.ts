export {}

export type GTagParams = {
  page_title?: string
  page_path?: URL
  send_to?: string
  address?: string
  slug?: string
  reason?: string
  provider?: string
}

declare global {
  interface Window {
    gtag: (a: string, b: string, c: GTagParams) => void
  }
}
