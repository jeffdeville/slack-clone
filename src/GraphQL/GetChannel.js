import gql from 'graphql-tag'

export default gql`
query GetChannel($id: ID!){
  getChannel(id: $id){
    id
    name
    __typename
  }
}
`
