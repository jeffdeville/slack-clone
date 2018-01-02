import gql from 'graphql-tag'

export default gql`
subscription NewMessage {
  putMessage {
    __typename
    messageId
    content
  }
}`
