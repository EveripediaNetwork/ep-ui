import config from '../config'

export const createPermitMessageData = () => {
  const messageTypes = {
    // EIP712Domain: [
    //   { name: 'name', type: 'string' },
    //   { name: 'version', type: 'string' },
    //   { name: 'chainId', type: 'uint256' },
    //   { name: 'verifyingContract', type: 'address' },
    // ],
    // Permit: [
    //   {
    //     name: 'ipfs',
    //     type: 'string',
    //   },
    // ],
    post: [{ name: 'ipfs', type: 'string' }],
  }

  return messageTypes
}
