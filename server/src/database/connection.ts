import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
const username = encodeURIComponent(String(process.env.MONGO_PHONE_USER));
const password = encodeURIComponent(String(process.env.MONGO_PHONE_PASS));
const dbURI = `mongodb://${username}:${password}@127.0.0.1:27017/phone-book`;


export const mongoConnection = async () => {
    try {
        await mongoose.connect(dbURI)
            .then(() => console.log('Connected to the database.'));
    } catch (error) {
        console.error('Database Connection Error: ', error);
    }
}
