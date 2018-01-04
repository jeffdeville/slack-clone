import gql from 'graphql-tag'

export default gql`
mutation PutMessage($channelId: ID!, $messageId: ID!, $content: String!) {
  putMessage(channelId: $channelId, messageId: $messageId, content: $content){
    __typename
    messageId
    channelId
    content
  }
}`
