module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  webpack5: true,
  assetPrefix: './',
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
    loader: 'custom',
    // path: 'https://ep.on.fleek.co',
    domains: [
      'picsum.photos',
      'everipedia.org',
      'ipfs.everipedia.org',
      'lh3.googleusercontent.com',
      'gateway.pinata.cloud',
    ], // for demo data
  },
}
