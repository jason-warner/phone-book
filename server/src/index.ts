
import dotenv from 'dotenv';
import express from 'express'
import mongoose from "mongoose";
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/gql/typeDefs';
import { resolvers } from './schemas/gql/resolvers';

dotenv.config({ path: '../.env' });
const username = encodeURIComponent(String(process.env.MONGO_PHONE_USER));
const password = encodeURIComponent(String(process.env.MONGO_PHONE_PASS));
const dbURI = `mongodb://${username}:${password}@127.0.0.1:27017/phone-book`;

const startApolloServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve: any) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

const main = async () => {
  try {
    await mongoose.connect(dbURI)
      .then(async () => (
        console.log('Connected to the database.'),
        await startApolloServer()
      ));
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);



