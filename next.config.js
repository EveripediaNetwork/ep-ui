const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const moduleExports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  webpack5: true,
  webpack(config) {
    config.mode =
      process.env.VERCEL_ENV !== 'production' ? 'production' : 'production'
    config.optimization.moduleIds = 'named'
    config.optimization.runtimeChunk = 'single'
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  styledComponents: true,
  images: {
    domains: [
      'everipedia.org',
      'ipfs.everipedia.org',
      'gateway.pinata.cloud',
      'i3.ytimg.com',
      'alpha.everipedia.org',
      'beta.everipedia.org',
      'iq.wiki',
      'images.mirror-media.xyz',
      'cdn.buttercms.com',
    ],
  },
}
module.exports = withBundleAnalyzer(moduleExports)
