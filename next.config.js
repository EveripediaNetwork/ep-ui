const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  reactStrictMode: true,
  webpack5: true,
  webpack(config) {
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
      'picsum.photos',
      'everipedia.org',
      'ipfs.everipedia.org',
      'lh3.googleusercontent.com',
      'gateway.pinata.cloud'
    ], // for demo data
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
