export const EditorABI = [
  {
    inputs: [
      { internalType: 'address', name: 'editorAddress', type: 'address' },
    ],
    name: 'isEditorWhitelisted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const
