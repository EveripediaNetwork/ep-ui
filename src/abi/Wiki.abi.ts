export const WikiAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_ipfs',
        type: 'string',
      },
    ],
    name: 'Posted',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'string', name: 'ipfs', type: 'string' }],
    name: 'post',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'ipfs', type: 'string' },
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
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'sigNonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]
