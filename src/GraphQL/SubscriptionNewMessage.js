import gql from 'graphql-tag'

export default gql`
subscription SubscribeToChannelMessages($channelId: ID!) {
  subscribeToChannelMessages(channelId: $channelId) {
    __typename
    channelId
    messageId
    content
  }
}`
