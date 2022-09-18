"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const dbURI = String(process.env.ME_CONFIG_MONGODB_URL);
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
