export const EditorABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'EditorNotWhitelisted', type: 'error' },
  { inputs: [], name: 'WrongIPFSLength', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'editorAddress', type: 'address' },
    ],
    name: 'isEditorWhitelisted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'editorAddress', type: 'address' },
    ],
    name: 'unWhitelistEditor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'string', name: '_ipfs', type: 'string' },
    ],
    name: 'validate',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'editorAddress', type: 'address' },
    ],
    name: 'whitelistEditor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
