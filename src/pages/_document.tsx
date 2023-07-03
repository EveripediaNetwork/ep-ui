import * as React from 'react'
import NextDocument, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ColorMode } from '@chakra-ui/react'
import theme from '@/theme'

type MaybeColorMode = ColorMode | undefined

function parseCookie(cookie: string, key: string): MaybeColorMode {
  const match = cookie.match(new RegExp(`(^| )${key}=([^;]+)`))
  return match?.[2] as MaybeColorMode
}
export default class Document extends NextDocument<{ colorMode: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    let colorMode: MaybeColorMode = theme.config.initialColorMode

    if (ctx.req?.headers.cookie) {
      colorMode =
        parseCookie(ctx.req.headers.cookie, 'chakra-ui-color-mode') ||
        theme.config.initialColorMode
    }

    return { ...initialProps, colorMode }
  }

  render() {
    const { colorMode } = this.props
    return (
      <Html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
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
        </body>
      </Html>
    )
  }
}
