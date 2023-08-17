import * as React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

const fixThemeGlitchScript = `
(
  function(){
    const body = document.body;
    function applyColorMode(mode){
      if(!mode) return;
      console.log("Found mode: ", mode)
      if(mode === 'light'){
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    }

    const colorMode = localStorage.getItem('chakra-ui-color-mode');

    if(!colorMode){
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      console.log("No mode, preferred is dark?: ", prefersDarkMode )
      if(prefersDarkMode) { 
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem('chakra-ui-color-mode', 'dark')
      } 
    } else {
      applyColorMode(colorMode);
    }
  }
)();
`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="icon" href="/images/icons/favicon.ico" type="image/x-icon" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Script
          strategy="beforeInteractive"
          // rome-ignore lint/security/noDangerouslySetInnerHtml: We're setting at compile time so it's safe
          dangerouslySetInnerHTML={{ __html: fixThemeGlitchScript }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
