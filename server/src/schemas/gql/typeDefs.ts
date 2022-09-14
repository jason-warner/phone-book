import { gql } from "apollo-server";

export const typeDefs = gql`

type Contact {
  id: String!
  firstName: String!
  lastName: String!
  phoneNumber: String!
}
type Query {
  contacts: [Contact!]!
  contact(id: ID!): Contact!
}

input CreateContactInput {
  firstName: String!
  lastName: String!
  phoneNumber: String!
}
input UpdateContactInput {
  newPhoneNumber: String
  newFirstName: String
  newLastName: String
}

type Mutation {
  createContact(input: CreateContactInput!): Contact
  updateContact(input: UpdateContactInput!, id: ID!): Contact
  deleteContact(id: ID!): Contact
}

`;