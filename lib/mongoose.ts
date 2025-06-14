/* eslint-disable no-var */
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    var mongooseCache: MongooseCache;
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            dbName: 'devflow'
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then((result) => {
            console.log('Connected to MongoDB');
            return result;
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error)
            throw new Error('Failed to connect to MongoDB')
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;