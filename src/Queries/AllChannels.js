import gql from 'graphql-tag'

export default gql`
{
  allChannels {
    __typename
    id
    name
  }
}
`
