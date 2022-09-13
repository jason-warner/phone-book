
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
// import {types} from './schema'
import { typeDefs } from './schema/types'
import { resolvers } from './schema/resolvers'

dotenv.config({ path: '../.env'});
const server = new ApolloServer({ typeDefs, resolvers });
var username = encodeURIComponent(String(process.env.MONGO_PHONE_USER));
var password = encodeURIComponent(String(process.env.MONGO_PHONE_PASS));
const dbURI = `mongodb://${username}:${password}@127.0.0.1:27017/phone-book`;



mongoose
  .connect(dbURI)
  .then(() => {
    console.log('Connected to database.');
    server.listen().then(({ url }) => console.log(`API running @ ${url} :)`));
  })
  .catch((err) => console.log('Database connection error: \n' + err));














