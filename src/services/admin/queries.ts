import { gql } from 'graphql-request'

export const WIKIS_EDITED = gql`
  query WikisEdited($startDate: Int!, $endDate: Int!, $interval: String!) {
    wikisEdited(startDate: $startDate, endDate: $endDate, interval: $interval) {
      amount
      startOn
      endOn
    }
  }
`

export const WIKIS_CREATED = gql`
  query WikisCreated($startDate: Int!, $endDate: Int!, $interval: String!) {
    wikisCreated(
      startDate: $startDate
      endDate: $endDate
      interval: $interval
    ) {
      amount
      startOn
      endOn
    }
  }
`
