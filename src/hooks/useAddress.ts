import { useAccount } from 'wagmi'

export const useAddress = () => {
  const { address, isConnected } = useAccount()

  const stringifiedAddress = address ? address.toString() : null

  return { address: stringifiedAddress, isConnected }
}
