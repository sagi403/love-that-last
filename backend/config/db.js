import mongoose from "mongoose";
import debug from "debug";
import { keys } from "../keys.js";

const logger = debug("ltl:database");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(keys.mongoUri);
    logger(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger(`Error ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
