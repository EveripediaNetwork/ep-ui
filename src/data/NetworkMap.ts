import { toHex } from 'viem'

const networkMap = {
  POLYGON_MAINNET: {
    chainId: toHex(137), // '0x89'
    chainName: 'Matic(Polygon) Mainnet',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://www.polygonscan.com/'],
  },
  IQ_TESTNET: {
    chainId: toHex(313377), // '0x333133333737'
    chainName: 'IQ Chain',
    nativeCurrency: {
      name: 'IQ Token',
      symbol: 'IQ',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-testnet.braindao.org/'],
    blockExplorerUrls: ['https://testnet.braindao.org'],
  },
}

export default networkMap
