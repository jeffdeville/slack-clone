import gql from 'graphql-tag'

export default gql`
mutation PutMessage($channelId: ID!, $messageId: ID!, $content: String!, $createdAt: String!) {
  putMessage(channelId: $channelId, messageId: $messageId, content: $content, createdAt: $createdAt){
    __typename
    messageId
    channelId
    content
    createdAt
    nickname
    email
    picture
  }
}`
