/* eslint-disable no-var */
import mongoose, { Mongoose } from "mongoose";
import logger from "./logger";
import "@/database";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
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
    logger.info("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "devflow",
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((result) => {
        logger.info("MongoDB connected successfully");
        return result;
      })
      .catch((error) => {
        logger.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
