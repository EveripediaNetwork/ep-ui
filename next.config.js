const { i18n } = require('./next-i18next.config')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const moduleExports = {
  i18n,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  webpack(config) {
    config.optimization.moduleIds = 'named'
    config.optimization.runtimeChunk = 'single'
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
