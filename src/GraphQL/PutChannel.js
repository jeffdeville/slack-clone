import gql from 'graphql-tag'

export default gql`
  mutation CreateChannel($name: String!, $id: ID!){
    putChannel(name: $name, id: $id){
      __typename
      id
      name
    }
  }
`
