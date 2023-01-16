import debug from "debug";
import connectDB from "./config/db.js";
import { app } from "./app.js";
import { keys, checkEnvVariables } from "./keys.js";

connectDB();
checkEnvVariables(keys);

const logger = debug("ltl:server");

const PORT = keys.port || 5000;

app.listen(
  PORT,
  logger(`Server running in ${keys.nodeEnv} mode on port ${PORT}`)
);
