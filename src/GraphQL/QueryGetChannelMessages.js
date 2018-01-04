import gql from 'graphql-tag'

export default gql`
  query GetChannelMessages($channelId: ID!) {
    getChannelMessages(channelId: $channelId) {
      __typename
      channelId
      messageId
      content
      createdAt
      nickname
      email
      picture
    }
  }
`;
