import config from '../config'

export const getTypedData = () => ({
  domain: {
    name: 'MinimalForwarder',
    version: '0.0.1',
    chainId: parseInt(config.chainId, 16),
    verifyingContract: config.forwarderContractAddress,
  },
  primaryType: 'ForwardRequest',
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    ForwardRequest: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'gas', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'data', type: 'bytes' },
    ],
  },
})
