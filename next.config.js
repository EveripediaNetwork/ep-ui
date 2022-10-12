const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const moduleExports = {
  experimental: {
    runtime: 'experimental-edge',
  },
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
    minimumCacheTTL: 7200,
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
