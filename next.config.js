const { i18n } = require('./next-i18next.config')
const cache = require('./pwa-cache')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  disableDevLogs: true,
  runtimeCaching: cache,
  cacheStartUrl: false,
  dynamicStartUrl: false,
})

const moduleExports = {
  i18n,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack(config) {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      'react-native': false,
    }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.optimization.moduleIds = 'deterministic'
    config.optimization.chunkIds = 'deterministic'
    config.optimization.minimize = true
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    config.ignoreWarnings = [{ module: /node_modules\/next-i18next/ }]
    return config
  },

  images: {
    minimumCacheTTL: 31536000,
    domains: [
      'assets.coingecko.com',
      'everipedia.org',
      'ipfs.everipedia.org',
      'gateway.pinata.cloud',
      'i3.ytimg.com',
      'alpha.everipedia.org',
      'raw.githubusercontent.com',
      'beta.everipedia.org',
      'iq.wiki',
      'images.mirror-media.xyz',
      'cdn.buttercms.com',
      'icons.iq.wiki',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ]
  },
  // This is required to support PostHog trailing slash API requests

  trailingSlash: true,
}
module.exports = withPWA(withBundleAnalyzer(moduleExports))
