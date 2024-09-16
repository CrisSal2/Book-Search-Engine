const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth'); // utility for JWT token signing

const resolvers = {
  Query: {
    // Get the currently authenticated user
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Get all users
    users: async () => {
      return User.find();
    },

    // Get a user by their username
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
  },

  Mutation: {
    // Login mutation
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Register a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // Save a book to the user's savedBooks array
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: bookData } }, // add to savedBooks array if not already there
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Remove a book from the user's savedBooks array
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } }, // remove book by bookId
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  // Virtual field for bookCount
  User: {
    bookCount: (parent) => parent.savedBooks.length,
  },
};

module.exports = resolvers;
