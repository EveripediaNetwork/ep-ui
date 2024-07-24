import { env } from '@/env.mjs'
import { MagicAuthConnector } from '@magiclabs/wagmi-connector'
import { Chain } from 'wagmi'
import config from '@/config'
import { iqTestnet } from '@/config/wagmi'

export const magicConnector = ({ chains }: { chains: Chain[] }) => {
  return new MagicAuthConnector({
    chains,
    options: {
      apiKey: env.NEXT_PUBLIC_MAGIC_LINK_API_KEY,
      accentColor: '#ea3b87',
      oauthOptions: {
        providers: ['google', 'facebook', 'discord', 'twitter'],
      },
      magicSdkConfiguration: {
        network: {
          rpcUrl: config.isProduction
            ? `https://polygon-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`
            : iqTestnet.rpcUrls.default.http[0],
          chainId: Number(config.chainId),
        },
      },
    },
  })
}
