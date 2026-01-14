import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
};

if (!config.MONGO_URI){
    console.error('MONGO_URI is not defined');
    process.exit(1);
}

const app = express();

const startServer = async () => {
    try {
        await mongoose.connect(config.MONGO_URI, { dbName: 'MicroJob'});
        console.log('Connected to DB');

        app.listen(config.PORT, config.ORIGIN, () => {
            console.log(`Server is running on http://localhost:${config.PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to DB: ', error);
        process.exit(1);
    }
}

startServer();