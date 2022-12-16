import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import debug from "debug";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
const logger = debug("diamond-den:server");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  logger(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
