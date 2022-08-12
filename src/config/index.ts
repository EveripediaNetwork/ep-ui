const config = {
  iqAddress: '0x579cea1889991f68acc35ff5c3dd0621ff29b0c9',
  iqTestNetAddress: '0x5E959c60f86D17fb7D764AB69B654227d464E820',
  wikiContractAddress:
    process.env.NEXT_PUBLIC_WIKI_CONTRACT_ADDRESS ||
    '0x94bb4c72252d0ae7a98b2b0483Dc4145C0C79059',
  blockExplorerUrl:
    process.env.NEXT_PUBLIC_BLOCK_EXPLORER_BASE_URL ||
    'https://mumbai.polygonscan.com',
  pinataBaseUrl:
    process.env.NEXT_PUBLIC_PINATA_GATEWAY_BASE_URL ||
    'https://ipfs.everipedia.org/ipfs/',
  infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
  alchemyApiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY),
  alchemyChain: process.env.NEXT_PUBLIC_ALCHEMY_CHAIN || 'maticmum',
  graphqlUrl:
    process.env.NEXT_PUBLIC_EP_API || 'https://api.dev.braindao.org/graphql',
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID || '80001',
  chainName: process.env.NEXT_PUBLIC_CHAIN_NAME || 'Mumbai',
  ensRPC: String(process.env.NEXT_PUBLIC_ENS_RPC),
  magicLinkApiKey: String(process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY),
  publicDomain: String(process.env.NEXT_PUBLIC_DOMAIN),
  baseArchiveUrl: 'https://archive.everipedia.org',
  blogAccount: process.env.NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT || '',
}

export default config
