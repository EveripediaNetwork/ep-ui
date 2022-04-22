
export const pageView = (url: URL) => {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const logEvent = ({
  action,
  params,
}: {
  action: string
  params: any
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, params)
  }
}
