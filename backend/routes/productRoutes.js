import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  deleteProductValidation,
  getProductByIdValidation,
  updateProductValidation,
} from "../validation/productValidation.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProductByIdValidation, validateRequest, getProductById)
  .put(protect, admin, updateProductValidation, validateRequest, updateProduct)
  .delete(
    protect,
    admin,
    deleteProductValidation,
    validateRequest,
    deleteProduct
  );

export default router;
