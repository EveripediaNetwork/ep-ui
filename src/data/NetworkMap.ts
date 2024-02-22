import { toHex } from 'viem'

const networkMap = {
  POLYGON_MAINNET: {
    id: 137, // '0x89'
    hexChainID: toHex(137),
    name: 'Matic(Polygon) Mainnet',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: {
      default: {
        http: ['https://polygon-rpc.com/'],
      },
    },
    blockExplorerUrls: ['https://www.polygonscan.com/'],
  },
  MUMBAI_TESTNET: {
    id: 80001, // '0x13881'
    hexChainID: toHex(80001),
    name: 'Matic(Polygon) Mumbai Testnet',
    nativeCurrency: { name: 'tMATIC', symbol: 'tMATIC', decimals: 18 },
    rpcUrls: {
      default: {
        http: ['https://rpc-mumbai.maticvigil.com'],
      },
    },
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
}

export default networkMap
