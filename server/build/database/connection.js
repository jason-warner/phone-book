"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const username = encodeURIComponent(String(process.env.ME_CONFIG_MONGODB_ADMINUSERNAME));
const password = encodeURIComponent(String(process.env.ME_CONFIG_MONGODB_ADMINPASSWORD));
const host = encodeURIComponent(String(process.env.MONGO_INITDB_HOST));
const port = encodeURIComponent(String(process.env.MONGO_INITDB_PORT));
const dbURI = `mongodb://${username}:${password}@${host}:${port}`;
// TEMP REMOTE DB URI
// const dbURI = `mongodb+srv://${username}:${password}@cluster0.w3l3h.gcp.mongodb.net/phone-book?retryWrites=true&w=majority`;
console.log('db URI: ', dbURI);
const mongoConnection = async () => {
    try {
        await mongoose_1.default.connect(dbURI)
            .then(() => console.log('Connected to the database.'));
    }
    catch (error) {
        console.error('Database Connection Error: ', error);
    }
};
exports.mongoConnection = mongoConnection;
