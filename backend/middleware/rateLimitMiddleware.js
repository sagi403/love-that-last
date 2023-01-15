import rateLimit from "express-rate-limit";
import {
  convertMsToHours,
  convertMsToMinutes,
} from "../utils/convertMsToTime.js";

const TIME_LIMIT_HOURS = 60 * 60 * 1000; // 60 min
const REQUEST_LIMIT_LONG = 1000;
const CONVERTED_TIME_HOURS = convertMsToHours(TIME_LIMIT_HOURS);

const TIME_LIMIT_MINUTES = 10 * 60 * 1000; // 10 min
const REQUEST_LIMIT_MEDIUM = 300;
const CONVERTED_TIME_MINUTES = convertMsToMinutes(TIME_LIMIT_MINUTES);

const TIME_LIMIT_SECONDS = 1 * 60 * 1000; // 1 min
const REQUEST_LIMIT_SHORT = 40;
const CONVERTED_TIME_SECONDS = convertMsToMinutes(TIME_LIMIT_SECONDS);

export const longApiLimiter = rateLimit({
  windowMs: TIME_LIMIT_HOURS,
  max: REQUEST_LIMIT_LONG,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  message: async (req, res) => {
    res.json({
      message: `You can only make ${REQUEST_LIMIT_LONG} requests every ${CONVERTED_TIME_HOURS} ${
        CONVERTED_TIME_HOURS > 1 ? `hours` : `hour`
      }.`,
    });
  },
});

export const mediumApiLimiter = rateLimit({
  windowMs: TIME_LIMIT_MINUTES,
  max: REQUEST_LIMIT_MEDIUM,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  message: async (req, res) => {
    res.json({
      message: `You can only make ${REQUEST_LIMIT_MEDIUM} requests every ${CONVERTED_TIME_MINUTES} ${
        CONVERTED_TIME_MINUTES > 1 ? `minutes` : `minute`
      }.`,
    });
  },
});

export const shortApiLimiter = rateLimit({
  windowMs: TIME_LIMIT_SECONDS,
  max: REQUEST_LIMIT_SHORT,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  message: async (req, res) => {
    res.json({
      message: `You can only make ${REQUEST_LIMIT_SHORT} requests every ${CONVERTED_TIME_SECONDS} ${
        CONVERTED_TIME_SECONDS > 1 ? `minutes` : `minute`
      }.`,
    });
  },
});
