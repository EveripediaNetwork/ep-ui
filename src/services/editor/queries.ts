import { gql } from 'graphql-request'

export const GET_LEADER_BOARD = gql`
  {
    editors {
      id
      totalRewards
    }
  }
`
