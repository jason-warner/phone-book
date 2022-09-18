import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
const dbURI = String(process.env.ME_CONFIG_MONGODB_URL);

export const mongoConnection = async () => {
    try {
        await mongoose.connect(dbURI)
            .then(() => console.log('Connected to the database.'));
    } catch (error) {
        console.error('Database Connection Error: ', error);
    }
}
