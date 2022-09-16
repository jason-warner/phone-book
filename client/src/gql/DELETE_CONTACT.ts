import { gql } from 'graphql-request';


export const deleteContactMutation = gql`
mutation DeleteContact($deleteContactId: ID!) {
  deleteContact(id: $deleteContactId) {
    id
  }
}
`;