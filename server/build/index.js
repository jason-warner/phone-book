"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = require("./schemas/gql/typeDefs");
const resolvers_1 = require("./schemas/gql/resolvers");
dotenv_1.default.config({ path: '../.env' });
const username = encodeURIComponent(String(process.env.MONGO_PHONE_USER));
const password = encodeURIComponent(String(process.env.MONGO_PHONE_PASS));
const dbURI = `mongodb://${username}:${password}@127.0.0.1:27017/phone-book`;
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
        await mongoose_1.default.connect(dbURI)
            .then(async () => (console.log('Connected to the database.'),
            await startApolloServer()));
    }
    catch (e) {
        console.error(e);
    }
};
main().catch(console.error);
