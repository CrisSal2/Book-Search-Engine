import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Navbar from './components/Navbar';
import client from './utils/apolloClient';

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
