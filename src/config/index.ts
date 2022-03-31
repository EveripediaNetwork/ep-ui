const config = {
  iqAddress: '0x579cea1889991f68acc35ff5c3dd0621ff29b0c9',
  thegraph: 'https://api.thegraph.com/subgraphs/name/kesar/wiki-mumbai-v1', // mumbai
  wikiContractAddress:
    process.env.NEXT_PUBLIC_WIKI_CONTRACT_ADDRESS ||
    '0x94bb4c72252d0ae7a98b2b0483Dc4145C0C79059',
  blockExplorerUrl:
    process.env.NEXT_PUBLIC_BLOCK_EXPLORER_BASE_URL ||
    'https://mumbai.polygonscan.com/',
  pinataBaseUrl:
    process.env.NEXT_PUBLIC_PINATA_GATEWAY_BASE_URL ||
    'https://ipfs.everipedia.org/ipfs/',
  infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
  graphqlUrl: 'https://api.dev.braindao.org/graphql',
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID || '80001',
  chainName: process.env.NEXT_PUBLIC_CHAIN_NAME || 'Mumbai',
  epApiBaseUrl:
    process.env.NEXT_PUBLIC_EP_API || 'https://api.dev.braindao.org/',
}

export default config
