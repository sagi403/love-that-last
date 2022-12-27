import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { addOrderItems } from "../controllers/orderControllers.js";
import { addOrderItemsValidation } from "../validation/orderValidation.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItemsValidation, validateRequest, addOrderItems);

export default router;
