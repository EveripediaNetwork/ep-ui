import { createConfig, http } from 'wagmi'
import { polygon, polygonMumbai } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'
import config from '.'

export type InjectedParameters = {}

export const rpcs: {
  [key: string]: string
} = {
  maticmum: `https://polygon-mumbai.g.alchemy.com/v2/${config.alchemyApiKey}`,
  matic: `https://polygon-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`,
}

export const wagmiConfig = createConfig({
  chains: [polygon, polygonMumbai],
  multiInjectedProviderDiscovery: true,
  transports: {
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
  },
  connectors: [
    walletConnect({ projectId: config.walletConnectProjectId }),
    injected(),
  ],
})
