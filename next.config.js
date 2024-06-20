const { i18n } = require('./next-i18next.config')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const moduleExports = {
  experimental: {
    turbo: {
      resolveAlias: {
        '@lib/utils': './src/@lib/utils',
      },
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
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
}
module.exports = withBundleAnalyzer(moduleExports)
