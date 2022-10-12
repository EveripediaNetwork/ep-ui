const config = {
  iqAddress:
    process.env.NEXT_PUBLIC_IQ_ADDRESS ||
    '0x5E959c60f86D17fb7D764AB69B654227d464E820',
  editorAddress:
    process.env.NEXT_PUBLIC_EDITOR_CONTRACT_ADDRESS ||
    '0xBE5d150ACB420c7eA010C1F525733Eb3c1d26fA1',
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
  isProduction: process.env.NEXT_PUBLIC_IS_PRODUCTION || false,
  alchemyApiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY),
  alchemyChain: process.env.NEXT_PUBLIC_ALCHEMY_CHAIN || 'maticmum',
  graphqlUrl:
    process.env.NEXT_PUBLIC_EP_API || 'https://api.dev.braindao.org/graphql',
  editorGraphqlUrl:
    process.env.NEXT_PUBLIC_EDITOR_API || 'https://api.thegraph.com/subgraphs/name/oleanjikingcode/payout',
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID || '80001',
  chainName: process.env.NEXT_PUBLIC_CHAIN_NAME || 'Mumbai',
  ensRPC: String(process.env.NEXT_PUBLIC_ENS_RPC),
  magicLinkApiKey: String(process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY),
  publicDomain: String(process.env.NEXT_PUBLIC_DOMAIN),
  blogAccount: process.env.NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT || '',
  blogAccount2: process.env.NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT2 || '',
  blogAccount3: process.env.NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT3 || '',
}

export default config
