import { utils } from 'ethers'

const networkMap = {
  POLYGON_MAINNET: {
    chainId: utils.hexValue(
      Number(process.env.NEXT_PUBLIC_POLYGON_MAINNET_CHAIN_ID),
    ), // '0x89'
    chainName: 'Matic(Polygon) Mainnet',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://www.polygonscan.com/'],
  },
  MUMBAI_TESTNET: {
    chainId: utils.hexValue(
      Number(process.env.NEXT_PUBLIC_MUMBAI_TESTNET_CHAIN_ID),
    ), // '0x13881'
    chainName: 'Matic(Polygon) Mumbai Testnet',
    nativeCurrency: { name: 'tMATIC', symbol: 'tMATIC', decimals: 18 },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
}

export default networkMap
