const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Book type representing saved books
  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  # User type representing users with saved books
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  # Authentication type for login and registration
  type Auth {
    token: ID!
    user: User
  }

  # Query type to fetch users and the current logged-in user
  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  # Input type for saving a book
  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  # Mutations for adding a user, logging in, and saving/removing books
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
