import { gql } from "apollo-server";

export const typeDefs = gql`

type Contact {
  id: ID!
  name: String!
  phoneNumber: String!
}
type Query {
  contacts: [Contact!]!
  contact(id: ID!): Contact!
}
input CreateContactInput {
  name: String!
  phoneNumber: String!
}
input UpdateContactInput {
  id: ID!
  newPhoneNumber: String
  newName: String
}
type Mutation {
  createContact(input: CreateContactInput!): Contact
  updateContact(input: UpdateContactInput!): Contact
  deleteContact(id: ID!): Contact
}

`;