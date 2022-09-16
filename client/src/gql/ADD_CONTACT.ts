import { gql } from 'graphql-request';


export const addContactMutation = gql`
mutation CreateContact($input: CreateContactInput!) {
  createContact(input: $input) {
    id
    firstName
    lastName
    phoneNumber
  }
}
`;