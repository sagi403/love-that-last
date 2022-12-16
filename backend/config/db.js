import mongoose from "mongoose";
import debug from "debug";

const logger = debug("diamond-den:database");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger(`Error ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
