import gql from 'graphql-tag'

export default gql`
subscription NewChannel {
  putChannel {
    __typename
    id
    name
  }
}`
