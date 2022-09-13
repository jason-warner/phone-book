"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `

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
