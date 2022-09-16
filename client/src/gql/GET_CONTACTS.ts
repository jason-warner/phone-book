import { gql } from 'graphql-request';


export const getAllContactsMutation = gql`
query GetContacts {
  contacts {
    id
    firstName
    lastName
    phoneNumber
  }
}
`;

export const getContactMutation = gql`
query GetContact($contactId: ID!) {
  contact(id: $contactId) {
    id
    firstName
    lastName
    phoneNumber
  }
}
`;