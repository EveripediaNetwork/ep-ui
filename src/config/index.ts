import { env } from '@/env.mjs'

const config = {
  iqAddress: env.NEXT_PUBLIC_IQ_ADDRESS,
  editorAddress: env.NEXT_PUBLIC_EDITOR_CONTRACT_ADDRESS,
  wikiContractAddress: env.NEXT_PUBLIC_WIKI_CONTRACT_ADDRESS,
  blockExplorerUrl: env.NEXT_PUBLIC_BLOCK_EXPLORER_BASE_URL,
  pinataBaseUrl: env.NEXT_PUBLIC_PINATA_GATEWAY_BASE_URL,
  infuraId: env.NEXT_PUBLIC_INFURA_ID,
  isProduction: env.NEXT_PUBLIC_IS_PRODUCTION,
  alchemyApiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  alchemyChain: env.NEXT_PUBLIC_ALCHEMY_CHAIN,
  graphqlUrl: env.NEXT_PUBLIC_EP_API,
  editorGraphqlUrl: env.NEXT_PUBLIC_EDITOR_API,
  chainId: env.NEXT_PUBLIC_CHAIN_ID,
  ensRPC: env.NEXT_PUBLIC_ENS_RPC,
  magicLinkApiKey: env.NEXT_PUBLIC_MAGIC_LINK_API_KEY,
  publicDomain: env.NEXT_PUBLIC_DOMAIN,
  blogAccount: env.NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT,
  blogAccount2: env.NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT2,
  blogAccount3: env.NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT3,
}

export default config
