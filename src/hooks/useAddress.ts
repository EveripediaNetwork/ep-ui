import { useAccount } from 'wagmi'

export const useAddress = () => {
  const { address, isConnected } = useAccount()

  return { address, isConnected }
}
