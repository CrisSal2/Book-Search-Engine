import { gql } from '@apollo/client';


export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
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
  query removeBook($bookId: ID!) {
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
