const { withSentryConfig } = require('@sentry/nextjs')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const moduleExports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  webpack5: true,
  webpack(config, {isServer}) {
    config.mode = process.env.VERCEL_ENV !== 'production' ? 'production' : 'production';
    config.optimization.moduleIds = 'named';
    config.optimization.runtimeChunk = 'single';

    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        '@sentry': {
          test: /[\\/]node_modules[\\/](@sentry)[\\/]/,
          name: '@sentry',
          priority: 10,
          reuseExistingChunk: false,
        },
      };
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    console.log({...config});
    return config
  },
  styledComponents: true,
  images: {
    domains: [
      'picsum.photos',
      'everipedia.org',
      'ipfs.everipedia.org',
      'lh3.googleusercontent.com',
      'gateway.pinata.cloud',
      'i3.ytimg.com',
      'alpha.everipedia.org',
      'beta.everipedia.org',
      'images.mirror-media.xyz',
      'cdn.buttercms.com',
    ],
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
  dryRun: process.env.VERCEL_ENV !== 'production',
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = withSentryConfig(
  withBundleAnalyzer(moduleExports),
  sentryWebpackPluginOptions,
)
