const { i18n } = require('./next-i18next.config')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  disable: process.env.NODE_ENV === 'development',
  disableDevLogs: true,
})

const moduleExports = {
  i18n,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack(config, { isServer }) {
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
    if (!isServer) {
      const workboxPluginIndex = config.plugins.findIndex(
        (plugin) => plugin.constructor.name === 'GenerateSW',
      )

      if (workboxPluginIndex !== -1) {
        config.plugins.splice(workboxPluginIndex, 1)
      }

      const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
      config.plugins.push(
        new WorkboxWebpackPlugin.GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
        }),
      )
    }

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
