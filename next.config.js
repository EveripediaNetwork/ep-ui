module.exports = {
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
    domains: ['picsum.photos', 'everipedia.org'], // for demo data
  },
}
