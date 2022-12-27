import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderControllers.js";
import {
  addOrderItemsValidation,
  getOrderByIdValidation,
  updateOrderToPaidValidation,
} from "../validation/orderValidation.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItemsValidation, validateRequest, addOrderItems);
router
  .route("/:id")
  .get(protect, getOrderByIdValidation, validateRequest, getOrderById);
router
  .route("/:id/pay")
  .put(
    protect,
    updateOrderToPaidValidation,
    validateRequest,
    updateOrderToPaid
  );

export default router;
