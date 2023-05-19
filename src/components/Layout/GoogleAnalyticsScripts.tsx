import Script from 'next/script'
import React from 'react'
import { getUserAddressFromCache } from '@/utils/WalletUtils/getUserAddressFromCache'
import { env } from '@/env.mjs'

const GoogleAnalyticsScripts = () => {
  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="afterInteractive" id="google-analytics-config">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
            ${
              typeof getUserAddressFromCache() === 'string' &&
              `gtag('set', 'user_id', ${JSON.stringify(
                getUserAddressFromCache(),
              )})`
            }
          `}
      </Script>
    </>
  )
}

export default GoogleAnalyticsScripts
