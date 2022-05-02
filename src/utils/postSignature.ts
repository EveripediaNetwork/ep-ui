import config from '@/config'
import { GraphQLClient, gql } from 'graphql-request'
import { Dict } from '@chakra-ui/utils'
import axios from 'axios'

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

  try {
    return await axios.post(`${config.epApiBaseUrl}relayer`, {
      ipfs: wikiHash,
      userAddr: address,
      deadline,
      v,
      r,
      s,
    })
  } catch (error) {
    return error as Dict
  }
}

async function main() {
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

  const variables = {
    ipfs: '2',
    userAddr: '2',
    deadline: 2.0,
    v: '2',
    r: '2',
    s: '2',
  }
  try {
    return await axios.post(`${config.epApiBaseUrl}relayer`, {
      ipfs: variables.ipfs,
      userAddr: variables.userAddr,
      deadline: variables.deadline,
      v: variables.v,
      r: variables.r,
      s: variables.s,
    })
  } catch (error) {
    return error as Dict
  }
}
