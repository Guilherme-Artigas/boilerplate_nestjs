import mongoose from 'mongoose';
import 'dotenv/config';

const { MONGO_URI } = process.env;

export default async function dbConnect() {
  await mongoose.connect(MONGO_URI, {
    dbName: "test-database"
  });
  console.log("Database connected");
};