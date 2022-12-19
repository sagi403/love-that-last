import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  deleteProductValidation,
  getProductByIdValidation,
} from "../validation/productValidation.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProductByIdValidation, validateRequest, getProductById)
  .delete(
    deleteProductValidation,
    validateRequest,
    protect,
    admin,
    deleteProduct
  );

export default router;
