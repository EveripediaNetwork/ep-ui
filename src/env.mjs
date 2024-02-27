import { z } from 'zod'

const server = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  REVALIDATE_PAGES_SECRET: z.string(),
  OPENAI_API_KEY: z.string().optional(),
  PINATA_KEY: z.string().optional(),
  PINATA_SECRET: z.string().optional(),
  DISCORD_WEBHOOK_ID: z.string(),
  DISCORD_WEBHOOK_TOKEN: z.string(),
})

const client = z.object({
  NEXT_PUBLIC_IS_PRODUCTION: z.string(),
  NEXT_PUBLIC_INFURA_ID: z.string(),
  NEXT_PUBLIC_ALCHEMY_API_KEY: z.string(),
  NEXT_PUBLIC_PINATA_GATEWAY_BASE_URL: z.string().url(),
  NEXT_PUBLIC_MAGIC_LINK_API_KEY: z.string(),
  NEXT_PUBLIC_ENS_RPC: z.string().url(),
  NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string(),
  NEXT_PUBLIC_EDITOR_API: z.string().url(),
  NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT3: z.string().startsWith('0x').length(42),
  NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT2: z.string().startsWith('0x').length(42),
  NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT: z.string().startsWith('0x').length(42),
  NEXT_PUBLIC_EDITOR_CONTRACT_ADDRESS: z.string().startsWith('0x').length(42),
  NEXT_PUBLIC_IQ_ADDRESS: z.string().optional(),
  NEXT_PUBLIC_HIIQ_ADDRESS: z.string().optional(),
  NEXT_PUBLIC_BLOCK_EXPLORER_BASE_URL: z.string().url(),
  NEXT_PUBLIC_ALCHEMY_CHAIN: z.string(),
  NEXT_PUBLIC_CHAIN_ID: z.string(),
  NEXT_PUBLIC_WIKI_CONTRACT_ADDRESS: z.string().startsWith('0x').length(42),
  NEXT_PUBLIC_DOMAIN: z.string().url(),
  NEXT_PUBLIC_EP_API: z.string().url(),
  NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string(),
  NEXT_PUBLIC_BOT_API_KEY: z.string(),
})

/**
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  REVALIDATE_PAGES_SECRET: process.env.REVALIDATE_PAGES_SECRET,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  PINATA_KEY: process.env.PINATA_KEY,
  PINATA_SECRET: process.env.PINATA_SECRET,
  NEXT_PUBLIC_IQ_ADDRESS: process.env.NEXT_PUBLIC_IQ_ADDRESS,
  NEXT_PUBLIC_HIIQ_ADDRESS: process.env.NEXT_PUBLIC_HIIQ_ADDRESS,
  NEXT_PUBLIC_EDITOR_CONTRACT_ADDRESS:
    process.env.NEXT_PUBLIC_EDITOR_CONTRACT_ADDRESS,
  NEXT_PUBLIC_WIKI_CONTRACT_ADDRESS:
    process.env.NEXT_PUBLIC_WIKI_CONTRACT_ADDRESS,
  NEXT_PUBLIC_BLOCK_EXPLORER_BASE_URL:
    process.env.NEXT_PUBLIC_BLOCK_EXPLORER_BASE_URL,
  NEXT_PUBLIC_PINATA_GATEWAY_BASE_URL:
    process.env.NEXT_PUBLIC_PINATA_GATEWAY_BASE_URL,
  NEXT_PUBLIC_INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID,
  NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  NEXT_PUBLIC_IS_PRODUCTION: process.env.NEXT_PUBLIC_IS_PRODUCTION,
  NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  NEXT_PUBLIC_ALCHEMY_CHAIN: process.env.NEXT_PUBLIC_ALCHEMY_CHAIN,
  NEXT_PUBLIC_EP_API: process.env.NEXT_PUBLIC_EP_API,
  NEXT_PUBLIC_EDITOR_API: process.env.NEXT_PUBLIC_EDITOR_API,
  NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
  NEXT_PUBLIC_ENS_RPC: process.env.NEXT_PUBLIC_ENS_RPC,
  NEXT_PUBLIC_MAGIC_LINK_API_KEY: process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY,
  NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT:
    process.env.NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT,
  NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT2:
    process.env.NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT2,
  NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT3:
    process.env.NEXT_PUBLIC_EVERIPEDIA_BLOG_ACCOUNT3,
  NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID:
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  NEXT_PUBLIC_BOT_API_KEY: process.env.NEXT_PUBLIC_BOT_API_KEY,
  DISCORD_WEBHOOK_TOKEN: process.env.DISCORD_WEBHOOK_TOKEN,
  DISCORD_WEBHOOK_ID: process.env.DISCORD_WEBHOOK_ID,
}

// Don't touch the part below
// --------------------------

const merged = server.merge(client)

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env)

if (!!process.env.SKIP_ENV_VALIDATION === false) {
  const isServer = typeof window === 'undefined'

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  )

  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    )
    throw new Error('Invalid environment variables')
  }

  // eslint-disable-next-line
  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
        throw new Error(
          process.env.NODE_ENV === 'production'
            ? '❌ Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        )
      return target[/** @type {keyof typeof target} */ (prop)]
    },
  })
}

export { env }
