import { gql } from 'graphql-request';

export const editContactMutation = gql`
mutation EditContact($input: UpdateContactInput!, $updateContactId: ID!) {
  updateContact(input: $input, id: $updateContactId) {
    id
    firstName
    lastName
    phoneNumber
  }
}
`;