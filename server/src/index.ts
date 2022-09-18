import express from 'express'
import { mongoConnection } from './database/connection';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/gql/typeDefs';
import { resolvers } from './schemas/gql/resolvers';

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
    await mongoConnection()
      .then(async () => (
        await startApolloServer()
      ));
  } catch (error) {
    console.error(error);
  }
}

main()
  .catch((error: Error) =>
    console.error(`Root Server Error: ${error}`));



