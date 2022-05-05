import { GraphQLClient, gql } from 'graphql-request'
import { Dict } from '@chakra-ui/utils'

export const submitVerifiableSignature = async (
  signedData: string,
  wikiHash: string,
  address: string,
  deadline: number,
): Promise<Dict> => {
  const signature = signedData.substring(2)
  const r = `0x${signature.substring(0, 64)}`
  const s = `0x${signature.substring(64, 128)}`
  const v = parseInt(signature.substring(128, 130), 16)

  // mutation
  const endpoint = 'https://api.dev.braindao.org/graphql'
  const graphQLClient = new GraphQLClient(endpoint)
  const mutation = gql`
    mutation Relayer(
      $ipfs: String!
      $userAddr: String!
      $deadline: Float!
      $v: String!
      $r: String!
      $s: String!
    ) {
      relayer(
        txToRelay: {
          ipfs: $ipfs
          userAddr: $userAddr
          deadline: $deadline
          v: $v
          r: $r
          s: $s
        }
      ) {
        hash
      }
    }
  `

  const data = await graphQLClient.request(mutation, {
    ipfs: wikiHash,
    userAddr: address,
    deadline,
    v: v.toString(),
    r: r.toString(),
    s: s.toString(),
  })
  return data.relayer
}
