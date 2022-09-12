import Script from 'next/script'
import React from 'react'
import { useAccount } from 'wagmi'

const GoogleAnalyticsScripts = () => {
  const { address } = useAccount()
  return (
    <>
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics-config" strategy="lazyOnload" defer>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            user_id: '${address}',
            page_path: window.location.pathname,
            send_page_view: false
            });
          `}
      </Script>
    </>
  )
}

export default GoogleAnalyticsScripts
