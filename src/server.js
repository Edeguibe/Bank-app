import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import schema from "./schema/typeDefs.js";
import authMiddleware from "./utils/authMiddleware.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  exposedHeaders: ["Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authMiddleware);
const server = new ApolloServer({ schema });

const startServer = async () => {
  await server.start();
  await connectDB();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

export default startServer;
