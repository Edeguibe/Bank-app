import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await connectDB();
  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

export default startServer;
