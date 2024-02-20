import { env } from '@/env.mjs'
import { MagicAuthConnector } from '@magiclabs/wagmi-connector'
import { Chain } from 'wagmi'

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const rainbowMagicConnector = ({ chains }: { chains: Chain[] }) => ({
  id: 'magic',
  name: 'Magic',
  iconUrl: 'https://svgshare.com/i/pXA.svg',
  iconBackground: 'white',
  createConnector: () => ({
    connector: new MagicAuthConnector({
      chains,
      options: {
        customLogo: `${getBaseUrl()}/images/iq-logo.svg`,
        apiKey: env.NEXT_PUBLIC_MAGIC_LINK_API_KEY,
        accentColor: '#ea3b87',
        oauthOptions: {
          providers: ['google', 'facebook', 'twitter', 'discord'],
        },
        isDarkMode: false,
        magicSdkConfiguration: {
          network: {
            rpcUrl: 'https://rpc.ankr.com/eth',
            chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
          },
        },
      },
    }),
  }),
})
