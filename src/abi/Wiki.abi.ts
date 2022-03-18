export const WikiAbi = [
  {
    inputs: [
      { internalType: 'string', name: '_ipfs', type: 'string' },
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'uint256', name: '_deadline', type: 'uint256' },
      { internalType: 'uint8', name: '_v', type: 'uint8' },
      { internalType: 'bytes32', name: '_r', type: 'bytes32' },
      { internalType: 'bytes32', name: '_s', type: 'bytes32' },
    ],
    name: 'postBySig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  }
]
