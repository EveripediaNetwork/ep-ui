import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'
import Script from 'next/script'
import React from 'react'

const GoogleAnalyticsScripts = () => {
  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="afterInteractive" id="google-analytics-config">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
            gtag('set', 'user_id', ${typeof getUserAddressFromCache() === 'string' ? JSON.stringify(getUserAddressFromCache()) : 'anonymous'})
          `}
      </Script>
    </>
  )
}

export default GoogleAnalyticsScripts
