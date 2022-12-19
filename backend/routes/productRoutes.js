import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { getProductByIdValidation } from "../validation/productValidation.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductByIdValidation, validateRequest, getProductById);

export default router;
