import dotenv from "dotenv";
import debug from "debug";
import connectDB from "./config/db.js";
import { app } from "./app.js";

dotenv.config();

connectDB();

const logger = debug("ltl:server");

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  logger(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
