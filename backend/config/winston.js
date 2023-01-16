import winston from "winston";
import { keys } from "../keys.js";

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

let logger = null;
if (keys.nodeEnv !== "test") {
  logger = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "log.log",
      }),
    ],
  });
}

if (keys.nodeEnv !== "production" || keys.nodeEnv !== "test") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

global.logger = logger;

export default logger;
