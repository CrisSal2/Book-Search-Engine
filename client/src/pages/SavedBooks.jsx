import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, REMOVE_BOOK } from '../queries'; // Update with actual query/mutation names
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  // Fetch user data
  const { data, loading, error } = useQuery(GET_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    },
  });

  // Initialize mutation for removing books
  const [removeBook] = useMutation(REMOVE_BOOK);

  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
  }, [data]);

  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await removeBook({ variables: { bookId } });

      setUserData(data.removeBook); // Assuming this returns updated user data
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2>LOADING...</h2>;
  if (error) return <h2>Error loading saved books!</h2>;

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks && userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks && userData.savedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border='dark'>
                {book.image && <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
