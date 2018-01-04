import gql from 'graphql-tag'

export default gql`
  subscription($channelId: String!) {
    subscribeToChannelMessages(channelId: $channelId) {
      __typename
      channelId
      messageId
      content
      nickname
      email
      picture
    }
  }
`;
