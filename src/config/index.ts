const config = {
  iqAddress: '0x579cea1889991f68acc35ff5c3dd0621ff29b0c9',
  // thegraph: 'http://localhost:4000/api/dev', // mocked graph
  thegraph: 'https://api.thegraph.com/subgraphs/name/kesar/wiki-mumbai-v1', // mumbai
  // thegraph: 'http://localhost:8000/subgraphs/name/everipedia/contracts', // local graph
  wikiContractAddress:
    process.env.NEXT_PUBLIC_WIKI_CONTRACT_ADDRESS ||
    '0x9332ad5290cf8de41107712ef408eb0c47dcb057',
  blockExplorerUrl: String(process.env.NEXT_PUBLIC_BLOCK_EXPLORER_BASE_URL),
  pinataBaseUrl:
    process.env.NEXT_PUBLIC_PINATA_GATEWAY_BASE_URL ||
    'https://ipfs.everipedia.org',
  infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
  graphqlUrl: 'https://api.dev.braindao.org/graphql',
  chainId: String(process.env.NEXT_PUBLIC_CHAIN_ID),
  chainName: String(process.env.NEXT_PUBLIC_CHAIN_NAME),
  rpcUrl: String(process.env.NEXT_PUBLIC_RPC_URL),
  polygonMainnetChainId: 137,
  mumbaiTestnetChainId: 80001,
  ethereumMainnetChainId: 1,
  binanceSmartChainId: 56,
  epApiBaseUrl:
    process.env.NEXT_PUBLIC_EP_API || 'https://api.dev.braindao.org/',
}

export default config
