"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = require("./schemas/gql/typeDefs");
const resolvers_1 = require("./schemas/gql/resolvers");
const startApolloServer = async () => {
    const app = (0, express_1.default)();
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return { server, app };
};
const main = async () => {
    try {
        await (0, connection_1.mongoConnection)()
            .then(async () => (await startApolloServer()));
    }
    catch (error) {
        console.error(error);
    }
};
main()
    .catch((error) => console.error(`Root Server Error: ${error}`));
