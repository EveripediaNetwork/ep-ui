import Document, { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentProps } from 'next/document'
import i18nextConfig from '../../next-i18next.config'

type Props = DocumentProps

class MyDocument extends Document<Props> {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale

    return (
      <Html lang={currentLocale} className="">
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
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
