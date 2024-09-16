const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

const app = express();
const PORT = process.env.PORT || 3000;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());




if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


const startApolloServer = async () => {

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on http://localhost:${PORT}`);
      console.log(`GraphQL server: http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};


startApolloServer();
