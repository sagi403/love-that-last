import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTop4Products,
  updateProduct,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createProductReviewValidation,
  deleteProductValidation,
  getProductByIdValidation,
  getProductsValidation,
  updateProductValidation,
} from "../validation/productValidation.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router
  .route("/")
  .get(getProductsValidation, validateRequest, getProducts)
  .post(protect, admin, createProduct);
router.get("/top4", getTop4Products);
router.post(
  "/:id/reviews",
  protect,
  createProductReviewValidation,
  validateRequest,
  createProductReview
);
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
