import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderControllers.js";
import {
  addOrderItemsValidation,
  getOrderByIdValidation,
  updateOrderToDeliveredValidation,
  updateOrderToPaidValidation,
} from "../validation/orderValidation.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItemsValidation, validateRequest, addOrderItems)
  .get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
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
router
  .route("/:id/deliver")
  .put(
    protect,
    admin,
    updateOrderToDeliveredValidation,
    validateRequest,
    updateOrderToDelivered
  );

export default router;
