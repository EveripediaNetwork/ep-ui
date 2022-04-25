export const pageView = (url: URL) => {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_path: url,
      send_to: GA_TRACKING_ID,
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
