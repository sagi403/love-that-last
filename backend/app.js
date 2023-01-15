import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import cookieSession from "cookie-session";
import helmet from "helmet";
import logger from "./config/winston.js";
import { loggerHandler } from "./middleware/loggerMiddleware.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import {
  longApiLimiter,
  mediumApiLimiter,
  shortApiLimiter,
} from "./middleware/rateLimitMiddleware.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(morgan("combined", { stream: logger.stream.write }));
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: !(
      process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
    ),
  })
);

// Rate Limiter
app.use("/api", longApiLimiter);
app.use("/api", mediumApiLimiter);
app.use("/api", shortApiLimiter);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Middleware
app.use(loggerHandler);
app.use(notFound);
app.use(errorHandler);

export { app };
