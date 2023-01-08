import { param, body, query } from "express-validator";

const sortOrder = ["name", "rating", "numReviews", "price", "createdAt"];

export const getProductsValidation = [
  query("pageNumber").isNumeric().optional(),
  query("keyword").isString().isLength({ max: 255 }).trim().optional(),
  query("sortOrder")
    .isString()
    .trim()
    .optional()
    .custom(value => sortOrder.find(order => order === value)),
];

export const getProductByIdValidation = [
  param("id")
    .matches(/^[a-fA-F0-9]{24}$/)
    .trim(),
];

export const deleteProductValidation = [
  param("id")
    .matches(/^[a-fA-F0-9]{24}$/)
    .trim(),
];

export const updateProductValidation = [
  body("name").isString().isLength({ min: 2, max: 255 }),
  body("price").isNumeric(),
  body("beforeSalePrice")
    .isNumeric()
    .optional()
    .custom((value, { req }) => {
      if (req.body.price >= value) {
        throw new Error("Price before sale must be greater then price");
      }
      return true;
    }),
  body("image").trim().isString().isLength({ min: 2, max: 255 }),
  body("brand").trim().isString().isLength({ min: 2, max: 255 }),
  body("category").trim().isString().isLength({ min: 2, max: 255 }),
  body("countInStock").isNumeric(),
  body("description").trim().isString().isLength({ min: 2, max: 1000 }),
  body("longDescription").trim().isString().isLength({ min: 2 }),
];

export const createProductReviewValidation = [
  body("rating").isNumeric(),
  body("comment").trim().isString().isLength({ min: 2, max: 1000 }),
  param("id")
    .matches(/^[a-fA-F0-9]{24}$/)
    .trim(),
];
