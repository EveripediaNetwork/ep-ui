import config from '@/config'

export const domain = {
  name: 'EP',
  version: '1',
  chainId: Number(config.chainId),
  verifyingContract: config.wikiContractAddress as `0x${string}`,
}

export const types = {
  SignedPost: [
    { name: 'ipfs', type: 'string' },
    { name: 'user', type: 'address' },
    { name: 'deadline', type: 'uint256' },
  ],
}
