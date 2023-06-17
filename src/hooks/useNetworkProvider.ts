import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import config from '@/config'
import networkMap from '@/data/NetworkMap'
import { ProviderDataType } from '@/types/ProviderDataType'
import detectEthereumProvider from '@metamask/detect-provider'

export const useNetworkProvider = () => {
   const [connectedChainId, setConnectedChainId] = useState<string>()
   const { isConnected } = useAccount()

   const { chainId } =
     config.alchemyChain === 'maticmum'
       ? networkMap.MUMBAI_TESTNET
       : networkMap.POLYGON_MAINNET

   const [detectedProvider, setDetectedProvider] =
     useState<ProviderDataType | null>(null)

   useEffect(() => {
     const getConnectedChain = async (provider: ProviderDataType) => {
       const connectedChainId = await provider.request({
         method: 'eth_chainId',
       })
       setConnectedChainId(connectedChainId)
     }

     const getDetectedProvider = async () => {
       const provider = (await detectEthereumProvider({
         silent: true,
       })) as ProviderDataType
       setDetectedProvider(provider as ProviderDataType)
       if (provider) getConnectedChain(provider)
     }

     if (!detectedProvider) {
       getDetectedProvider()
     } else {
       getConnectedChain(detectedProvider)
       detectedProvider.on('chainChanged', newlyConnectedChain =>
         setConnectedChainId(newlyConnectedChain),
       )
     }

     return () => {
       if (detectedProvider) {
         detectedProvider.removeListener('chainChanged', newlyConnectedChain =>
           setConnectedChainId(newlyConnectedChain),
         )
       }
     }
   }, [detectedProvider, isConnected])

  return {
    connectedChainId,
    chainId,
  }
}

export default useNetworkProvider
