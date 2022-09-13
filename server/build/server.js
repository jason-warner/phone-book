"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_1 = require("apollo-server");
// import {types} from './schema'
const types_1 = require("./schema/types");
const resolvers_1 = require("./schema/resolvers");
dotenv_1.default.config({ path: '../.env' });
const server = new apollo_server_1.ApolloServer({ typeDefs: types_1.typeDefs, resolvers: resolvers_1.resolvers });
var username = encodeURIComponent(String(process.env.MONGO_PHONE_USER));
var password = encodeURIComponent(String(process.env.MONGO_PHONE_PASS));
const dbURI = `mongodb://${username}:${password}@127.0.0.1:27017/phone-book`;
mongoose_1.default
    .connect(dbURI)
    .then(() => {
    console.log('Connected to database.');
    server.listen().then(({ url }) => console.log(`API running @ ${url} :)`));
})
    .catch((err) => console.log('Database connection error: \n' + err));
