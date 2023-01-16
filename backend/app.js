import express from "express";
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
import { keys } from "./keys.js";

const app = express();

if (keys.nodeEnv === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());

keys.nodeEnv !== "test" &&
  app.use(morgan("combined", { stream: logger.stream.write }));

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: !(keys.nodeEnv === "test" || keys.nodeEnv === "development"),
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
keys.nodeEnv !== "test" && app.use(loggerHandler);
app.use(notFound);
app.use(errorHandler);

export { app };
