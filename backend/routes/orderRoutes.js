import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
} from "../controllers/orderControllers.js";
import {
  addOrderItemsValidation,
  getOrderByIdValidation,
} from "../validation/orderValidation.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItemsValidation, validateRequest, addOrderItems);
router
  .route("/:id")
  .get(protect, getOrderByIdValidation, validateRequest, getOrderById);

export default router;
