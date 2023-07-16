import * as React from 'react'
import NextDocument, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ColorMode } from '@chakra-ui/react'

type MaybeColorMode = ColorMode | undefined

function parseCookie(cookie: string, key: string): MaybeColorMode {
  const match = cookie.match(new RegExp(`(^| )${key}=([^;]+)`))
  return match?.[2] as MaybeColorMode
}

export default class Document extends NextDocument<{ colorMode: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    let colorMode: MaybeColorMode

    if (ctx.req?.headers.cookie) {
      colorMode = parseCookie(ctx.req.headers.cookie, 'chakra-ui-color-mode')
    }

    return { ...initialProps, colorMode }
  }

  render() {
    const { colorMode } = this.props
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link
            rel="icon"
            href="/images/icons/favicon.ico"
            type="image/x-icon"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body className={`chakra-ui-${colorMode}`}>
          <Main />
          <NextScript />
          <script
            // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  function parseCookie(cookie, key) {
                    const match = cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
                    return match?.[2];
                  }

                  const storageKey = 'chakra-ui-color-mode';
                  const colorModeInLocalStorage = localStorage.getItem(storageKey);

                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const initialColorMode = colorModeInLocalStorage || (prefersDark ? 'dark' : 'light');

                  const cookieColorMode = parseCookie(document.cookie, 'chakra-ui-color-mode');
                  const colorMode = cookieColorMode || initialColorMode;

                  document.documentElement.setAttribute('data-theme', colorMode);
                  document.documentElement.style.colorScheme = colorMode;

                  localStorage.setItem(storageKey, colorMode);
                })();`,
            }}
          />
        </body>
      </Html>
    )
  }
}
