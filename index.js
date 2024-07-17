const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: ID!
    name: String
  }
  type Query {
    users: [User!]!
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
