import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


export const SEARCH_BOOKS = gql`
  query searchBooks($searchInput: String!) {
    searchBooks(searchInput: $searchInput) {
      bookId
      title
      authors
      description
      image
    }
  }
`;


export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
      _id
      username
      savedBooks {
        _id
        title
        authors
        description
        link
        image
      }
    }
  }
`;


export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        _id
        title
        authors
        description
        link
        image
      }
    }
  }
`;
